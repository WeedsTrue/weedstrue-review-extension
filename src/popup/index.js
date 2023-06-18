import React from 'react';
import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom';
import '@webcomponents/custom-elements';
import App from './App';
import GlobalStyles from '../config/GlobalStyles';
import { Provider as ReviewsProvider } from '../providers/ReviewsProvider';

ReactDOM.render(
  <ReviewsProvider>
    <MantineProvider>
      <GlobalStyles />
      <App />
    </MantineProvider>
  </ReviewsProvider>,
  document.getElementById('root')
);
