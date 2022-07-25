import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.scss']
})
export class LogoffComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {
    }


    ngOnInit(): void {
        
    }


    onSignOut(){

        this.authService.signOut();
        this.router.navigate(['login']);
    }

    
    onContinue(){

        this.router.navigate(['account']);
    }

}
