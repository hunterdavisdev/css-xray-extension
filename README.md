# css-xray-extension
Inspired by a blog post from Kyle Werner, this google chrome extension provides a quick and easy way to indentify obscure padding and margin issues on any site with a key-press.
You can view the original post [here](https://blog.wernull.com/2013/04/debug-ghost-css-elements-causing-unwanted-scrolling/ "Debug Ghost CSS Elements Causing Unwanted Scrolling").

### Installation
The extension isn't live on the chrome store yet, but you can still run it locally without the need to build or pack it. To install the extension, simply clone the repo anywhere on your machine and navigate to chrome://extensions in your browser's url bar, enable developer mode in the top right corner, and choose 'Load Unpacked', then choose the root folder of the cloned repo.

### Usage
Pressing Ctrl+Shift+X on Windows, or Command+Shift+X on Mac will toggle xray vision 🕵🏽

### Customization
Currently, you can change the background color, text color, outline color, and outline line style that gets applied to all of a pages elements when x-ray vision is enabled. As the project grows, more customization options will become available. To change the default x-ray styles, navigate to chrome://extensions in your browser's url bar, and click 'More Details' under the css-xray extension. You may need to refresh any pages you've got open after saving new styles to see the changes take effect.
