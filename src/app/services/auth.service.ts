import { OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "src/app/models/user";
import { Injectable } from "@angular/core";

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

        return new Promise(
            (resolve,reject) => {

                // consumes the user/email endpoint of API REST 
                this.http.get("http://localhost:4200/api/user/" + email).subscribe(

                    (data: any) => {

                        // the API REST return a user, verify the instance and the credentials
                        this.user = data;
                        //if ((this.user != null) && 
                        if ((this.user) && 
                            (this.user.mail == email) &&
                            (this.user.password == password)) {

                                // the user is authenticated
                                this.isAuth = true;
                                resolve(true);
                        }
                        else{
                                // l'erreur ne remonte pas ici ....
                                console.log("signIn, isAuth = false");
                                resolve(false); 
                        }
                    }
                );
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
    * @returns {boolean} true if user is authenticated otherwise false
    */
     getAccountIdOfAuthenticatedUser() : any{
        //if(this.isAuth)
          return this.user?.accountUser?.accountId;
    }

}