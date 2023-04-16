import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.scss']
})
export class AddConnectionComponent implements OnInit {

    account: Account | undefined;
    accountId: any;

    connections: User[] = [];

    constructor(private authService: AuthService,
                private http: HttpClient, 
                private router: Router,
                private _activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {

        // retreives the account id from URL
        this._activatedRoute.paramMap.subscribe(params => { 
             
            this.accountId = params.get('id'); 
        
            // attempts to recover account data
            this.loadConnections(this.accountId);
        }); 
        
    }


    /**
    * Load account connections data
    * @param {any} accountId id of account as a integer
    */
    loadConnections(accountId: any) {

        const headers = new HttpHeaders({ Authorization: 'Basic ' + Buffer.from(this.authService.user?.mail + ":" + this.authService.user?.password).toString('base64') });
    
        //consumes the account/connection/accountId endpoint of API REST 
        this.http.get("http://localhost:4200/api/account/connection/"+ accountId,{headers}).subscribe(
            (data: any) => {

                // the API REST return a user list
                // check that the instance exists
                if (data) {
                    this.connections = data;          
                }
                else {
                // Quoi mettre ici ????????
                }

            }
        );
    }


    /**
    * Add a user in account connections list.
    * @param {User} user instance of User to add in connections list.
    */
    addConnection(user: User) {

        const headers = new HttpHeaders({ Authorization: 'Basic ' + Buffer.from(this.authService.user?.mail + ":" + this.authService.user?.password).toString('base64') });
    
        var url = "http://localhost:4200/api/account/" + this.accountId + "/connection/" + user.userId;
        //consumes the account/accountId/connection/userId endpoint of API REST 
        this.http.get(url,{headers}).subscribe(
            () => {
                this.router.navigate(['account/',this.accountId], {state: {data: this.accountId}});
            }
        );
    }


    /**
    * Return to account page.
    */
    gotoAccountPage(){
        this.router.navigate(['account/',this.accountId], {state: {data: this.accountId}});
    }


}
