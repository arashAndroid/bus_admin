import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import { Modal } from "react-bootstrap";
import * as columnFormatters from "./formatters";
import { DatePicker } from "jalali-react-datepicker";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, sortCaret } from "../../../_metronic/_helpers";
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
import * as travels from "./_redux/travelsRedux";
import {
  getAllTravels,
  addTravels,
  editTravels,
  deleteTravels,
  getDirections,
  getServants,
  getCars,
  getDrivers,
} from "./_redux/travelsCrud";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import moment from "moment-jalaali";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../_metronic/_partials/controls";
import Axios from "axios";

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  title: Yup.string().required("این فیلد نمیتواند خالی باشد"),
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TravelsTable(props) {
  console.log("props", props);

  const [depDate, setDepDate] = useState("");

  let { state } = useSelector(
    (state) => ({
      state: state.travels,
    }),
    shallowEqual
  );
  const { user } = useSelector((state) => state.auth);

  console.log("travels", state);

  if (!state.isTravelsLoaded) {
    getAllTravels().then((res) => {
      props.getAllTravels(res.data.Data);
      getCars().then((res) => {
        props.getCars(res.data.Data);
      });
      getServants().then((res) => {
        props.getServants(res.data.Data);
      });
      getDrivers().then((res) => {
        props.getDrivers(res.data.Data);
      });
      getDirections().then((res) => {
        props.getDirections(res.data.Data);
      });
    });
  }
  const { SearchBar, ClearSearchButton } = Search;

  const columns = [
    {
      dataField: "Id",
      text: "شناسه",
      sort: true,
      sortCaret: sortCaret,
      // filter: textFilter()
    },
    {
      dataField: "SourceTitle",
      text: "عنوان مسیر",
      sort: true,
      // filter: textFilter()
      formatter: columnFormatters.DirectionFormatter,

      sortCaret: sortCaret,
    },
    {
      dataField: "DepartureDatetime",
      text: "زمان حرکت",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
      formatter: columnFormatters.DateFormatter,
    },
    {
      dataField: "BasePrice",
      text: "قیمت پایه",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },

    {
      dataField: "TravelStatus",
      text: "وضعیت",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusFormatter,
    },
    {
      dataField: "CarType",
      text: "نوع ماشین",
      sort: true,
      // filter: textFilter()
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
              overlay={<Tooltip id="products-edit-tooltip">ویرایش سفر</Tooltip>}
            >
              <a
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => {
                  setEditOpen(true);
                  setEditMode(true);
                  setDepDate(row.DepartureDatetime);
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
              overlay={<Tooltip id="products-delete-tooltip">حذف سفر</Tooltip>}
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
  const convertToJalali = (date) => {
    console.log("date convertToJalali::::", date);
    if (date) {
      console.log("moment(date) = ", moment(date));
      return moment(date);
    }
    return new Date();
  };

  const handleClickOpen = () => {
    setCurrent({});
    setEditMode(false);
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setCurrent({});
    setEditOpen(false);
    setEditMode(false);
  };

  const brDate = (event) => {
    console.log("event :::", event.value._d);
    var val = event.value._i;
    var valTime = event.value._d.toString();
    console.log("valTime :::", valTime.time);
    var date =
      val.substr(0, val.length - 3) +
      "T" +
      valTime.substr(16, 8) +
      ".000+04:30"; //2021-03-23 15:10:00 => 2021-03-23T10:40:00.000Z
    console.log("date :::", date);
    setDepDate(date);
  };

  const removeTravel = (id) => {
    deleteTravels(id).then((res) => {
      getAllTravels().then((res) => {
        props.getAllTravels(res.data.Data);
      });
    });
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader title="لیست سفر ها">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClickOpen}
            >
              سفر جدید
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
            data={state.travels.travels ?? []}
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
          {"آیا واقعا قصد حذف این سفر را دارید ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>انصراف</Button>
          <Button
            onClick={() => removeTravel(current.Id)}
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
          // console.log("valuse  1: :::: " , values)
          // values.departure_datetime = depDate;
          // console.log("depDate  1: :::: " , depDate)
          // console.log("values  2: :::: " , values)

          if (!editMode) {
            values.DepartureDatetime = depDate;
            var cars = state.cars.cars;
            var car;
            for (var i = 0; i < cars.length; i++) {
              if (cars[i].Id == values.CarId) {
                car = cars[i];
              }
            }
            values.CarTypeId = car.CarTypeId;
            console.log("not edit mode ::", values);
            addTravels(values).then((res) => {
              // let data = {

              //     TravelId: res.data.Data.Inserted_Data[0].Id

              // }
              // Axios.post('http://ls.arian.co.ir:3003/rpc/active_express_travel', data).then(res => { })
              // Axios.post('http://ls.arian.co.ir:3003/rpc/active_midway_travel', data).then(res => { })

              getAllTravels().then((res) => {
                props.getAllTravels(res.data.Data);
              });
            });
            setEditOpen(false);
            setCurrent({});
          } else if (editMode) {
            console.log("edit mode depDate ==", depDate);
            values.DepartureDatetime = depDate;
            editTravels(values).then((res) => {
              getAllTravels().then((res) => {
                props.getAllTravels(res.data.Data);
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
            <Modal show={editOpen} onHide={handleEditClose} size={"lg"}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {editMode ? "ویرایش سفر" : "افزودن سفر"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="form form-label-right">
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Select name="DirectionId" label="مسیر">
                        <option>انتخاب مسیر</option>

                        {state.directions.directions != null ? (
                          state.directions.directions.map((c) => (
                            <option key={c.Id} value={c.Id}>
                              {c.SourceTownshipTitle +
                                " به " +
                                c.DestTownshipTitle}
                            </option>
                          ))
                        ) : (
                          <option></option>
                        )}
                      </Select>
                    </div>
                    <div className="col-lg-4">
                      <Select name="CarId" label="ماشین">
                        <option>انتخاب ماشین</option>

                        {state.cars.cars != null ? (
                          state.cars.cars.map((c) => (
                            <option key={c.Id} value={c.Id}>
                              {c.CarTypeTitle}
                            </option>
                          ))
                        ) : (
                          <option></option>
                        )}
                      </Select>
                    </div>
                    <div className="col-lg-4">
                      <Select name="PrimaryDriverId" label="راننده">
                        <option>انتخاب راننده اصلی</option>

                        {state.drivers.drivers != null ? (
                          state.drivers.drivers.map((c) => (
                            <option key={c.Id} value={c.Id}>
                              {c.FirstName + " " + c.LastName}
                            </option>
                          ))
                        ) : (
                          <option></option>
                        )}
                      </Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Select name="SecondaryDriverId" label="کمک راننده">
                        <option>انتخاب کمک راننده</option>

                        {state.drivers.drivers != null ? (
                          state.drivers.drivers.map((c) => (
                            <option key={c.Id} value={c.Id}>
                              {c.FirstName + " " + c.LastName}
                            </option>
                          ))
                        ) : (
                          <option></option>
                        )}
                      </Select>
                    </div>
                    <div className="col-lg-4">
                      <Select name="PrimaryServantId" label="خدمه">
                        <option>انتخاب خدمه اصلی</option>

                        {state.servants.servants != null ? (
                          state.servants.servants.map((c) => (
                            <option key={c.Id} value={c.Id}>
                              {c.FirstName + " " + c.LastName}
                            </option>
                          ))
                        ) : (
                          <option></option>
                        )}
                      </Select>
                    </div>
                    <div className="col-lg-4">
                      <Select name="SecondaryServantId" label="کمک خدمه">
                        <option>انتخاب کمک خدمه</option>

                        {state.servants.servants != null ? (
                          state.servants.servants.map((c) => (
                            <option key={c.Id} value={c.Id}>
                              {c.FirstName + " " + c.LastName}
                            </option>
                          ))
                        ) : (
                          <option></option>
                        )}
                      </Select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="BasePrice"
                        component={Input}
                        placeholder="هزینه سفر"
                        label="هزینه سفر"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Select name="TravelStatus" label="وضعیت">
                        <option>انتخاب وضعیت</option>
                        <option value={1}>فعال</option>
                        <option value={0}>غیر فعال</option>
                      </Select>
                    </div>
                    <div className="col-lg-4">
                      <DatePicker
                        name="DepartureDatetime"
                        id="DepartureDatetime"
                        timePicker={true}
                        label="تاریخ حرکت"
                        className="form-control"
                        // value={
                        //   current.DepartureDatetime != null
                        //     ? current.DepartureDatetime
                        //     : new Date()
                        // }
                        value={convertToJalali(current.DepartureDatetime)}
                        onClickSubmitButton={brDate}
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
export default injectIntl(connect(null, travels.actions)(TravelsTable));
