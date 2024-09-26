import { Box, Container, Typography, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "footer.background",
        color: "primary.contrastText",
        py: 1,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} px={3} pb={5}>
          <Grid item xs={12} align="center" mt={1}>
            <Typography variant="body2">
              <Link href="#top" color="footer.accent">
                Back to top
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6">My Details</Typography>
            <Typography variant="body2">
              <Link
                href="https://x.com/gtpWebDev"
                color="footer.accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                X / Twitter - gtpWebDev
              </Link>
              <br />
              <Link
                href="https://github.com/gtpWebDev"
                color="footer.accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github - gtpWebDev
              </Link>
              <br />
              gtpwebdev@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">About This Site</Typography>
            <Typography variant="body2">
              Bit of explanation
              <br /> <br />
              Bit more explanation
              <br /> <br />A link to something &nbsp;
              <Link
                href="https://marketplace.dogami.com/"
                color="footer.accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dogami website
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Site Technology</Typography>

            <Typography variant="body2">
              React Javascript library
              <br />
              Material UI styling
              <br />
              Node.js server
              <br />
              MongoDB database
              <br />
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
