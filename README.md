# 🚀 Vercel Source Downloader

> Download source code from any Vercel deployment in seconds

[![npm version](https://img.shields.io/npm/v/vercel-source-downloader.svg)](https://www.npmjs.com/package/vercel-source-downloader)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Wkasel/vercel-source-downloader/pulls)

## ⚡ Quick Start

No installation needed! Just run:

```bash
npx vercel-source-downloader your-app.vercel.app
```

That's it! Your deployment source code will be downloaded to a local folder.

## 🎯 Why Use This?

Ever needed to:
- 📦 **Backup** a deployment before making changes?
- 🔍 **Recover** source code when local files are lost?
- 🐛 **Debug** production by getting the exact deployed code?
- 🚚 **Migrate** projects between accounts?
- 📊 **Audit** what's actually deployed vs what's in git?

This tool makes it simple.

## 📸 Demo

```bash
$ npx vercel-source-downloader startwithloop.vercel.app

✔ Getting deployment id
✔ Loading source files tree
✔ Downloading ./startwithloop/components/ui/button.tsx
✔ Downloading ./startwithloop/app/page.tsx
✔ Downloading ./startwithloop/lib/utils.ts
... 

✓ Successfully downloaded source code to startwithloop
→ Total files: 116
→ Total directories: 23
```

## 🛠️ Setup

### 1️⃣ Get Your Vercel Token

1. Visit [Vercel Tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Give it a name and copy the token

### 2️⃣ Set Your Token

**Option A: Create a `.env` file** (recommended)
```env
VERCEL_TOKEN=your_token_here
VERCEL_TEAM=team_xxx  # Optional, for team deployments
```

**Option B: Use environment variable**
```bash
export VERCEL_TOKEN=your_token_here
```

**Option C: Pass inline**
```bash
VERCEL_TOKEN=your_token npx vercel-source-downloader app.vercel.app
```

### 3️⃣ Download Your Deployment

```bash
npx vercel-source-downloader your-app.vercel.app
```

## 📚 Usage Examples

### Basic Download
```bash
# Download to folder named after the deployment
npx vercel-source-downloader my-app.vercel.app
```

### Custom Destination
```bash
# Download to specific folder
npx vercel-source-downloader my-app.vercel.app ./backup-folder
```

### Using Deployment ID
```bash
# From Vercel dashboard URL or API
npx vercel-source-downloader dpl_FhQJMKpXXXXXXXXXXXXXXXXX
```

### Preview Deployments
```bash
# Download PR preview or branch deployment
npx vercel-source-downloader my-app-git-feature-xyz.vercel.app
```

### Team Deployments
```bash
# Set team ID in .env or inline
VERCEL_TEAM=team_xxx npx vercel-source-downloader team-app.vercel.app
```

## 🎨 Features

| Feature | Description |
|---------|-------------|
| 🚀 **No Install** | Run directly with `npx` |
| ⚡ **Fast Downloads** | Parallel file downloads |
| 📁 **Structure Preserved** | Maintains exact folder structure |
| 🔄 **Skip Existing** | Won't re-download existing files |
| 📊 **Progress Indicators** | See download progress for each file |
| 🎯 **Smart Detection** | Auto-detects deployment IDs vs URLs |
| 👥 **Team Support** | Works with team deployments |
| 🎨 **Beautiful Output** | Color-coded, clear feedback |

## 🚨 Troubleshooting

<details>
<summary><b>Error: "Missing VERCEL_TOKEN"</b></summary>

Make sure you've set your token:
```bash
echo "VERCEL_TOKEN=your_token_here" > .env
```
</details>

<details>
<summary><b>Error: "Deployment not found"</b></summary>

- Check you have access to the deployment
- For team deployments, set `VERCEL_TEAM` 
- Try using the deployment URL instead of ID
- Ensure you're using the correct Vercel account token
</details>

<details>
<summary><b>Error: "No 'src' directory found"</b></summary>

Some deployments might not have source files. This tool downloads the `/src` directory from the deployment.
</details>

<details>
<summary><b>Downloads are slow</b></summary>

The tool downloads files in parallel, but large projects may take time. Check your internet connection.
</details>

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use read-only tokens** when possible
3. **Rotate tokens regularly**
4. **Set token expiration** in Vercel dashboard
5. **Use environment variables** in CI/CD

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT © [William Kasel](https://github.com/Wkasel)

## 🙏 Credits & Attribution

This project is heavily influenced by and based on [zehfernandes/get-vercel-source-code](https://github.com/zehfernandes/get-vercel-source-code) by [Zeh Fernandes](https://github.com/zehfernandes).

### What's New in This Version

Building on Zeh's original concept, this version adds:
- ✨ NPX support for instant usage without installation
- 🎨 Enhanced CLI with colored output and progress indicators  
- 📊 Better error handling and user feedback
- 📁 Support for Vercel dashboard IDs
- 📖 Comprehensive documentation
- 🚀 Parallel downloads for improved speed
- 👥 Team deployment support

Thanks to Zeh Fernandes for the original implementation that inspired this tool!

## 📮 Support

- 🐛 [Report Issues](https://github.com/Wkasel/vercel-source-downloader/issues)
- 💡 [Request Features](https://github.com/Wkasel/vercel-source-downloader/issues/new)
- 📧 [Contact](https://github.com/Wkasel)

## ⭐ Show Your Support

If this tool helped you, please consider giving it a star on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/Wkasel/vercel-source-downloader?style=social)](https://github.com/Wkasel/vercel-source-downloader)

---

<p align="center">Made with ❤️ for the Vercel community</p>
<p align="center">
  <a href="https://vercel.com">
    <img src="https://img.shields.io/badge/Powered%20by-Vercel-black.svg" alt="Powered by Vercel" />
  </a>
</p>