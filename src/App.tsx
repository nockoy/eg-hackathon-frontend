import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { useAuthContext } from "./contexts/AuthContext";
import { Authentication } from "./pages/Authentication";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { NewChallenge } from "./pages/NewChallenge";
import { Community } from "./pages/Community";
import { Setting } from "./pages/Setting";
import { ChallengeDetail } from "./pages/ChallengeDetail";
import { Analysis } from "./pages/Analysis";

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
        <Route path="/new-challenge" element={<NewChallenge />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/challenge/:id" element={<ChallengeDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MantineProvider>
  );
};
