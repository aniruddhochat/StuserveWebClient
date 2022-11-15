import { Component, OnInit } from '@angular/core';
import { ApiClientService } from './shared/services/api-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Project8WebClient';

  constructor(public apiClient: ApiClientService) {}

  ngOnInit(): void {
    // Call initial service setup
    this.apiClient.initializeData();
  }
}
