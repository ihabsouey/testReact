import { Box, Toolbar, Typography } from "@mui/material";
import CountryList from "./CountryList";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "90vw" }}>
      <Toolbar sx={{ backgroundColor: "primary.main" }}>
        <Typography variant="h6">Country List</Typography>
      </Toolbar>
      <Box sx={{ flex: 1, padding: 2 }}>
        <CountryList />
      </Box>
    </Box>
  );
};

export default Layout;
