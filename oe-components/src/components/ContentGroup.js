import IconButton from '@material-ui/core/IconButton';
import { SortableHandle } from 'react-sortable-hoc';
import { ContentEditorContainer } from './ContentEditorContainer';
import { GroupTitle } from './GroupTitle';
import { QueryBuilder } from './QueryBuilder';

const DragHandle = SortableHandle(() => (
  <span className="h-full qb-drag-handler rule--drag-handler">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" width="18px" height="18px">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  </span>
));

export const ContentGroup = ({ config, query, content, title, onChangeQuery, onChangeContent, onChangeTitle, onDelete, index }) => {
  return (
    <div className="py-2 space-y-2">
      <div className="flex">
        <div className="flex-none">
          <DragHandle />
        </div>
        <div className="flex-grow pr-4">
          <GroupTitle title={title ?? ''} onChangeTitle={onChangeTitle} />
        </div>
        <div className="flex-none">
          <IconButton onClick={onDelete} variant="outlined">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
              <path
                fill="#333"
                fill-rule="evenodd"
                d="M20.0375,2.625 L14.35,2.625 L14.35,0.4375 C14.35,0.175 14.175,0 13.9125,0 L6.9125,0 C6.65,0 6.475,0.175 6.475,0.4375 L6.475,2.625 L0.7875,2.625 C0.525,2.625 0.35,2.8 0.35,3.0625 C0.35,3.325 0.525,3.5 0.7875,3.5 L2.975,3.5 L2.975,20.5625 C2.975,20.825 3.15,21 3.4125,21 L17.4125,21 C17.675,21 17.85,20.825 17.85,20.5625 L17.85,3.5 L20.0375,3.5 C20.3,3.5 20.475,3.325 20.475,3.0625 C20.475,2.8 20.3,2.625 20.0375,2.625 Z M7.35,0.875 L13.475,0.875 L13.475,2.625 L7.35,2.625 L7.35,0.875 Z M16.975,20.125 L3.85,20.125 L3.85,3.5 L16.975,3.5 L16.975,20.125 Z M6.9125,16.625 C7.175,16.625 7.35,16.45 7.35,16.1875 L7.35,6.5625 C7.35,6.3 7.175,6.125 6.9125,6.125 C6.65,6.125 6.475,6.3 6.475,6.5625 L6.475,16.1875 C6.475,16.45 6.65,16.625 6.9125,16.625 Z M10.4125,16.625 C10.675,16.625 10.85,16.45 10.85,16.1875 L10.85,6.5625 C10.85,6.3 10.675,6.125 10.4125,6.125 C10.15,6.125 9.975,6.3 9.975,6.5625 L9.975,16.1875 C9.975,16.45 10.2375,16.625 10.4125,16.625 Z M13.9125,16.625 C14.175,16.625 14.35,16.45 14.35,16.1875 L14.35,6.5625 C14.35,6.3 14.175,6.125 13.9125,6.125 C13.65,6.125 13.475,6.3 13.475,6.5625 L13.475,16.1875 C13.475,16.45 13.65,16.625 13.9125,16.625 Z"
              />
            </svg>
          </IconButton>
          {/* <button className="btn-secondary" onClick={onDelete}>
            Delete
          </button> */}
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-2">Content</div>
        <ContentEditorContainer content={content} onChangeContent={onChangeContent} title="Edit Content" />
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-2">Conditions</div>
        <QueryBuilder config={config} query={query} onChangeQuery={onChangeQuery}></QueryBuilder>
      </div>
    </div>
  );
};
