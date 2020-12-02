import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { CreateComponent } from './pages/create/create.component';
import { ParticipateComponent } from './pages/participate/participate.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'surveys', component: SurveysComponent, data: {title: 'Surveys'}, canActivate: [AuthGuard]},
  {path: 'surveys/edit/:id', component: CreateComponent, data: {title: 'Edit'}, canActivate: [AuthGuard]},
  {path: 'surveys/create', component: CreateComponent, data: {title: 'Create'}, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent, data: {title: 'About Us'}},
  {path: 'contact', component: ContactComponent, data: {title: 'Contact Us'}},
  {path: 'participate/:id', component: ParticipateComponent, data: {title: 'Participate'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Register'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
