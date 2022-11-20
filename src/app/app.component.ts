import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title: string;


    constructor(private authService: AuthService) {
      this.title = 'PayMyBuddy';

    }

    
    isUserLogged(): boolean {
      return this.authService.isAuthenticated();
    }


    getAccountId(): any{
      if(this.authService.isAuthenticated()){
        //var accountId = this.authService.user?.accountUser;
        var accountId = this.authService.getAccountIdOfAuthenticatedUser();

        return accountId;
      }
      return null; 
    }
}
