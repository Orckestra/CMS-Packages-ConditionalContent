import { Builder, Query } from "react-awesome-query-builder";

export const QueryBuilder = ({ config, query, onChangeQuery }) => {
  const renderBuilder = (props) => (
    <div className="query-builder-container">
      <div className="query-builder">
        <Builder {...props} />
      </div>
    </div>
  );

  return (
    <div>
      <Query {...config} value={query} onChange={onChangeQuery} renderBuilder={renderBuilder} />
    </div>
  );
};