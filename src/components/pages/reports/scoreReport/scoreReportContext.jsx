import React, { createContext, useState, useContext } from "react";

// hooks
import useScoreData from "./useScoreData";

// Context defined in a separate file as vite fast refresh requires only exported components

export const ScoreReportContext = createContext();

export const ScoreReportProvider = ({ children }) => {
  const [accountOwner, setAccountOwner] = useState(null);

  const { allOwnersData, categoryData, bucketData, error, loading } =
    useScoreData();

  return (
    <ScoreReportContext.Provider
      value={{
        accountOwner,
        setAccountOwner,
        allOwnersData,
        categoryData,
        bucketData,
        error,
        loading,
      }}
    >
      {children}
    </ScoreReportContext.Provider>
  );
};
