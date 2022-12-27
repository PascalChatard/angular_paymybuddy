import { HttpClient } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

    userForm: FormGroup ;
    user: User | undefined;
    statusCreation: boolean = true;
    statusChangePassword: boolean = false;

    constructor(private formBuilder: FormBuilder,
                private http: HttpClient, 
                private router: Router,
                private _Activatedroute:ActivatedRoute,
                private authService: AuthService,) {
        this.userForm = this.formBuilder.group(
            {
                // id: ['', .required],
                id: '', 
                lastName: ['', Validators.required],
                firstName: ['', Validators.required],
                address: ['', Validators.required],
                city: ['', Validators.required],
                phone: ['', Validators.required],
                mail:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
                password:['', Validators.required]
            }
        )
        
    }

    get mail(){
        return this.userForm.get('mail');
      }

    ngOnInit(): void {

        // retreives the account id from URL
        this._Activatedroute.paramMap.subscribe(params => { 
             
            var userId = params.get('id'); 
            if (userId != null)
            {
                this.statusCreation = false;
                console.log("ngOnInit() -> statusCreation = ",this.statusCreation);
                // attempts to recover account data
                this.loadUser(userId);
            }
            else
                console.log("ngOnInit() -> statusCreation = ",this.statusCreation);
        });
    }


    /**
    * loadUser Load user data
    * @param {any} userId of user as a integer
    */
     loadUser(userId: any) {
        
        const url = "http://localhost:4200/api/userid/"+ userId;

        // consumes the  userid/id endpoint of API REST 
        this.http.get(url).subscribe(
            (data: any) => {
               
                // the API REST return the id's user, 
                // check that the instance exists
                if (data)
                {
                    this.user = data;

                    this.userForm = new FormGroup({
                        id: new FormControl(this.user?.userId ? this.user.userId : ''),
                        firstName: new FormControl(this.user?.firstName? this.user.firstName : '', Validators.required),
                        lastName: new FormControl(this.user?.lastName? this.user.lastName : '', Validators.required),
                        address: new FormControl(this.user?.address? this.user.address : ''),
                        city: new FormControl(this.user?.city ? this.user.city : ''),
                        mail: new FormControl(this.user?.mail ? this.user.mail : ''),
                        phone: new FormControl(this.user?.phone ? this.user.phone : ''),
                        password: new FormControl(this.user?.phone ? this.user.password : '')})
                }                    
                else
                {
                    // Quoi mettre ici ????????
                }
            }
        );
    }


    /**
    * loadNewUser load new user's data
    * @param {string} userEmail the email of the new user
    */
     loadNewUser(userEmail: string) {

        const url = "http://localhost:4200/api/user/"+ userEmail;

        // consumes the  user/email endpoint of API REST 
        this.http.get(url).subscribe(
            (data: any) => {
               
                // the API REST return the user's info, 
                // check that the instance exists
                if (data)
                {
                    var accountUser = data.accountUser;
                    this.user = data;
                    console.log(this.user);
                    console.log("AccountUser = " + accountUser);
                    //this.onContinue();
                    //this.router.navigate(['account/',this.user?.accountUser], {state: {data: this.user?.accountUser}});
                    // login success, navigate to account page of user logged
                    this.router.navigate(['account/',accountUser], {state: {data: accountUser}});
                }                    
                else
                {
                    // Quoi mettre ici ????????
                }
            }
        );
    }


    /**
    * onCreate a new transfer
    */
    onCreate(){

        this.userForm.patchValue({id: ''}); 
        if (this.userForm.valid) 
        {
            // retrieves data for execute the update
            const userData = this.userForm.value;
            console.log(userData);
            // retreive the account user id
            var urlUserUpdate = "http://localhost:4200/api/user";
            console.log(urlUserUpdate);
            //this.onContinue();
            // consumes the user/id endpoint of API REST
            this.http.post(urlUserUpdate, { ...userData      }).subscribe(
                                  data =>   {
                                                console.log("onCreate() userData.mail : " + userData.mail);
                                                console.log("onCreate() userData.password : " + userData.password);
                                                this.authService.signIn(userData.mail, userData.password);
                                                this.loadNewUser(userData.mail);
                                                //this.router.navigate(['login/']);
                                            });
        }
        // console.log("onCreate() this.userform.errors : " + this.userForm.errors);
        // console.log("onCreate() this.userform.valid.id : " + this.userForm.value.id);
        // console.log("onCreate() this.userform.valid.lastName : " + this.userForm.value.lastName);
        // console.log("onCreate() this.userform.valid.firstName : " + this.userForm.value.firstName);
        // console.log("onCreate() this.userform.valid.address : " + this.userForm.value.address);
        // console.log("onCreate() this.userform.valid.city : " + this.userForm.value.city);
        // console.log("onCreate() this.userform.valid.phone : " + this.userForm.value.phone);
        // console.log("onCreate() this.userform.valid.mail : " + this.userForm.value.mail);
        // console.log("onCreate() this.userform.valid.password : " + this.userForm.value.password);

    }


    /**
    * onUpdate
    */
    onUpdate(){

        if (this.userForm.valid) 
        {
            // retrieves data for execute the update
            const userData = this.userForm.value;
            console.log(userData);
            // retreive the id  of user's account
            var urlUserUpdate = "http://localhost:4200/api/user/" + this.userForm.value.id;
            console.log(urlUserUpdate);
            //this.onContinue();
            // consumes the user/id endpoint of API REST
            this.http.post(urlUserUpdate, { ...userData      }).subscribe(
                                  data =>   {

                                                this.onContinue();
                                            });
        }
        console.log("this.userform.valid = false : " + this.userForm.value);

    }


    /**
    * onContinue
    */
    onContinue(){

        var accountId = this.user?.accountUser;
        
        this.router.navigate(['account/',accountId], {state: {data: accountId}});
    }


    /**
    * onCancel
    */
    onCancel(){
        this.router.navigate(['login/']);
    }


    /**
    * onChangePwd
    */
    onChangePwd(){
        this.statusChangePassword = true;
    }

}
