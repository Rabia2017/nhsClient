
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PatientService } from './patient.service';
import { Patient } from './patient';

@Component({
   selector: 'app-patient',
   templateUrl: './patient.component.html',
   styleUrls: ['./patient.component.css'],
   })
export class PatientComponent implements OnInit { 
   //Component properties
   allPatients: Patient[];
   statusCode: number;
   requestProcessing = false;
   //patient : Patient; 
   patientIdToUpdate =  null;
   processValidation = false;
   name : string;
   patientId :string;
   
   //Create form
   patientForm = new FormGroup({
    
      patientId:new FormControl(''),
      name: new FormControl('')
      
   });
   //Create constructor to get service instance
   constructor(private patientService: PatientService, private router:Router ) {
    if (this.patientService.patient!=undefined && this.patientService.patient.patientId!=null){
      this.patientIdToUpdate=this.patientService.patient.patientId;
      this.name = this.patientService.patient.name;
      this.patientId=this.patientService.patient.patientId;
      this.loadPatientWithName(this.patientIdToUpdate) ; 
      
    }
  }
   //Create ngOnInit() 
   ngOnInit(): void {
     
	}   
    //Handle create and update patient
   onPatientFormSubmit() {
	  this.processValidation = true;   
	  if (this.patientForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
    this.preProcessConfigurations();
	  let name = this.patientForm.get('name').value.trim();
    let name2=this.name;
    console.log("onPatientFormSubmit " + name + name2);  
	  if (this.patientIdToUpdate === null) {  
	    //Handle create patient
	    let patient= new Patient(null, name);	
      console.log("onPatientFormSubmit " + name );  
	    this.patientService.createPatient(patient)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    //this.getAllPatients();	
            //this.patientForm.reset();
					this.backToPatientList();
			    },
		        errorCode => this.statusCode = errorCode);
	  } else {  
   	    //Handle update patient
      let patient= new Patient(this.patientIdToUpdate,(name)?name:name2);	  
      console.log("inside update" + patient.name );  
    
      this.patientService.updatePatient(patient)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
					  this.backToPatientList();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }

   //Load patient by id to edit
  loadPatientWithName(patientId: string) {
      this.preProcessConfigurations();
      this.patientService.getPatientById(patientId)
	      .subscribe(patient => {
		            this.patientIdToUpdate = patient.patientId;   
		            console.log("***inside loadPatientWithNme", patient.name ," " ,patient.patientId );
                this.patientForm.setValue({ patientId: patient.patientId});
                this.patientForm.setValue({ name: patient.name});
               
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   backToCreatePatient(){
     this.patientForm.reset();
     this.patientIdToUpdate=null;
     this.patientService.patient=undefined;
   }
   //Go back from update to create
   backToPatientList() {
      this.patientIdToUpdate = null;
      //this.patientForm.reset();
      this.router.navigateByUrl('/patient-details');
	  
   }
  

}
    