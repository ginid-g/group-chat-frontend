import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, CreateComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [BsModalService, UserService],
})
export class UsersComponent {
  users: any[] = [];

  constructor(
    private modalService: BsModalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res?.data;
    });
  }

  addUser(): void {
    const modal = this.modalService.show(CreateComponent);
    modal.onHide?.subscribe(() => {
      this.getUsers();
    });
  }

  editUser(user: any) {
    const modal = this.modalService.show(CreateComponent, {
      initialState: { user: user },
    });

    modal.onHide?.subscribe(() => {
      this.getUsers();
    });
  }
}
