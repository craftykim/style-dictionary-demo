# About this dark mode demo

This demo is based on Danny Bank's dark mode single-token method outlined here: [https://dbanks.design/blog/dark-mode-with-style-dictionary/#Single-token-method](https://dbanks.design/blog/dark-mode-with-style-dictionary/#Single-token-method)

Using the single-token method, we're able to run Style Dictionary only once since we include a separate dark value in the token itself, rather than having a separate set of dark token files and needing to run Style Dictionary twice.

One downside to this approach is that `darkValue` needs to be a reference because of how Style Dictionary works, since Style Dictionary only transforms the value property of a token. Therefore, we set up a `core.json` file with the raw values, and then reference it with the other files like `background.json` and `font.json`.

## Usage
```
npm install
npm run build
```

### Web demo
- Open the `index.html` file in the `web/demo` folder

### iOS demo
- `cd ios/demo`
- Install the style dictionary CocoaPod with `pod install`
- Type `open StyleDictionaryDarkModeDemo.xcworkspace` to open the Xcode workspace
- Click the play button to build and run the demo

### Android demo
- Open the android folder in Android Studio
- Click the play button to build and run the demo in an emulator

## Token setup
All the raw color values are included in the `core.json` file. The colors are separated into objects corresponding as closely as possible to how they are set up in Figma.

For example, there is a "peace" object that corresponds with all the teal light mode colors, and then a "peace-dark", which corresponds with all the peace dark mode colors. Each color has a number key that also matches with the Figma file.

A downside of this method is that this json file was created manually since the "design tokens" Figma plugin does not support this custom formatting.

Other token files refer to the `core.json` file to support the `darkValue` custom value. This `darkValue` corresponds to what the styling should look like in dark mode.

## Details

### Web
For the web, we can’t use the built-in `css/variables` format because we need to access `.darkValue` for some tokens. Instead, we create a function that wraps the built-in `css/variables` format and change’s any token’s `.value` with `.darkValue` if it has one.

### iOS
To generate the colorsets in the single-token method, we will create only the necessary colorsets and then leverage references in a custom Swift format. This custom format has a little more logic to sees if the token has a `darkValue` or if it is a reference and then write the Swift code accordingly.

### Android
We will use the same method to generate the Android resources as we did for generating CSS files. We will wrap the `android/resources` built-in format with the dark mode format wrapper function.