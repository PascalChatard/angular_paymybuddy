import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './features/account/account.component';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent},
  { path: 'account/connection', component: LoginComponent},
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
