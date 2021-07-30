import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CustomersPage } from "./customers/CustomersPage";

import { ProductsPage } from "./products/ProductsPage";
import { ProductEdit } from "./products/product-edit/ProductEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";


export default function eCommercePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/crud"
            to="/crud/customers"
          />

        }
        <ContentRoute path="/crud/customers" component={CustomersPage} />
        <ContentRoute path="/crud/products/new" component={ProductEdit} />
        <ContentRoute
          path="/crud/products/:id/edit"
          component={ProductEdit}
        />

        <ContentRoute path="/crud/products" component={ProductsPage} />

      </Switch>
    </Suspense>
  );
}
