import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { NormalPaper } from "../../styledComponents/paper";

const IntroSection = () => {
  return (
    <NormalPaper elevation={6} sx={{ padding: "15px" }}>
      <Stack>
        <Typography component="h4" variant="h4" sx={{ padding: "20px 0" }}>
          What is this report about?
        </Typography>
        <Typography
          component="body2"
          variant="body2"
          sx={{ padding: "10px 0", textAlign: "left" }}
        >
          Nft background. At the peak, 1bn sales per day.
          <br />
          <br />
          Attracted a huge number of collectors across multiple blockchains and
          platforms.
          <br />
          <br />
          Many were excited about the art, thankful that digital art was finally
          being recognised.
          <br />
          <br />
          But many commentators talked of fash cash, and the huge opportunity of
          profits from investing in this new art medium.
          <br />
          <br />
          So what was this really? Art enthusiasts drawn in by an exciting new
          medium? Or speculators from all around the world swooping in to take
          their share and disappear.
          <br />
          <br />
          This interactive report aims to provide some insight into just this
          question. If this is interesting to you, you can see the full story on
          this page. If you want to dig a little deeper, there are a number of
          reports on the sidebar - click the icon top left.
        </Typography>
      </Stack>
    </NormalPaper>
  );
};

export default IntroSection;
