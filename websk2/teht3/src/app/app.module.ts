import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { SubscribeFormComponent } from './subscribe-form/subscribe-form.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormDataService } from './form-data.service';

import { LocalStorageService } from './local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    SubscribersComponent,
    SubscribeFormComponent,
    NavbarComponent
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
