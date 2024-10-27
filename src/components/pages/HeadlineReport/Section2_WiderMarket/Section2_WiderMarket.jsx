import { useContext } from "react";

// material UI
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

// subcomponents
import ScrollTriggeredSection from "../ScrollTriggeredSection";

// hooks
import { Section2Provider, Section2Context } from "./section2Context";

const Section2_WiderMarket = () => {
  return (
    <Section2Provider>
      <Section2_WiderMarket_Content />
    </Section2Provider>
  );
};

const Section2_WiderMarket_Content = () => {
  // hook to collect all data for section 1
  const { data } = useContext(Section2Context);

  return (
    <>
      {/* First sections with no data dependency */}
      <ScrollTriggeredSection backgroundImage="https://gateway.fxhash2.xyz/ipfs/QmT1v9o5KqKrchxQxDFnvGJeH39fY9JiNLsx3GXzJoA54e">
        <Section2_Page1 />
      </ScrollTriggeredSection>
      {/* Sections with dependency on data */}
      {data ? (
        <ScrollTriggeredSection backgroundImage="https://gateway.fxhash2.xyz/ipfs/QmaMyYaCuwK2UdNYMASuynRtGzCD4tdnHmMSNSr83cronZ">
          <Section2_Page2 />
        </ScrollTriggeredSection>
      ) : (
        <></>
      )}
    </>
  );
};

const Section2_Page1 = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.5)", // White with 50% transparency
        padding: 2,
      }}
    >
      <Grid container>
        <Grid size={12}>
          <Typography variant="h4" pt={2}>
            Generative art - an exciting new art genre, or the latest crypto
            profit making fad?
          </Typography>
        </Grid>

        <Grid
          container
          size={12}
          rowSpacing={{ xs: 1, md: 2 }}
          columnSpacing={0}
        >
          <Grid size={12} align="left" p={2}>
            <Typography variant="body1">
              The crypto world exploded in 2021. Tens of billions of dollars
              were invested in NFTs - initially collectibles such as cryptopunks
              and bored apes.
            </Typography>
            <Typography variant="body1">
              Generative art in particular popularised in 2021, with platforms
              such as Artblocks and new artists such as Tyler Hoobs creating
              exciting new collections such as blah and blah.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Section2_Page2 = () => {
  const { data } = useContext(Section2Context);

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.5)", // White with 50% transparency
        padding: 2,
      }}
    >
      <Grid container>
        <Grid size={12}>
          <Typography variant="h4" pt={2}>
            Did the data collection work?
          </Typography>
        </Grid>

        <Grid
          container
          size={12}
          rowSpacing={{ xs: 1, md: 2 }}
          columnSpacing={0}
        >
          <Grid size={12} align="left" p={2}>
            <Typography variant="body1">
              Collected transaction type: {data[0].transaction_type}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

{
  /* <CompositeLinkPrimaryUnderline linkLoc="/methodPage"></CompositeLinkPrimaryUnderline> */
}

export default Section2_WiderMarket;
