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
    email: string ;//| undefined;
    password: string ;//| undefined;

    constructor(private authService: AuthService, private router: Router) {
        this.email = '';
        this.password = '';
    }

    ngOnInit(): void {
        this.authStatus = this.authService.isAuth;
    }

    onSignIn(){
        this.authService.signIn().then(
        //this.authService.signIn(this.email, this.password);//.then(
            () => {
                    console.log("Email = ",this.email);
                    console.log("Password = ",this.password);
                    this.authStatus = this.authService.isAuth;
                    this.router.navigate(['account']);
                  }
        );
    }

}
