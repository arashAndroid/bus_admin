import React, { useMemo } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { Modal } from "react-bootstrap";
import * as columnFormatters from "./formatters";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, sortCaret } from "../../../../_metronic/_helpers";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as stations from "./_redux/stationsRedux";
import { getAllStations, addStations, getTownships, editStations, deleteStations } from "./_redux/stationsCrud";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Input,
    Select,
    DatePickerField,
} from "../../../../_metronic/_partials/controls";

// Validation schema
const CustomerEditSchema = Yup.object().shape({
    title: Yup.string()
        .required("این فیلد نمیتواند خالی باشد"),

});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function StationsTable(props) {
    console.log("props", props)


    let { state } = useSelector(
        (state) => ({
            state: state.stations
        }),
        shallowEqual
    );
    const { user } = useSelector(state => state.auth);


    console.log("stations", state)

    if (!state.isStationsLoaded) {
        getAllStations().then(res => {
            props.getAllStations(res.data.Data)
            getTownships().then(res => {
                props.getTownships(res.data.Data)
            })
            console.log("state :::", state.stations[0])

        })
    }
    const { SearchBar, ClearSearchButton } = Search;

    const columns = [{
        dataField: 'Id',
        text: 'شناسه',
        sort: true,
        sortCaret: sortCaret,
        // filter: textFilter()

    },
    {
        dataField: 'Title',
        text: 'عنوان',
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'TownshipTitle',
        text: 'شهرستان',
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'Description',
        text: 'توضیحات',
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'IsMidway',
        text: 'موقعیت ایستگاه',
        sort: true,
        formatter: columnFormatters.CapitalFormatter,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'IsActive',
        text: 'وضعیت',
        formatter: columnFormatters.StatusFormatter,
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
                        overlay={<Tooltip id="products-edit-tooltip">ویرایش ایستگاه</Tooltip>}
                    >
                        <a
                            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                            onClick={() => {
                                setEditOpen(true)
                                setEditMode(true)
                                setCurrent(row)
                            }
                            }
                        >
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                                <SVG
                                    src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                                />
                            </span>
                        </a>
                    </OverlayTrigger>
                    <OverlayTrigger
                        overlay={<Tooltip id="products-delete-tooltip">حذف ایستگاه</Tooltip>}
                    >
                        <a
                            className="btn btn-icon btn-light btn-hover-danger btn-sm"
                            onClick={() => {
                                setOpen(true)
                                setCurrent(row)
                            }}
                        >
                            <span className="svg-icon svg-icon-md svg-icon-danger">
                                <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
                            </span>
                        </a>
                    </OverlayTrigger>
                </>
            );
        },
        sort: true
    }
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
    const handleEditClose = () => {
        setCurrent({})
        setEditOpen(false);
        setEditMode(false)

    };

    const removeStations = (id) => {
        deleteStations(id).then(res => {
            getAllStations().then(res => {
                props.getAllStations(res.data.Data)

            })
        })
        setOpen(false);

    };





    return (
        <>
            <Card>
                <CardHeader title="لیست ایستگاه ها">
                    <CardHeaderToolbar>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleClickOpen}
                        >
                            ایستگاه جدید
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
                        data={state.stations.stations ?? []}
                        columns={columns}
                        search

                    >


                        {
                            props => (
                                <div>
                                    {/* <h3>Input something at below input field:</h3> */}
                                    <SearchBar {...props.searchProps} placeholder="جستجو در تمامی فیلد ها" />

                                    <hr />
                                    <BootstrapTable

                                        {...props.baseProps}
                                        bordered={false}
                                        bootstrap4
                                        // filter={filterFactory()}
                                        pagination={paginationFactory()}


                                    />
                                </div>
                            )
                        }
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
                <DialogTitle id="alert-dialog-slide-title">{"آیا واقعا قصد حذف این ایستگاه را دارید ؟"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        انصراف
          </Button>
                    <Button onClick={() => removeStations(current.Id)} className="btn btn-danger" color="danger">
                        حذف
          </Button>
                </DialogActions>
            </Dialog>


            <Formik
                enableReinitialize={true}
                initialValues={current}
                // validationSchema={CustomerEditSchema}
                onSubmit={(values) => {

                    if (!editMode) {
                        addStations(values).then(res => {
                            getAllStations().then(res => {
                                props.getAllStations(res.data.Data)
                            })
                        })
                        setEditOpen(false)
                        setCurrent({})
                    }
                    else if (editMode) {
                        editStations(values).then(res => {
                            getAllStations().then(res => {
                                props.getAllStations(res.data.Data)
                            })
                        })
                        setEditOpen(false)
                        setCurrent({})
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
                                    {
                                        editMode ?
                                            'ویرایش ایستگاه'
                                            :
                                            'افزودن ایستگاه'
                                    }
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-4">
                                            <Field
                                                name="Title"
                                                component={Input}
                                                placeholder="عنوان"
                                                label="عنوان"
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <Field
                                                name="Description"
                                                component={Input}
                                                placeholder="توضیحات"
                                                label="توضیحات"
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <Select name="TownshipId" label="شهرستان">
                                                <option>
                                                    انتخاب شهر
                                                </option>

                                                {

                                                    state.townships.townships != null ?


                                                        state.townships.townships.map(c => (
                                                            <option key={c.Id} value={c.Id}>
                                                                {c.Title}
                                                            </option>
                                                        ))
                                                        :
                                                        <option>

                                                        </option>
                                                }

                                            </Select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-4">
                                            <Field
                                                name="StationCode"
                                                component={Input}
                                                placeholder="کد ایستگاه"
                                                label="کد ایستگاه"
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <Field
                                                name="Lat"
                                                component={Input}
                                                placeholder="عرض جخرافیایی"
                                                label="Lat"
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <Field
                                                name="Lon"
                                                component={Input}
                                                placeholder="طول جخرافیایی"
                                                label="Lon"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <Select name="IsMidway" label="موقعیت ایستگاه">

                                                <option>
                                                    انتخاب موقعیت ایستگاه
                                                </option>
                                                <option value={1}>
                                                    بین راهی
                                                </option>
                                                <option value={0}>
                                                    اصلی
                                                </option>


                                            </Select>
                                        </div>
                                        <div className="col-lg-6">
                                            <Select name="IsActive" label="وضعیت">

                                                <option>
                                                    انتخاب وضعیت
                                                    </option>
                                                <option value={1}>
                                                    فعال
                                                    </option>
                                                <option value={0}>
                                                    غیر فعال
                                                    </option>


                                            </Select>
                                        </div>

                                    </div>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => handleEditClose()}>
                                    انصراف
                             </Button>
                                <Button className="btn btn-primary" variant="primary" onClick={() => handleSubmit()}>
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
export default injectIntl(connect(null, stations.actions)(StationsTable));
