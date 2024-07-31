import { Routes, Route } from "react-router-dom";
import { Fragment } from "react"; //wrap những thẻ nhưng không sinh ra thẻ

import { publicRoutes } from "./routes";
import { DefaultLayout } from "~/Layout";
import PortalElements from "~/components/Portal/PortalElements";

function App() {
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
