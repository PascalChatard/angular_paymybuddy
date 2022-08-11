import { NgModule} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { AccountComponent } from './features/account/account.component';
import { ProfilComponent } from './profil/profil.component';
import { TransfertComponent } from './features/transfert/transfert.component';
import { UserComponent } from './features/user/user.component';
import { AuthService } from './services/auth.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './services/auth-gaurd.service';
import { LogoffComponent } from './features/logoff/logoff.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    ProfilComponent,
    TransfertComponent,
    UserComponent,
    FourOhFourComponent,
    LogoffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
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
