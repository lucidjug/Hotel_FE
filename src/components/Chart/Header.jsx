import { Typography, Box, useTheme } from "@mui/material";
// import { tokens } from "../../../../New folder/react-admin-dashboard/src/theme";

const Header = ({ title, subtitle }) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
    return (
      <Box mb="30px">
        <Typography
          variant="h4"
          color="#141414"
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h7" color="#3da58a">
          {subtitle}
        </Typography>
      </Box>
    );
  };

  export default Header;
