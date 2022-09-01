import { OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "src/app/models/user";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    isAuth = false;
    user: User | undefined;

    constructor(private http: HttpClient) {
        //this.user = null;
    }
 
    signIn(){
    //signIn(email: string, password: string){qq

        return new Promise(
            (resolve,reject) => {
                setTimeout(
                    () => {
                        this.isAuth = true;
                        resolve(true);
                    }, 1500
                );
            }
        );

    //     this.http.get("http://localhost:4200/api/user/" + email).subscribe(
    //         (data: any) => {
    //             console.log(data);
    //             this.user = data;
    //             if ((this.user != null) && 
    //                 (this.user.mail == email) &&
    //                 (this.user.password == password))
    //             {
    //                 console.log("signIn, isAuth = true");
    //                 this.isAuth = true;
    //                 return true;
    //             }
    //             else{
    //                 console.log("signIn, isAuth = false");
    //                 return false; 
    //             }
    //         }
    // );

        //     return new Promise(
        //     (resolve,reject) => {
        //         this.http.get("http://localhost:4200/api/user/" + email).subscribe(
        //             (data: any) => {
        //                 console.log(data);
        //                 this.user = data;
        //                 if ((this.user != null) && 
        //                     (this.user.mail == email) &&
        //                     (this.user.password == password)) {
        //                         console.log("signIn, isAuth = true");
        //                         this.isAuth = true;
        //                         return true;
        //                 }
        //                 else{
        //                         console.log("signIn, isAuth = false");
        //                         return false; 
        //                 }
        //             }
        //         );
        //     }
        // );

    }

    signOut(){
        this.isAuth = false;
    }

    isAuthenticated() : boolean{
        return this.isAuth;
    }
}