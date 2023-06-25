import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor( private authService: AuthService,
                private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ):  Observable <boolean> | Promise <boolean> | boolean {

        if (this.authService.isAuthenticated()){

            // successful authentication
            return true;
        } 
        else{

            // Je n'arrive pas a executer une pop-up d'avertissement....
            //alert('You are not allowed to view this page. You are redirected to login Page');

            // authentication failed, redicte to login page
            this.router.navigate(['/login']);
            return false;
        }

    }

}