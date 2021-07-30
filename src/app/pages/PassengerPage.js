import React from "react";
// import Passengers from "../modules/Account/pages/raw_files/Passengers";
import { PassengersUIProvider } from "../modules/BasicInformation/Countries/passengers/PassengersUIContext";
import { PassengersLoadingDialog } from "../modules/BasicInformation/Countries/passengers/passengers-loading-dialog/PassengersLoadingDialog";
import { Route } from "react-router-dom";
import { PassengerEditDialog } from "../modules/BasicInformation/Countries/passengers/passenger-edit-dialog/PassengerEditDialog";
// import { PassengersCard } from "../modules/BasicInformation/passengers/PassengersCard";
import { PassengersFetchDialog } from "../modules/BasicInformation/Countries/passengers/passengers-fetch-dialog/PassengersFetchDialog";
import { PassengersUpdateStateDialog } from "../modules/BasicInformation/Countries/passengers/passengers-update-status-dialog/CustomersUpdateStateDialog";
import { PassengerDeleteDialog } from "../modules/BasicInformation/Countries/passengers/passenger-delete-dialog/PassengerDeleteDialog";
import { PassengersDeleteDialog } from "../modules/BasicInformation/Countries/passengers/passengers-delete-dialog/PassengerDeleteDialog";
import { PassengersCard } from "../modules/BasicInformation/Countries/passengers/PassengersCard";

export function PassengerPage({ history }) {
    const passengersUIEvents = {
        newPassengerButtonClick: () => {
            history.push("/crud/countries/new");
        },
        openEditPassengerDialog: (id) => {
            history.push(`/crud/countries/${id}/edit`);
        },
        openDeletePassengerDialog: (id) => {
            history.push(`/crud/countries/${id}/delete`);
        },
        openDeletePassengersDialog: () => {
            history.push(`/crud/countries/deletePassengers`);
        },
        openFetchPassengersDialog: () => {
            history.push(`/account/countries/fetch`);
        },
        openUpdatePassengersStatusDialog: () => {
            history.push("/crud/countries/updateStatus");
        }
    }
    return (
        <PassengersUIProvider passengersUIEvents={passengersUIEvents}>
            <PassengersLoadingDialog />
            <Route path="/crud/countries/new">
                {({ history, match }) => (
                    <PassengerEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/account/countries");
                        }}
                    />
                )}
            </Route>
            <Route path="/crud/countries/:id/edit">
                {({ history, match }) => {
                    return <PassengerEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/countries");
                        }}
                    />
                }}
            </Route>
            <Route path="/crud/countries/deletePassengers">
                {({ history, match }) => (
                    <PassengersDeleteDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/countries");
                        }}
                    />
                )}
            </Route>
            <Route path="/crud/countries/:id/delete">
                {({ history, match }) => (
                    <PassengerDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/countries");
                        }}
                    />
                )}
            </Route>

            <Route path="/crud/countries/fetch">
                {({ history, match }) => (
                    <PassengersFetchDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/countries");
                        }}
                    />
                )}
            </Route>
            <Route path="/crud/countries/updateStatus">
                {({ history, match }) => (
                    <PassengersUpdateStateDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/crud/countries");
                        }}
                    />
                )}
            </Route>
            <PassengersCard />
        </PassengersUIProvider>
    );
    // return <Passengers />;
}
