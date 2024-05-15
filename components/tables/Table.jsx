import { Fragment } from 'react';

function Table({ data, config, keyFn, color }) {
  // Render headers
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return (
        <Fragment key={column.label}>
          {column.header()}
        </Fragment>
      );
    }

    return (
      <th id={color} key={column.label}>
        {column.label}
      </th>
    );
  });

  // Render rows and cells
  const renderedRows = data?.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="table-rows" key={column.label + keyFn(rowData)}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr className="border-b" key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    );
  });

  return (
    <div className='responsive-table-container'>
      <table className="table-container" id={color}>
        <thead style={{ borderRadius: '1rem' }}>
          <tr className="border-b-2">{renderedHeaders}</tr>
        </thead>
        <tbody className='table-body'>{renderedRows}</tbody>
      </table>
    </div>
  );
}

export default Table;
