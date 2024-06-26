package com.group29.distromentorsystem.controllers;

import com.group29.distromentorsystem.models.Employee;
import com.group29.distromentorsystem.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @PostMapping("/registerEmployee")
    public ResponseEntity<Object> registerEmployee(
            @ModelAttribute Employee employee,
            @RequestParam("documentid") List<String> documentIds,
            @RequestParam("name") List<String> documentNames,
            @RequestParam("type") List<String> documentTypes,
            @RequestParam("content") List<MultipartFile> documentContents){
        employeeService.registerEmployee(employee, documentIds, documentNames, documentTypes, documentContents);

        return new ResponseEntity<>("Employee registered successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/getAllEmployees")
    public ResponseEntity<Object> getAllEmployees(){
        return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.OK);
    }

    @GetMapping("/getAllCollectors")
    public ResponseEntity<Object> getAllCollectors(){
        return new ResponseEntity<>(employeeService.getAllCollectors(), HttpStatus.OK);
    }

    @GetMapping("/getEmployeeByID/{employeeid}")
    public ResponseEntity<Object> getEmployeeByID(@PathVariable String employeeid){
        return new ResponseEntity<>(employeeService.getEmployeeByID(employeeid), HttpStatus.OK);
    }
    @GetMapping("/getCollectorByID")
    public ResponseEntity<Object> getCollectorByID(@RequestParam String employeeid){
        return new ResponseEntity<>(employeeService.getCollectorByID(employeeid), HttpStatus.OK);
    }

    @GetMapping("/getAllEmployeesByDistributorID/{distributorid}")
    public ResponseEntity<Object> getAllEmployeesByDistributorID(@PathVariable String distributorid) {
        return new ResponseEntity<>(employeeService.getAllEmployeesByDistributorID(distributorid), HttpStatus.OK);
    }

    @GetMapping("/getAllCollectorsByDistributorID/{distributorid}")
    public ResponseEntity<Object> getAllCollectorsByDistributorID(@PathVariable String distributorid) {
        return new ResponseEntity<>(employeeService.getAllCollectorsByDistributorID(distributorid), HttpStatus.OK);
    }

}
