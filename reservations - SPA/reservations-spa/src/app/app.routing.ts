import {Routes} from "@angular/router"
import { HomeComponent } from './home/home.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'

export const appRoutes: Routes = [
    
    {path: '', component: HomeComponent},
{
    path: '',
    runGuardsAndResolvers:'always',
    // canActivate:[AuthGuard],
    children:[
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent},
    ]
},
   
    {path: '**',redirectTo:'/', pathMatch:'full'}
]