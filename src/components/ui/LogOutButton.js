import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { DefaultValue, useRecoilState } from 'recoil';
import { useState } from 'react';
import { userState } from '../../state/user';
import { TEXT } from '../../text/Text';
import MenuIcon from '@material-ui/icons/Menu';

export default function BotonCerrarSesion() {
  const [user, setUser] = useRecoilState(userState);
  const [showOptions, setShowOptions] = useState(null);
  const open = Boolean(showOptions);

  const handleMenu = (event) => {
    setShowOptions(event.currentTarget);
  };

  const handleClose = () => {
    setShowOptions(null);
  };

  const cerrarSesion = () => {
    setUser(new DefaultValue());
    handleClose();
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={showOptions}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={cerrarSesion}>{TEXT.logOut}</MenuItem>
      </Menu>
    </Box>
  );
}
