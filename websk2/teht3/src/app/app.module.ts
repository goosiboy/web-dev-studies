import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SubscribeFormComponent } from './subscribe-form/subscribe-form.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormDataService } from './form-data.service';

import { LocalStorageService } from './local-storage.service';
import { SubscriberListComponent } from './subscriber-list/subscriber-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscribeFormComponent,
    NavbarComponent,
    SubscriberListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormDataService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
