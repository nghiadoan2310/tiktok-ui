import { Routes, Route } from "react-router-dom";
import { Fragment, useEffect } from "react"; //wrap những thẻ nhưng không sinh ra thẻ

import { publicRoutes } from "./routes";
import { DefaultLayout } from "~/Layout";
import PortalElements from "~/components/Portal/PortalElements";
import "./i18next"
import { changeTheme } from "./theme";

function App() {
  const match = window.matchMedia('(prefers-color-scheme: dark)')

  useEffect(() => {
    match.addEventListener("change", () => changeTheme("auto"))

    return () => match.removeEventListener("change", changeTheme)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <route.component />
                  <PortalElements></PortalElements>
                </Layout>
              }
            ></Route>
          );
        })}
      </Routes>
  );
}

export default App;
