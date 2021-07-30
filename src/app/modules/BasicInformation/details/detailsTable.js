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
import * as details from "./_redux/detailsRedux";
import { getAllDetails, getStations, deleteDetails, addDetails, editDetails } from "./_redux/detailsCrud";
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

function DetailsTable(props) {
    console.log("props", props)

    const [isLoaded, setIsLoaded] = React.useState(false);

    let { state } = useSelector(
        (state) => ({
            state: state.details
        }),
        shallowEqual
    );
    const { user } = useSelector(state => state.auth);
    const history = useHistory();

    const did = props.match.params.id
    console.log("details", state)
    if (!isLoaded) {
        getAllDetails(did).then(res => {
            props.getAllDetails(res.data.Data)
            getStations().then(res => {
                props.getStations(res.data.Data)


            })
            setIsLoaded(true)

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
        formatter: columnFormatters.DirectionFormatter,
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'StationTitle',
        text: 'عنوان ایستگاه',
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'StationOrder',
        text: 'ترتیب ایستگاه',
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'DistanceFromSource',
        text: 'مسافت از مبدا',
        sort: true,
        formatter: columnFormatters.DistanceFormatter,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'Duration',
        text: 'مدت زمان طی ایستگاه',
        sort: true,
        formatter: columnFormatters.TimeFormatter,
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
                        overlay={<Tooltip id="products-edit-tooltip">ویرایش جزییات مسیر</Tooltip>}
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
                        overlay={<Tooltip id="products-delete-tooltip">حذف جزییات مسیر</Tooltip>}
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
    const back = () => {
        setIsLoaded(false);
        history.push("/directions")
    };
    const handleEditClose = () => {
        setCurrent({})
        setEditOpen(false);
        setEditMode(false)

    };

    const removeDetails = (cid) => {
        deleteDetails(cid, did).then(res => {
            getAllDetails(did).then(res => {
                props.getAllDetails(res.data.Data)

            })
        })
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
                        keyField="Id"
                        data={state.details.details ?? []}
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
                <DialogTitle id="alert-dialog-slide-title">{"آیا واقعا قصد حذف این جزییات مسیر را دارید ؟"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        انصراف
          </Button>
                    <Button onClick={() => removeDetails(current.Id)} className="btn btn-danger" color="danger">
                        حذف
          </Button>
                </DialogActions>
            </Dialog>


            <Formik
                enableReinitialize={true}
                initialValues={current}
                // validationSchema={CustomerEditSchema}

                onSubmit={(values) => {
                    values.DirectionId = did;
                    if (!editMode) {
                        addDetails(values, did).then(res => {
                            getAllDetails(did).then(res => {
                                props.getAllDetails(res.data.Data)
                            })
                        })
                        setEditOpen(false)
                        setCurrent({})
                    }
                    else if (editMode) {
                        editDetails(values, did).then(res => {
                            getAllDetails(did).then(res => {
                                props.getAllDetails(res.data.Data)
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
                                            'ویرایش جزییات مسیر'
                                            :
                                            'افزودن جزییات مسیر'
                                    }
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <Select name="StationId" label="ایستگاه">
                                                <option>
                                                    ایستگاه
                                                </option>

                                                {

                                                    state.stations.stations != null ?


                                                        state.stations.stations.map(c => (
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
                                        <div className="col-lg-6">
                                            <Field
                                                name="StationOrder"
                                                component={Input}
                                                placeholder="ترتیب ایستگاه"
                                                label="ترتیب ایستگاه"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <Field
                                                name="DistanceFromSource"
                                                component={Input}
                                                placeholder="مسافت از مبدا"
                                                label="مسافت از مبدا"
                                            />

                                        </div>
                                        <div className="col-lg-6">
                                            <Field
                                                name="Duration"
                                                component={Input}
                                                placeholder="مدت زمان طی ایستگاه"
                                                label="مدت زمان طی ایستگاه"
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
export default injectIntl(connect(null, details.actions)(DetailsTable));
