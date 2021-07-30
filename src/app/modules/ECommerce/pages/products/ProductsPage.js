import React from "react";
import { Route } from "react-router-dom";
import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
import { ProductDeleteDialog } from "./product-delete-dialog/ProductDeleteDialog";
import { ProductsDeleteDialog } from "./products-delete-dialog/ProductsDeleteDialog";
import { ProductsFetchDialog } from "./products-fetch-dialog/ProductsFetchDialog";
import { ProductsUpdateStatusDialog } from "./products-update-status-dialog/ProductsUpdateStatusDialog";
import { ProductsCard } from "./ProductsCard";
import { ProductsUIProvider } from "./ProductsUIContext";

export function ProductsPage({ history }) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push("/crud/products/new");
    },
    openEditProductPage: (id) => {
      history.push(`/crud/products/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      history.push(`/crud/products/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/crud/products/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      history.push(`/crud/products/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/crud/products/updateStatus");
    },
  };

  return (
    <ProductsUIProvider productsUIEvents={productsUIEvents}>
      <ProductsLoadingDialog />
      <Route path="/crud/products/deleteProducts">
        {({ history, match }) => (
          <ProductsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/crud/products");
            }}
          />
        )}
      </Route>
      <Route path="/crud/products/:id/delete">
        {({ history, match }) => (
          <ProductDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/crud/products");
            }}
          />
        )}
      </Route>
      <Route path="/crud/products/fetch">
        {({ history, match }) => (
          <ProductsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/crud/products");
            }}
          />
        )}
      </Route>
      <Route path="/crud/products/updateStatus">
        {({ history, match }) => (
          <ProductsUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/crud/products");
            }}
          />
        )}
      </Route>
      <ProductsCard />
    </ProductsUIProvider>
  );
}
