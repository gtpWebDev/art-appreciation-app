import { Link } from "react-router-dom";

import React, { useState, useEffect, useRef, Suspense } from "react";

import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { NormalPaper, ReversePaper } from "../../styledComponents/paper";

// Lazy loaded sections
const IntroSection = React.lazy(() => import("./IntroSection"));
const FxhashStatsSection = React.lazy(() => import("./FxhashStatsSection"));

// Helper to create an observer and lazy-load sections when visible
const useIntersectionObserver = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback(); // Trigger the visibility change
        observer.disconnect(); // Stop observing once the section is visible
      }
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback]);

  return ref;
};

function Home() {
  const [introSectionVisible, setIntroSectionVisible] = useState(false);
  const [fxhashStatsSectionVisible, setFxhashStatsSectionVisible] =
    useState(false);

  const introSectionRef = useIntersectionObserver(() =>
    setIntroSectionVisible(true)
  );
  const fxhashStatsSectionRef = useIntersectionObserver(() =>
    setFxhashStatsSectionVisible(true)
  );

  return (
    <>
      {/* Decide whether to keep grid logic here or inside components. Depends on complexity. */}
      <Grid container spacing={2} align="center">
        <ReportHeader />

        <Grid size={{ xs: 12, md: 12 }} ref={introSectionRef}>
          {introSectionVisible && <IntroSection />}
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <NftMarketChartSection />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <FxhashIntroSection />
        </Grid>
        <Suspense fallback={<Grid>Fallback Intro Section</Grid>}>
          <Grid size={{ xs: 12, md: 12 }} ref={fxhashStatsSectionRef}>
            {fxhashStatsSectionVisible && <FxhashStatsSection />}
          </Grid>
        </Suspense>
      </Grid>
    </>
  );
}

const ReportHeader = () => {
  return (
    <Grid size={{ xs: 12 }}>
      <ReversePaper elevation={6}>
        <Typography
          component="h3"
          variant="h3"
          color="primary.contrastText"
          sx={{ padding: "20px 0" }}
        >
          NFTs. Incredible art, or fast cash?
        </Typography>
      </ReversePaper>
    </Grid>
  );
};

const NftMarketChartSection = () => {
  return (
    <NormalPaper elevation={6} sx={{ padding: "15px" }}>
      <Stack>
        <Typography component="h4" variant="h4" sx={{ padding: "20px 0" }}>
          Nft market chart
        </Typography>
        <Typography
          component="body2"
          variant="body2"
          sx={{ padding: "10px 0", textAlign: "left" }}
        >
          Chart here
        </Typography>
      </Stack>
    </NormalPaper>
  );
};

const FxhashIntroSection = () => {
  return (
    <NormalPaper elevation={6} sx={{ padding: "15px" }}>
      <Stack>
        <Typography component="h4" variant="h4" sx={{ padding: "20px 0" }}>
          Fxhash Intro
        </Typography>
        <Typography
          component="body2"
          variant="body2"
          sx={{ padding: "10px 0", textAlign: "left" }}
        >
          Fxhash is a generative art platform located on theTezos blockchain. It
          remains the second largest such platform in the NFT world. It was
          launched in November 2021, and attracted a great deal of interest.
          Descriptions would differ, from a hotbed of new and upcoming
          generative artists; cheap, etc. But it certainly proved to be a hotbed
          of new and upcoming artists. Many of today's established artists such
          as William Mapan, Iskra Velitchkova, Zancan, Jeres shared their ar ton
          this platform the very early days.
          <br />
          <br />
          Although the largest generative art platform was Artblocks on the
          Ethereum blockchain, the second largest was Fxhash, located on the
          Tezos blockchain.
          <br />
          <br />
          <Typography color="secondary">
            Perhaps insert a small chart showing scale of NFTs / Eth gen art /
            Tezos gen art.
          </Typography>
          <br />
          So Fxhash was small right? Well against the backdrop of the huge
          interest in NFTs, yes, but there was still a lot going on, and a lot
          of money flowing around.
        </Typography>
      </Stack>
    </NormalPaper>
  );
};

const SavedStructure = () => {
  return (
    <></>
    // <div>
    //   <h3>Home Page</h3>
    //   <h4>Headline report with links</h4>
    //   <hr style={{ border: "none", height: "2px", backgroundColor: "green" }} />
    //   <p>
    //     Fxhash launched few years ago, had lots of sales, and accounts, etc.
    //   </p>
    //   <p>
    //     <Link to="reports/fxSummaryReport">High level numbers on fxhash</Link>
    //   </p>
    //   <hr style={{ border: "none", height: "2px", backgroundColor: "green" }} />

    //   <p>Some people bought because they love art, others to speculate</p>
    //   <p>
    //     <Link to="reports/overallAAIReport">
    //       here is overall how all the accounts broke down
    //     </Link>
    //   </p>
    //   <p>
    //     <Link to="reports/timePhasedAAIReport">
    //       here is how it differed over time
    //     </Link>
    //   </p>
    //   <p>
    //     <Link to="reports/rankedAAIReport">
    //       want to see the top appreciators and speculators?
    //     </Link>
    //   </p>
    //   <hr style={{ border: "none", height: "2px", backgroundColor: "green" }} />

    //   <p>There are some nice detailed reports</p>
    //   <p>
    //     <Link to="reports/accountAAIReport">look at any account you like</Link>
    //   </p>
    //   <p>
    //     <Link to="reports/accountAAIReport">
    //       look at any artist you like (not linked)
    //     </Link>
    //   </p>
    //   <p>
    //     <Link to="reports/accountAAIReport">
    //       look at any collection you like (not linked)
    //     </Link>
    //   </p>
    //   <p>
    //     <Link to="reports/nftTransactionReport">look at any NFT you like</Link>
    //   </p>
    //   <p>
    //     <Link to="reports/overallAAIReport">
    //       check out the full record for any NFT
    //     </Link>
    //   </p>

    //   <hr style={{ border: "none", height: "2px", backgroundColor: "green" }} />

    //   <p>
    //     <Link to="methodPage">Method page here</Link>
    //   </p>
    //   <p>
    //     <Link to="techPage">Tech page here</Link>
    //   </p>
    // </div>
  );
};

export default Home;
