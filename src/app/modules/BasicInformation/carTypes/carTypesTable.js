import React, { useMemo } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { Modal } from "react-bootstrap";

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
import * as carTypes from "./_redux/carTypesRedux";
import { getAllCarTypes, deleteCarType, addCarType, editCarType } from "./_redux/carTypesCrud";
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

function CarTypesTable(props) {
    console.log("props", props)


    let { state } = useSelector(
        (state) => ({
            state: state.carTypes
        }),
        shallowEqual
    );
    const { user } = useSelector(state => state.auth);


    console.log("carTypes", state)

    if (!state.isCarTypesLoaded) {
        getAllCarTypes().then(res => {
            props.getAllCarTypes(res.data.Data)
            console.log("state :::", state.carTypes[0])

        })
    }
    const { SearchBar, ClearSearchButton } = Search;

    const columns = [{
        dataField: 'Id',
        text: 'شناسه',
        sort: true,
        sortCaret: sortCaret,
        // filter: textFilter()

    }, {
        dataField: 'Title',
        text: 'عنوان',
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'SeatCount',
        text: 'ظرفیت',
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'SeatRowCount',
        text: 'تعداد ردیف',
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'SeatColumnCount',
        text: 'تعداد ستون',
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
                        overlay={<Tooltip id="products-edit-tooltip">ویرایش نوع خودرو</Tooltip>}
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
                        overlay={<Tooltip id="products-delete-tooltip">حذف نوع خودرو</Tooltip>}
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

    const removeCarType = (id) => {
        deleteCarType(id).then(res => {
            getAllCarTypes().then(res => {
                props.getAllCarTypes(res.data.Data)

            })
        })
        setOpen(false);

    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleEditClose = () => {
        setCurrent({})
        setEditOpen(false);
        setEditMode(false)

    };





    return (
        <>
            <Card>
                <CardHeader title="لیست نوع خودرو ها">
                    <CardHeaderToolbar>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleClickOpen}
                        >
                            نوع خودرو جدید
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
                        data={state.carTypes.carTypes ?? []}
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
                <DialogTitle id="alert-dialog-slide-title">{"آیا واقعا قصد حذف این نوع خودرو را دارید ؟"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        انصراف
          </Button>
                    <Button onClick={() => removeCarType(current.Id)} className="btn btn-danger" color="danger">
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
                        addCarType(values).then(res => {
                            getAllCarTypes().then(res => {
                                props.getAllCarTypes(res.data.Data)
                            })
                        })
                        setEditOpen(false)
                        setCurrent({})
                    }
                    else if (editMode) {
                        editCarType(values).then(res => {
                            getAllCarTypes().then(res => {
                                props.getAllCarTypes(res.data.Data)
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
                                            'ویرایش نوع خودرو'
                                            :
                                            'افزودن نوع خودرو'
                                    }
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <Field
                                                name="Title"
                                                component={Input}
                                                placeholder="عنوان"
                                                label="عنوان"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <Field
                                                type="number"
                                                name="SeatCount"
                                                component={Input}
                                                placeholder="ظرفیت"
                                                label="ظرفیت"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <Field
                                                type="number"
                                                name="SeatRowCount"
                                                component={Input}
                                                placeholder="تعداد ردیف"
                                                label="تعداد ردیف"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <Field
                                                type="number"
                                                name="SeatColumnCount"
                                                component={Input}
                                                placeholder="تعداد ستون"
                                                label="تعداد ستون"
                                            />
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
export default injectIntl(connect(null, carTypes.actions)(CarTypesTable));
