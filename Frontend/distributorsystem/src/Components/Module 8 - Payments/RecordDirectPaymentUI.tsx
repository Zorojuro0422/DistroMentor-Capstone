import { Button, Divider, Input, Paper, Stack, Table, TableRow, TableBody, TableCell, TableContainer, TextField, styled, TableHead, Typography, Card, makeStyles, IconButton, Grid, TextFieldProps, Box, TablePagination, Autocomplete, AutocompleteRenderInputParams, MenuItem, Modal, Tabs, Tab, Snackbar, Alert, AlertTitle, SlideProps, Slide } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../../Global Components/NavBar";
//import { useRestSchedule } from "../../RestCalls/ScheduleUseRest";
import { useContext, useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";
import { useRestPaymentTransaction } from "../../RestCalls/PaymentTransactionUseRest";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import { ICollectionPaymentReceipt, IDirectPaymentReceipt, IEmployee, IOrder, IPaymentReceipt, IPaymentTransaction } from "../../RestCalls/Interfaces";
import { useRestEmployee } from "../../RestCalls/EmployeeUseRest";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import axios from "axios";
import { error } from "console";
import { ToastContainer, toast } from "react-toastify";


const StyledTableRow = styled(TableRow)({
    borderBottom: "1px #203949 solid",
});
const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginBottom: 50,
    marginLeft: '10%',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})
const ContentNameTypography2 = styled(Typography)({
    marginTop: 30,
    marginBottom: 10,
    marginLeft: '5%',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})


const StackStyle = styled(Stack)({
    position: 'absolute',
    justifyContent: 'flex-end',
    top: 525,
    left: '32%'
})
const StyleLabel = styled(Typography)({
    textAlign: 'left',
    fontWeight: '550',
    marginLeft: 180,
    marginTop: 20,
    color: '#707070',
    fontSize: '15px',
    width: 'max-content',
    fontFamily: 'Inter, sans-serif',
})
const StyleData = styled(Typography)({
    fontWeight: '550',
    position: 'absolute',
    textAlign: 'left',
    width: 600,
    left: 35,
    top: 20,
})
const LabelTypography = styled(Typography)({
    marginLeft: '-10%',
    top: '200px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '550',
    textAlign: 'center',
    fontSize: '17px',
    color: '#203949'
})
const StyleTextField = styled(TextField)({
    top: -15,
    left: 35,
    '& input':
    {
        textAlign: 'left',
        padding: '12px 12px'
    },

    [`& fieldset`]: {
        borderRadius: 50,
        height: 50,
        width: 400,
    }
})
const StyleTextField2 = styled(TextField)({
    top: 25,
    left: 125,
    '& input':
    {
        textAlign: 'left',
        padding: '6px 12px',

    },

    [`& fieldset`]: {
        borderRadius: 15,
        height: 40,
        width: 220,
    }
})
const StyleTextField3 = styled(TextField)({
    top: 15,
    left: 125,
    '& input':
    {
        textAlign: 'left',
        padding: '6px 12px',

    },

    [`& fieldset`]: {
        borderRadius: 15,
        height: 40,
        width: 220,
        top: 5
    }
})


const SearchButton = styled(IconButton)({
    backgroundColor: "#2d85e7",
    top: -15,
    left: 185,
    height: 47,
    width: 50,
    borderRadius: "0 50% 50% 0",
    '&:hover': {
        backgroundColor: "#2d85e7"
    }
})

const StyledButton = styled(Button)({
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 20,
    backgroundColor: '#2C85E7',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: '15px',
    width: '260px',
    height: 50,
    ':hover': {
        backgroundColor: '#2D85E7',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s',
})
const StyledButton1 = styled(Button)({
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 20,
    backgroundColor: 'rgb(45, 133, 231,0.8)',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: '15px',
    width: '260px',

    ':hover': {
        backgroundColor: '#2D85E7',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const StyledPaymentTransactionCard = styled(Card)({
    borderRadius: "22px",
    borderColor: 'black',
    border: '20px',
    width: '85%',
    padding: '10px 10px 10px 0px',
    margin: '28px 28% 20px 10%',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
});

const StyledPaymentTransactionCard1 = styled(Card)({
    borderRadius: "10px",
    borderColor: 'black',
    border: '20px',
    width: '90%',
    margin: "20px 28% 20px 7.2%",
    background: 'linear-gradient(50deg, rgba(255,255,255,0.4) 12%,rgba(255,255,255,0.1) 77% )',
    backgroundBlendMode: '',
    // backgroundColor:'rgb(245, 247, 249,0.4)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    boxShadow: '0 4px 7px 1px rgba(0,0,0,0.28)',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',

});
const StyledDatePicker = styled(DatePicker)({
    // marginBottom:'43px',
    width: '75%',
    left: 147,
    top: 25,
    input: {
        color: '#707070',
        fontFamily: 'Inter, sans-serif',
        marginBottom: -5,
        marginTop: -10,
    },
    [`& fieldset`]: {
        borderRadius: 15,
        height: 40,
        // width: '90%',
    }
});
const TableCellStyle = styled(TableCell)({
    fontWeight: '490',
    color: '#707070'
});

const ModalCard = styled(Card)({
    /* position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 1000,
    backgroundColor: 'background.paper',
    border: '2px', */

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '2px solid #000',
})

const TabStyle = styled(Tab)({
    width: 320,
    fontWeight: '550',
    label: {
        color: '#707070',
        fontWeight: 'bold',
        fontFamily: 'Inter',
    }
})

const DataGridStyle = styled(DataGrid)({
    textAlign: 'center',
    fontSize: 15,
    color: '#203949',
    height: '267px',
    margin: '2px 10px 0px 0px',
    borderRadius: '5px',
    border: '0px solid #e0e0e0',
    '& .MuiDataGrid-columnHeader': {
        backgroundColor: 'rgb(45, 133, 231, 0.2)',
        fontWeight: 'bold'
    },

    '& .MuiDataGrid-row:nth-child(even)': {
        backgroundColor: 'rgb(45, 133, 231, 0.1)',
    },
})

function SlideTransitionDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function RecordDirectPayment() {
    const [createPaymentTransaction, getPaymentTransactionByID, updatePaymentTransaction, getRemainingPaymentAmount, getTotalPaidAmount, paymentTransaction, totalPaidAmount, remainingPaymentAmount] = useRestPaymentTransaction();
    const [newOrder, getOrderByID, getOrderByPaymentTransactionID, assignCollector, removeCollector, order, orderFromPaymentTransaction, isOrderFound, assignedStatus, removeStatus, updateOrder, closedOrder, applyPenalty] = useRestOrder();
    const [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, isPaymentReceiptFound] = useRestPaymentReceipt();

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedPaymentTransaction, setSelectedPaymentTransaction] = useState<IPaymentTransaction | null>(null);
    const [selectedPaymentTransactionRow, setSelectedPaymentTransactionRow] = useState<IPaymentTransaction | null>(null);


    const [paymentReceipts, setPaymentReceipts] = useState<IPaymentReceipt[]>([]);
    const [directPaymentReceipts, setDirectPaymentReceipts] = useState<IDirectPaymentReceipt[]>([]);
    const [collectionPaymentReceipts, setCollectionPaymentReceipts] = useState<ICollectionPaymentReceipt[]>([]);


    const [showDirectPaymentReceiptsTable, setShowDirectPaymentReceiptsTable,] = useState(true);
    const [showCollectionPaymentReceiptsTable, setShowCollectionPaymentReceiptsTable] = useState(false);


    const [alerttitle, setTitle] = useState('');

    const [alertMessage, setAlertMessage] = useState('');

    const [alertSeverity, setAlertSeverity] = useState('success');

    const [openAlert, setOpenAlert] = useState(false);


    const [open, setOpen] = React.useState(false);

    const [tabValue, setTabValue] = React.useState('direct');

    const toggleTables = (tabValue: string) => {
        setTabValue(tabValue);
    };



    const handleOpen = () => {

        //setPaymentReceipts(response.data.paymentreceipts);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


    const orderIDRef = useRef<TextFieldProps>(null);
    const amountPaidRef = useRef<TextFieldProps>(null);
    const remarksRef = useRef<TextFieldProps>(null);

    const [maxDate, setMaxDate] = useState<Dayjs | null>(null);

    const userFromStorage = JSON.parse(localStorage.getItem("user")!);

    const userSignedIn =
        userFromStorage.tableName === 'Cashier'
            ? userFromStorage.cashier

            : userFromStorage.tableName === 'Sales Associate'
                ? userFromStorage.salesAssociate

                : userFromStorage.tableName === 'Sales Associate and Cashier'
                    ? userFromStorage.salesAssociateAndCashier
                    : userFromStorage.distributor;


    const handleFindPaymentTransactions = () => {
        if (userFromStorage && userFromStorage.tableName === 'Cashier') {
            getOrderByID(orderIDRef.current?.value + "", userFromStorage.cashier.distributor.distributorid);

        }
        else if (userFromStorage && userFromStorage.tableName === 'Sales Associate and Cashier') {
            getOrderByID(orderIDRef.current?.value + "", userFromStorage.salesAssociateAndCashier.distributor.distributorid);

        }
        else {
            getOrderByID(orderIDRef.current?.value + "", userFromStorage.distributor.distributorid);
        }
    };



    // const toggleTables = (table: string) => {
    //     if (table === 'direct') {
    //         setShowDirectPaymentReceiptsTable(true);
    //         setShowCollectionPaymentReceiptsTable(false);
    //     } else if (table === 'collection') {
    //         setShowDirectPaymentReceiptsTable(false);
    //         setShowCollectionPaymentReceiptsTable(true);
    //     }
    // };

    const clearInputValues = () => {
        setSelectedDate(null);
        setSelectedPaymentTransaction(null);

        if (remarksRef.current || amountPaidRef.current?.value) {
            remarksRef.current!.value = '';
            amountPaidRef.current!.value = '';

        }
    }

    function saveHandleAlert(title: string, message: string, severity: 'success' | 'warning' | 'error') {
        setTitle(title);
        setAlertMessage(message);
        setAlertSeverity(severity);
        setOpenAlert(true);
    }

    const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };



    const handleSaveDirectPayment = () => {


        const userSignedInID =
            userFromStorage.tableName === 'Cashier'
                ? userFromStorage.cashier.employeeid

                : userFromStorage.tableName === 'Sales Associate'
                    ? userFromStorage.salesAssociate.employeeid

                    : userFromStorage.tableName === 'Sales Associate and Cashier'
                        ? userFromStorage.salesAssociateAndCashier.employeeid

                        : userFromStorage.distributor.distributorid;


        if (!selectedPaymentTransaction || !selectedPaymentTransaction.paymenttransactionid || !selectedDate || !amountPaidRef.current?.value || isNaN(Number(amountPaidRef.current?.value)) || !remarksRef.current?.value) {
            toast.warning('Please fill all the necessary fields.');
            return;
        }
        const cashierFromStorage = JSON.parse(localStorage.getItem("cashier")!);

        if (Number(amountPaidRef.current?.value) > Number(remainingPaymentAmount!.toFixed(2))) {
            saveHandleAlert('Amount Paid Exceeded Amount Due', "Please make sure that the amount paid is less than or equal to the remaining amount to be paid.", 'warning')

            return;
        }

        createDirectPaymentReceipt({
            paymentreceiptid: uuidv4().slice(0, 8),
            remarks: remarksRef.current?.value + "",
            datepaid: selectedDate?.format('YYYY-MM-DD') || '',
            amountpaid: Number(amountPaidRef.current?.value),
            receivedamount: Number(amountPaidRef.current?.value),
            paymenttype: 'Direct',
            daterecorded: moment().format('YYYY-MM-DD'),
            paymenttransactionid: selectedPaymentTransaction?.paymenttransactionid!,
            receiverID: "",
            receivername: ""
        }, userSignedInID)


        const allPaid = order?.paymenttransactions.every((transaction) => transaction.paid);
        if (allPaid) {
            closedOrder(order?.orderid!);
        }

        clearInputValues();

    }


    const handleViewPaymentReceiptsButtonClick = (params: { row: any }) => {

        const selectedTransaction = order?.paymenttransactions.find(pt => pt.paymenttransactionid === params.row.paymentTransactionID);
        setPaymentReceipts(selectedTransaction ? selectedTransaction.paymentreceipts : []);
        if (selectedTransaction) {
            // Filter payment receipts by type
            setDirectPaymentReceipts(selectedTransaction.paymentreceipts.filter(
                receipt => receipt.paymenttype === 'direct' || receipt.paymenttype === 'Direct' 
            ) as IDirectPaymentReceipt[]);

            setCollectionPaymentReceipts(selectedTransaction.paymentreceipts.filter(
                receipt => receipt.paymenttype === 'collection' || receipt.paymenttype === 'Collection'
            ) as ICollectionPaymentReceipt[]);


        }

        getRemainingPaymentAmount(selectedTransaction ? selectedTransaction.paymenttransactionid : '');
        getTotalPaidAmount(selectedTransaction ? selectedTransaction.paymenttransactionid : '');

        handleOpen();
    }



    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const DirectPaymentReceiptcolumns: GridColDef[] = [
        { field: 'paymentReceiptID', headerName: 'Payment Receipt ID', width: 200 },
        { field: 'amountPaid', headerName: 'Amount Paid', width: 180 },
        { field: 'receiverName', headerName: 'Receiver Name', width: 160 },
        { field: 'remarks', headerName: 'Remarks', width: 160 },
        { field: 'datePaid', headerName: 'Date Paid', width: 180 },
    ]


    const DirectPaymentReceiptrows = directPaymentReceipts.map((pr) => {
        return {
            id: pr!.paymentreceiptid!,
            paymentReceiptID: pr.paymentreceiptid!,
            amountPaid: pr.amountpaid!,
            remarks: pr.remarks!,
            receiverName: pr!.receivername!,
            datePaid: pr.datepaid,
            daterecorded: pr.daterecorded,
            receivedamount: pr.receivedamount,

        }
    });


    const CollectionPaymentReceiptcolumns: GridColDef[] = [
        { field: 'paymentReceiptID', headerName: 'Payment Receipt ID', width: 200 },
        { field: 'amountPaid', headerName: 'Amount Paid', width: 180 },
        { field: 'confirmationStatus', headerName: 'Confirmation Status', width: 180 },
        { field: 'receiverName', headerName: 'Receiver Name', width: 160 },
        { field: 'remarks', headerName: 'Remarks', width: 160 },
        { field: 'collectionDate', headerName: 'Collection Date', width: 180 },
        { field: 'collectionAmount', headerName: 'Collection Amount', width: 180 },
        { field: 'confirmationDate', headerName: 'Confirmation Date', width: 180 },

    ]

    const CollectionPaymentReceiptrows = collectionPaymentReceipts.map((pr) => {
        return {
            id: pr!.paymentreceiptid!,
            paymentReceiptID: pr.paymentreceiptid!,
            amountPaid: pr.amountpaid!,
            remarks: pr.remarks!,
            receiverName: pr!.receivername!,
            collectionDate: pr.collectiondate,
            collectionAmount: pr.collectionamount,
            confirmationDate: pr.confirmationdate,
            confirmationStatus: pr.isconfirmed ? 'Confirmed' : 'Unconfirmed',

        }
    });



    const columns: GridColDef[] = [
        { field: 'paymentTransactionID', headerName: 'Payment Transaction ID', width: 200 },
        { field: 'installmentNumber', headerName: 'Installment Number', width: 180 },
        { field: 'paymentDueDate', headerName: 'Payment Due Date', width: 160 },
        { field: 'amountDue', headerName: 'Amount Due', width: 180 },

        {
            field: 'paymentStatus',
            headerName: 'Payment Status', width: 215,
            renderCell: (params) => (
                <span style={{ color: params.row.paymentStatus ? 'green' : 'red' }}>
                    {params.row.paymentStatus ? 'Paid' : 'Not Paid'}
                </span>
            ),
        },
        {
            field: 'actionView', headerName: '', width: 397, renderCell: (params: { row: any; }) => {
                return (
                    <div>
                        <StyledButton1
                            onClick={() => {
                                handleViewPaymentReceiptsButtonClick(params);
                            }}>
                            View Payment Receipts
                        </StyledButton1>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"

                        >
                            <ModalCard>

                                <ContentNameTypography2 sx={{ paddingTop: 5 }}>Payment Receipts</ContentNameTypography2>

                                <Box sx={{ width: showDirectPaymentReceiptsTable ? 'max-content' : '100' }}>
                                    {/* <StyledButton
                                        sx={{ width: 'max-content', margin: '20px' }}
                                        onClick={() => toggleTables('direct')}
                                    >
                                        Show Direct Payments
                                    </StyledButton>
                                    <StyledButton sx={{ width: 'max-content', margin: '20px' }}
                                        onClick={() => toggleTables('collection')} >
                                        Show Collection Payments
                                    </StyledButton> */}
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={tabValue} onChange={(event, newValue) => toggleTables(newValue)} style={{ marginLeft: 40 }}>
                                            <TabStyle label="Direct Payments" value="direct"></TabStyle>
                                            <TabStyle label="Collection Payments" value="collection"></TabStyle>
                                        </Tabs>
                                    </Box>
                                    {tabValue === 'direct' && (
                                        <>
                                            <DataGridStyle
                                                rows={DirectPaymentReceiptrows}
                                                sx={{ textAlign: 'center', color: '#203949', height: '230px', fontWeight: 330, margin: '10px', border: 'none', fontSize: '10' }}
                                                columns={DirectPaymentReceiptcolumns}

                                                initialState={{
                                                    pagination: {
                                                        paginationModel: {
                                                            pageSize: 2,
                                                        },
                                                    },
                                                }}
                                                pageSizeOptions={[2]}
                                            />
                                        </>
                                    )}
                                    {tabValue === 'collection' && (
                                        <DataGridStyle
                                            rows={CollectionPaymentReceiptrows}
                                            sx={{ textAlign: 'center', color: '#203949', height: '230px', width: '1245px', fontWeight: 330, margin: '10px', border: 'none', fontSize: '10' }}
                                            columns={CollectionPaymentReceiptcolumns}

                                            initialState={{
                                                pagination: {
                                                    paginationModel: {
                                                        pageSize: 2,
                                                    },
                                                },
                                            }}
                                            pageSizeOptions={[2]}
                                        />
                                    )}
                                </Box>



                                <Typography sx={{ marginTop: "20px", marginLeft: "50px" }}>
                                    Total Amount Paid: {totalPaidAmount!.toFixed(2)}
                                </Typography>
                                <Typography sx={{ marginBottom: "50px", marginLeft: "50px" }}>
                                    Remaining Payment Amount: {remainingPaymentAmount!.toFixed(2)}
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleClose}
                                    sx={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 10,
                                        borderRadius: '50%', // Make it circular
                                        width: '40px',
                                        height: '40px',
                                        minWidth: '40px',
                                        backgroundColor: '#FF8080', // Light red color
                                        '&:hover': {
                                            backgroundColor: '#FF0000', // Blood red color on hover
                                        },
                                    }}
                                >
                                    X
                                </Button>


                            </ModalCard>
                        </Modal>
                    </div>



                )
            }
        }

    ]

    const rows = order?.paymenttransactions!.sort((a, b) => {
        return a.installmentnumber - (b.installmentnumber);
    }).map((pt) => {
        return {
            id: pt!.paymenttransactionid!,
            paymentTransactionID: pt!.paymenttransactionid!,
            installmentNumber: pt!.installmentnumber!,
            paymentDueDate: pt!.enddate!,
            amountDue: pt!.amountdue!,
            paymentStatus: pt!.paid,

        }
    });




    useEffect(() => {
        if (userFromStorage && userFromStorage.tableName === 'Cashier') {
            getOrderByID(orderIDRef.current?.value + "", userFromStorage.cashier.distributor.distributorid);

        }
        else if (userFromStorage && userFromStorage.tableName === 'Sales Associate and Cashier') {
            getOrderByID(orderIDRef.current?.value + "", userFromStorage.salesAssociateAndCashier.distributor.distributorid);

        }
        else {
            getOrderByID(orderIDRef.current?.value + "", userFromStorage.distributor.distributorid);
        }
        if (order && order.paymenttransactions.length !== 0) {
            const allPaid = order.paymenttransactions?.every((transaction) => transaction.paid);

            if (allPaid) {
                closedOrder(order?.orderid!);
            }

        }

        setMaxDate(dayjs() as Dayjs);


    }, [order, order?.paymenttransactions]);


    return (

        <div style={{ paddingTop: 70 }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Grid container style={{ display: "flex", justifyContent: "center", }}>
                    <LabelTypography>Enter Order Transaction ID</LabelTypography>
                    <StyleTextField inputRef={orderIDRef} />
                    <SearchButton type="button" aria-label="search" onClick={handleFindPaymentTransactions}>
                        <SearchIcon sx={{ color: "white" }} />
                    </SearchButton>
                </Grid>
            </div>

            {order ? (
                <div>
                    {order.paymenttransactions.length !== 0 ? (
                        <div>

                            <StyledPaymentTransactionCard1>
                                <ContentNameTypography2>Payment Transactions</ContentNameTypography2>
                                <Box sx={{ p: 2 }}>
                                    <DataGridStyle
                                        rows={rows!}
                                        columns={columns}

                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: order.paymenttransactions.length,
                                                },
                                            },
                                        }}
                                        pageSizeOptions={[3]}
                                    />
                                </Box>
                            </StyledPaymentTransactionCard1>
                        </div>

                    ) : (
                        <div>
                    

                        </div>

                    )
                    }
                    {order?.isclosed ? (
                        <div>
                            <h1>All payment transactions have been paid. Order is closed.</h1>
                        </div>
                    ) : order.paymenttransactions.length !== 0 ? (
                        <div>
                            <Grid container style={{ display: "flex", justifyContent: "center", marginLeft: '-10%' }}>
                                <Grid item>
                                    <StyleLabel>Payment Transaction ID</StyleLabel>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={order.paymenttransactions!}
                                        getOptionLabel={(option) => option.paymenttransactionid}
                                        isOptionEqualToValue={(option, value) => option.paymenttransactionid === value.paymenttransactionid}
                                        value={selectedPaymentTransaction}
                                        onChange={(event, newValue) => {
                                            setSelectedPaymentTransaction(newValue);
                                            getRemainingPaymentAmount(newValue?.paymenttransactionid!);
                                        }}
                                        filterOptions={(options, state) => {
                                            return options.filter((option) => !option.paid);
                                        }}
                                        sx={{
                                            marginTop: 2,
                                            marginRight: 15,
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    disableUnderline: true,
                                                    sx: {
                                                        [`& fieldset`]: {
                                                            borderRadius: 15,
                                                            height: 40,
                                                            width: 220,
                                                            top: 4.5,
                                                            right: -250,
                                                        },
                                                        left: 180,
                                                    },
                                                }}
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item>
                                    <StyleLabel top={1}>Date Paid</StyleLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <StyledDatePicker
                                            slotProps={{
                                                textField: {
                                                    variant: 'outlined',
                                                },
                                            }}
                                            value={selectedDate}
                                            maxDate={maxDate}
                                            onChange={(date) => setSelectedDate(date as Dayjs | null)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item>
                                    <StyleLabel>Amount Paid</StyleLabel>
                                    <StyleTextField2 style={{ marginLeft: 63 }} inputRef={amountPaidRef} />
                                </Grid>
                                <Grid item>
                                    <StyleLabel>Remarks</StyleLabel>
                                    <StyleTextField2 style={{ marginLeft: 63 }} inputRef={remarksRef} />
                                </Grid>
                            </Grid>
                            <StyledButton
                                variant="contained"
                                color="primary"
                                onClick={handleSaveDirectPayment}>
                                Save Payment Record
                            </StyledButton>
                        </div>
                    ) : (
                        <div>
                            <h2 style={{ color: '#707070', marginTop: '50px' }}> No schedules yet.</h2>
                        </div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {/* Alerts */}
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleAlertClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }} TransitionComponent={SlideTransitionDown}>
                <Alert onClose={handleAlertClose} severity={alertSeverity as 'success' | 'warning' | 'error'} sx={{ width: 500 }} >
                    <AlertTitle style={{ textAlign: 'left', fontWeight: 'bold' }}>{alerttitle}</AlertTitle>
                    {alertMessage}
                </Alert>
            </Snackbar>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                limit={3}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ width: 450 }}
                theme="colored"
            />

        </div>
    );

}