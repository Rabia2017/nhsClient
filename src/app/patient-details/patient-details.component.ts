import { Component, OnInit } from '@angular/core';
import { PatientService } from './../patient.service';
import { Patient } from './../patient';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  //styleUrls: ['./patient-details.component.css'],
 })
export class PatientDetailsComponent implements OnInit {

   allPatients: Patient[];
    statusCode: number; 
    
   requestProcessing = false;
   patientIdToUpdate = null;
   processValidation = false;

    
    //Create constructor to get service instance
   constructor(private patientService: PatientService,private router:Router
   ,private http:HttpModule
   ) {
   }
    ngOnInit(): void {
	  this.getAllPatients();
    
   } 
   //Fetch all patients
   getAllPatients() {
        this.patientService.getAllPatients()
		  .subscribe(
                data => this.allPatients = data,
                errorCode =>  this.statusCode = errorCode);   
   }  
   //Load patient by id to edit
   loadPatientToEdit(patientId: string) {
      this.preProcessConfigurations();
      this.patientService.getPatientById(patientId)
	      .subscribe(patient => {
		            this.patientIdToUpdate = patient.patientId;   
		            //this.patientForm.setValue({ patientId: patient.patientId});
                //this.patientForm.setValue({ name: patient.name});
                
					this.processValidation = true;
					this.backToCreatePatient(patient);
          this.requestProcessing = false;   
		        },
      errorCode =>  this.statusCode = errorCode);    
 
   }
   //Delete patient
   deletePatient(patientId: string) {
      this.preProcessConfigurations();
      this.patientService.deletePatientById(patientId)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllPatients();	
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }


   
   //Go back from update to create
   backToCreatePatient(patient:Patient) {
     console.log("******** inside backToCreatePatient");
     console.log("patientID " + patient.patientId + " name " + patient.name);
       this.patientService.patient = patient;
       this.router.navigateByUrl("/patient",patient); 
  }

}
