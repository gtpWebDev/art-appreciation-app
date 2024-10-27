import React, { createContext, useState, useContext } from "react";

// hooks
import useGetBackendData from "../../../../hooks/useGetBackendData";

// Context defined in a separate file as vite fast refresh requires only exported components

export const Section1Context = createContext({
  data: [],
});

export const Section1Provider = ({ children }) => {
  // hook to collect all data for section 1
  const { data, error, loading } = useGetBackendData("/purchases/by-month");

  return (
    <Section1Context.Provider
      value={{
        data,
        error,
        loading,
      }}
    >
      {children}
    </Section1Context.Provider>
  );
};
