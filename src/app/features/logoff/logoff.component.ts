import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

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

        // var val = confirm("Voulez-vous vraiment quitter PyMyBudy?");
        // if( val == true ) {
        //     this.authService.signOut();
        //     this.router.navigate(['login']);
        // } 
        // else {
        //     this.onContinue();
        // }

        this.authService.signOut();
        this.router.navigate(['login']);
    }

    
    // 
    onContinue(){
        // retrieves the account user id
        var accountId = this.authService.user?.accountUser;
        
        this.router.navigate(['account/',accountId], {state: {data: accountId}});
    }

}
