import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Employee } from "../../types";
import useDeleteEmployee from "../../hooks/useDelete";

function EmployeeListItem(props: Employee) {
  const [loading, setLoading] = useState(false);
  const { employeeName, employeeCode, id } = props;
  const { deleteEmployee } = useDeleteEmployee(
    "http://localhost:3000/employees/"
  );
  // const handleClick = () => {
  //   onEmployeeClick(code);
  // };

  const handleDelete = async (
    e: React.MouseEvent<SVGSVGElement, globalThis.MouseEvent>
  ) => {
    setLoading(true);
    e.stopPropagation();
    await deleteEmployee(id);
    setLoading(false);
  };

  return (
    <Box sx={{ border: "1px solid #dcdcdc", borderRadius: "5px" }}>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton
            edge="start"
            aria-label="delete"
            color="error"
            disabled={loading}
            onClick={(e) => handleDelete(e)}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar alt={employeeName} src={`/static/images/avatar/1.jpg`} />
        </ListItemAvatar>
        <ListItemText
          primary={employeeName}
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {`Code: ${employeeCode}`}
            </Typography>
          }
        />
      </ListItem>
    </Box>
  );
}

export default EmployeeListItem;
