import App from "./App";
import HomePage from "./components/pages/HomePage/HomePage";
import HeadlineSectionOne from "./components/pages/HeadlineReport/SectionOne/SectionOne";
import HeadlineSectionTwo from "./components/pages/HeadlineReport/SectionTwo/SectionTwo";
import HeadlineSectionThree from "./components/pages/HeadlineReport/SectionThree/SectionThree";
import MethodPage from "./components/pages/MethodPage/MethodPage";
import TechPage from "./components/pages/TechPage/TechPage";
import FxSummaryReport from "./components/pages/reports/FxSummaryReport";
import OverallAAIReport from "./components/pages/reports/OverallAAIReport";
import TimePhasedAAIReport from "./components/pages/reports/TimePhasedAAIReport";
import ScoreReport from "./components/pages/reports/scoreReport/ScoreReport";
import AccountOwnerReport from "./components/pages/reports/accountOwnerReport/AccountOwnerReport";
import NftTransactionReport from "./components/pages/reports/nftTransactionReport/NftTransactionReport";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";

// create the configuration for the router
const routes = [
  {
    // Holds the main page structure - header, sidebar, footer, etc.
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // renders when there are no children - homepage
      { index: true, element: <HomePage /> },

      // Headline report structure
      {
        path: "/headline/sectionOne",
        element: <HeadlineSectionOne />,
      },
      {
        path: "/headline/sectionTwo",
        element: <HeadlineSectionTwo />,
      },
      {
        path: "/headline/sectionThree",
        element: <HeadlineSectionThree />,
      },

      {
        path: "/methodPage",
        element: <MethodPage />,
      },
      {
        path: "/techPage",
        element: <TechPage />,
      },
      // Add in a reports directory?
      {
        path: "/reports/fxSummaryReport",
        element: <FxSummaryReport />,
      },
      {
        path: "/reports/overallAAIReport",
        element: <OverallAAIReport />,
      },
      {
        path: "/reports/timePhasedAAIReport",
        element: <TimePhasedAAIReport />,
      },
      {
        path: "/reports/scoreReport",
        element: <ScoreReport />,
      },
      {
        path: "/reports/accountOwnerReport",
        element: <AccountOwnerReport />,
      },
      {
        path: "/reports/nftTransactionReport",
        element: <NftTransactionReport />,
      },
    ],
  },
];

export default routes;
