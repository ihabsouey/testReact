import { Box, Toolbar, Typography } from "@mui/material";
import CountryList from "./CountryList";

const Layout = () => {
  return (
    <>
      <Toolbar sx={{ backgroundColor: "primary.main" }}>
        <Typography variant="h6">Countries List</Typography>
      </Toolbar>
      <Box sx={{ flex: 1, padding: 2 }}>
        <CountryList />
      </Box>
    </>
  );
};

export default Layout;
