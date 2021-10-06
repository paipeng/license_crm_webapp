import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LicenseComponent } from './license/license.component';
import { LicensesComponent } from './licenses/licenses.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  { path: 'first-component', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:tokenexpired', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'licenses', component: LicensesComponent },
      { path: 'licenses/:id', component: LicenseComponent },
      { path: 'verify', component: VerifyComponent },
      //{ path: '**', redirectTo: '/', pathMatch: 'full' },
      //{ path: '**', component: LoginComponent }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
