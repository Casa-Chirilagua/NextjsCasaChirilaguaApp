import { useState } from "react";
import Table from "./Table";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";

function SortableTable(props) {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const { config, data, color } = props;

  const handleClick = (label) => {
    if (sortBy && label !== sortBy) {
      setSortOrder("asc");
      setSortBy(label);
      return;
    }

    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th
          id={color}
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => handleClick(column.label)}
        >
          <div className="label-icon-container">
            {column.label}
            {getIcons(column.label, sortBy, sortOrder)}
          </div>
        </th>
      ),
    };
  });

  // Only sort data if sortOrder && sortBy are not null
  // Make a copy of the 'data' prop
  // Find the correct sortValue function and use it for sorting
  let sortedData = data;
  if (sortOrder && sortBy) {
    const { sortValue } = config.find((column) => column.label === sortBy);
    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return (
    <Table
      id={color}      
      {...props}
      data={sortedData}
      config={updatedConfig}
    />
  );
}

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div className="up-down-arrow">
        <AiOutlineArrowUp />
        <AiOutlineArrowDown />
      </div>
    );
  }

  if (sortOrder === null) {
    return (
      <div className="up-down-arrow">
        <AiOutlineArrowUp />
        <AiOutlineArrowDown />
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div className="up-arrow">
        <AiOutlineArrowUp />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div className="up-arrow">
        <AiOutlineArrowDown />
      </div>
    );
  }
}

export default SortableTable;
