import { createContext } from "react";

// hooks
import useGetBackendData from "../../../../hooks/useGetBackendData";

// Context defined in a separate file as vite fast refresh requires only exported components

export const Section2Context = createContext({
  data: [],
});

export const Section2Provider = ({ children }) => {
  // hook to collect all data for section 1
  const { data, error, loading } = useGetBackendData("/purchases/by-month");

  return (
    <Section2Context.Provider
      value={{
        data,
        error,
        loading,
      }}
    >
      {children}
    </Section2Context.Provider>
  );
};
