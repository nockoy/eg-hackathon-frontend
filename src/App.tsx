import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Authentication } from "./pages/Authentication";
import { useAuthContext } from "./contexts/AuthContext";
import React from "react";

export const App = () => {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/authentication");
    }
  }, [loading, user, navigate]);

  // TODO: いらんかも
  if (loading) {
    return null;
  }

  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MantineProvider>
  );
};
