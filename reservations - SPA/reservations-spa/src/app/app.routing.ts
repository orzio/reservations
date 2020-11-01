import {Routes} from "@angular/router"
import { HomeComponent } from './home/home.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { OfficesComponent } from './offices/offices.component'
import { OfficeDetailComponent } from './offices/office-detail/office-detail.component'
import { OfficeEditComponent } from './offices/office-edit/office-edit.component'
import { RoomsComponent } from './offices/rooms/rooms.component'
import { DesksComponent } from './desks/desks.component'
import { OfficeResolverService } from './offices/offices-resolver.service'

export const appRoutes: Routes = [
    
    {path: '', component: HomeComponent,pathMatch:'full'},
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent},
        {path: 'offices', component: OfficesComponent,resolve: [OfficeResolverService],
        children:[
            {path:'new', component:OfficeEditComponent},
            {path:':id/edit', component:OfficeEditComponent},
            {path:':id/rooms', component:RoomsComponent},
            {path:':id/desks', component:DesksComponent},
            {path:':id', component:OfficeDetailComponent}
        ]},
    {path: '**',redirectTo:'/', pathMatch:'full'}
]