import { OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "src/app/models/user";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Buffer } from 'buffer/';


@Injectable()
export class AuthService {
    private isAuth: boolean;
    user: User | undefined;

    constructor(private http: HttpClient) {
        this.isAuth = false;
    }
	
    /**
    * Sign in with credentials
    * @param {string} email of user who want log in
    * @param {string} password of user who want log in
    * @returns {Promise}
    */
    signIn(email: string, password: string){

        const headers = new HttpHeaders({ Authorization: 'Basic ' + Buffer.from(email + ":" + password).toString('base64') });

        return new Promise(
            (resolve,reject) => {

                // consumes the user/email endpoint of API REST 
                this.http.get("http://localhost:4200/api/user/" + email,{headers}).subscribe({

                    next:(data:any) => {
            
                        // the API REST return a user
                        this.user = data;
                        this.isAuth = true;
                        resolve(true)},                        
                    error:(e) => {
                        this.isAuth = false;
                        resolve(false);} 
                });
            }
        );

    }


    /**
    * Sign out user
    */
    signOut(){
        this.isAuth = false;
    }


    /**
    * Returns authenticate status
    * @returns {boolean} true if user is authenticated otherwise false
    */
    isAuthenticated() : boolean{
        return this.isAuth;
    }


    /**
    * Returns authenticate user's account id
    * @returns {number} the account id of the authenticated user
    */
     getAccountIdOfAuthenticatedUser() : any{

          return this.user?.accountUser;
    }


    /**
    * Returns authenticate user's id
    * @returns {number} the user id of authenticated user
    */
    geUserIdOfAuthenticatedUser() : any{

        return this.user?.userId;
    }
}
