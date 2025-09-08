# React Native GuideKit

[![npm version](https://badge.fury.io/js/react-native-guidekit.svg)](https://badge.fury.io/js/react-native-guidekit)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

> Interactive guide tour library for React Native apps

React Native GuideKit allows you to provide intuitive onboarding experiences through mask overlays and tooltips.

## ✨ Key Features

- 🎯 **Mask Guide**: Mask overlay to highlight specific UI elements
- 💬 **Custom Tooltips**: Flexible positioning with 6 position options
- 🔄 **Sequential Guide**: Progress through multiple guide steps in order
- 📱 **Cross Platform**: Support for iOS, Android, and Web
- ⚡ **TypeScript**: Full type support
- 🎨 **Customization**: Customizable tooltip content, buttons, and styling

## 📦 Installation

```bash
npm install react-native-guidekit
# 또는
yarn add react-native-guidekit
```

### Dependencies

Install the required peer dependencies:

```bash
npm install react-native-svg react-native-paper
```

## 🚀 Quick Start

### 1. Provider Setup

```tsx
import * as GuideKit from "react-native-guidekit";

export default function App() {
  return (
    <GuideKit.GuideKitProvider>
      <YourAppContent />
    </GuideKit.GuideKitProvider>
  );
}
```

### 2. Marking Guide Areas

```tsx
<GuideKit.GuideMaskSection
  guideKey="welcome"
  type="mask"
  tooltip={{
    arrowPosition: "topLeft",
    position: "bottomLeft",
    title: <Text>Welcome!</Text>,
    content: <Text>Start here.</Text>,
  }}
>
  <YourComponent />
</GuideKit.GuideMaskSection>
```

### 3. Starting the Guide

```tsx
function StartButton() {
  const { startGuide } = GuideKit.useGuideKitState();

  return (
    <Button
      title="Start Guide"
      onPress={() => startGuide({ guideKeyList: ["welcome"] })}
    />
  );
}
```

## 📚 Documentation

- 📖 **[Release Notes](./docs/release-v1.1.0.md)** - Detailed API documentation and usage examples
- 🏗️ **[Architecture Documentation](./docs/brownfield-architecture.md)** - Library structure and design
- 💡 **[Example App](./example)** - Working demo

## 🎯 Examples

For more examples, see [Release Notes](./docs/release-v1.1.0.md).

### Multi-Step Guide

```tsx
startGuide({
  guideKeyList: ["step1", "step2", "step3"],
  onComplete: () => console.log("Guide completed!"),
  onClose: () => console.log("Guide closed"),
});
```

### Custom Tooltip

```tsx
<GuideMaskSection
  guideKey="custom"
  tooltip={{
    position: "topCenter",
    arrowPosition: "bottomCenter",
    title: <Text style={{ fontSize: 18 }}>Custom Title</Text>,
    content: (
      <View>
        <Text>Multi-line description</Text>
        <Text style={{ color: "blue" }}>Additional info</Text>
      </View>
    ),
  }}
>
  <YourComponent />
</GuideMaskSection>
```

## 🔧 API

### Components

- `GuideKitProvider` - Context provider that wraps the entire app
- `GuideMaskSection` - Component that marks areas to be guided

### Hooks

- `useGuideKitState()` - Provides guide state and control functions

For detailed API documentation, see [Release Notes](./docs/release-v1.1.0.md).

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/yeojinseok/react-native-guidekit.git

# Install dependencies
cd react-native-guidekit
npm install

# Build library
npm run build

# Run example app
cd example
npm install
npm run ios # or android, web
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create or check an issue
2. Fork and create a feature branch
3. Implement changes and test
4. Create a PR

## 📄 License

ISC License

## 🔗 링크

- [NPM](https://www.npmjs.com/package/react-native-guidekit)
- [GitHub](https://github.com/yeojinseok/react-native-guidekit)
- [Issues](https://github.com/yeojinseok/react-native-guidekit/issues)

---

Made with ❤️ by [Jindol](mailto:wlstjrghdud@naver.com)
