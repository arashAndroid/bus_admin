import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { Modal } from "react-bootstrap";
import * as columnFormatters from "./formatters";
import { DatePicker } from "jalali-react-datepicker";
import { DropzoneArea } from "material-ui-dropzone";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, sortCaret } from "../../../../_metronic/_helpers";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as servants from "./_redux/servantsRedux";
import {
  getAllServants,
  getTownships,
  addServants,
  editServants,
  deleteServants,
} from "./_redux/servantsCrud";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import moment from "moment-jalaali";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../_metronic/_partials/controls";

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  title: Yup.string().required("?????? ???????? ???????????????? ???????? ????????"),
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ServantsTable(props) {
  console.log("props", props);

  let { state } = useSelector(
    (state) => ({
      state: state.servants,
    }),
    shallowEqual
  );
  const { user } = useSelector((state) => state.auth);
  const [birthDate, setBirthDate] = useState("");
  const [licenceExpire, setLicenceExpire] = useState("");
  // const [smartExpire, setSmartExpire] = useState('');

  console.log("servants", state);

  if (!state.isServantsLoaded) {
    getAllServants().then((res) => {
      props.getAllServants(res.data.Data);
      getTownships().then((res) => {
        props.getTownships(res.data.Data);
      });
    });
  }
  const { SearchBar, ClearSearchButton } = Search;

  const columns = [
    {
      dataField: "Id",
      text: "??????????",
      sort: true,
      sortCaret: sortCaret,
      // filter: textFilter()
    },
    {
      dataField: "FirstName",
      text: "??????",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },

    {
      dataField: "LastName",
      text: "?????? ????????????????",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },
    {
      dataField: "NationalCode",
      text: "???? ??????",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },

    {
      dataField: "IsActive",
      text: "??????????",
      sort: true,
      // filter: textFilter()
      formatter: columnFormatters.StatusFormatter,
      sortCaret: sortCaret,
    },
    // {
    //     dataField: 'image_url',
    //     text: '??????????',
    //     sort: true,
    //     // filter: textFilter()
    //     formatter:columnFormatters.avatarFormatter,
    //     sortCaret: sortCaret,

    // },

    {
      dataField: "action",
      text: "????????????",
      sort: false,
      sortCaret: sortCaret,

      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <OverlayTrigger
              overlay={
                <Tooltip id="products-edit-tooltip">???????????? ????????</Tooltip>
              }
            >
              <a
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => {
                  setEditOpen(true);
                  setEditMode(true);
                  setBirthDate(row.BirthDate);
                  setLicenceExpire(row.HealthLicenceExpireDate);
                  setCurrent(row);
                }}
              >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Write.svg"
                    )}
                  />
                </span>
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={<Tooltip id="products-delete-tooltip">?????? ????????</Tooltip>}
            >
              <a
                className="btn btn-icon btn-light btn-hover-danger btn-sm"
                onClick={() => {
                  setOpen(true);
                  setCurrent(row);
                }}
              >
                <span className="svg-icon svg-icon-md svg-icon-danger">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
                  />
                </span>
              </a>
            </OverlayTrigger>
          </>
        );
      },
      sort: true,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  const [current, setCurrent] = React.useState({});

  const handleClickOpen = () => {
    setCurrent({});
    setEditMode(false);
    setEditOpen(true);
  };
  const convertToJalali = (date) => {
    console.log("date convertToJalali::::", date);
    if (date) {
      console.log("(date).substr(0, 10) = ", date.substr(0, 10));
      return moment(date.substr(0, 10)).format("jYYYY-jMM-jDD");
    }
    return new Date();
  };
  const onDropHandler = (files) => {
    let file = files[0];
    let self = this;
    if (file !== undefined) {
      const reader = new FileReader();
      // reader.onload = (event) => {
      // 	self.props.onValueChange(event.target.result, 'profile_image_base64');
      // };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setCurrent({});
    setEditOpen(false);
    setEditMode(false);
  };
  const removeServant = (id) => {
    deleteServants(id).then((res) => {
      getAllServants().then((res) => {
        props.getAllServants(res.data.Data);
      });
    });
    setOpen(false);
  };

  const licenceDate = (event) => {
    var val = event.value._i;
    var date = val.substr(0, val.length - 3);
    setLicenceExpire(date);
    console.log("val", date);
  };

  const brDate = (event) => {
    var val = event.value._i;
    var date = val.substr(0, val.length - 3);
    setBirthDate(date);
  };

  return (
    <>
      <Card>
        <CardHeader title="???????? ???????? ????">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClickOpen}
            >
              ???????? ????????
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          {/* <ProductsFilter /> */}
          {/* {productsUIProps.ids.length > 0 && (
          <>
            <ProductsGrouping />
          </>
        )} */}
          {/* <ProductsTable /> */}

          <ToolkitProvider
            keyField="Id"
            data={state.servants.servants ?? []}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                {/* <h3>Input something at below input field:</h3> */}
                <SearchBar
                  {...props.searchProps}
                  placeholder="?????????? ???? ?????????? ???????? ????"
                />

                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  bordered={false}
                  bootstrap4
                  // filter={filterFactory()}
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        </CardBody>
      </Card>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"?????? ?????????? ?????? ?????? ?????? ???????? ???? ?????????? ??"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>????????????</Button>
          <Button
            onClick={() => removeServant(current.Id)}
            className="btn btn-danger"
            color="danger"
          >
            ??????
          </Button>
        </DialogActions>
      </Dialog>

      <Formik
        enableReinitialize={true}
        initialValues={current}
        // validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          values.HealthLicenceExpireDate = licenceExpire;
          values.BirthDate = birthDate;

          if (!editMode) {
            addServants(values).then((res) => {
              getAllServants().then((res) => {
                props.getAllServants(res.data.Data);
              });
            });
            setEditOpen(false);
            setCurrent({});
          } else if (editMode) {
            editServants(values).then((res) => {
              getAllServants().then((res) => {
                props.getAllServants(res.data.Data);
              });
            });
            setEditOpen(false);
            setCurrent({});
          }
        }}
      >
        {({ handleSubmit }) => (
          <>
            {/* {actionsLoading && (
                                    <div className="overlay-layer bg-transparent">
                                        <div className="spinner spinner-lg spinner-success" />
                                    </div>
                                )} */}
            {/* <Modal
                            show={editOpen}
                            onHide={handleEditClose}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"

                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title">
                                    {
                                        editMode ?
                                            '???????????? ????????'
                                            :
                                            '???????????? ????????'
                                    }
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-4">
                                            <Field
                                                name="title"
                                                component={Input}
                                                placeholder="??????????"
                                                label="??????????"
                                            />
                                        </div>
                                    </div>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => handleEditClose()}>
                                    ????????????
                             </Button>
                                <Button className="btn btn-primary" variant="primary" onClick={() => handleSubmit()}>
                                    ??????
                                  </Button>
                            </Modal.Footer>
                        </Modal> */}

            <Dialog
              open={editOpen}
              onClose={handleEditClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
              maxWidth="xl"
            >
              <DialogTitle id="alert-dialog-title">
                {" "}
                {editMode ? "???????????? ????????" : "???????????? ????????"}
              </DialogTitle>
              <DialogContent>
                <Form className="form form-label-right">
                  <div className="form-group row">
                    <div className="col-lg-3">
                      <Field
                        name="FirstName"
                        component={Input}
                        placeholder="??????"
                        label="??????"
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="LastName"
                        component={Input}
                        placeholder="?????? ????????????????"
                        label="?????? ????????????????"
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="Username"
                        component={Input}
                        placeholder="?????? ????????????"
                        label="?????? ????????????"
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="Password"
                        component={Input}
                        placeholder="?????? ????????"
                        label="?????? ????????"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-3">
                      <Field
                        name="NationalCode"
                        component={Input}
                        placeholder="???? ??????"
                        label="???? ??????"
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="IdNumber"
                        component={Input}
                        placeholder="?????????? ????????????????"
                        label="?????????? ????????????????"
                      />
                    </div>
                    <div className="col-lg-3">
                      {/* <Field
                                                name="birth_date"
                                                component={Input}
                                                placeholder="?????????? ????????"
                                                label="?????????? ????????"
                                            /> */}
                      <DatePicker
                        name="BirthDate"
                        id="BirthDate"
                        timePicker={false}
                        label="?????????? ????????"
                        className="form-control"
                        value={convertToJalali(current.BirthDate)}
                        onClickSubmitButton={brDate}
                        //value={this.props.smart_cart_expire_date == null ? (new Date()) : this.props.smart_cart_expire_date}
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="FatherName"
                        component={Input}
                        placeholder="?????? ??????"
                        label="?????? ??????"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-3">
                      <Select name="TownshipId" label="?????????????????">
                        <option>???????????? ?????????????????</option>

                        {state.townships.townships != null ? (
                          state.townships.townships.map((c) => (
                            <option key={c.Id} value={c.Id}>
                              {c.Title}
                            </option>
                          ))
                        ) : (
                          <option></option>
                        )}
                      </Select>
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="Address"
                        component={Input}
                        placeholder="????????"
                        label="????????"
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="Mobile"
                        component={Input}
                        placeholder="???????? ??????????"
                        label="???????? ??????????"
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        name="Tell"
                        component={Input}
                        placeholder="???????? ????????"
                        label="???????? ????????"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-3">
                      <Field
                        name="PostalCode"
                        component={Input}
                        placeholder="???? ????????"
                        label="???? ????????"
                      />
                    </div>
                    {/* <div className="col-lg-3">
                                            <Field
                                                name="email"
                                                component={Input}
                                                placeholder="??????????"
                                                label="??????????"
                                            />
                                        </div> */}
                    <div className="col-lg-3">
                      <Field
                        name="HealthLicenceNumber"
                        component={Input}
                        placeholder="?????????? ???????? ??????????"
                        label="?????????? ???????? ??????????"
                      />
                    </div>
                    <div className="col-lg-3">
                      {/* <Field
                                                name="driving_licence_expire_date"
                                                component={Input}
                                                placeholder="?????????? ???????????? ?????????????????? "
                                                label="?????????? ???????????? ?????????????????? "
                                            /> */}
                      <DatePicker
                        name="HealthLicenceExpireDate"
                        id="HealthLicenceExpireDate"
                        timePicker={false}
                        label="?????????? ???????????? ???????? ??????????"
                        className="form-control"
                        value={convertToJalali(current.HealthLicenceExpireDate)}
                        onClickSubmitButton={licenceDate}
                        //value={this.props.smart_cart_expire_date == null ? (new Date()) : this.props.smart_cart_expire_date}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-3">
                      <Select name="IsActive" label="??????????">
                        <option>???????????? ??????????</option>
                        <option value={1}>????????</option>
                        <option value={0}>?????? ????????</option>
                      </Select>
                    </div>
                    <div className="col-lg-3">
                      <Select name="IsVerified" label="?????????? ?????? ??????">
                        <option>???????????? ?????????? ?????? ??????</option>
                        <option value={1}>?????????? ??????</option>
                        <option value={0}>?????????? ????????</option>
                      </Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <DropzoneArea
                        id="ImageUrl"
                        dropzoneText={"?????????? ?????????? ????????"}
                        //theme={theme}
                        showAlerts={false}
                        filesLimit={1}
                        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                        maxFileSize={5000000}
                        onChange={(picture) => onDropHandler(picture)}
                      />
                    </div>
                    <div className="col-lg-6">
                      <DropzoneArea
                        id="ImageUrl"
                        showAlerts={false}
                        dropzoneText={"?????????? ?????????? ????????"}
                        //theme={theme}
                        filesLimit={1}
                        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                        maxFileSize={5000000}
                        onChange={(picture) => onDropHandler(picture)}
                      />
                    </div>
                  </div>
                </Form>
              </DialogContent>
              <DialogActions>
                <Button variant="secondary" onClick={() => handleEditClose()}>
                  ????????????
                </Button>
                <Button
                  className="btn btn-primary"
                  variant="primary"
                  onClick={() => handleSubmit()}
                >
                  ??????
                </Button>
                {/* <Button onClick={handleEditClose} color="primary">
                                    Disagree
          </Button>
                                <Button onClick={handleEditClose} color="primary" autoFocus>
                                    Agree
          </Button> */}
              </DialogActions>
            </Dialog>
          </>
        )}
      </Formik>
    </>
  );
}
export default injectIntl(connect(null, servants.actions)(ServantsTable));
