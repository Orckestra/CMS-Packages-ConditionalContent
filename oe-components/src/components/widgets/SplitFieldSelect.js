import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { FormGroup } from '@material-ui/core';


const findFirstPath = (field) => {
  const { items, path, disabled } = field;
  if (disabled) return null;
  if (items) {
    for (let i = 0; i < items.length; i++) {
      const subField = items[i];
      const value = findFirstPath(subField);
      if (value) {
        return value;
      }
    }
  } else {
    return path;
  }
  return null;
};

export const SplitFieldSelect = ({ items, setField, selectedKey, readonly, placeholder }) => {

  const [selectedGroup] = selectedKey?.split(/\.(.+)/) ?? [];
  const selectedGroupItems = items.find((d) => d.key === selectedGroup)?.items;

  const renderOptions = (fields, level = 0) =>{
    const result =  fields.map((field) => {
      const { items, path, label, disabled } = field;
      const prefix = '\u00A0\u00A0'.repeat(level);
      if (items && level > 0) {
        return [
          <ListSubheader disabled={disabled} key={path} disableSticky={true}>
            {prefix && <span>{prefix}</span>}
            {label}
          </ListSubheader>,
          renderOptions(items, level + 1),
        ];
      } else {
        return (
          <MenuItem disabled={disabled} key={path} value={path}>
            {prefix && <span>{prefix}</span>}
            {label}
          </MenuItem>
        );
      }
    })
    return result;
  };

  const onChange = (e) => {
    if (e.target.value === undefined) return;
    setField(e.target.value);
  };

  const onGroupChange = (e) => {
    if (e.target.value === undefined) return;
    const group = items.find((d) => d.key === e.target.value);
    const path = findFirstPath(group);
    setField(path);
  };

  const renderValue = (selectedValue) => {
    if (!readonly && !selectedValue) return placeholder;
    const findLabel = (fields) => {
      return fields.map((field) => {
        if (!field.items) return field.path === selectedValue ? field.label : null;
        return findLabel(field.items);
      });
    };
    return findLabel(items)
      .filter((v) => {
        if (Array.isArray(v)) {
          return v.some((value) => value !== null);
        } else {
          return v !== null;
        }
      })
      .pop();
  };

  return (
    <FormGroup row>
      <FormGroup>
        <Select
          autoWidth
          displayEmpty
          label={placeholder}
          onChange={onGroupChange}
          value={selectedGroup ?? ''}
          disabled={readonly}
          renderValue={(v) => (v ? v : placeholder)}
        >
          {renderOptions(items)}
        </Select>
      </FormGroup>
      {selectedGroupItems ? (
        <FormGroup>
          <Select
            autoWidth
            displayEmpty
            label={placeholder}
            onChange={onChange}
            value={selectedKey ?? ''}
            disabled={readonly}
            renderValue={renderValue}
          >
            {renderOptions(selectedGroupItems, 1)}
          </Select>
        </FormGroup>
      ) : null}
    </FormGroup>
  );
};

export default SplitFieldSelect;
