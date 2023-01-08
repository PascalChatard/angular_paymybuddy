import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    // login status, false/true -> logged out/logged in
    private loginStatus: boolean;

    // for property binding DOM
    public email: string ;
    public password: string ;

    constructor(private authService: AuthService, private router: Router) {
        
        this.loginStatus = false;        
        this.email = '';
        this.password = '';
    }

    ngOnInit(): void {
        this.loginStatus = this.authService.isAuthenticated();
    }

    onSignIn(){
        this.authService.signIn(this.email, this.password).then(
             () => {
                    // login success, assign status
                    this.loginStatus = this.authService.isAuthenticated();

                    // retreive the account user id
                    var accountId = this.authService.user?.accountUser;

                    // login success, navigate to account page of user logged
                    this.router.navigate(['account/',accountId], {state: {data: accountId}});
                  }
        );
    }

}
