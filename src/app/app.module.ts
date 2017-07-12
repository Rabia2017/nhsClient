import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';

import { AppComponent }  from './app.component';
import { PatientComponent }  from './patient.component';
import { PatientService } from './patient.service';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

@NgModule({
  imports: [     
        BrowserModule,
		HttpModule,
		ReactiveFormsModule,
            RouterModule.forRoot([{path:'patient-details',
            component:PatientDetailsComponent},{
            path:'patient',component:PatientComponent
      }])
  ],
  declarations: [
        AppComponent,
		PatientComponent,
		PatientDetailsComponent
  ],
  providers: [
        PatientService
  ]
  ,
  bootstrap: [
        AppComponent
  ]
})
export class AppModule {
 }
