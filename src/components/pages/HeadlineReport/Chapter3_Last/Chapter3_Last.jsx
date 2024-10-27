import { useEffect } from "react";

// subcomponents
import ScrollTriggeredSection from "../ScrollTriggeredSection";

// hooks
import useHeadlineReportChapterData from "../useHeadlineReportChapterData";

const Chapter3_Last = ({ name, chapterEndpoint }) => {
  // get chapter data from API, or from report context if already collected
  const { data, loading, error } =
    useHeadlineReportChapterData(chapterEndpoint);

  useEffect(() => {
    console.log(`Useeffect triggered - Rendering ${name}`);
  }, []);

  return (
    <>
      <ScrollTriggeredSection backgroundImage="https://gateway.fxhash2.xyz/ipfs/QmT1v9o5KqKrchxQxDFnvGJeH39fY9JiNLsx3GXzJoA54e">
        <div>This is chapter 3, a lazy loaded component!</div>;
      </ScrollTriggeredSection>
      <ScrollTriggeredSection backgroundImage="https://gateway.fxhash2.xyz/ipfs/QmaMyYaCuwK2UdNYMASuynRtGzCD4tdnHmMSNSr83cronZ">
        <div>This is chapter 3, a lazy loaded component!</div>;
      </ScrollTriggeredSection>
    </>
  );
};

export default Chapter3_Last;
