'use client'
import { styled } from "@mui/material/styles";
import { AccountBox, SpaceDashboardOutlined ,NoteAltOutlined,Menu } from "@mui/icons-material";

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const drawerWidth = 220;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

export default function Navbar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [open, setOpen] = React.useState(isDesktop);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <nav>
      {isDesktop ? (
        <StyledDrawer width ="220" variant="permanent" anchor="left" open={open} onClose={handleDrawerClose}>
          <List>
            <ListItem style={{display:'flex', justifyContent:'center'}} divider>
              <ListItemIcon><AccountBox sx= {{color:"#6C63FF",fontSize:"3.5rem", margin:"10px 0"}}/></ListItemIcon>   
            </ListItem>
            <ListItemButton href="\tenant" divider>
              <ListItemIcon><NoteAltOutlined sx= {{color:"#6C63FF",fontSize:"3rem"}}/></ListItemIcon>   
              <ListItemText primary="New Case"/>  
            </ListItemButton>
            <ListItemButton href="\tenant\trackcases" divider>
              <ListItemIcon><SpaceDashboardOutlined sx= {{color:"#6C63FF",fontSize:"3rem"}}/></ListItemIcon>   
              <ListItemText primary="Track Cases"/>  
            </ListItemButton>
          </List>
        </StyledDrawer>
      ) : (
        <div>
          <IconButton color="inherit" aria-label="menu" size="large" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
            <List>
              <ListItem style={{display:'flex', justifyContent:'center'}} divider>
                <ListItemIcon><AccountBox sx= {{color:"#6C63FF",fontSize:"3.5rem", margin:"10px 0"}}/></ListItemIcon>   
              </ListItem>
              <ListItemButton href="\tenant" divider>
                <ListItemIcon><NoteAltOutlined sx= {{color:"#6C63FF",fontSize:"3rem"}}/></ListItemIcon>   
                <ListItemText primary="New Case"/>  
              </ListItemButton>
              <ListItemButton href="\tenant\trackcases" divider>
                <ListItemIcon><SpaceDashboardOutlined sx= {{color:"#6C63FF",fontSize:"3rem"}}/></ListItemIcon>   
                <ListItemText primary="Track Cases"/>  
              </ListItemButton>
            </List>
          </Drawer>
        </div>
      )}
    </nav>
  );
}
