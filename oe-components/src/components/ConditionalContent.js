import React, { useState } from 'react';
import { Utils as QbUtils } from 'react-awesome-query-builder';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import { ContentGroup } from './ContentGroup';
import { ContentEditorContainer } from './ContentEditorContainer';
import Button from '@material-ui/core/Button';

const queryValue = { id: QbUtils.uuid(), type: 'group' };

export const ConditionalContent = ({ config, value, onAccept, onCancel, debug }) => {
  const blank = () => ({
    content: `<html xmlns="http://www.w3.org/1999/xhtml">
    <head></head>
    <body></body>
  </html>`,
    query: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
  });

  const [contentGroups, setContentGroups] = useState(
    value?.Parameters?.groups?.map((d) => ({
      ...d,
      query: QbUtils.checkTree(QbUtils.loadFromJsonLogic(d.query, config), config) || blank().query,
    })) || [blank()]
  );

  const [defaultContent, setDefaultContent] = useState(value?.Parameters?.defaultContent);

  const addCondition = () => {
    setContentGroups([...contentGroups, blank()]);
  };

  const deleteContentGroup = (i) => () => {
    setContentGroups(contentGroups.filter((c, index) => i !== index));
  };

  const setContentGroupsByIndex = (i, o) => {
    setContentGroups(contentGroups.map((g, index) => (i === index ? { ...g, ...o } : g)));
  };

  const onChangeContent = (i) => (content) => {
    setContentGroupsByIndex(i, { content: content });
  };

  const onChangeQuery = (i) => (immutableTree, config) => {
    setContentGroupsByIndex(i, { query: immutableTree });
  };

  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100%' }}>
      <Box flexGrow="1" overflow="auto" className="p-5 divide-y divide-gray-300 space-y-6">
        <div>
          <h1 class="mt-0">Default Content</h1>
          <div>
            <ContentEditorContainer content={defaultContent} title="Edit Default Content" onChangeContent={setDefaultContent} />
          </div>
        </div>
        {contentGroups.map((c, i) => (
          <ContentGroup
            index={i}
            config={config}
            content={c.content}
            query={c.query}
            onChangeQuery={onChangeQuery(i)}
            onChangeContent={onChangeContent(i)}
            onDelete={deleteContentGroup(i)}
          />
        ))}
        <div className="py-4 space-y-2">
           <Button onClick={addCondition}  variant="outlined">
            Add Personalized Content
          </Button>
        </div>

        {debug ? (
          <Grid container>
            <pre>
              {JSON.stringify(
                {
                  groups: contentGroups.map((c) => ({
                    content: c.content,
                    query: QbUtils.jsonLogicFormat(c.query, config),
                  })),
                  defaultContent: defaultContent,
                },
                null,
                ' '
              )}
            </pre>
          </Grid>
        ) : null}
      </Box>
      <Box className="p-3 flex justify-end bg-gray-100 border-t">
        <Box className="space-x-2">
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={() =>
              onAccept({
                Parameters: {
                  groups: contentGroups.map((d) => ({ ...d, query: QbUtils.jsonLogicFormat(d.query, config).logic })),
                  defaultContent: defaultContent,
                },
              })
            }
          >
            Ok
          </button>
        </Box>
      </Box>
    </Box>
  );
};
