import { Component } from '@angular/core';
import { GroupListComponent } from './group-list/group-list.component';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [GroupListComponent, MessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  groupId: string | undefined;
  setGroup(groupId: string) {
    this.groupId = groupId;
  }
}
