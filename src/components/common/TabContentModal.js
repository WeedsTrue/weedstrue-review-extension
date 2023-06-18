import React, { useEffect, useReducer } from 'react';
import { Box, Card, Divider, Stack, Tooltip } from '@mantine/core';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { Leaf } from 'tabler-icons-react';
import Header from '../navigation/Header';

const initialState = {
  isDragging: false,
  hasStoppedDragging: false,
  isModalOpen: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'open-modal':
      return {
        ...state,
        isModalOpen: !state.isDragging
      };
    case 'close-modal':
      return {
        ...state,
        isModalOpen: false
      };
    case 'toggle-drag':
      return {
        ...state,
        isDragging: action.payload,
        hasStoppedDragging: false
      };
    case 'drag-stop':
      return {
        ...state,
        hasStoppedDragging: true
      };
    default:
      return state;
  }
};

const TabContentModal = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.hasStoppedDragging) {
      dispatch({
        type: 'toggle-drag',
        payload: false
      });
    }
  }, [state.hasStoppedDragging]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999999,
        pointerEvents: 'none'
      }}
    >
      <Stack
        sx={{
          flex: 1,
          alignItems: 'end',
          height: '100%'
        }}
      >
        <Stack sx={{ flex: 1 }}>
          <Draggable
            axis="y"
            bounds="parent"
            handle=".handle"
            onDrag={() =>
              dispatch({
                type: 'toggle-drag',
                payload: true
              })
            }
            position={null}
          >
            <Stack
              className="handle"
              sx={{
                top: '35%',
                pointerEvents: 'all',
                cursor: state.isModalOpen ? 'default' : 'pointer',
                position: 'relative'
              }}
            >
              <Tooltip
                color="blue"
                disabled={state.isModalOpen}
                label="WeedsTrue Reviews"
                withArrow
              >
                <Card
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (!state.isModalOpen) {
                      dispatch({ type: 'open-modal' });
                    }
                  }}
                  onMouseUp={() => dispatch({ type: 'drag-stop' })}
                  shadow="xl"
                  style={{ padding: 0 }}
                  sx={{
                    border: 'solid 1px #FFF',
                    borderRadius: 10,
                    width: state.isModalOpen ? 350 : 55,
                    height: state.isModalOpen ? 600 : 55
                  }}
                >
                  {!state.isModalOpen ? (
                    <Stack sx={{ placeItems: 'center', height: '100%' }}>
                      <Leaf
                        color="dodgerblue"
                        size={28}
                        style={{ margin: 'auto' }}
                      />
                    </Stack>
                  ) : (
                    <Stack sx={{ flex: 1, gap: 0, height: '100%' }}>
                      <Header
                        onClose={() => dispatch({ type: 'close-modal' })}
                      />
                      <Divider />
                      <Stack sx={{ padding: 10, flex: 1, overflow: 'auto' }}>
                        {children}
                      </Stack>
                    </Stack>
                  )}
                </Card>
              </Tooltip>
            </Stack>
          </Draggable>
        </Stack>
      </Stack>
    </Box>
  );
};

TabContentModal.propTypes = {
  children: PropTypes.any
};

export default TabContentModal;
