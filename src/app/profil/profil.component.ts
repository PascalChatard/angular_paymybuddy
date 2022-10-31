import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

    userForm: FormGroup ;

    constructor(private formBuilder: FormBuilder,) {
      this.userForm = this.formBuilder.group(
        {
          lastName: ['', Validators.required],
          firstName: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          phone: ['', Validators.required],
          email:['', Validators.required],
        }
    )
    }

  ngOnInit(): void {
  }

  /**
  * Submit a new transfer
  */
       onSubmit() {

        if (this.userForm.valid) 
          console.log(this.userForm.value);
        else
          console.log("Echec!!!!");
        // var urlAccount = "http://localhost:4200/api/account/" + this.accountId;
        // if (this.transferForm.valid) {

        //     // retrieve data for execute a transfer
        //     const transfer = this.transferForm.value;
        //     // consumes the account/id endpoint of API REST
        //     this.http.post(urlAccount, { ...transfer      }).subscribe(
        //                       data =>   {
        //                                     // update transfer list with the new transfer
        //                                     this.loadTransfers(this.accountId);
        //                                     this.transferForm.clearValidators();
        //                                     this.transferForm.reset();
        //                                 });
        // }
    }

}
