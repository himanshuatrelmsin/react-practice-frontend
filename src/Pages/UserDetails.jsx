import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

function UserDetails() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [response, setResponse] = useState([]);

  // Handle change in page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api_user/allUsers`
        );
        setResponse(result.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  // Calculate the rows for the current page
  const paginatedRows = response.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      {response.length ? (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>User name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile no.</TableCell>
                  <TableCell>Date of birth</TableCell>
                  <TableCell>Created date</TableCell>
                  <TableCell>Updated date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row) => (
                  <TableRow key={row.userId}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.number}</TableCell>
                    <TableCell>
                      {new Date(row.dob).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>{row.updatedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={response.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default UserDetails;
