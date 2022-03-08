import ReactDOM from 'react-dom';
import { App } from '../components/App';

import theme from "../theme";  

export class ConditionalContentContainerElement extends HTMLElement {
  connectedCallback() {
    const value = this.getAttribute('value');
    let jsonValue = {};
    try {
      jsonValue = JSON.parse(value);
    } catch {}
    const onAccept = (data) => {
      this.dispatchEvent(
        new CustomEvent('accept', {
          detail: data,
        })
      );
    };
    const onCancel = () => {
      this.dispatchEvent(new CustomEvent('cancel'));
    };

    ReactDOM.render(<App value={jsonValue} onAccept={onAccept} onCancel={onCancel} theme={theme} />, this);
  }
}