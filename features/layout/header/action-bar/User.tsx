import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React, { useState } from "react";
import useAuth from "@/features/auth/useAuth";

import { styled } from "webpmp-themes";

const User = () => {
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{ p: 0 }}
        >
          <Avatar
            sx={{ width: 38, height: 38, backgroundColor: deepPurple[500] }}
          >
            {user?.name[0]}
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 2.5,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ maxHeight: "72px" }} onClick={handleClose}>
          <Box sx={{ display: "flex" }}>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                backgroundColor: deepPurple[500],
                mr: 3,
              }}
            >
              {user?.name[0]}
            </Avatar>
            <Box>
              <Typography component="div" variant="body1">
                {user?.name}
              </Typography>
              <Typography variant="subtitle2">{user?.username}</Typography>
            </Box>
          </Box>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIconStyled>
            <AccountCircleIcon />
          </ListItemIconStyled>
          Account Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIconStyled>
            <Settings />
          </ListItemIconStyled>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIconStyled>
            <Logout />
          </ListItemIconStyled>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "38px !important",
  display: "flex",
  justifyContent: "center",
  marginRight: theme.spacing(2.5),
}));

export default User;
