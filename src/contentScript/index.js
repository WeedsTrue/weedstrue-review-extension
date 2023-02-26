import React from 'react';
import ReactDOM from 'react-dom';
import '@webcomponents/custom-elements';
import ContentScript from './ContentScript';

class ReactExtensionContainer extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    mountPoint.id = 'reactExtensionPoint';

    const reactRoot = this.attachShadow({ mode: 'open' }).appendChild(
      mountPoint
    );

    ReactDOM.render(<ContentScript />, mountPoint);
  }
}

const initWebComponent = function () {
  customElements.define('react-extension-container', ReactExtensionContainer);

  const app = document.createElement('react-extension-container');
  document.documentElement.appendChild(app);
};

initWebComponent();
