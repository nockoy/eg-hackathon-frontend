import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Authentication } from "./pages/Authentication";
import { useAuthContext } from "./context/AuthContext";

export const App = () => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return <div>User is logged in</div>;
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
