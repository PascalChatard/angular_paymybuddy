import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.scss']
})
export class AddConnectionComponent implements OnInit {

  accountId: any;

  constructor() { }

  ngOnInit(): void {
            // retreives the account id from URL
            this.accountId = history.state.data;

            // attempts to recover account data
            this.loadConnections(this.accountId);
  }

  loadConnections(accountId: any) {
    
    // consumes the account/id endpoint of API REST 
    // this.http.get("http://localhost:4200/api/account/"+ accountId).subscribe(
    //     (data: any) => {
           
    //         // the API REST return a account, verify the instance
    //         this.account = data;
    //         // check that the instance exists
    //         //if (this.account != null)
    //         if (this.account)
    //             // retreive account id
    //             this.accountId = this.account.accountId;
    //         else
    //         {
    //             // Quoi mettre ici ????????
    //         }
    //     }
    // );
  }


}
