import { createContext, useContext, useState } from "react";

// Owner context is used mainly to make owner details available through
// the majority of the OwberReport page content

const AccountOwnerContext = createContext();

// Shorthand filter provider component
export const AccountOwnerProvider = ({ children }) => {
  // Here, accountOwner is set by user in AccountOwnerFilter
  const [accountOwner, setAccountOwner] = useState(null);

  // if extracting the context definition, it would generally make sense to use
  // a custom hook if there is anything more than a single state.
  // Would reference it as follows:
  // const accountValues = useAccountInfo(); // Get values and handlers from the custom hook

  return (
    <AccountOwnerContext.Provider value={{ accountOwner, setAccountOwner }}>
      {children}
    </AccountOwnerContext.Provider>
  );
};

// Accessible shorthand custom hook for using the filter context
export const useAccountOwner = () => {
  return useContext(AccountOwnerContext);
};
