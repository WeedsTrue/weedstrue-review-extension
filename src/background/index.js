/* global chrome */
import weedstrueAPI from '../api/weedstrueAPI';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
});
