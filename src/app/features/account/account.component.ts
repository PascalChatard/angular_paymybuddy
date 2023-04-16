import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { Buffer } from 'buffer/';
import { AuthService } from 'src/app/services/auth.service';


@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})

@Injectable()
export class AccountComponent implements OnInit {

    // page = 1;
    // pageSize = 6;
    // collectionSize = 2;
 
    account: Account | undefined;
    accountId: any;
    transferForm: FormGroup ;
  
    constructor(private authService: AuthService,
        private formBuilder: FormBuilder,
                private http: HttpClient, 
                private router: Router,
                private _Activatedroute:ActivatedRoute) {
        
        this.transferForm = this.formBuilder.group(
            {
              beneficiaryUserId: ['', Validators.required],
              transferDescription: ['', Validators.required],
              transferAmout: ['', Validators.required]
            }
        )
    }

    
    ngOnInit(): void {

        // retreives the account id from URL
        this._Activatedroute.paramMap.subscribe(params => { 
             
            this.accountId = params.get('id'); 

            // attempts to recover account data
            this.loadTransfers(this.accountId);
        }); 

    }

    // refreshTableTransfers() {
    //   this.transfers = TRANSFERS
    //     .map((country, i) => ({id: i + 1, ...country}))
    //     .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    // }


    /**
    * Load account data
    * @param {any} accounId of user as a integer
    */
    loadTransfers(accountId: any) {

        const headers = new HttpHeaders({ Authorization: 'Basic ' + Buffer.from(this.authService.user?.mail + ":" + this.authService.user?.password).toString('base64') });
         
    
        // consumes the account/id endpoint of API REST 
        this.http.get("http://localhost:4200/api/account/"+ accountId,{headers}).subscribe({
            next:(data: any) => 
               
                // the API REST return a account,               
                this.account = data,

            error:(e) => 
                console.log('Error: loadTransfers')
            
        });
    }


    /**
    * Submit a new transfer
    */
    onSubmit() {

        const headers = new HttpHeaders({ Authorization: 'Basic ' + Buffer.from(this.authService.user?.mail + ":" + this.authService.user?.password).toString('base64') });
        
        var urlAccount = "http://localhost:4200/api/account/" + this.accountId;
        if (this.transferForm.valid) {

            // retrieve data for execute a transfer
            const transfer = this.transferForm.value;
            // consumes the account/id endpoint of API REST
            this.http.post(urlAccount, { ...transfer      },{headers}).subscribe({
                next: (data) =>   {
                                // update transfer list with the new transfer
                                this.loadTransfers(this.accountId);
                                this.transferForm.clearValidators();
                                this.transferForm.reset();
                            },
                error: (e) => {
                                console.log('Error: post method on onSubmit()');
                            }
            });
        }
    }


    /**
    * Navigate to add a new connection to account
    */
     addConnection(){
              
        this.router.navigate(['account/connection/',this.accountId], {state: {data: this.accountId}});
                  
    }

}
