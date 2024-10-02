import { useState } from "react";

/**
 * Custom hook to tidy management of nft transaction report filter
 * visibility a little.
 * Nice structure for an object state variable.
 */

const useNftDisplayData = (initialState) => {
  const [nftDisplayData, setNftDisplayData] = useState(initialState);

  const updateNftDisplayData = (element, value) => {
    setNftDisplayData((prevState) => ({
      ...prevState,
      [element]: value,
    }));
  };

  return { nftDisplayData, updateNftDisplayData };
};

export default useNftDisplayData;
