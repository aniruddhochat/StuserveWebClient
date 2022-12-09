import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chat } from '../../models/chat.model';
import { ConsumerAccount } from '../../models/consumer-account.model';
import { ProviderAccount } from '../../models/provider-account.model';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent {

  isLoading: boolean = false;

  formData = new FormGroup({
    toControl: new FormControl(''),
    messageControl: new FormControl(''),
  });

  constructor(public apiClient: ApiClientService, public dialogRef: MatDialogRef<NewMessageComponent>, private snackBar: MatSnackBar) {}

  isUser = this.apiClient.consumerAccount ? true : false;


  onSubmit() {
    if(!this.formData.invalid
      && this.formData.controls.toControl.value
      && this.formData.controls.messageControl.value) {

      const newChat: Chat = {
        provider: this.isUser ? this.formData.controls.toControl.value : this.apiClient.providerAccount._id!,
        user: this.isUser ? this.apiClient.consumerAccount._id! : this.formData.controls.toControl.value,
        message: this.formData.controls.messageControl.value
      };

      console.log(newChat);
      // Call correct new message endpoint based on what type of user is sending the message
      if(this.isUser) {
        this.apiClient.createChatConsumer(newChat).subscribe();
      } else {
        this.apiClient.createChatProvider(newChat).subscribe();
      }
      
    } else {
      alert("Form is invalid");
    }
  }
}
