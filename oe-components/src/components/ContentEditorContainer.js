import { useCallback, useEffect, useRef } from 'react';

export const ContentEditorContainer = ({ content, onChangeContent, title }) => {
  const editorRef = useRef();

  const changeListener = useCallback($event => {
    onChangeContent($event.detail);
  }, [onChangeContent]);

  useEffect(() => {
    const ref = editorRef.current;

    ref.addEventListener('change', changeListener);
    return () => {
      ref.removeEventListener('change', changeListener);
    };
  }, [editorRef, changeListener]);
  // return web-component
  return <content-editor value={content} title={title} ref={editorRef}></content-editor>;
};
