const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');

const iosPath = `ios/dist/`;
const androidPath = `android/styledictionary/src/main/res/`;
const webPath = `web/dist/`;


// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨
console.log(`cleaning ${iosPath}...`);
fs.removeSync(iosPath);
console.log(`cleaning ${androidPath}...`);
fs.removeSync(androidPath);
console.log(`cleaning ${webPath}...`);
fs.removeSync(webPath);

/**
 * This function will wrap a built-in format and replace `.value` with `.darkValue`
 * if a token has a `.darkValue`.
 * param {String} format - the name of the built-in format
 * returns {Function}
 */
 function darkFormatWrapper(format) {
  return function(args) {
    // Create variable called dictionary that will copy over the enumerable properties from args.dictionary to an empty object
    const dictionary = Object.assign({}, args.dictionary);
    // For allProperties of dictionary, see if token.darkValue exists, and if so, set the value to equal that. Otherwise, just return the token
    // Override each token's `value` with `darkValue`
    dictionary.allProperties = dictionary.allProperties.map(token => {
      const {darkValue} = token;
      if (darkValue) {
        return Object.assign({}, token, {
          value: token.darkValue
        });
      } else {
        return token;
      }
    });

    // Return the formatted version of the format we passed in (like css/variables) and include the args and our new dictionary that we modified above

    // Use the built-in format but with our customized dictionary object so it will output the darkValue instead of the value
    return StyleDictionary.format[format]({ ...args, dictionary })
  }
}

// For demo only
const fileVariables = "web/dist/variables.css";
const newFileVariables = "web/demo/src/css/variables.css";

const fileVariablesDark = "web/dist/variables-dark.css";
const newFileVariablesDark = "web/demo/src/css/variables-dark.css";

// Copy files so we can use them in the demo folder
function copyFile(file, newFile) {
  fs.copyFile(file, newFile, (err) => {
    if (err) {
      console.log("An error copying files occured", err);
    }
    else {
      console.log("File copied!");
    }
  })
}

StyleDictionary.extend({
  // custom actions
  action: {
    generateColorsets: require('./actions/ios/colorsets'),
    generateGraphics: require('./actions/generateGraphics'),
  },
  // custom transforms
  transform: {
    'attribute/cti': require('./transforms/attributeCTI'),
    'colorRGB': require('./transforms/colorRGB'),
    'size/remToFloat': require('./transforms/remToFloat')
  },
  // custom formats
  format: {
    swiftColor: require('./formats/swiftColor'),
    androidDark: darkFormatWrapper(`android/resources`),
    cssDark: darkFormatWrapper(`css/variables`),
  },

  source: [
    `tokens/**/*.json`
  ],

  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      files: [{
        destination: `variables.css`,
        format: `css/variables`,
        options: {
          outputReferences: true
        }
      },{
        destination: `variables-dark.css`,
        format: `cssDark`,
        filter: (token) => token.darkValue && token.attributes.category === `color`
      }]
    },

    js: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [{
        destination: `tokens.json`,
        format: `json/flat`
      }]
    },

    iosColors: {
      buildPath: iosPath,
      transforms: [`attribute/cti`,`colorRGB`,`name/ti/camel`],
      actions: [`generateColorsets`]
    },

    iOS: {
      buildPath: iosPath,
      transforms: [`attribute/cti`,`name/ti/camel`,`size/swift/remToCGFloat`],
      files: [{
        destination: `Color.swift`,
        format: `swiftColor`,
        filter: (token) => token.attributes.category === `color`,
        options: {
          outputReferences: true
        }
      }]
    },

    android: {
      transformGroup: `android`,
      buildPath: androidPath,
      files: [{
        destination: `values/colors.xml`,
        format: `android/resources`,
        filter: (token) => token.attributes.category === `color`,
        options: {
          // this is important!
          // this will keep token references intact so that we don't need
          // to generate *all* color resources for dark mode, only
          // the specific ones that change
          outputReferences: true
        },
      },{
        // Here we are outputting a 'night' resource file that only has
        // the colors that have dark values. All the references
        // from the above file will properly reference
        // these colors if the OS is set to night mode.
        destination: `values-night/colors.xml`,
        format: `androidDark`,
        filter: (token) => token.darkValue && token.attributes.category === `color`
      }]
    }

  }
}).buildAllPlatforms();

// Copy variables and variables-dark for demo purposes
copyFile(fileVariables, newFileVariables);
copyFile(fileVariablesDark, newFileVariablesDark);