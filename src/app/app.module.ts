import { NgModule} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { AccountComponent } from './features/account/account.component';
import { ProfilComponent } from './features/profil/profil.component';
import { TransfertComponent } from './features/transfert/transfert.component';
import { AuthService } from './core/auth/auth.service';
import { FourOhFourComponent } from './features/four-oh-four/four-oh-four.component';
import { AuthGuard } from './core/auth/auth-guard.service';
import { LogoffComponent } from './features/logoff/logoff.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddConnectionComponent } from './features/add-connection/add-connection.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    ProfilComponent,
    TransfertComponent,
    FourOhFourComponent,
    LogoffComponent,
    AddConnectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
