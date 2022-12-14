import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import MaterialConfig from 'react-awesome-query-builder/lib/config/material';
import SplitFieldSelect from '../components/widgets/SplitFieldSelect';

import theme from '../theme';
import { IconButton } from '@material-ui/core';

const mergeConfig = (object, source) => mergeWith(object, source, (a, b) => (isArray(b) ? b : undefined));

const settings = {
  ...MaterialConfig.settings,
  maxNesting: 1,
  theme: {
    material: theme,
  },
  renderField: (props) => <SplitFieldSelect {...props} />,

  renderButton: (props) => {
    if (props.type === 'delRule')
      return (
        <IconButton {...props}>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
            <path
              fill="#333"
              fill-rule="evenodd"
              d="M20.0375,2.625 L14.35,2.625 L14.35,0.4375 C14.35,0.175 14.175,0 13.9125,0 L6.9125,0 C6.65,0 6.475,0.175 6.475,0.4375 L6.475,2.625 L0.7875,2.625 C0.525,2.625 0.35,2.8 0.35,3.0625 C0.35,3.325 0.525,3.5 0.7875,3.5 L2.975,3.5 L2.975,20.5625 C2.975,20.825 3.15,21 3.4125,21 L17.4125,21 C17.675,21 17.85,20.825 17.85,20.5625 L17.85,3.5 L20.0375,3.5 C20.3,3.5 20.475,3.325 20.475,3.0625 C20.475,2.8 20.3,2.625 20.0375,2.625 Z M7.35,0.875 L13.475,0.875 L13.475,2.625 L7.35,2.625 L7.35,0.875 Z M16.975,20.125 L3.85,20.125 L3.85,3.5 L16.975,3.5 L16.975,20.125 Z M6.9125,16.625 C7.175,16.625 7.35,16.45 7.35,16.1875 L7.35,6.5625 C7.35,6.3 7.175,6.125 6.9125,6.125 C6.65,6.125 6.475,6.3 6.475,6.5625 L6.475,16.1875 C6.475,16.45 6.65,16.625 6.9125,16.625 Z M10.4125,16.625 C10.675,16.625 10.85,16.45 10.85,16.1875 L10.85,6.5625 C10.85,6.3 10.675,6.125 10.4125,6.125 C10.15,6.125 9.975,6.3 9.975,6.5625 L9.975,16.1875 C9.975,16.45 10.2375,16.625 10.4125,16.625 Z M13.9125,16.625 C14.175,16.625 14.35,16.45 14.35,16.1875 L14.35,6.5625 C14.35,6.3 14.175,6.125 13.9125,6.125 C13.65,6.125 13.475,6.3 13.475,6.5625 L13.475,16.1875 C13.475,16.45 13.65,16.625 13.9125,16.625 Z"
            />
          </svg>
        </IconButton>
      );

    const { renderButton: Btn } = MaterialConfig.settings;

    return <Btn {...props} />;
  },
};

const widgets = {
  ...MaterialConfig.widgets,
};

const types = {
  ...MaterialConfig.types,
  boolean: mergeConfig(MaterialConfig.types.boolean, {
    mainWidget: 'boolean',
    operators: ['equal'],
    valueSources: ['value'],
    mainWidgetProps: {
      labelYes: '',
      labelNo: '',
      hideOperator: true,
    },
  }),
  datetime: mergeConfig(MaterialConfig.types.datetime, {
    valueSources: ['value'],
  }),
  text: mergeConfig(MaterialConfig.types.text, {
    valueSources: ['value'],
    operators: ['equal', 'not_equal', 'is_empty', 'is_not_empty', 'is_null', 'is_not_null'],
  }),
};

const OrckestraConfig = {
  ...MaterialConfig,
  types,
  widgets,
  settings,
};

export default OrckestraConfig;
