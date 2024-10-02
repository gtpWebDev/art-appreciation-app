import { useState } from "react";

/**
 * Custom hook to tidy management of nft transaction report filter
 * visibility a little.
 * Nice structure for an object state variable.
 */

const useVisibility = (initialState) => {
  const [visibility, setVisibility] = useState(initialState);

  const updateVisibility = (element, value) => {
    setVisibility((prevState) => ({
      ...prevState,
      [element]: value,
    }));
  };

  return [visibility, updateVisibility];
};

export default useVisibility;
