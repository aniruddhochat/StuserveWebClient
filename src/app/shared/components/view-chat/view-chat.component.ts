import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatGroup } from '../../models/chat-group.model';
import { Chat } from '../../models/chat.model';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-view-chat',
  templateUrl: './view-chat.component.html',
  styleUrls: ['./view-chat.component.css']
})
export class ViewChatComponent implements OnInit{

  constructor(public apiClient: ApiClientService,
    public dialogRef: MatDialogRef<ViewChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChatGroup,
  ) {}

  
  textMessage: string = '';

  messagesArray: {selfSent: boolean, message: Chat}[] = [];

  isUser = this.apiClient.consumerAccount ? true : false;

  account = this.apiClient.consumerAccount ? this.apiClient.consumerAccount : this.apiClient.providerAccount;


  ngOnInit(): void {
    this.data.received.forEach(obj => {
      const temp = {
        selfSent: false,
        message: obj
      }
      this.messagesArray.push(temp);
    });
    this.data.sent.forEach(obj => {
      const temp = {
        selfSent: true,
        message: obj
      }
      this.messagesArray.push(temp);
    });
    // Sort by created date
    this.messagesArray.sort((a, b) => {
      return new Date(a.message.createdAt!).getTime() - new Date(b.message.createdAt!).getTime();
    });
  }

  getConsumerEmail(id: string) {
    return this.apiClient.consumers.find(p => p._id === id)?.email;
  }

  getProviderEmail(id: string) {
    return this.apiClient.providers.find(p => p._id === id)?.email;
  }


  onSubmit() {
    if(this.textMessage.length > 0) {
      
      if(this.isUser) {
        const newChat: Chat = {
          provider: this.data.person,
          user: this.account._id!,
          message: this.textMessage
        };
        this.apiClient.createChatConsumer(newChat).subscribe({
          next: (res: any) => {
            this.messagesArray.push({selfSent: true, message: newChat});
          }, error: (err: any) => {
            alert('Error sending message, check console.');
            console.log(err);
          }
        });
      } else {
        const newChat: Chat = {
          provider: this.account._id!,
          user: this.data.person,
          message: this.textMessage
        };
        this.apiClient.createChatProvider(newChat).subscribe({
          next: (res: any) => {
            this.messagesArray.push({selfSent: true, message: newChat});
          }, error: (err: any) => {
            alert('Error sending message, check console.');
            console.log(err);
          }
        });
      }
      this.textMessage = '';
    }
  }
}
