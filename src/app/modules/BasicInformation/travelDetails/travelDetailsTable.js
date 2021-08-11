import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { DatePicker } from "jalali-react-datepicker";
import { Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import * as columnFormatters from "./formatters";

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
import * as travelDetails from "./_redux/travelDetailsRedux";
import {
  getAllTravelDetails,
  deleteTravelDetails,
  addTravelDetails,
  editTravelDetails,
} from "./_redux/travelDetailsCrud";
import { getAllCities } from "../cities/_redux/citiesCrud";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../_metronic/_partials/controls";
import moment from "moment-jalaali";

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  title: Yup.string().required("این فیلد نمیتواند خالی باشد"),
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TravelDetailsTable(props) {
  console.log("props", props);

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [expire, setExpire] = useState("");

  let { state } = useSelector(
    (state) => ({
      state: state.travelDetails,
    }),
    shallowEqual
  );
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  const tid = props.match.params.id;
  console.log("travelDetails", state);
  if (!isLoaded) {
    getAllTravelDetails(tid).then((res) => {
      props.getAllTravelDetails(res.data.Data);
      getAllCities().then((res) => {
        props.getAllCities(res.data.Data);
      });
      setIsLoaded(true);
    });
  }
  const convertToJalali = (date) => {
    if (date) {
      console.log("moment(date) = ", moment(date));
      return moment(date);
    }
    return new Date();
  };

  const { SearchBar, ClearSearchButton } = Search;

  const columns = [
    {
      dataField: "id",
      text: "شناسه",
      sort: true,
      sortCaret: sortCaret,
      // filter: textFilter()
    },

    {
      dataField: "source.title",
      text: "مبدأ",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },
    {
      dataField: "destination.title",
      text: "مقصد",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },
    {
      dataField: "status",
      text: "وضعیت",
      sort: true,
      formatter: columnFormatters.StatusFormatter,
      // filter: textFilter()
      sortCaret: sortCaret,
    },
    {
      dataField: "price",
      text: "قیمت",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },

    {
      dataField: "departureDatetime",
      text: "تاریخ حرکت",
      sort: true,
      // filter: textFilter()
      formatter: columnFormatters.DateFormatter,
      sortCaret: sortCaret,
    },

    {
      dataField: "action",
      text: "عملیات",
      sort: false,
      sortCaret: sortCaret,

      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <OverlayTrigger
              overlay={
                <Tooltip id="products-edit-tooltip">ویرایش جزییات مسیر</Tooltip>
              }
            >
              <a
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => {
                  setEditOpen(true);
                  setEditMode(true);
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
              overlay={
                <Tooltip id="products-delete-tooltip">حذف جزییات مسیر</Tooltip>
              }
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

  const handleClose = () => {
    setOpen(false);
  };
  const expireDate = (event) => {
    console.log("event :::", event.value._d);
    var val = event.value._i;
    var valTime = event.value._d.toString();
    console.log("valTime :::", valTime.time);
    var date = val.substr(0, val.length - 3) + "T" + valTime.substr(16, 8); //2021-03-23 15:10:00 => 2021-03-23T10:40:00.000Z
    setExpire(date);
    console.log("setExpire val :::: ", date);
  };
  const back = () => {
    setIsLoaded(false);
    history.push("/TRAVELS");
  };
  const handleEditClose = () => {
    setCurrent({});
    setEditOpen(false);
    setEditMode(false);
  };

  const removeTravelDetails = (cid) => {
    deleteTravelDetails(cid, tid).then((res) => {
      getAllTravelDetails(tid).then((res) => {
        props.getAllTravelDetails(res.data.Data);
      });
    });
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader title="لیست جزییات مسیر ها">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClickOpen}
            >
              جزییات مسیر جدید
            </button>
            <button
              style={{ marginRight: 10 }}
              type="button"
              onClick={back}
              className="btn btn-light"
            >
              <i className="fa fa-arrow-left"></i>
              بازگشت
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
            keyField="id"
            data={state.travelDetails.travelDetails ?? []}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                {/* <h3>Input something at below input field:</h3> */}
                <SearchBar
                  {...props.searchProps}
                  placeholder="جستجو در تمامی فیلد ها"
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
          {"آیا واقعا قصد حذف این جزییات مسیر را دارید ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>انصراف</Button>
          <Button
            onClick={() => removeTravelDetails(current.id)}
            className="btn btn-danger"
            color="danger"
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      <Formik
        enableReinitialize={true}
        initialValues={current}
        // validationSchema={CustomerEditSchema}

        onSubmit={(values) => {
          values.travelId = tid;
          values.departureDatetime = expire;

          console.log("values on submit", values);
          if (!editMode) {
            addTravelDetails(values, tid).then((res) => {
              getAllTravelDetails(tid).then((res) => {
                props.getAllTravelDetails(res.data.Data);
              });
            });
            setEditOpen(false);
            setCurrent({});
          } else if (editMode) {
            editTravelDetails(values, tid).then((res) => {
              getAllTravelDetails(tid).then((res) => {
                props.getAllTravelDetails(res.data.Data);
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
            <Modal show={editOpen} onHide={handleEditClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {editMode ? "ویرایش جزییات مسیر" : "افزودن جزییات مسیر"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="form form-label-right">
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Select name="sourceId" label="مبدأ">
                        <option>مبدأ</option>

                        {state.cities.cities != null ? (
                          state.cities.cities.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))
                        ) : (
                          <option></option>
                        )}
                      </Select>
                    </div>
                    <div className="col-lg-6">
                      <Select name="destinationId" label="مقصد">
                        <option>مقصد</option>

                        {state.cities.cities != null ? (
                          state.cities.cities.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))
                        ) : (
                          <option></option>
                        )}
                      </Select>
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="price"
                        component={Input}
                        placeholder="قیمت"
                        label="قیمت"
                      />
                    </div>
                    <div className="col-lg-6">
                      {/* <Field
                        type="number"
                        name="status"
                        component={Input}
                        placeholder="وضعیت"
                        label="وضعیت"
                      /> */}
                      <Select name="status" label="وضعیت">
                        <option>انتخاب وضعیت</option>
                        <option key={0} value={0}>
                          غیر فعال
                        </option>
                        <option key={1} value={1}>
                          فعال
                        </option>
                      </Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <DatePicker
                        name="departureDatetime"
                        id="departureDatetime"
                        timePicker={false}
                        label="تاریخ حرکت"
                        className="form-control"
                        value={convertToJalali(current.departureDatetime)}
                        onClickSubmitButton={expireDate}

                        //value={this.props.smart_cart_expire_date == null ? (new Date()) : this.props.smart_cart_expire_date}
                      />
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => handleEditClose()}>
                  انصراف
                </Button>
                <Button
                  className="btn btn-primary"
                  variant="primary"
                  onClick={() => handleSubmit()}
                >
                  ثبت
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Formik>
    </>
  );
}
export default injectIntl(
  connect(null, travelDetails.actions)(TravelDetailsTable)
);
