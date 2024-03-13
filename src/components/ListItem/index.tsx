import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';

interface EmployeeListItemProps {
  name: string;
  code: string;
  onEmployeeClick: (code: string) => void; // Callback function type
}

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({ name, code, onEmployeeClick }) => {
    const handleClick = () => {
        onEmployeeClick(code); // Call the callback function with the employee code
      };
  return (
    <ListItem alignItems="flex-start" onClick={handleClick}>
      <ListItemAvatar>
        <Avatar alt={name} src={`/static/images/avatar/1.jpg`} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {`Code: ${code}`}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default EmployeeListItem;
