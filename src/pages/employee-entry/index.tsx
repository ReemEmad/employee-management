import { useState } from "react";
import {
  Typography,
  Box,
  List,
  Grid,
  DialogActions,
  Button,
} from "@mui/material";
import EntryForm from "../../components/EntryForm";
import { Employee } from "../../types";
import EmployeeListItem from "../../components/ListItem";
import useFetch from "../../hooks/useFetch";
import AppDialog from "../../components/ui/modal";
import { EmployeeListSkeletons } from "../../components/ui/skeletons";
import { Link } from "react-router-dom";

export default function EmployeeEntry() {
  const [open, setOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee>();
  const { data, isPending } = useFetch("http://localhost:3000/employees");

  const handleEmployeeClick = (employee: Employee) => {
    setOpen(true);
    setCurrentEmployee(employee);
  };

  const generateMaxEmployeeCode = () => {
    if (data || !isPending) {
      return Number(data![data!.length - 1].id) + 1;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "2rem",
            borderRadius: "10px",
            marginY: "1rem",
          }}
        >
          <EntryForm maxCode={generateMaxEmployeeCode()} />
        </Box>
        <Grid container spacing={2}>
          {isPending && <EmployeeListSkeletons />}
          {data &&
            data.map((employee: Employee) => (
              <Grid item xs={3}>
                <span
                  onClick={() => handleEmployeeClick(employee)}
                  key={employee.employeeCode}
                >
                  <EmployeeListItem {...employee} />
                </span>
              </Grid>
            ))}
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>

      <AppDialog title="Employee" open={open} onClose={handleClose}>
        <Typography variant="body1">
          Name: {currentEmployee?.employeeName}
        </Typography>
        <Typography variant="body1">
          Code: {currentEmployee?.employeeCode}
        </Typography>
        <DialogActions>
          <Link to={`/employee-entry/edit/${currentEmployee?.id}`}>
            <Button>Edit</Button>
          </Link>
        </DialogActions>
      </AppDialog>
    </>
  );
}
