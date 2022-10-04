import { Component, OnInit } from '@angular/core';
import { ApiClientService } from './shared/services/api-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Project8WebClient';

  constructor(private apiClient: ApiClientService) {}

  ngOnInit(): void {
    // // Testing generating a random username
    // this.apiClient.generateRandomUsername("Garrett", "Spencer").subscribe(res => {
    //   console.log(res);
    // });
    // // Testing registering a new account
    // this.apiClient.createNewAccount("Garrett", "Spencer", "test2@gmail.com", "4678392900", "testing", "admin").subscribe(res => {
    //   console.log(res);
    // });
    // // Testing logging in to new account
    // this.apiClient.loginUser("test@gmail.com", "admin").subscribe(res => {
    //   console.log(res);
    // });
  }
}
