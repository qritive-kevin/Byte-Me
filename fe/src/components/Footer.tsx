import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        pt: 4,
        pb: 2,
        borderTop: "1px solid #eee",
      }}
    >
      <Box mb={2}>
        <img src="/logo.png" alt="Golden Logo" style={{ height: 60 }} />
      </Box>

      <Typography fontSize={13} mt={1} color="text.secondary">
        © 2025 Team Byte Me . All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;
