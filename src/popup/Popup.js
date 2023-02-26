/* global chrome */
import React from 'react';
import { Button } from '@mantine/core';

export const getCurrentTabUId = callback => {
  const queryInfo = { active: true, currentWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, tabs => {
      callback(tabs[0].id);
    });
};

const Popup = () => {
  const sendMessage = () => {
    getCurrentTabUId(id => {
      id &&
        chrome.tabs.sendMessage(id, {
          value: 'openPopup'
        });
      window.close();
    });
  };

  return <Button onClick={sendMessage}>Open Popup</Button>;
};

export default () => <Popup />;
