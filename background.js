function handleClick() {
  browser.runtime.openOptionsPage();
}

console.log("In the background.");
browser.browserAction.onClicked.addListener(handleClick);
