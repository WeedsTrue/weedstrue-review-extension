/*global chrome*/
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.tabs.sendMessage(sender.tab?.id, {
    value: message.value + ' + ' + 'hello from background script'
  });

  switch (request.action) {
    case 'import':
      importResource(request.resource, request.data, sendResponse);
      break;
    case 'fetch':
      fetchResource(request.resource, request.data, sendResponse);
      break;
    default:
      break;
  }
  return true;
});

const importResource = async (resourceType, data, sendResponse) => {
  let url;
  switch (resourceType) {
    case 'brands':
      url = `/api/brands/list`;
      break;
    case 'products':
      url = `/api/products`;
      break;
    default:
      break;
  }

  const response = await client.post(url, data);
  sendResponse({
    status: response.status,
    responseText: response.responseText
  });
};

const fetchResource = async (resourceType, data, sendResponse) => {
  let url;
  switch (resourceType) {
    case 'brands':
      url = `/api/brands/list`;
      break;
    case 'products':
      url = `/api/products`;
      break;
    default:
      break;
  }

  const results = await client.get(url);
  sendResponse(results);
};

const client = async (endpoint, method, body) => {
  return new Promise(function (resolve, reject) {
    const url = `https://localhost:44303${endpoint}`;

    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onloadend = function () {
      resolve({
        status: xhr.status,
        responseText: xhr.responseText
      });
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    if (method === 'POST') {
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send();
    }
  }).catch(err => console.log(err));
};

client.get = async function (url, customConfig = {}) {
  let results = await client(url, (method = 'GET'));
  return results;
};

client.post = async function (url, body) {
  return await client(url, (method = 'POST'), body);
};
