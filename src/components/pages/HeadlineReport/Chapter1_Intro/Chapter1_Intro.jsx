import { useEffect, useContext } from "react";

// material UI
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

// subcomponents
import ScrollTriggeredSection from "../ScrollTriggeredSection";

// hooks
import useHeadlineReportChapterData from "../useHeadlineReportChapterData";

// context
import HeadlineReportCacheContext from "../HeadlineReportCacheContext";

/**
 * Chapters are added to and removed from the DOM based on whether they are close
 * to the viewport.
 * They therefore use a custom hook to either collect data from the API, or from the
 * report context if it has already been collected when it was previously on the
 * viewport.
 */

const Chapter1_Intro = ({ name, chapterEndpoint }) => {
  // get chapter data from API, or from report context if already collected
  const { data, loading, error } =
    useHeadlineReportChapterData(chapterEndpoint);

  useEffect(() => {
    console.log(`Useeffect triggered - Rendering ${name}`);
  }, []);

  return (
    <>
      <ScrollTriggeredSection backgroundImage="https://gateway.fxhash2.xyz/ipfs/QmT1v9o5KqKrchxQxDFnvGJeH39fY9JiNLsx3GXzJoA54e">
        <Chapter1_Intro_Section1 />
      </ScrollTriggeredSection>
      <ScrollTriggeredSection backgroundImage="https://gateway.fxhash2.xyz/ipfs/QmaMyYaCuwK2UdNYMASuynRtGzCD4tdnHmMSNSr83cronZ">
        <Chapter1_Intro_Section2 />
      </ScrollTriggeredSection>
    </>
  );
};

const Chapter1_Intro_Section1 = () => {
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

const Chapter1_Intro_Section2 = () => {
  const { getCacheData } = useContext(HeadlineReportCacheContext);

  // const data = cache["/purchases/by-month"];

  const data = getCacheData("/purchases/by-month");

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
              Collected transaction type:
              {data ? data[0].transaction_type : "not got yet"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Chapter1_Intro;
