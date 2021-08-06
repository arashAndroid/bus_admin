

import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import citiesTable from "./modules/BasicInformation/cities/citiesTable";
import driversTable from "./modules/BasicInformation/drivers/driversTable";
import busTypesTable from "./modules/BasicInformation/busTypes/busTypesTable";
import busesTable from "./modules/BasicInformation/buses/busesTable";
import provincesTable from "./modules/BasicInformation/provinces/provincesTable";
import townshipsTable from "./modules/BasicInformation/townships/townshipsTable";
import carBrandsTable from "./modules/BasicInformation/carBrands/carBrandsTable";
import carTypesTable from "./modules/BasicInformation/carTypes/carTypesTable";
import carsTable from "./modules/BasicInformation/cars/carsTable";
import servantsTable from "./modules/BasicInformation/servants/servantsTable";
import stationsTable from "./modules/BasicInformation/stations/stationsTable";
import directionsTable from "./modules/BasicInformation/directions/directionsTable";
import travelsTable from "./modules/Travels/travelsTable";
import detailsTable from "./modules/BasicInformation/details/detailsTable";
import { Logout, AuthPage } from "./modules/Auth";


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
        <ContentRoute path="/logout" component={Logout} />
        <ContentRoute path="/cities" component={citiesTable} />
        <ContentRoute path="/drivers" component={driversTable} />
        <ContentRoute path="/busTypes" component={busTypesTable} />
        <ContentRoute path="/buses" component={busesTable} />
        <ContentRoute path="/provinces" component={provincesTable} />
        <ContentRoute path="/townships" component={townshipsTable} />
        <ContentRoute path="/car_brands" component={carBrandsTable} />
        <ContentRoute path="/car_types" component={carTypesTable} />
        <ContentRoute path="/cars" component={carsTable} />
        <ContentRoute path="/servants" component={servantsTable} />
        <ContentRoute path="/stations" component={stationsTable} />
        <ContentRoute path="/directions" component={directionsTable} />
        <ContentRoute path="/travels" component={travelsTable} />
        <ContentRoute path="/details/:id" component={detailsTable} />

        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}


// import React, { Suspense, lazy } from "react";
// import { Redirect, Switch, Route } from "react-router-dom";
// import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
// import { BuilderPage } from "./pages/BuilderPage";
// import { MyPage } from "./pages/MyPage";
// import { DashboardPage } from "./pages/DashboardPage";
// import { shallowEqual, useSelector } from "react-redux";
// import CountriesTable from "./modules/BasicInformation/countries/countriesTable";
// import provincesTable from "./modules/BasicInformation/provinces/provincesTable";
// import townshipsTable from "./modules/BasicInformation/townships/townshipsTable";
// import carBrandsTable from "./modules/BasicInformation/carBrands/carBrandsTable";
// import carTypesTable from "./modules/BasicInformation/carTypes/carTypesTable";
// import carsTable from "./modules/BasicInformation/cars/carsTable";
// import driversTable from "./modules/BasicInformation/drivers/driversTable";
// import servantsTable from "./modules/BasicInformation/servants/servantsTable";
// import stationsTable from "./modules/BasicInformation/stations/stationsTable";
// import directionsTable from "./modules/BasicInformation/directions/directionsTable";
// import travelsTable from "./modules/Travels/travelsTable";
// import detailsTable from "./modules/BasicInformation/directions/detailsTable";

// const GoogleMaterialPage = lazy(() => import('./modules/GoogleMaterialExamples/GoogleMaterialPage'));
// const ReactBootstrapPage = lazy(() => import('./modules/ReactBootstrapExamples/ReactBootstrapPage'));
// const ECommercePage = lazy(() => import('./modules/ECommerce/pages/eCommercePage'));

// export default function BasePage() {

//   const { isAuthorized } = useSelector(
//     ({ auth }) => ({
//       isAuthorized: auth.user != null,
//     }),
//     shallowEqual
//   );

//   return (
//     <Suspense fallback={<LayoutSplashScreen />}>
//       <Switch>



//         {isAuthorized ?
//           <>
//             <Redirect exact from="/" to="/dashboard" />


            // <ContentRoute path="/dashboard" component={DashboardPage} />

            // <ContentRoute path="/countries" component={CountriesTable} />
            // <ContentRoute path="/provinces" component={provincesTable} />
            // <ContentRoute path="/townships" component={townshipsTable} />
            // <ContentRoute path="/car_brands" component={carBrandsTable} />
            // <ContentRoute path="/car_types" component={carTypesTable} />
            // <ContentRoute path="/cars" component={carsTable} />
            // <ContentRoute path="/drivers" component={driversTable} />
            // <ContentRoute path="/servants" component={servantsTable} />
            // <ContentRoute path="/stations" component={stationsTable} />
            // <ContentRoute path="/directions" component={directionsTable} />
            // <ContentRoute path="/directions/:id" component={detailsTable} />

            // <ContentRoute path="/travels" component={travelsTable} />

            // <ContentRoute path="/builder" component={BuilderPage} />
            // <ContentRoute path="/my-page" component={MyPage} />


//           </>
//           :
//           <Redirect to="auth/login" />
//         }

//         <Redirect to="error/error-v1" />
//       </Switch>
//     </Suspense>
//   );
// }
