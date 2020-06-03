import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './_services/auth.guard';
import { SignupComponent } from './core/signup/signup.component';


const routes: Routes = [

  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: "home", component:HomeComponent },
  { path: "login", component:LoginComponent },
  { path: "signup", component:SignupComponent },
  {
    path: "panal",
    canActivate:[AuthGuard],
    loadChildren: () => import('./panal/panal.module').then(m => m.PanalModule)
  },
  {
    path: "landing",
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
