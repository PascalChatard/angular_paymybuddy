import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './features/account/account.component';
import { LoginComponent } from './features/login/login.component';
import { LogoffComponent } from './features/logoff/logoff.component';
import { AddConnectionComponent } from './features/add-connection/add-connection.component';

import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './services/auth-guard.service';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logoff', component: LogoffComponent },
  { path: 'profile', component: ProfilComponent},
  { path: 'account', canActivate: [AuthGuard], component: AccountComponent},
  { path: 'account/:id', canActivate: [AuthGuard], component: AccountComponent},
  { path: 'account/connection/:id', component: AddConnectionComponent},
  { path: '', component: LoginComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
