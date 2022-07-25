import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    authStatus: boolean | undefined;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.authStatus = this.authService.isAuth;
    }

    onSignIn(){
        this.authService.signIn().then(
            () => {
                    this.authStatus = this.authService.isAuth;
                    this.router.navigate(['account']);
                  }
        );
    }

}
