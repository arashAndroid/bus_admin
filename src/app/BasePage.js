import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import { Device } from "./pages/DevicePage";
import { Sensors } from "./pages/SensorsPage";
import { SensorCharts } from "./pages/SensorChartsPage";
import { Gateway } from "./pages/GatewayPage";
import { GatewayDetail } from "./pages/GatewayDetailPage";
import { DeviceDetail } from "./pages/DeviceDetailPage";
import { Profile } from "./pages/ProfilePage";
import { Users } from "./pages/UsersPage";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/devices" component={Device} />
        <ContentRoute path="/sensors" component={Sensors} />
        <ContentRoute path="/gateways" component={Gateway} />
        <ContentRoute path="/profile" component={Profile} />
        <ContentRoute path="/users" component={Users} />
        <ContentRoute path="/gateway/:id" component={GatewayDetail} />
        <ContentRoute path="/device/:id" component={DeviceDetail} />
        <ContentRoute path="/sensor/:id/charts" component={SensorCharts} />

        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
