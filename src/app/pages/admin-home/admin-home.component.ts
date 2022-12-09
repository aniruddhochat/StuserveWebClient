import { Component, OnInit, Provider } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ProvidersRequest } from 'src/app/shared/models/providers-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private apiClient: ApiClientService, private cloudService: CloudinaryService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

}