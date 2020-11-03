window.onload = function() {

  var snapshot = [];
  var nodes = document.querySelectorAll('*');
  var debugVisionEnabled = false;

  /** Default debug styles */
  const DEFAULT_BACKGROUND_COLOR = "#000000";
  const DEFAULT_TEXT_COLOR = "#0af09b";
  const DEFAULT_OUTLINE_COLOR = "#f52d0a";
  const DEFAULT_OUTLINE_STYLE = "solid";

  let styles = {};

  chrome.storage.sync.get({
    textColor: DEFAULT_TEXT_COLOR,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    outlineColor: DEFAULT_OUTLINE_COLOR,
    outlineStyle: DEFAULT_OUTLINE_STYLE
  }, function(items) {
    styles.textColor = items.textColor;
    styles.backgroundColor = items.backgroundColor;
    styles.outlineColor = items.outlineColor;
    styles.outlineStyle = items.outlineStyle;
  });

  function generateSnapshot() {
    /** Reset the snapshot if one already exists. */
    if(snapshot && snapshot.length > 0) {
      snapshot = [];
    }  

    /** Pick up any new DOM elements that may have been 
     * added programmatically  since the page loaded.
     */
    nodes = document.querySelectorAll('*');

    /** Go through each node and push it's original 
     *  styles as an object into the snapshot array.
     */
    nodes.forEach(function(node) {
      let originalStyle = {
        id: node.id,
        color: node.style.color,
        outline: node.style.outline
      };

      if(node.style.backgroundImage.length > 0) {
        originalStyle.background = node.style.backgroundImage
      } else {
        originalStyle.background = node.style.background
      }

      snapshot.push(originalStyle);
    });
  }

  function applyDebugStyles(nodes) {
    nodes.forEach(function(node) {
      node.style.setProperty("background", styles.backgroundColor, "important");
      node.style.setProperty("color", styles.textColor, "important");
      node.style.setProperty("outline", `${styles.outlineStyle} ${styles.outlineColor}`, "important");
      // node.style.background = DEBUG_BACKGROUND_COLOR
      // node.style.color = DEBUG_TEXT_COLOR
      // node.style.outline = `${DEBUG_OUTLINE_STYLE} ${DEBUG_OUTLINE_COLOR}`;
    });
  }

  function resetStyles(nodes) {
    nodes.forEach(function(node, index) {

      console.log(`Applying snapshot styles from ${snapshot[index].id} to ${node.id}`)
      let originalStyle = snapshot[index];
      node.style.background = originalStyle.background;
      node.style.color = originalStyle.color;
      node.style.outline = originalStyle.outline;
    });
  }

  function toggleDebugVision() {

    if(debugVisionEnabled) {
      resetStyles(nodes);
    } else {
      applyDebugStyles(nodes);
    }

    debugVisionEnabled = !debugVisionEnabled;
  }

  generateSnapshot();

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.command === "toggle-debug-vision") {
      toggleDebugVision();
      sendResponse({message: "Vision toggled."})
    }
  });

}