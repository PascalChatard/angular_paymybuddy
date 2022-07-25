import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'PayMyBuddy';


    constructor(private authService: AuthService) {
    }

    isUserLogged(): boolean {
      return this.authService.isAuthenticated();
    }
}
