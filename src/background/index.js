/* global chrome */

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // eslint-disable-next-line no-console
  console.log(request);
});
