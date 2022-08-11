import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/models/account';

// interface Transfer {
//     id?: number,
//     date:string,
//     connection: string,
//     description: string,
//     amount: number  
// };

// const TRANSFERS: Transfer[] = [
//   {
//     id: 1,
//     date:'2022-01-02 00:00:00',
//     connection:'Lejeune',
//     description:'Remboursement ciné',
//     amount: 15.05
//   },
//   {
//     id: 2,
//     date:'2022-01-02 00:00:00 	',
//     connection:'Durand',
//     description:'Participation cadeau',
//     amount: 5.5
//   },
//   {
//     id: 3,
//     date:'2022-01-05 00:00:00',
//     connection:'Durand',
//     description:'Art de vie',
//     amount: 22.75
//   },
//   {
//     id: 4,
//     date:'2022-01-07 00:00:00',
//     connection:'Dupont',
//     description:'Cafet Crous',
//     amount: 7.20
//   },
//   {
//     id: 5,
//     date:'2022-01-10 00:00:00',
//     connection:'Dupont',
//     description:'Recharge café',
//     amount: 5.25
//   },
//   {
//     id: 6,
//     date:'2022-01-10 01:25:00',
//     connection:'Lejeune',
//     description:'Paiement rufus',
//     amount: 37.95
//   }
// ];


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
  //transfers: Transfer[] | undefined;
  account: Account | undefined;
  



  constructor(private http: HttpClient, private router: Router) {
      //this.refreshTableTransfers();
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
        }
    );
  }

}
