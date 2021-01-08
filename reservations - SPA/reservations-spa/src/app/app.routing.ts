import {Routes} from "@angular/router"
import { HomeComponent } from './home/home.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { OfficesComponent } from './offices/offices.component'
import { OfficeDetailComponent } from './offices/office-detail/office-detail.component'
import { OfficeEditComponent } from './offices/office-edit/office-edit.component'
import { RoomsComponent } from './offices/rooms/rooms.component'
import { DesksComponent } from './offices/desks/desks.component'
import { OfficeResolverService } from './offices/offices-resolver.service'
import { RoomResolverService } from './offices/rooms/rooms-resolver.service'
import { RoomEditComponent } from './offices/rooms/room-edit/room-edit.component'
import { RoomDetailComponent } from './offices/rooms/room-detail/room-detail.component'
import { DeskEditComponent } from './offices/desks/desk-edit/desk-edit.component'
import { DeskResolverService } from './offices/desks/desk-resolver.service'
import { AuthGuard } from './_services/auth-guard'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component'
import { CityResolverService } from './home/cities-resolver.service'
import { DeskCityListComponent } from './desk-city/desk-city-list/desk-city-list.component'
import { DeskEventsResolverService } from './desk-callendar/desk-events-resolver.service'
import { RoomCityListComponent } from './room-city/room-city-list/room-city-list.component'
import { DeskCallendarComponent } from './desk-callendar/desk-callendar.component'
import { RoomCallendarComponent } from './room-callendar/room-callendar.component'
import { RoomEventsResolverService } from './room-callendar/room-events-resolver.service'
import { RoomCityComponent } from './room-city/room-city.component'
import { DeskCityComponent } from './desk-city/desk-city.component'
import { UserReservationsComponent } from './user-reservations/user-reservations.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { Component } from '@angular/core'
import { PhotoComponent } from './photo/photo.component'
import { ManagerReservationComponent } from './manager-reservation/manager-reservation.component'


export const appRoutes: Routes = [
    {path: '', component: HomeComponent,pathMatch:'full', resolve: [CityResolverService]},
  
        {path:'manager/reservations', component:ManagerReservationComponent},
        {path: 'login', component: LoginComponent},
        {path:'forgotpassword',component:ForgotPasswordComponent},
        {path:'forgotpassword/resetpassword',component:ResetPasswordComponent},
        {path: 'register', component: RegisterComponent},
        {path: 'user/profile', component: UserProfileComponent},
        // {path:'callendar', component:CallendarComponent},
        {path:'callendar/desk/:deskId', component:DeskCallendarComponent, resolve:[DeskEventsResolverService]},
        {path:'callendar/room/:roomId', component:RoomCallendarComponent, resolve:[RoomEventsResolverService]},
        {path: 'offices', component: OfficesComponent,resolve: [OfficeResolverService],
        canActivate:[AuthGuard],
        children:[
            {path:'new', component:OfficeEditComponent},
            {path:':id/edit', component:OfficeEditComponent},
            {path:':id/rooms', component:RoomsComponent,resolve:[RoomResolverService],
                children:[
                    {path:'new', component:RoomEditComponent},
                    {path:':roomId', component:RoomDetailComponent},
                    {path:':roomId/edit', component:RoomEditComponent}
                    ]},
            {path:':id/desks', component:DesksComponent,resolve:[DeskResolverService],
                children:[
                {path:'new', component:DeskEditComponent},
            ]},
            {path:':id', component:OfficeDetailComponent,resolve: [OfficeResolverService]}
        ]},

        {path: 'offices/desks/city', component: DeskCityComponent,
        children:[
            {path:'new', component:OfficeEditComponent},
            {path:':id/edit', component:OfficeEditComponent},
            {path:':id/rooms', component:RoomsComponent,resolve:[RoomResolverService],
                children:[
                    {path:'new', component:RoomEditComponent},
                    {path:':roomId', component:RoomDetailComponent},
                    {path:':roomId/edit', component:RoomEditComponent}
                    ]},
            {path:':id/desks', component:DesksComponent,resolve:[DeskResolverService],
                children:[
                {path:'new', component:DeskEditComponent},
            ]},
            {path:':id', component:OfficeDetailComponent,resolve: [OfficeResolverService]}
        ]},
        {path:'offices/rooms/city', component:RoomCityComponent},
        {path: 'user/reservations', component:UserReservationsComponent},
        // {path:'photo',component:ImageUploadComponent},
        {path:'photo',component:PhotoComponent},



    {path: '**',redirectTo:'/', pathMatch:'full'}
]