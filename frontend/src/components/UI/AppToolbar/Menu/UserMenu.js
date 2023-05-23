import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {logoutRequest} from "../../../../store/actions/usersActions";
import {Avatar} from "@mui/material";
import {Link} from "react-router-dom";

const UserMenu = ({user}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {
          user.avatar &&
            <Avatar
              alt={user.displayName}
              src={user.avatar}
              sx={{ width: 30, height: 30, marginRight: "10px" }}
            />
        }
        {user.displayName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/cocktail/new">Add cocktail</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/view/cocktails">View My Cocktails</MenuItem>
        <MenuItem onClick={() => dispatch(logoutRequest())}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
