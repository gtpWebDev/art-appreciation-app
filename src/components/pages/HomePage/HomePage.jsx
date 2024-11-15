import { CompositeLinkPrimaryUnderline } from "../../styledComponents/links";

import { LinkedSidebarListItem } from "../../styledComponents/listItem";

const HomePage = () => {
  return (
    <>
      <LinkedSidebarListItem linkLoc="/headline/sectionOne">
        Headline Report
      </LinkedSidebarListItem>
      <LinkedSidebarListItem linkLoc="/methodPage">
        Method Page
      </LinkedSidebarListItem>
      <LinkedSidebarListItem linkLoc="/techPage">
        About Page
      </LinkedSidebarListItem>
    </>
  );
};

export default HomePage;
