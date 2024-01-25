import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateComponent } from './create/create.component';

import { BsModalService } from 'ngx-bootstrap/modal';
import { GroupService } from '../services/groups/group.service';
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, CreateComponent],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
  providers: [BsModalService, GroupService, UserService],
})
export class GroupsComponent {
  data: any[] = [];
  users: any[] = [];

  constructor(
    private modalService: BsModalService,
    private groupService: GroupService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getData();
  }

  getData() {
    this.groupService.getGroups().subscribe((res) => {
      this.data = res?.data;
    });
  }

  addGroup(): void {
    const modal = this.modalService.show(CreateComponent, {
      initialState: { users: this.users },
    });
    modal.onHide?.subscribe(() => {
      this.getData();
    });
  }

  editGroup(group: any) {
    const modal = this.modalService.show(CreateComponent, {
      initialState: { group: group, users: this.users },
    });

    modal.onHide?.subscribe(() => {
      this.getData();
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res.data;
    });
  }

  deleteGroup(id: string) {
    this.groupService.deleteGroup(id).subscribe(() => {
      this.getData();
    });
  }
}
