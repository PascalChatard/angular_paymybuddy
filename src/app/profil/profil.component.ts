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
                // phone: ['', Validators.required, ],
                phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
                // mail:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
                mail:['',  [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
                password:['', Validators.required]
            }
        )
        
    }


    /**
    * getter to access the "phone" form control
    */
    get phone(){
        return this.userForm.get('phone');
      }


    /**
    * getter to access the "mail" form control
    */
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
    * getTitlePage returns the page title of profile
    *   "Register" if a new user
    *   "Update profile" if the user already have a account
    */
    getTitlePage(): string{
        return this.statusCreation? "Register": "Update profile";
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
                    // fill form
                    this.userForm.get('id')?.setValue(data.userId);
                    this.userForm.get('lastName')?.setValue(data.lastName);
                    this.userForm.get('firstName')?.setValue(data.firstName);
                    this.userForm.get('address')?.setValue(data.address);
                    this.userForm.get('city')?.setValue(data.city);
                    this.userForm.get('mail')?.setValue(data.mail);
                    this.userForm.get('phone')?.setValue(data.phone);
                    this.userForm.get('password')?.setValue(data.password);
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
                    // register success, navigate to account page of new user
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
            
            // consumes the user/id endpoint of API REST
            this.http.post(urlUserUpdate, { ...userData      }).subscribe( data =>   {
                console.log("onCreate() userData.mail : " + userData.mail);
                console.log("onCreate() userData.password : " + userData.password);
                this.authService.signIn(userData.mail, userData.password);
                this.loadNewUser(userData.mail);
            });
        }

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
