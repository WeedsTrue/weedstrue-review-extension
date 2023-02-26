import React from 'react';
import { createEmotionCache, MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom';
import '@webcomponents/custom-elements';
import ContentScript from './ContentScript';
import { Provider as ReviewsProvider } from '../providers/ReviewsProvider';

const element = document.createElement('div');
const shadowRoot = element.attachShadow({ mode: 'open' });
const mountPoint = document.createElement('div');
const emotionRoot = document.createElement('div');

shadowRoot.appendChild(mountPoint);
shadowRoot.appendChild(emotionRoot);

document.body.appendChild(element);

const myCache = createEmotionCache({ key: 'mantine', container: shadowRoot });

ReactDOM.render(
  <ReviewsProvider>
    <MantineProvider
      emotionCache={myCache}
      theme={{
        components: {
          Portal: {
            defaultProps: {
              target: emotionRoot
            }
          }
        }
      }}
    >
      <ContentScript />
    </MantineProvider>
  </ReviewsProvider>,
  mountPoint
);
