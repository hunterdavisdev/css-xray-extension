/** Default debug styles */
const DEFAULT_BACKGROUND_COLOR = "#000000";
const DEFAULT_TEXT_COLOR = "#0af09b";
const DEFAULT_OUTLINE_COLOR = "#f52d0a";
const DEFAULT_OUTLINE_STYLE = "solid";

function saveOptions() {
  var textColor = document.getElementById("text_color").value;
  var backgroundColor = document.getElementById("background_color").value;
  var outlineColor = document.getElementById("outline_color").value;
  var outlineStyle = document.getElementById("outline_style").value;
  chrome.storage.sync.set({
    textColor,
    backgroundColor,
    outlineColor,
    outlineStyle
  });
}

function resetOptions() {
  chrome.storage.sync.set({
    textColor: DEFAULT_TEXT_COLOR,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    outlineColor: DEFAULT_OUTLINE_STYLE,
    outlineStyle: DEFAULT_OUTLINE_STYLE
  });
}

function loadOptions() {
  chrome.storage.sync.get({
    textColor: DEFAULT_TEXT_COLOR,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    outlineColor: DEFAULT_OUTLINE_COLOR,
    outlineStyle: DEFAULT_OUTLINE_STYLE
  }, function(items) {
    document.getElementById("text_color").value = items.textColor;
    document.getElementById("background_color").value = items.backgroundColor;
    document.getElementById("outline_color").value = items.outlineColor;
    document.getElementById("outline_style").value = items.outlineStyle;
  });
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);
document.getElementById('resetButton').addEventListener('click', resetOptions);
