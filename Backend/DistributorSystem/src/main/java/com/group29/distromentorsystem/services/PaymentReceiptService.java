package com.group29.distromentorsystem.services;


import com.group29.distromentorsystem.models.Distributor;
import com.group29.distromentorsystem.models.Order;
import com.group29.distromentorsystem.models.PaymentReceipt;
import com.group29.distromentorsystem.models.PaymentTransaction;
import com.group29.distromentorsystem.repositories.DirectPaymentReceiptRepository;
import com.group29.distromentorsystem.repositories.OrderRepository;
import com.group29.distromentorsystem.repositories.PaymentReceiptRepository;
import com.group29.distromentorsystem.repositories.DistributorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentReceiptService {

    @Autowired
    PaymentReceiptRepository paymentReceiptRepository;

    @Autowired
    DirectPaymentReceiptRepository directPaymentReceiptRepository;

    @Autowired
    DistributorRepository distributorRepository;

    @Autowired
    OrderRepository orderRepository;

    public Iterable<PaymentReceipt> getAllPaymentReceipts(){
       return paymentReceiptRepository.findAll();
    }

    
    public Optional<PaymentReceipt> getPaymentReceiptByID(String paymentreceiptid){
        return paymentReceiptRepository.findById(paymentreceiptid);
    }


    public List<PaymentReceipt> getAllPaymentReceiptsByDistributorID(String distributorid) {

        List<PaymentReceipt> paymentReceipts = new ArrayList<>();
        Optional<Distributor> distributorOptional = distributorRepository.findById(distributorid);

        if (distributorOptional.isPresent()) {
            Distributor distributor = distributorOptional.get();

            for (String orderId : distributor.getOrderids()) {
                Optional<Order> orderOptional = orderRepository.findById(orderId);

                if (orderOptional.isPresent()) {
                    Order order = orderOptional.get();

                    for (PaymentTransaction paymentTransaction : order.getPaymenttransactions()) {

                        for (PaymentReceipt pr:paymentTransaction.getPaymentreceipts()) {
                                paymentReceipts.add(pr);
                            }
                        }
                    }
                }
            }

        return paymentReceipts;
        // return collectionPaymentReceiptRepository.findByPaymenttransactionid_Order_Distributor_DistributoridAndIsconfirmedFalse(distributorid);
    }
}
