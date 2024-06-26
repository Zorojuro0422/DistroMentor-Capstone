package com.group29.distromentorsystem.controllers;

import com.group29.distromentorsystem.models.Distributor;
import com.group29.distromentorsystem.services.DistributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;



@RestController
@CrossOrigin
@RequestMapping("/distributor")
public class DistributorController {

    @Autowired
    DistributorService distributorService;



    @PostMapping("/registerDistributor")
    public ResponseEntity<Object> registerDistributor(
            @ModelAttribute Distributor distributor,
            @RequestParam("documentid") List<String> documentIds,
            @RequestParam("name") List<String> documentNames,
            @RequestParam("type") List<String> documentTypes,
            @RequestParam("content") List<MultipartFile> documentContents
    )  {

        distributorService.registerDistributor(distributor, documentIds, documentNames, documentTypes, documentContents);
        return new ResponseEntity<>("Distributor registered successfully!", HttpStatus.CREATED);
    }

    /*@PostMapping("/registerDistributor")
    public ResponseEntity<Object> registerDistributor(@RequestBody Distributor distributor)  {
        distributorService.registerDistributor(distributor);

        return new ResponseEntity<>("Distributor registered successfully!", HttpStatus.CREATED);
    }*/


    @GetMapping("/getAllDistributors")
    public ResponseEntity<Object> getAllDistributors(){
        return  new ResponseEntity<>(distributorService.getAllDistributors(), HttpStatus.OK);
    }

    @GetMapping("/getDistributorByID/{distributorid}")
    public ResponseEntity<Object> getDistributorByID(@PathVariable String distributorid){
        return new ResponseEntity<>(distributorService.getDistributorByID(distributorid), HttpStatus.OK);
    }
}
