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
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [OfficeService,CommunicationService,RoomService, DeskService, {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},AuthGuard],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
