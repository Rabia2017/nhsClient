import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Patient } from './patient';

@Injectable()
export class PatientService {
    //URLs for CRUD operations
    allPatientsUrl = "http://localhost:8080/nhs/all-patients";
	patientUrl = "http://localhost:8080/nhs/patient";
	patient:Patient;

	//Create constructor to get Http instance
	constructor(private http:Http) { 
	}
	//Fetch all patients
    getAllPatients(): Observable<Patient[]> {
        return this.http.get(this.allPatientsUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }
	//Create patient
    createPatient(patient: Patient):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.patientUrl, patient, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch Patient by id
    getPatientById(patientId: string): Observable<Patient> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', patientId);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.patientUrl, options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	//Update patient
    updatePatient(patient: Patient):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log("inside update ", patient.name)
		return this.http.put(this.patientUrl, patient, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete patient	
    deletePatientById(patientId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', patientId);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.delete(this.patientUrl, options)
			   .map(success => success.status)
			   .catch(this.handleError);
    }		
	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}