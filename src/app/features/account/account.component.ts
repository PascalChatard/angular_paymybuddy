import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { Transfer } from 'src/app/models/transfer';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

@Injectable()
export class AccountComponent implements OnInit {

  page = 1;
  pageSize = 6;
  collectionSize = 2;//TRANSFERS.length;
 
  account: Account | undefined;
  accountId: any;
  transferForm: FormGroup ;//| undefined;
  



  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router: Router) {
      //this.refreshTableTransfers();
        this.transferForm = this.formBuilder.group(
        {
          beneficiaryUserId: ['', Validators.required],
          transferDescription: ['', Validators.required],
          transferAmout: ['', Validators.required]
        }
      )
   }

  ngOnInit(): void {

      this.loadTransfers();
  }

  // refreshTableTransfers() {
  //   this.transfers = TRANSFERS
  //     .map((country, i) => ({id: i + 1, ...country}))
  //     .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  // }


  // httpOptionsGet = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   })
  // };

  loadTransfers() {
    
    this.http.get("http://localhost:4200/api/account/1").subscribe(
        (data: any) => {
            console.log(data);
            this.account = data;
            if (this.account != null)
              this.accountId = this.account.accountId;
        }
    );
  }


  onSubmit() {
     console.log("submit", this.transferForm.value);
     var urlAccount = "http://localhost:4200/api/account/" + this.accountId;
     if (this.transferForm.valid) {
       const transfer = this.transferForm.value;
       console.log("transfer ", transfer);
       this.http.post(urlAccount, {
         ...transfer
      }).subscribe(data => {
         console.log("data", data);
    //     this.router.navigateByUrl("/")
    //       this.router.navigate(['account']);
           this.loadTransfers();
       })
     }
  }

}
