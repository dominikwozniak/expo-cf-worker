import React from "react";

import { AlertContext, useProvideAlert } from "~/shared-hooks/useAlert";

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const alert = useProvideAlert();
  return (
    <AlertContext.Provider value={alert}>{children}</AlertContext.Provider>
  );
};
