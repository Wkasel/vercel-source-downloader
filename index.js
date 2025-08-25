#!/usr/bin/env node

import "dotenv/config";
import * as fs from "fs";
import got from "got";
import chalk from "chalk";
import { oraPromise } from "ora";

const error = chalk.bold.red;
const success = chalk.bold.green;
const info = chalk.bold.blue;

// Check for help flag
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
${info('Vercel Source Downloader')} - Download source code from Vercel deployments

${chalk.bold('Usage:')}
  npx vercel-source-downloader <deployment-url-or-id> [destination-dir]

${chalk.bold('Examples:')}
  npx vercel-source-downloader example.vercel.app
  npx vercel-source-downloader example-5ik51k4n7.vercel.app ./my-project
  npx vercel-source-downloader dpl_6CR1uw9hBdpWgrMvPkncsTGRC18A

${chalk.bold('Environment Variables:')}
  VERCEL_TOKEN     Your Vercel API token (required)
  VERCEL_TEAM      Your Vercel team ID (optional)

${chalk.bold('Setup:')}
  1. Get your Vercel token from: https://vercel.com/account/tokens
  2. Create a .env file with: VERCEL_TOKEN=your_token_here
  3. Run the command with your deployment URL

For more info: https://github.com/Wkasel/vercel-source-downloader
`);
  process.exit(0);
}

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_DEPLOYMENT = process.argv[2];
const DESTDIR = process.argv[3] || VERCEL_DEPLOYMENT;
const VERCEL_TEAM = process.env.VERCEL_TEAM;

try {
  if (VERCEL_TOKEN === undefined) {
    console.log(
      error(
        "Missing VERCEL_TOKEN in .env file. \n\nLook at README for more information"
      )
    );
  } else if (VERCEL_DEPLOYMENT === undefined) {
    console.log(error("Missing deployment URL or id"));
    console.log(
      "\ne.g: node index.js example-5ik51k4n7.vercel.app",
      "\ne.g: node index.js dpl_6CR1uw9hBdpWgrMvPkncsTGRC18A"
    );
  } else {
    await main();
  }
} catch (err) {
  console.log(error(err.stack || err));
}

async function main() {
  let deploymentId;
  
  // Check if it's already a deployment ID
  if (VERCEL_DEPLOYMENT.startsWith("dpl_")) {
    deploymentId = VERCEL_DEPLOYMENT;
  } else if (VERCEL_DEPLOYMENT.match(/^[a-zA-Z0-9]{24,}$/)) {
    // This looks like a dashboard ID, try using it directly
    console.log(chalk.yellow("Note: Using dashboard deployment ID. If this fails, try using the deployment URL instead."));
    deploymentId = VERCEL_DEPLOYMENT;
  } else {
    // Assume it's a domain/URL
    deploymentId = await oraPromise(
      getDeploymentId(VERCEL_DEPLOYMENT),
      "Getting deployment id"
    );
  }
  
  const srcFiles = await oraPromise(
    getDeploymentSource(deploymentId),
    "Loading source files tree"
  );
  if (!fs.existsSync(DESTDIR)) fs.mkdirSync(DESTDIR);
  
  const downloadPromises = srcFiles
    .map((file) => {
      let pathname = file.name.replace("src", DESTDIR);
      if (fs.existsSync(pathname)) return null;
      if (file.type === "directory") fs.mkdirSync(pathname);
      if (file.type === "file") {
        return oraPromise(
          downloadFile(deploymentId, file.uid, pathname),
          `Downloading ${pathname}`
        );
      }
    })
    .filter(Boolean);
  
  await Promise.allSettled(downloadPromises);
  
  console.log(`\n${success('✓')} Successfully downloaded source code to ${chalk.bold(DESTDIR)}`);
  console.log(`${info('→')} Total files: ${srcFiles.filter(f => f.type === 'file').length}`);
  console.log(`${info('→')} Total directories: ${srcFiles.filter(f => f.type === 'directory').length}`);
}

async function getDeploymentSource(id) {
  let path = `/v6/deployments/${id}/files`;
  if (VERCEL_TEAM) path += `?teamId=${VERCEL_TEAM}`;
  
  try {
    const files = await getJSONFromAPI(path);
    // Get only src directory
    const source = files.find((x) => x.name === "src");
    if (!source) {
      throw new Error("No 'src' directory found in deployment. Make sure the deployment has source files.");
    }
    // Flatten tree structure to list of files/dirs for easier downloading
    return flattenTree(source);
  } catch (err) {
    if (err.response?.statusCode === 404) {
      throw new Error(`Deployment not found with ID: ${id}\n\nTry using the deployment URL (e.g., your-app.vercel.app) instead of the dashboard ID.`);
    }
    throw err;
  }
}

async function getDeploymentId(domain) {
  try {
    const deployment = await getJSONFromAPI(`/v13/deployments/${domain}`);
    return deployment.id;
  } catch (err) {
    if (err.response?.statusCode === 404) {
      throw new Error(`Deployment not found: ${domain}\n\nPlease provide a valid deployment URL (e.g., example.vercel.app) or deployment ID (e.g., dpl_xxxx)`);
    }
    throw err;
  }
}

async function downloadFile(deploymentId, fileId, destination) {
  let path = `/v7/deployments/${deploymentId}/files/${fileId}`;
  if (VERCEL_TEAM) path += `?teamId=${VERCEL_TEAM}`;
  const response = await getFromAPI(path);
  return new Promise((resolve, reject) => {
    const encodedValue = JSON.parse(response.body).data;
    const decodedValue = Buffer.from(encodedValue, 'base64'); // Decode base64 to binary buffer

    fs.writeFile(destination, decodedValue, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
}

function getFromAPI(path) {
  return got(`https://api.vercel.com${path}`, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
    responseType: 'buffer',
    retry: {
      limit: 0,
    },
  });
}

async function getJSONFromAPI(path) {
  const response = await got(`https://api.vercel.com${path}`, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
    responseType: 'json',
    retry: {
      limit: 0,
    },
  });
  return response.body;
}

function flattenTree({ name, children = [] }) {
  let childrenNamed = children.map((child) => ({
    ...child,
    name: `${name}/${child.name}`,
  }));
  return Array.prototype.concat.apply(
    childrenNamed,
    childrenNamed.map(flattenTree)
  );
}
