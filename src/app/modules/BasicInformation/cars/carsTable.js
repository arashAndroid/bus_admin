import React, { useMemo, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { Modal } from "react-bootstrap";
import { DatePicker } from "jalali-react-datepicker";

import FormGroup from '@material-ui/core/FormGroup';
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
import * as cars from "./_redux/carsRedux";
import moment from "moment-jalaali";

import { getAllCars, getCarBrands, getCarTypes, deleteCars, addCars, editCars } from "./_redux/carsCrud";
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
        .required("?????? ???????? ???????????????? ???????? ????????"),

});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CarsTable(props) {
    console.log("props", props)


    let { state } = useSelector(
        (state) => ({
            state: state.cars
        }),
        shallowEqual
    );
    const { user } = useSelector(state => state.auth);
    const [expire, setExpire] = useState('');


    console.log("cars", state)

    if (!state.isCarsLoaded) {
        getAllCars().then(res => {
            props.getAllCars(res.data.Data)
            getCarBrands().then(res => {
                props.getCarBrands(res.data.Data)
            })
            getCarTypes().then(res => {
                props.getCarTypes(res.data.Data)
            })

        })

    }
    const { SearchBar, ClearSearchButton } = Search;

    const columns = [{
        dataField: 'Id',
        text: '??????????',
        sort: true,
        sortCaret: sortCaret,
        // filter: textFilter()

    }, {
        dataField: 'CarBrandTitle',
        text: '????????',
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'CarTypeTitle',
        text: '??????',
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'SmartCardNumber',
        text: '?????????? ???????? ????????????',
        sort: true,
        // filter: textFilter()
        sortCaret: sortCaret,


    },
    {
        dataField: 'SmartCardExpireDate',
        text: '???????????? ???????? ????????????',
        sort: true,
        // filter: textFilter()
        formatter: columnFormatters.DateFormatter,
        sortCaret: sortCaret,


    },


    {
        dataField: "action",
        text: "????????????",
        sort: false,
        sortCaret: sortCaret,

        formatter: (cell, row, rowIndex, formatExtraData) => {

            return (
                <>
                    <OverlayTrigger
                        overlay={<Tooltip id="products-edit-tooltip">???????????? ??????????</Tooltip>}
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
                        overlay={<Tooltip id="products-delete-tooltip">?????? ??????????</Tooltip>}
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
    const expireDate = (event) => {

        var val = event.value._i;
        var date = val.substr(0, val.length - 3);
        setExpire(date);
        console.log("setExpire val :::: ", date)

    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleEditClose = () => {
        setCurrent({})
        setEditOpen(false);
        setEditMode(false)

    };
    const convertToJalali = (date) => {
        if (date) {
            return moment((date).substr(0, 10)).format('jYYYY-jMM-jDD');
        }
        return date;

    }

    const removeCar = (id) => {
        deleteCars(id).then(res => {
            getAllCars().then(res => {
                props.getAllCars(res.data.Data)

            })
        })
        setOpen(false);

    };





    return (
        <>
            <Card>
                <CardHeader title="???????? ?????????? ????">
                    <CardHeaderToolbar>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleClickOpen}
                        >
                            ?????????? ????????
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
                        data={state.cars.cars ?? []}
                        columns={columns}
                        search

                    >


                        {
                            props => (
                                <div>
                                    {/* <h3>Input something at below input field:</h3> */}
                                    <SearchBar {...props.searchProps} placeholder="?????????? ???? ?????????? ???????? ????" />

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
                <DialogTitle id="alert-dialog-slide-title">{"?????? ?????????? ?????? ?????? ?????? ?????????? ???? ?????????? ??"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        ????????????
          </Button>
                    <Button onClick={() => removeCar(current.Id)} className="btn btn-danger" color="danger">
                        ??????
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
                        addCars(values).then(res => {
                            getAllCars().then(res => {
                                props.getAllCars(res.data.Data)
                            })
                        })
                        setEditOpen(false)
                        setCurrent({})
                    }
                    else if (editMode) {
                        editCars(values).then(res => {
                            getAllCars().then(res => {
                                props.getAllCars(res.data.Data)
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
                                            '???????????? ??????????'
                                            :
                                            '???????????? ??????????'
                                    }
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-4">
                                            <Select name="CarBrandId" label="????????">

                                                <option>
                                                    ???????????? ????????
                                                </option>
                                                {

                                                    state.brands.brands != null ?


                                                        state.brands.brands.map(c => (
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
                                            <Select name="CarTypeId" label="??????">

                                                <option>
                                                    ???????????? ??????
                                                </option>
                                                {

                                                    state.types.types != null ?


                                                        state.types.types.map(c => (
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
                                            <Field
                                                name="CarCode"
                                                component={Input}
                                                placeholder="???? ??????????"
                                                label="???? ??????????"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-4">
                                            <Field
                                                name="PlateSeries"
                                                component={Input}
                                                placeholder="?????? ????????"
                                                label="?????? ????????"
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <Field
                                                type="number"
                                                name="PlateNumber"
                                                component={Input}
                                                placeholder="?????????? ????????"
                                                label="?????????? ????????"
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <Field
                                                name="SmartCardNumber"
                                                component={Input}
                                                placeholder="?????????? ????????"
                                                label="?????????? ????????"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6">


                                            <DatePicker
                                                name="SmartCardExpireDate"
                                                id='SmartCardExpireDate'
                                                timePicker={false}
                                                label='?????????? ???????????? ???????? ????????????'
                                                className='form-control'
                                                value={convertToJalali(current.SmartCardExpireDate)}
                                                onClickSubmitButton={expireDate}

                                            //value={this.props.smart_cart_expire_date == null ? (new Date()) : this.props.smart_cart_expire_date}
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
                        </Modal>
                    </>
                )}
            </Formik>




        </>
    );
}
export default injectIntl(connect(null, cars.actions)(CarsTable));
