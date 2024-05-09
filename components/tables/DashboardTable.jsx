
// import React from "react";
// // import { DataGrid } from "@mui/x-data-grid";
// import { Paper, TableContainer } from "@mui/material";
// import StudentColumns from "../../data/StudentColumns";

// function DashboardTable({ studentsWithIds, fontColor, backgroundColor }) {
//   const tableStyles = {
//     backgroundColor: backgroundColor,
//     color: fontColor,
//     fontSize: "1.4rem",
//     "& .MuiDataGrid-iconSeparator": {
//       color: fontColor,
//     },
    
//     "& .MuiDataGrid-cell": {
//       color: fontColor,
//     },
//     "& .MuiDataGrid-iconButton": {
//       color: fontColor,
//     },
//     "& .MuiDataGrid-sortIcon": {
//       opacity: 1,
//       color: fontColor,
//       },
//       "& .MuiDataGrid-menuIconButton": {
//       opacity: 1,
//       color: fontColor
//       },
//       "& .MuiDataGrid-footerCell":{
//         color: fontColor,
//       },
//       "& .MuiDataGrid-footerContainer": {
//         color: fontColor,

//         "& .MuiTablePagination-select": {
//           color: fontColor,
//         },

//         "& .MuiTablePagination-selectLabel": {
//           color: fontColor,
//         },

//         "& .MuiTablePagination-displayedRows":{
//           color: fontColor,
//         },

//         "& .MuiTablePagination-selectIcon":{
//           color: fontColor,
//         },

//         "& .MuiTablePagination-actions": {
//           color: fontColor,
  
//           "& .MuiTablePagination-iconButton": {
//             color: fontColor, // Change the color of pagination arrows
//           },
  
//           "& .MuiSvgIcon-root": {
//             // Targeting the arrow icons specifically
//             color: fontColor, // Change the color of the arrow icons
//           },
//         },
//       },
//   };

//   return (
//     <div style={{ backgroundColor: backgroundColor}} className="dashboard-table-container">
//       <div style={{ color: fontColor, paddingBottom:"1rem" }} className="card-name">
//         Students
//       </div>
//       <TableContainer
//         style={{ height: 400, overflow: "auto", backgroundColor:backgroundColor }}
//         component={Paper}
//         className="custom-table-paper"
//       >
//         <DataGrid
//           autoHeight
//           className="data-grid"
//           rows={studentsWithIds}
//           columns={StudentColumns}
//           sx={tableStyles}
//           pagination
//           pageSize={10}
//           rowsPerPageOptions={[5, 10]}
//         />
//       </TableContainer>
//     </div>
//   );
// }

// export default DashboardTable;