import React, { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import useFetch from "../../hooks/useFetch";
import { CircularProgress, Grid } from "@mui/material";
import { Employee } from "../../types";
import FilterTable from "./filter-table";
interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "code",
    numeric: false,
    disablePadding: true,
    label: "Employee Code",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Employee Name",
  },
  {
    id: "salary",
    numeric: true,
    disablePadding: false,
    label: "Salary",
  },
  {
    id: "salaryStatus",
    numeric: false,
    disablePadding: false,
    label: "Salary Status",
  },
  {
    id: "hire",
    numeric: false,
    disablePadding: false,
    label: "Date of hire",
  },
  {
    id: "jobCode",
    numeric: false,
    disablePadding: false,
    label: "Job Code",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            <TableSortLabel onClick={createSortHandler(headCell.id)}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Employees
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function EmployeeQuery() {
  const { data, isPending } = useFetch("http://localhost:3000/employees");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [filterData, setfilterData] = useState();
  const [filterDataTable, setfilterDataTable] = useState([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && !isPending) {
      const newSelected = data && data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  useEffect(() => {
    !isPending && setfilterDataTable(data);
  }, [isPending]);

  useEffect(() => {
    const filteredResult = data?.filter((item) => {
      return Object.entries(filterData).every(([key, value]) => {
        if (value === "") {
          return true;
        }
        if (key === "salaryStatus") {
          return item[key] === "valid" ? false : true;
        }
        if (key === "salaryValue") {
          return Number(item[key]);
        }
        if (typeof item[key] === "string") {
          return item[key].toLowerCase().includes(value.toLowerCase());
        }
        return item[key] === value; // Filter by other keys
      });
    });
    setfilterDataTable(filteredResult);
  }, [filterData]);

  return (
    <Box
      sx={{
        marginY: "1rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "2rem",
          borderRadius: "10px",
        }}
      >
        <FilterTable setFilterData={setfilterData} />
      </Box>
      <EnhancedTableToolbar numSelected={selected.length} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer>
            <Table
              sx={{ minWidth: 500 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={!isPending && data.length}
              />
              {isPending ? (
                <CircularProgress sx={{ mt: 4 }} />
              ) : (
                <TableBody>
                  {filterDataTable &&
                    filterDataTable.length > 0 &&
                    filterDataTable.map((row: Employee, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="table"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.employeeCode}
                          </TableCell>
                          <TableCell align="left">{row.employeeName}</TableCell>
                          <TableCell align="left">{row.salaryValue}</TableCell>
                          <TableCell align="left">{row.salaryStatus}</TableCell>
                          <TableCell align="left">
                            {new Date(row.hireDate).toISOString()}
                          </TableCell>
                          <TableCell align="left">{row.jobCode}</TableCell>
                        </TableRow>
                      );
                    })}

                  {filterDataTable && filterDataTable.length === 0 && (
                    <TableRow>
                      <TableCell>No results available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
