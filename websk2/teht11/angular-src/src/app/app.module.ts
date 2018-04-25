import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { StudentDataService } from './services/student-data.service';
import { ReactiveFormsModule } from '@angular/forms';
 

import { CanActivate } from '@angular/router';
import { PopupComponent } from './components/popup/popup.component';

const appRoutes: Routes = [
  {path: '', component: StudentListComponent},
  // dashboard - route is being filtered by the authGuardService
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]}, 
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    StudentListComponent,
    NavbarComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    StudentDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
