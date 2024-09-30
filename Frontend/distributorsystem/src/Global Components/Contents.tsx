import React, { useState } from 'react';
import { Outlet, useLocation , useParams} from 'react-router-dom';
import NewNavBar from './NewNavBar';
import { AppBar, Container, Toolbar } from '@mui/material';
import NewAppBar from './NewAppBar';


export default function Content() {
  const location = useLocation();
  const {objectId} =useParams();
  const getNavNamePage=()=>{
    const path=location.pathname;
    const navPageNameMapping: Record<string,string>={
        '/dashboard':'Dashboard',
        '/productlist': 'Product List',
        '/collectorAssignment':'Collector Assignment',
        '/dealerProfileList': 'Dealer Profiles List',
        '/employeeProfileList': 'Employee Profiles List',
        '/addproduct': 'Add Product',
        '/productDistributionList':'Product Distribution List',
        '/paymentList':'Payment Receipts',
        '/distributorOrderForm': 'Product Distribution Form',
        '/dealerOrderForm':'Product Distribution Form',
        [`/dealerProfileDetails/${objectId}`] : 'Dealer Information',
        [`/customer/${objectId}`] : 'Customer List',
        [`/employeeProfileDetails/${objectId}`] : 'Employee Information',
        [`/orderDetails/${objectId}`] : 'Order Transaction Details',
        [`/orderTransactionDetails/${objectId}`] : 'Order Transaction Details',
        [`/paymentReceiptDetails/${objectId}`] : 'Payment Receipt Details',
        [`/schedules/${objectId}`] : 'Schedule',
        '/recordDirectPayment':'Record Direct Payment',
        [`/distributorProfileDetails/${objectId}`] :'Distributor Information',
        [`/orderConfirmation/${objectId}`] : `Order Confirmation Details`,
    }
    const navpageMapped= navPageNameMapping[path]||'Unknown';
    return navpageMapped;
}
const getNavContentPage=()=>{
 
  const path=location.pathname;

  const navPageContentMapping: Record<string,string>={
      '/dashboard':'Your pendings overview',
      '/addproduct': 'Product Entry',
      '/productlist': 'Viewing of Products',
      '/update_product': 'Viewing of Products',
      '/collectorAssignment':'Assign, reassign, or unassign collector to your order',
      '/dealerProfileList': 'View unconfirmed & confirmed Dealers, awaiting for your confirmation.',
      '/employeeProfileList': 'List of your emplooyes',
      '/productDistributionList':'View confirmed & pending product orders from your dealers, awaiting for your confirmation.',
      '/paymentList':"List of Dealer's Payment Receipts",
      '/distributorOrderForm': "Allocate a product to generate a dealer's order.",
      '/dealerOrderForm':'Allocate a product to generate a your order.',
      [`/dealerProfileDetails/${objectId}`]  : `View dealer profile details - ${objectId}`,
      [`/customer/${objectId}`] : `View dealer customer list - ${objectId}`,
      [`/employeeProfileDetails/${objectId}`] : `View employee profile details - ${objectId}`,
      [`/orderDetails/${objectId}`] : `View dealer's order transaction details - Order Transaction ID: ${objectId}`,
      [`/orderTransactionDetails/${objectId}`] : `View dealer's order transaction details - Order Transaction ID:  ${objectId}`  ,
      [`/paymentReceiptDetails/${objectId}`] : `View payment receipt details - Receipt ID : ${objectId}`,
      [`/schedules/${objectId}`] : `Set schedule of due date/s on dealer's order transaction`,
      '/recordDirectPayment':'View, Update and Record Direct Payment from your dealer/s',
      [`/distributorProfileDetails/${objectId}`] : `View distributor profile details - ${objectId}`,
      [`/orderConfirmation/${objectId}`] : `View, update, or confirm dealer's ordered products - ${objectId}`,
    }
  const navpageMapped= navPageContentMapping[path]||'Unknown';
  return navpageMapped;
}

    return (
      <div>
        <NewAppBar moduleName={getNavNamePage()} moduleContent={getNavContentPage()}/>
        <NewNavBar/>   
        <div style={{paddingTop:60}}>
         <Outlet/>
        </div>
      </div>
    );
}