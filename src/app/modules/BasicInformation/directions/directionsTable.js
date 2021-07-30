import React, { useMemo } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
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
import * as directions from "./_redux/directionsRedux";
import { getAllDirections, getTownships, deleteDirections, addDirections, editDirections } from "./_redux/directionsCrud";
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

function DirectionsTable(props) {
    console.log("props", props)


    let { state } = useSelector(
        (state) => ({
            state: state.directions
        }),
        shallowEqual
    );
    const { user } = useSelector(state => state.auth);
    const history = useHistory();


    console.log("directions", state)

    if (!state.isDirectionsLoaded) {
        getAllDirections().then(res => {
            props.getAllDirections(res.data.Data)
            getTownships().then(res => {
                props.getTownships(res.data.Data)
            })
            console.log("state :::", state.directions[0])

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
        dataField: 'SourceTownshipTitle',
        text: 'عنوان مسیر',
        sort: true,
        formatter: columnFormatters.DirectionFormatter,

        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'Distance',
        text: 'مسافت',
        sort: true,
        formatter: columnFormatters.DistanceFormatter,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'DurationOverDistance',
        text: 'مدت زمان سفر',
        formatter: columnFormatters.TimeFormatter,
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'IsActive',
        formatter: columnFormatters.StatusFormatter,

        text: 'وضعیت',
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
                        overlay={<Tooltip id="products-edit-tooltip">ویرایش مسیر</Tooltip>}
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
                        overlay={<Tooltip id="products-delete-tooltip">حذف مسیر</Tooltip>}
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

                    <OverlayTrigger
                        overlay={<Tooltip id="products-delete-tooltip">مشاهده جزییات مسیر</Tooltip>}
                    >
                        <a
                            style={{ marginRight: 10 }}

                            className="btn btn-icon btn-light btn-hover-success btn-sm"
                            onClick={() => history.push("/details/" + row.Id)}

                        >
                            <span className="svg-icon svg-icon-md svg-icon-success">
                                <SVG src={toAbsoluteUrl("/media/svg/icons/General/Attachment1.svg")} />
                            </span>
                        </a>
                    </OverlayTrigger>

                    {/* <Button
                        className="btn btn-primary"
                        style={{ marginRight: 10 }}
                        onClick={() => history.push("/details/" + row.id)}
                    >
                        مشاهده جزییات مسیر
                          </Button> */}


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

    const removeDirections = (id) => {
        deleteDirections(id).then(res => {
            getAllDirections().then(res => {
                props.getAllDirections(res.data.Data)

            })
        })
        setOpen(false);

    };




    return (
        <>
            <Card>
                <CardHeader title="لیست مسیر ها">
                    <CardHeaderToolbar>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleClickOpen}
                        >
                            مسیر جدید
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
                        data={state.directions.directions ?? []}
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
                <DialogTitle id="alert-dialog-slide-title">{"آیا واقعا قصد حذف این مسیر را دارید ؟"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        انصراف
          </Button>
                    <Button onClick={() => removeDirections(current.Id)} className="btn btn-danger" color="danger">
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
                        addDirections(values).then(res => {
                            getAllDirections().then(res => {
                                props.getAllDirections(res.data.Data)
                            })
                        })
                        setEditOpen(false)
                        setCurrent({})
                    }
                    else if (editMode) {
                        editDirections(values).then(res => {
                            getAllDirections().then(res => {
                                props.getAllDirections(res.data.Data)
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
                                            'ویرایش مسیر'
                                            :
                                            'افزودن مسیر'
                                    }
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-4">
                                            <Select name="SourceTownshipId" label="مبدا">
                                                <option>
                                                    انتخاب شهر مبدا
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
                                        <div className="col-lg-4">

                                            <Select name="DestTownshipId" label="مقصد">
                                                <option>
                                                    انتخاب شهر مقصد
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
                                        <div className="col-lg-4">

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
                                    <div className="form-group row">
                                        <div className="col-lg-4">
                                            <Field
                                                name="Distance"
                                                component={Input}
                                                placeholder="مسافت"
                                                label="مسافت"
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <Field
                                                name="DurationOverDistance"
                                                component={Input}
                                                placeholder="مدت مسیر"
                                                label="مدت مسیر"
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
export default injectIntl(connect(null, directions.actions)(DirectionsTable));
