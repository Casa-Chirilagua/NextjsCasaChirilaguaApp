import React, { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { DataGrid } from "@mui/x-data-grid";
import "./List.scss";
import TextField from "@mui/material/TextField";

const columns = [
  {
    field: "name",
    headerClassName: "super-app-theme--header",
    headerName: "Full Name",
    sortable: true,
    width: 200,
    headerAlign: "left",
  },

  {
    field: "email",
    headerClassName: "super-app-theme--header",

    headerName: "Email",
    type: "email",
    align: "left",
    width: 250,
    headerAlign: "left",
  },
  {
    field: "phone",
    headerClassName: "super-app-theme--header",

    headerName: "Phone",
    type: "phone",
    width: 200,
    headerAlign: "left",
  },
  {
    field: "grade",
    headerClassName: "super-app-theme--header",
    headerName: "Grade",
    // width: "20%",
    headerAlign: "left",
  },
  {
    field: "age",
    headerClassName: "super-app-theme--header",
    headerName: "Age",
    type: "number",
    // width: "20%",
    headerAlign: "left",

  },
  {
    field: "programs",
    headerClassName: "super-app-theme--header",
    headerName: "Programs",
    width: 200,
    headerAlign: "left",
  },
  {
    field: "school",
    headerClassName: "super-app-theme--header",
    headerName: "School",
    width: 400,
    headerAlign: "left",
  },
];

function List({ students }) {
  const [searchText, setSearchText] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(()=>{
    if(searchText.trim() === ""){
      setFilteredStudents(students);
    }else{
      const filtered = students.filter((student)=>
        student.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredStudents(filtered);

    }
  }, [searchText, students])

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="table-container" style={{ padding:"6rem", height: 700, width: "60%" }}>
      <div className="search-title-container">
        <h1>{filteredStudents.length} Students </h1>
        <input
          className="list-searchbar"
          placeholder="Search student name ..."
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          style={{ fontSize:"1.6rem" ,marginBottom: 16 }}
        ></input>
      </div>

      <TableContainer component={Paper}>
        <DataGrid
          rows={filteredStudents}
          columns={columns}
          className="custom-data-grid" // Add the class here

          sx={{
            fontSize: "1.6rem",
            "& .MuiCheckbox-root":{
              fontSize:"1.8rem",
            },
            "& .MuiDataGrid-columnHeaderTitle, .MuiDataGrid-footerContainer": {
              fontSize: "1.8rem",
            },
            "& .MuiDataGrid-sortIcon": {
              fill: "#ffffff", // Set the desired color for the sorting arrows
              fontSize: "1.6rem",
            },
            "& .MuiDataGrid-menuIcon": {
              fill: "#ffffff", // Set the desired color for the menu icon
              fontSize: "1.6rem",
            },
            backgroundColor: "#523F8E",
            "& .MuiDataGrid-row": {
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#F1F1F1",
              },
              "&:active": {
                backgroundColor: "#F1F1F1 !important",
              },
            },
            "& .MuiDataGrid-footerContainer": {
              fontSize: "1.8rem",
              "& .MuiDataGrid-cell": {
                fontWeight: "bold",
              },
              backgroundColor: "#fff",
            },
            "& .MuiDataGrid-iconButton": {
              "& .MuiIconButton-label": {
                "& .MuiSvgIcon-root": {
                  fill: "#FFFFFF", // Set the desired color for the arrows
                },
              },
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 40, 80, 100]}
        />
      </TableContainer>

    </div>
  );
}

export default List;
