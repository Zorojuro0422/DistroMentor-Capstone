package com.group29.distromentorsystem.services;


import com.group29.distromentorsystem.models.EmployeeDocument;
import com.group29.distromentorsystem.repositories.EmployeeDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeDocumentService {

    @Autowired
    EmployeeDocumentRepository employeeDocumentRepository;

    /*public EmployeeDocument createDealerDocument(String documentid, String name, String type, MultipartFile content, String dealer){
        EmployeeDocument document = new EmployeeDocument();
        *//*document.setDocumentid(documentid);
        document.setName(name);
        document.setType(type);
        document.setDealer(dealer);
        try {
            document.setContent(content.getBytes());
        } catch (IOException e) {
            System.err.println("Error reading file bytes for attachment: " + document.getName());
            e.printStackTrace();

        }*//*

        return dealerDocumentRepository.save(document);
    }*/

    public Iterable<EmployeeDocument> findAllDocumentsByEmployeeId(String employeeid){
        return employeeDocumentRepository.findByEmployee_Employeeid(employeeid);
    }
}
