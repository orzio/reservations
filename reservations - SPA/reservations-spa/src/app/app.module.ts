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
import {HttpClientModule} from '@angular/common/http';
import { OfficeListComponent } from './offices/office-list/office-list.component';
import { OfficesComponent } from './offices/offices.component';
import { OfficeItemComponent } from './offices/office-list/office-item/office-item.component';
import { OfficeDetailComponent } from './offices/office-detail/office-detail.component';
import { OfficeService } from './_services/office.service';
import { OfficeEditComponent } from './offices/office-edit/office-edit.component';
import { RoomsComponent } from './offices/rooms/rooms.component';
import { DesksComponent } from './desks/desks.component';
import { RoomListComponent } from './offices/rooms/room-list/room-list.component';
import { RoomDetailComponent } from './offices/rooms/room-detail/room-detail.component';
import { RoomEditComponent } from './offices/rooms/room-edit/room-edit.component';
import { DeskListComponent } from './desks/desk-list/desk-list.component';
import { DeskItemComponent } from './desks/desk-list/desk-item/desk-item.component';
import { DeskDetailComponent } from './desks/desk-detail/desk-detail.component';
import { DeskEditComponent } from './desks/desk-edit/desk-edit.component';
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
    DesksComponent,
    RoomListComponent,
    RoomDetailComponent,
    RoomEditComponent,
    DeskListComponent,
    DeskItemComponent,
    DeskDetailComponent,
    DeskEditComponent,

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
  providers: [OfficeService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
