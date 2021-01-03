import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {appRoutes} from './app.routing';
import { RouterModule } from '@angular/router';
import { FotterComponent } from './fotter/fotter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { OfficeListComponent } from './offices/office-list/office-list.component';
import { OfficesComponent } from './offices/offices.component';
import { OfficeItemComponent } from './offices/office-list/office-item/office-item.component';
import { OfficeDetailComponent } from './offices/office-detail/office-detail.component';
import { OfficeService } from './_services/office.service';
import { OfficeEditComponent } from './offices/office-edit/office-edit.component';
import { RoomsComponent } from './offices/rooms/rooms.component';
import { DesksComponent } from './offices/desks/desks.component';
import { RoomListComponent } from './offices/rooms/room-list/room-list.component';
import { RoomDetailComponent } from './offices/rooms/room-detail/room-detail.component';
import { RoomEditComponent } from './offices/rooms/room-edit/room-edit.component';
import { DeskListComponent } from './offices/desks/desk-list/desk-list.component';
import { DeskItemComponent } from './offices/desks/desk-list/desk-item/desk-item.component';
import { DeskEditComponent } from './offices/desks/desk-edit/desk-edit.component';
import { CommunicationService } from './_services/communcation.service';
import { RoomService } from './_services/room.service';
import { RoomItemComponent } from './offices/rooms/room-list/room-item/room-item.component';
import { DeskService } from './_services/desk.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptor } from './_services/auth-interceptor.service';
import { AuthGuard } from './_services/auth-guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { ResetPasswordService } from './_services/resetPasswrod.service';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AddressService } from './_services/address.service';
import { DeskCityComponent } from './desk-city/desk-city.component';
import { DeskCityListComponent } from './desk-city/desk-city-list/desk-city-list.component';
import { DeskCityItemComponent } from './desk-city/desk-city-list/desk-city-item/desk-city-item.component';
import { RoomCityComponent } from './room-city/room-city.component';
import { RoomCityListComponent } from './room-city/room-city-list/room-city-list.component';
import { RoomCityItemComponent } from './room-city/room-city-list/room-city-item/room-city-item.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import { DeskReservationService } from './_services/deskReservation.service';
import { RoomReservationService } from './_services/roomReservation.Service';
import { RoomCallendarComponent } from './room-callendar/room-callendar.component';
import { DeskCallendarComponent } from './desk-callendar/desk-callendar.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { OfficeDetailsPopupComponent } from './office-details-popup/office-details-popup.component';
import { RoomOfficeDetailsComponent } from './room-office-details/room-office-details.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { RoomReservationListComponent } from './user-reservations/room-reservation-list/room-reservation-list.component';
import { RoomReservationItemComponent } from './user-reservations/room-reservation-list/room-reservation-item/room-reservation-item.component';
import { DeskReservationListComponent } from './user-reservations/desk-reservation-list/desk-reservation-list.component';
import { DeskReservationItemComponent } from './user-reservations/desk-reservation-list/desk-reservation-item/desk-reservation-item.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RoomSignalRService } from './_services/roomSignalR.service';
import { DeskSignalRService } from './_services/deskSignalR.service';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    FotterComponent,
    OfficeListComponent,
    OfficesComponent,
    OfficeItemComponent,
    OfficeDetailComponent,
    OfficeEditComponent,
    RoomsComponent,
    RoomListComponent,
    RoomDetailComponent,
    RoomEditComponent,
    RoomItemComponent,
    DesksComponent,
    DeskListComponent,
    DeskItemComponent,
    DeskEditComponent,
    LoadingSpinnerComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SearchBarComponent,
    DeskCityComponent,
    DeskCityListComponent,
    DeskCityItemComponent,
    RoomCityComponent,
    RoomCityListComponent,
    RoomCityItemComponent,
    DeskCallendarComponent,
    RoomCallendarComponent,
    BackButtonComponent,
    OfficeDetailsPopupComponent,
    RoomOfficeDetailsComponent,
    UserReservationsComponent,
    RoomReservationListComponent,
    RoomReservationItemComponent,
    DeskReservationListComponent,
    DeskReservationItemComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    FormsModule, 
    FullCalendarModule, // register FullCalendar with you app
    ReactiveFormsModule, CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [OfficeService,CommunicationService,AddressService,RoomSignalRService,DeskSignalRService,
    DeskReservationService, RoomReservationService,RoomService,ResetPasswordService, DeskService, {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},AuthGuard],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
