import { useEffect, useState } from 'react';
import OrckestraConfig from '../config/OrckestraConfig';
import { ConditionalContent } from './ConditionalContent';

import 'react-awesome-query-builder/lib/css/styles.css';
import 'react-awesome-query-builder/lib/css/compact_styles.css'; //optional, for more compact styles
import { ThemeProvider } from '@material-ui/core';



const InitialConfig = OrckestraConfig;

export const App = ({ value, onAccept, onCancel, theme, debug }) => {
  const [config, setConfig] = useState(null);

  const getConditions = async () => {
    const fields = await fetch("/composite/api/conditionalcontent/fields", {
      method: "GET",
      credentials: 'include',
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json',
    }).then((data) => data.json())

    const config = {
      ...InitialConfig,
      fields: fields,
    }


    setConfig(config);
  };

  useEffect(() => {
    getConditions();
  }, []);

  return <ThemeProvider theme={theme}>
    {config ? <ConditionalContent config={config} value={value} onAccept={onAccept} onCancel={onCancel} debug={debug} /> : <div>Loading ... </div>}
  </ThemeProvider>;
};
