import { P } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { NewMessageComponent } from 'src/app/shared/components/new-message/new-message.component';
import { ViewChatComponent } from 'src/app/shared/components/view-chat/view-chat.component';
import { ChatGroup } from 'src/app/shared/models/chat-group.model';
import { Chat } from 'src/app/shared/models/chat.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';
import { AccountCloudImage } from '../admin-approve-providers/admin-approve-providers.component';

const xIcon = 35;
const yIcon = 35;

@Component({
  selector: 'app-chat-hub',
  templateUrl: './chat-hub.component.html',
  styleUrls: ['./chat-hub.component.css']
})
export class ChatHubComponent implements OnInit{

  constructor(private apiClient: ApiClientService, private dialog: MatDialog, private cloudService: CloudinaryService) {}

  isUser = this.apiClient.consumerAccount ? true : false;

  account = this.apiClient.consumerAccount ? this.apiClient.consumerAccount : this.apiClient.providerAccount;

  groupedMessages: ChatGroup[] = [];

  avatars: AccountCloudImage[] = [];

  defaultIcon: CloudinaryImage = this.cloudService.getDefaultImage(xIcon, yIcon);

  ngOnInit(): void {
    this.groupedMessages = [];
    // Initialize groupedMessages (group messages by person)
    if(this.isUser) {
      // First do sent chats
      if(this.account.sentChat) {
        this.account.sentChat.forEach(x => {
          const foundIndex = this.groupedMessages.findIndex(p => p.person === x.provider);
          if(foundIndex > 0){
            this.groupedMessages[foundIndex].sent.push(x);
          } else {
            this.groupedMessages.push({
              person: x.provider,
              received: [],
              sent: [x]
            });
          }
        })
      }
      // Now do received chats
      if(this.account.receivedChat) {
        this.account.receivedChat.forEach(x => {
          const foundIndex = this.groupedMessages.findIndex(p => p.person === x.provider);
          if(foundIndex > 0){
            this.groupedMessages[foundIndex].received.push(x);
          } else {
            this.groupedMessages.push({
              person: x.provider,
              received: [x],
              sent: []
            });
          }
        })
      }
    } else {
      // First do sent chats
      if(this.account.sentChat) {
        this.account.sentChat.forEach(x => {
          const foundIndex = this.groupedMessages.findIndex(p => p.person === x.user);
          if(foundIndex > 0){
            this.groupedMessages[foundIndex].sent.push(x);
          } else {
            this.groupedMessages.push({
              person: x.user,
              received: [],
              sent: [x]
            });
          }
        })
      }
      // Now do received chats
      if(this.account.receivedChat) {
        this.account.receivedChat.forEach(x => {
          const foundIndex = this.groupedMessages.findIndex(p => p.person === x.user);
          if(foundIndex > 0){
            this.groupedMessages[foundIndex].received.push(x);
          } else {
            this.groupedMessages.push({
              person: x.user,
              received: [x],
              sent: []
            });
          }
        })
      }
    }
    // Now load avatars
    this.groupedMessages.forEach(obj => {
      if(this.isUser) {
        const acct = this.apiClient.providers.find(p => p._id === obj.person);
        if(acct){
          let temp: AccountCloudImage = {
            accountId: obj.person!,
            img: this.cloudService.getImage(acct.avatar!.public_id, xIcon, yIcon)
          };
          this.avatars.push(temp);
        }
      } else {
        const acct = this.apiClient.consumers.find(p => p._id === obj.person);
        if(acct){
          let temp: AccountCloudImage = {
            accountId: obj.person!,
            img: this.cloudService.getImage(acct.avatar!.public_id, xIcon, yIcon)
          };
          this.avatars.push(temp);
        }
      }
    })
    console.log(this.groupedMessages);
    console.log(this.avatars);
    
  }

  newMessage() {
    let dialogRef = this.dialog.open(NewMessageComponent, {
      height: 'fit-content',
      width: '400px',
    });
  }


  getConsumerEmail(id: string) {
    return this.apiClient.consumers.find(p => p._id === id)?.email;
  }

  getProviderEmail(id: string) {
    return this.apiClient.providers.find(p => p._id === id)?.email;
  }

  getProfileIcon(id: string) {
    const temp = this.avatars.find(p => p.accountId === id);
    return temp ? temp.img : this.defaultIcon;
  }

  viewChat(_chatGroup: ChatGroup) {
    // Open dialog and send options
    const dialogRef = this.dialog.open(ViewChatComponent, {
      width: 'fit-content',
      data: _chatGroup,
    });
    // // Close dialog and grab selections
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);
    //   // Make sure the popup returns data (it won't if the hit 'no thanks', and we do not want 
    //   //   to set the filter data to undefined. We want it to be the old filter data)
    //   if(result) {
    //     this.filterData = result;
    //     this.filterServices();
    //   } else {
    //     this.filterServices();
    //   }
    // });
  }
}
