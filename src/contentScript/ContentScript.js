/* global chrome */
import React, { useState } from 'react';
import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Group,
  Stack,
  Title,
  Tooltip
} from '@mantine/core';
import { Leaf, X } from 'tabler-icons-react';
import BrandsView from './views/BrandsView';

const ContentScript = () => {
  const { location } = window;
  const [isModalOpen, setIsModalOpen] = useState(false);

  chrome.runtime.onMessage.addListener(message => {
    console.log(message);
  });

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 999999999,
        pointerEvents: 'none'
      }}
    >
      <Tooltip
        color="blue"
        disabled={isModalOpen}
        label="WeedsTrue Reviews"
        withArrow
      >
        <Card
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            if (!isModalOpen) {
              setIsModalOpen(true);
            }
          }}
          shadow="xl"
          style={{ padding: 0 }}
          sx={{
            position: 'absolute',
            top: '20%',
            cursor: isModalOpen ? 'default' : 'pointer',
            right: 0,
            borderRadius: 10,
            width: isModalOpen ? 350 : 50,
            height: isModalOpen ? 400 : 50,
            pointerEvents: 'all'
          }}
        >
          {!isModalOpen ? (
            <Stack sx={{ placeItems: 'center', height: '100%' }}>
              <Leaf color="dodgerblue" size={25} style={{ margin: 'auto' }} />
            </Stack>
          ) : (
            <Stack sx={{ flex: 1, gap: 0 }}>
              <Group sx={{ justifyContent: 'space-between', padding: 10 }}>
                <Group sx={{ gap: 1 }}>
                  <Leaf color="dodgerblue" size={22} />
                  <Title order={5}>WeedsTrue Reviews</Title>
                </Group>

                <ActionIcon
                  color="dark"
                  onClick={() => setIsModalOpen(false)}
                  size={22}
                >
                  <X size={22} />
                </ActionIcon>
              </Group>
              <Divider />
              <Stack sx={{ padding: 10 }}>
                {location.pathname.includes('shop-by-brands') ? (
                  <BrandsView location={location} />
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>
          )}
        </Card>
      </Tooltip>
    </Box>
  );
};

export default ContentScript;
