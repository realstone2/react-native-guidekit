# react-native-guidekit

## Overview
This project is a React Native guide kit designed to help developers quickly set up and manage their React Native applications. It provides a structured approach to building applications with best practices and useful tools.

## Features
- Easy setup for React Native projects
- Pre-configured TypeScript support
- GitHub Actions workflows for automated deployment and publishing
- Comprehensive documentation and examples

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm (Node package manager)
- GitHub account

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/react-native-guidekit.git
   ```
2. Navigate to the project directory:
   ```
   cd react-native-guidekit
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Usage
To start the development server, run:
```
npm start
```

### GitHub Actions Workflows
This project includes two GitHub Actions workflows:
1. **Pull Request Deployment**: Automatically creates a pull request with the tag "deploy" when changes are pushed.
2. **Publish on Merge**: Publishes the package to npm when a pull request with the "deploy" tag is merged into the main branch.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.