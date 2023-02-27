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
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf, X } from 'tabler-icons-react';

const TabContentModal = ({ children }) => {
  const { key } = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            border: 'solid 1px #FFF',
            position: 'absolute',
            top: '20%',
            cursor: isModalOpen ? 'default' : 'pointer',
            right: 0,
            borderRadius: 10,
            width: isModalOpen ? 350 : 50,
            height: isModalOpen ? 600 : 50,
            pointerEvents: 'all'
          }}
        >
          {!isModalOpen ? (
            <Stack sx={{ placeItems: 'center', height: '100%' }}>
              <Leaf color="dodgerblue" size={25} style={{ margin: 'auto' }} />
            </Stack>
          ) : (
            <Stack sx={{ flex: 1, gap: 0, height: '100%' }}>
              <Group sx={{ justifyContent: 'space-between', padding: 10 }}>
                {key !== 'default' && (
                  <ActionIcon
                    color="dark"
                    onClick={() => navigate(-1)}
                    size={22}
                  >
                    <ArrowLeft size={22} />
                  </ActionIcon>
                )}
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
              <Stack sx={{ padding: 10, flex: 1, overflow: 'auto' }}>
                {children}
              </Stack>
            </Stack>
          )}
        </Card>
      </Tooltip>
    </Box>
  );
};

TabContentModal.propTypes = {
  children: PropTypes.any
};

export default TabContentModal;
