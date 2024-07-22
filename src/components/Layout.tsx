import React, { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import CountryList from "./CountryList";
import Drawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import Overview from "./Overview";
import useApi from "../hooks/useApi";

export interface CountryData {
  flags: { png: string };
  name: { common: string };
  capital: string[];
  population: number;
}

const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [screen, setScreen] = useState("overview");

  const { data, error } = useApi<CountryData[]>(
    "https://restcountries.com/v3.1/all"
  );

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Countries
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#5997DE",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Overview", "Countries List"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() =>
                  setScreen(text === "Overview" ? "overview" : "countries")
                }
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <HomeIcon /> : <ListIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {screen === "overview" && <Overview data={data} error={error} />}
        {screen === "countries" && <CountryList data={data} error={error} />}
      </Box>
    </>
  );
}
