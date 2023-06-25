import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';

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

    /**
    * Returns authenticate state of user
    * @returns {number} true if user is authenticated user, false otherwise
    */
    isUserLogged(): boolean {
      return this.authService.isAuthenticated();
    }


    /**
    * Returns authenticate user's account id
    * @returns {number} the account id of the authenticated user
    */
    getAccountId(): any{
        if(this.authService.isAuthenticated()){
            
            var accountId = this.authService.getAccountIdOfAuthenticatedUser();
            return accountId;
        }
        return null; 
    }


    /**
    * Returns authenticate user's id
    * @returns {number} the user id of authenticated user
    */
    getUserId(): any{
        if(this.authService.isAuthenticated()){
            //var accountId = this.authService.user?.accountUser;
            return this.authService.geUserIdOfAuthenticatedUser();
        }
        return null; 
    }

}
