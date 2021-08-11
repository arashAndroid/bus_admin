import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { Modal } from "react-bootstrap";
import { DatePicker } from "jalali-react-datepicker";

import FormGroup from "@material-ui/core/FormGroup";
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
import * as travels from "./_redux/travelsRedux";
import moment from "moment-jalaali";

import {
  getAllTravels,
  deleteTravel,
  addTravel,
  editTravel,
} from "./_redux/travelsCrud";
//  FIX THIS
// import { getAllCities } from "../busTypes/_redux/busTypesCrud";
import { getAllCities } from "../cities/_redux/citiesCrud";
import { getAllBuses } from "../buses/_redux/busesCrud";
import { getAllDrivers } from "../drivers/_redux/driversCrud";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../_metronic/_partials/controls";

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  title: Yup.string().required("این فیلد نمیتواند خالی باشد"),
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TravelsTable(props) {
  console.log("props", props);

  let { state } = useSelector(
    (state) => ({
      state: state.travels,
    }),
    shallowEqual
  );
  const { user } = useSelector((state) => state.auth);
  const [expire, setExpire] = useState("");

  console.log("travels", state);

  if (!state.isTravelsLoaded) {
    getAllTravels().then((res) => {
      props.getAllTravels(res.data.Data);

      console.log("STATE is");

      getAllDrivers().then((res) => {
        props.getAllDrivers(res.data.Data);
      });
      getAllBuses().then((res) => {
        props.getAllBuses(res.data.Data);
      });
    });
  }
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
      dataField: "direction.direction_details[0].arrivalTime",
      text: "تاریخ حرکت",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },
    {
      dataField: "basePrice",
      text: "قیمت",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },
    {
      dataField: "status",
      text: "وضعیت",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },

    {
      dataField: "direction.direction_details[0].city.title",
      text: "مبدا",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },
    {
      dataField: "destinationId",
      text: "مقصد",
      sort: true,
      formatter: columnFormatters.DestinationFormatter,
      // filter: textFilter()
      sortCaret: sortCaret,
    },
    {
      dataField: "bus.title",
      text: "اتوبوس",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },
    {
      dataField: "driver.firstName",
      text: "راننده",
      sort: true,
      // filter: textFilter()
      sortCaret: sortCaret,
    },

    // {
    //   dataField: "bus_type[title]",
    //   text: "نوع اتوبوس",
    //   sort: true,
    //   // filter: textFilter()
    //   sortCaret: sortCaret,
    // },

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

  const handleClickOpen = () => {
    setCurrent({});
    setEditMode(false);
    setEditOpen(true);
  };
  const expireDate = (event) => {
    var val = event.value._i;
    var date = val.substr(0, val.length - 3);
    setExpire(date);
    console.log("setExpire val :::: ", date);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setCurrent({});
    setEditOpen(false);
    setEditMode(false);
  };
  const convertToJalali = (date) => {
    if (date) {
      return moment(date.substr(0, 10)).format("jYYYY-jMM-jDD");
    }
    return date;
  };

  const removeTravel = (id) => {
    deleteTravel(id).then((res) => {
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
            onClick={() => removeTravel(current.id)}
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
          values.expire = expire;

          if (!editMode) {
            addTravel(values).then((res) => {
              getAllTravels().then((res) => {
                props.getAllTravels(res.data.Data);
              });
            });
            setEditOpen(false);
            setCurrent({});
          } else if (editMode) {
            editTravel(values).then((res) => {
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
            <Modal show={editOpen} onHide={handleEditClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {editMode ? "ویرایش سفر" : "افزودن سفر"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="form form-label-right">
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        name="departureDatetime"
                        component={Input}
                        placeholder="تاریخ حرکت"
                        label="تاریخ حرکت"
                      />
                    </div>

                    <div className="col-lg-4">
                      <Field
                        name="price"
                        component={Input}
                        placeholder="قیمت"
                        label="قیمت"
                      />
                    </div>

                    <div className="col-lg-4">
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
                    <div className="col-lg-4">
                      {/* <Select name="sourceId" label="مبدا">
                        <option>انتخاب شهر</option>
                        {state.cities.cities != null ? (
                          state.cities.cities.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))
                        ) : (
                          <option></option>
                        )}
                      </Select> */}
                    </div>

                    <div className="col-lg-4">
                      {/* <Select name="destinationId" label="مقصد">
                        <option>انتخاب شهر</option>
                        {state.cities.cities != null ? (
                          state.cities.cities.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))
                        ) : (
                          <option></option>
                        )}
                      </Select> */}
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
