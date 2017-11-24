import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProcessTableComponent } from './process-table/process-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as md from './material-design';
import { TimeQuantumComponent } from './time-quantum/time-quantum.component';
import { ResultsComponent } from './results/results.component';

import { D3Service } from 'd3-ng2-service';

@NgModule({
  declarations: [
    AppComponent,
    ProcessTableComponent,
    TimeQuantumComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    md.MatInputModule,
    md.MatCardModule,
    md.MatButtonModule,
    md.MatTableModule,
    md.MatCheckboxModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
