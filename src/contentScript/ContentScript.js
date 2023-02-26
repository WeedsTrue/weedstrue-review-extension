/* global chrome */
import React, { useState } from 'react';
import { Button } from '@mantine/core';

const ContentScript = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);

  chrome.runtime.onMessage.addListener(message => {
    setMessage(message.value);
    if (message.value === 'openPopup') {
      setOpen(true);
    }
  });

  console.log(message);

  if (!open) return null;

  return <Button onClick={() => setOpen(false)}>Close</Button>;
};

export default () => <ContentScript />;
