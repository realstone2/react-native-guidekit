# React Native GuideKit v1.1.0 Release Notes

## 🎉 Release Overview

**React Native GuideKit** is a library that makes it easy to implement interactive user guide tours in React Native apps. It provides intuitive onboarding experiences through mask overlays and tooltips.

- **Version**: 1.1.0
- **Release Date**: 2024-12-19
- **License**: ISC
- **Author**: Jindol <wlstjrghdud@naver.com>

## 🚀 Key Features

### ✨ Core Features

- **🎯 Mask Guide**: Mask overlay to highlight specific UI elements
- **💬 Custom Tooltips**: Support for 6 positions (top/bottom + left/center/right)
- **🔄 Sequential Guide**: Progress through multiple guide steps in order
- **📱 Cross Platform**: Support for iOS, Android, and Web
- **⚡ TypeScript**: Full type support for enhanced developer experience
- **🎨 Customization**: Customizable tooltip content, buttons, and styling

### 📦 Package Information

```json
{
  "name": "react-native-guidekit",
  "version": "1.1.0",
  "repository": "git@github.com:yeojinseok/react-native-guidekit.git"
}
```

## 📋 Requirements

### 🔧 System Requirements

- **React**: ^18.2.0
- **React Native**: ^0.75.0
- **React Native SVG**: ^15.12.0
- **React Native Paper**: ^5

### 📱 Supported Platforms

- ✅ iOS
- ✅ Android
- ✅ Web (React Native Web)

## 🛠️ Installation

### Using npm

```bash
npm install react-native-guidekit
```

### Using yarn

```bash
yarn add react-native-guidekit
```

### Installing Dependencies

Install the required peer dependencies:

```bash
npm install react-native-svg react-native-paper
# 또는
yarn add react-native-svg react-native-paper
```

### Additional iOS Setup

Additional setup is required to use SVG on iOS:

```bash
cd ios && pod install
```

## 🎯 Quick Start

### 1. Provider Setup

Set up the `GuideKitProvider` at the top level of your app:

```tsx
import React from "react";
import * as GuideKit from "react-native-guidekit";

export default function App() {
  return (
    <GuideKit.GuideKitProvider>
      {/* Rest of your app components */}
      <YourAppContent />
    </GuideKit.GuideKitProvider>
  );
}
```

### 2. Marking Guide Areas

Wrap the component you want to guide with `GuideMaskSection`:

```tsx
import * as GuideKit from "react-native-guidekit";
import { View, Text } from "react-native";

function MyComponent() {
  return (
    <GuideKit.GuideMaskSection
      guideKey="welcome-message"
      type="mask"
      onPress={() => console.log("Guide area clicked!")}
      tooltip={{
        arrowPosition: "topLeft",
        position: "bottomLeft",
        title: <Text>Welcome!</Text>,
        content: <Text>You can check key features here.</Text>,
        buttonText: <Text>Next</Text>,
      }}
    >
      <View>
        <Text>Component to guide</Text>
      </View>
    </GuideKit.GuideMaskSection>
  );
}
```

### 3. Starting the Guide

Start the guide using the hook:

```tsx
import React from "react";
import { Button } from "react-native";
import * as GuideKit from "react-native-guidekit";

function StartGuideButton() {
  const { startGuide } = GuideKit.useGuideKitState();

  const handleStartGuide = () => {
    startGuide({
      guideKeyList: ["welcome-message", "feature-button", "settings-menu"],
      onComplete: () => {
        console.log("Guide completed!");
      },
      onClose: () => {
        console.log("Guide closed");
      },
    });
  };

  return <Button title="Start Guide" onPress={handleStartGuide} />;
}
```

## 📚 API Reference

### GuideKitProvider

A context provider that wraps the entire app.

```tsx
<GuideKitProvider>{children}</GuideKitProvider>
```

### GuideMaskSection

A component that marks the area to be guided.

```tsx
interface GuideMaskSectionProps {
  guideKey: string; // Unique identifier
  type: "mask"; // Guide type (currently only mask is supported)
  maskPadding?: number; // Mask padding (default: 8px)
  onPress?: () => void; // Callback when area is clicked
  tooltip?: {
    position?: PointerPositionType; // Tooltip position
    title?: React.ReactNode; // Title
    content?: React.ReactNode; // Content
    buttonText?: React.ReactNode; // Button text
    onPressButton?: () => void; // Button click callback
    arrowPosition: PointerPositionType; // Arrow position
  };
  children: React.ReactNode;
}
```

### useGuideKitState

A hook for managing guide state.

```tsx
const {
  currentGuideInfo, // Current guide information
  currentGuideKey, // Current guide key
  startGuide, // Function to start guide
} = useGuideKitState();
```

### Position Type (PointerPositionType)

```typescript
type PointerPositionType =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "topCenter"
  | "bottomCenter";
```

## 🔧 Advanced Usage

### Multi-Step Guide

```tsx
const multiStepGuide = () => {
  startGuide({
    guideKeyList: [
      "step1-welcome",
      "step2-features",
      "step3-settings",
      "step4-complete",
    ],
    onComplete: () => {
      // Execute when all steps are completed
      AsyncStorage.setItem("onboarding_completed", "true");
    },
  });
};
```

### Conditional Guide

```tsx
const conditionalGuide = async () => {
  const hasSeenGuide = await AsyncStorage.getItem("has_seen_guide");

  if (!hasSeenGuide) {
    startGuide({
      guideKeyList: ["welcome"],
      onComplete: () => {
        AsyncStorage.setItem("has_seen_guide", "true");
      },
    });
  }
};
```

### Custom Tooltip Styling

```tsx
<GuideMaskSection
  guideKey="custom-style"
  tooltip={{
    position: "topCenter",
    arrowPosition: "bottomCenter",
    title: (
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
        Custom Title
      </Text>
    ),
    content: (
      <View>
        <Text style={{ color: "#666", lineHeight: 20 }}>
          Can include multi-line description text.
        </Text>
        <Text style={{ color: "#007AFF", marginTop: 8 }}>
          Additional information or links are also possible.
        </Text>
      </View>
    ),
    buttonText: <Text style={{ color: "white" }}>OK</Text>,
  }}
>
  <YourComponent />
</GuideMaskSection>
```

## 🛠️ Development and Contributing

### Local Development Setup

```bash
# Clone repository
git clone git@github.com:yeojinseok/react-native-guidekit.git
cd react-native-guidekit

# Install dependencies
npm install

# Build library
npm run build

# Run example app
cd example
npm install
npm run ios    # iOS
npm run android # Android
npm run web    # Web
```

### Project Structure

```text
react-native-guidekit/
├── src/                    # Library source
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   ├── types.ts          # TypeScript types
│   └── index.ts          # Public API
├── example/              # Demo app
├── docs/                 # Documentation
└── lib/                  # Build output
```

### How to Contribute

1. Create an issue or check existing issues
2. Fork and create a feature branch
3. Implement changes and test
4. Create PR and request code review

## 📄 License

ISC License - See LICENSE file for details.

## 🔗 링크

- **GitHub**: [yeojinseok/react-native-guidekit](https://github.com/yeojinseok/react-native-guidekit)
- **NPM**: [react-native-guidekit](https://www.npmjs.com/package/react-native-guidekit)
- **Issue Reports**: [GitHub Issues](https://github.com/yeojinseok/react-native-guidekit/issues)

## 📞 Support

If you encounter problems or have questions:

1. Report issues on [GitHub Issues](https://github.com/yeojinseok/react-native-guidekit/issues)
2. Email: [wlstjrghdud@naver.com](mailto:wlstjrghdud@naver.com)

---

Thank you for using **React Native GuideKit**! 🎉
