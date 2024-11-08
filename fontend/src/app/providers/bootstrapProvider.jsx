"use client";

import { createContext, useEffect, useState } from "react";

const BootTrapContext = createContext();

const BootstrapProvider = ({ children }) => {
  const [bootstrap, setBootstrap] = useState();

  useEffect(() => {
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    setBootstrap(bootstrap);
  }, []);

  return (
    <BootTrapContext.Provider value={bootstrap}>
      {children}
    </BootTrapContext.Provider>
  );
};

export default BootstrapProvider;
