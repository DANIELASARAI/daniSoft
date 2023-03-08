// material-ui
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{ position: "absolute", filter: "blur(18px)", zIndex: -1, bottom: 0 }}
    >
      <img src="https://img.freepik.com/premium-vector/circuit-board-motherboard-blue-technology-background_322958-40.jpg"></img>
    </Box>
  );
};

export default AuthBackground;
