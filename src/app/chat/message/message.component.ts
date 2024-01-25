import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChatService } from '../../services/chats/chat.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  providers: [ChatService, AuthService],
})
export class MessageComponent implements OnChanges {
  @Input('groupId') groupId: string | undefined;
  userId: string = '';

  messages: any[] = [];

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {
    const user = this.authService.getUser();
    if (user && user._id) {
      this.userId = user._id;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupId'] && this.groupId) {
      this.getChat();
    }
  }

  getChat() {
    if (this.groupId)
      this.chatService.getChat(this.groupId).subscribe((res) => {
        this.messages = res.data;
      });
  }

  sendMessage(event: any) {
    const message = event.target.value;
    if (this.groupId && !!message.length)
      this.chatService.sendMessage(this.groupId, message).subscribe((res) => {
        event.target.value = '';
        this.messages.push(res.data);
      });
  }
}
