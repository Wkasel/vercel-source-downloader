# Changelog

## [3.0.0] - 2024-08-25

### 🆕 Complete Rewrite
This is a major rewrite of the original concept from [zehfernandes/get-vercel-source-code](https://github.com/zehfernandes/get-vercel-source-code).

### ✨ Added
- **NPX Support**: Run directly with `npx vercel-source-downloader` without installation
- **Enhanced CLI**: 
  - Help flag (`--help` or `-h`) with comprehensive usage instructions
  - Colored output using chalk for better readability
  - Progress indicators for each file download
  - Success summary with file/directory counts
- **Better Error Handling**:
  - Clear, actionable error messages
  - Specific guidance for common issues
  - Support for Vercel dashboard IDs (not just deployment URLs)
- **Improved Performance**:
  - Parallel file downloads using Promise.allSettled
  - Skip existing files to avoid re-downloads
- **Professional Package**:
  - Proper npm package structure with bin entry
  - Comprehensive README with troubleshooting
  - MIT License file
  - Security best practices documentation

### 🔄 Changed
- Restructured as a standalone npm package (not a fork)
- Enhanced user feedback throughout the process
- Better handling of team deployments
- Improved error messages for missing tokens or deployments

### 🏗️ Technical Improvements
- Added shebang for direct execution
- Proper async/await handling
- Better environment variable management
- Cleaned up promise handling
- Added .npmignore for cleaner package distribution

### 📝 Documentation
- Complete README rewrite with visual appeal
- Added usage examples for various scenarios
- Security best practices section
- Troubleshooting guide with collapsible sections
- Clear attribution to original concept

## Original Version
The original implementation by zehfernandes provided the core concept of downloading Vercel deployment source files using the Vercel API.