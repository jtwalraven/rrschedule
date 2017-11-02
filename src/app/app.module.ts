import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProcessTableComponent } from './process-table/process-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as md from './material-design';

@NgModule({
  declarations: [
    AppComponent,
    ProcessTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    md.MatButtonModule,
    md.MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
