import { Button, Grid, Modal, Stack, Typography, styled } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import { ICollectionPaymentReceipt, ICollectorRemittanceProof, IDealerPaymentProof, IDirectPaymentReceipt, IOrder, IPaymentReceipt } from "../../RestCalls/Interfaces";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import axios from "axios";

const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginLeft: '10%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})

const StyledCollectorHeader = styled(Typography)({
    marginTop: '435px',
    marginLeft: '12%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '20px',
    color: '#203949'
})
const StyledDealerHeader = styled(Typography)({
    marginTop: '-207px',
    marginLeft: '52%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '20px',
    color: '#203949'
})

const StackStyle = styled(Stack)({
    position: 'absolute',
    top: '150px',
    //left: '32%'
})
const StyleLabel = styled(Typography)({
    paddingTop: 40,
    position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    left: '30px',
    color: '#707070',
    fontSize: '15px',
    width: 'max-content',
    fontFamily: 'Inter',
})
const StyleData = styled(Typography)({
    paddingTop: 45,
    fontWeight: '550',
    position: 'absolute',
    textAlign: 'left',
    width: 600,
    left: '50px',
    top: '35px',
    color: '#203949',
    fontSize: '15px',
    fontFamily: 'Inter, sans - serif',
})

const ButtonDealerProof = styled(Button)({
    background: "#F5F7F9",
    color: "#203949",
    fontSize: 15,
    marginLeft: 600,
    marginTop: 25,
    marginBottom: 5,
    fontWeight: 'bold',
    borderRadius: 10,
    width: '220px',
    height: '60px',
    ':hover': {
        backgroundColor: '#F5F7F9',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
});

const ButtonColectorProof = styled(Button)({
    background: "#F5F7F9",
    color: "#203949",
    fontSize: 15,
    marginLeft: -720,
    marginTop: 25,
    marginBottom: 5,
    fontWeight: 'bold',
    borderRadius: 10,
    width: '220px',
    height: '60px',
    ':hover': {
        backgroundColor: '#F5F7F9',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
});



export function PaymentReceiptDetailsPrint({paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, order}: { paymentReceipt: IPaymentReceipt, directPaymentReceipt: IDirectPaymentReceipt, collectionPaymentReceipt: ICollectionPaymentReceipt, order: IOrder}) {
    


    return (
        <div>
            <ContentNameTypography>Payment Receipt Details</ContentNameTypography>
            <StackStyle sx={{ left: '12%' }}>
                <StyleLabel>Receipt ID</StyleLabel>
                <StyleData>{paymentReceipt?.paymentreceiptid}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '27%' }}>
                <StyleLabel>Payment Transaction ID</StyleLabel>
                <StyleData>{paymentReceipt?.paymenttransactionid}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '44%' }}>
                <StyleLabel>Dealer ID</StyleLabel>
                <StyleData>{order?.dealer.dealerid}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '58%' }}>
                <StyleLabel>Dealer Name</StyleLabel>
                <StyleData>{order?.dealer.firstname! + " " + order?.dealer.lastname!}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '72%' }}>
                <StyleLabel>Payment Type</StyleLabel>
                <StyleData>{paymentReceipt?.paymenttype}</StyleData>
            </StackStyle>

            {paymentReceipt && paymentReceipt?.paymenttype === 'direct' ? (
                <div>

                    <StackStyle sx={{ top: '30%', left: '12%' }}>
                        <StyleLabel>Date Paid</StyleLabel>
                        <StyleData>{new Date(directPaymentReceipt?.datepaid!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '30%', left: '28%' }}>
                        <StyleLabel>Amount Collected</StyleLabel>
                        <StyleData>{directPaymentReceipt?.amountpaid}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '30%', left: '44%' }}>
                        <StyleLabel>Receiver Name</StyleLabel>
                        <StyleData>{paymentReceipt?.receivername
                        } </StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '30%', left: '60%' }}>
                        <StyleLabel>Remarks</StyleLabel>
                        <StyleData>{paymentReceipt?.remarks}</StyleData>
                    </StackStyle>

                </div>

            ) : (
                <div>
                    <StackStyle sx={{ top: '30%', left: '12%' }}>
                        <StyleLabel>Date Collected</StyleLabel>
                        <StyleData>{new Date(collectionPaymentReceipt?.collectiondate!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '30%', left: '28%' }}>
                        <StyleLabel>Amount Collected</StyleLabel>
                        <StyleData>{collectionPaymentReceipt?.collectionamount}</StyleData>
                    </StackStyle>
                    
                    <StackStyle sx={{ top: '30%', left: '44%' }}>
                        <StyleLabel>Collector Name</StyleLabel>
                        <StyleData>{order?.collector!.firstname + " " + order?.collector!.lastname}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '47%', left: '12%' }}>
                        <StyleLabel>Payment Status</StyleLabel>
                        <StyleData>{collectionPaymentReceipt?.isconfirmed ? "Confirmed" : "Unconfirmed"}</StyleData>
                    </StackStyle>

                    <StackStyle sx={{ top: '47%', left: '27%' }}>
                        <StyleLabel>Date Confirmed</StyleLabel>
                        <StyleData>{new Date(collectionPaymentReceipt?.confirmationdate!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</StyleData>
                    </StackStyle>

                    <StackStyle sx={{ top: '47%', left: '44%' }}>
                        <StyleLabel>Receiver Name</StyleLabel>
                        <StyleData>{collectionPaymentReceipt?.isconfirmed ? paymentReceipt?.receivername
                            : 'NA'}</StyleData>
                    </StackStyle>

                    <StackStyle sx={{ top: '47%', left: '60%' }}>
                        <StyleLabel>Remarks</StyleLabel>
                        <StyleData>{paymentReceipt?.remarks}</StyleData>
                    </StackStyle>

                   
                  

                   
                </div >
            )
            }
        </div >
    );
}