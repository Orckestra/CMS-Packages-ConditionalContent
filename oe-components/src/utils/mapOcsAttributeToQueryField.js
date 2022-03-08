export const mapOcsAttributeToQueryField = (attribute) => {
  switch (attribute.dataType) {
    case 'Integer':
      return [attribute.name, {
        label: attribute.name,
        type: 'number',
        valueSources: ['value'],
      }]
      break;
    case 'Decimal':
      return [attribute.name, {
        label: attribute.name,
        type: 'number',
        valueSources: ['value'],
      }]
      break;
    case 'Boolean':
      return [attribute.name, {
        label: attribute.name,
        type: 'boolean',
        operators: ['equal'],
        valueSources: ['value'],
        mainWidgetProps: {
          labelYes: "",
          labelNo: ""
        }
      }]
      break;
    case 'Text':
      return [attribute.name, {
        label: attribute.name,
        type: 'text',
        valueSources: ['value'],
        readonly: false
      }]
      break;
    case 'DateTime':
      return [attribute.name, {
        label: attribute.name,
        type: 'datetime',
        valueSources: ['value'],
        readonly: false
      }]
      break;
    case 'Lookup':
      break;
    case 'EntityReference':
      break;
    case 'CustomType':
      break;
    case 'Xml':
      break;
    case 'Uniqueidentifier':
      break;
    case 'Number':
      return [attribute.name, {
        label: attribute.name,
        type: 'number',
        valueSources: ['value'],
      }]
      break;
    default:
      break;
  }
  return [];
};
