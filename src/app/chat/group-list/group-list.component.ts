import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupService } from '../../services/groups/group.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
  providers: [GroupService],
})
export class GroupListComponent implements OnInit {
  data: any[] = [];
  @Input('selectedGroup') selectedGroup: string | undefined;
  @Output('onGroupSelect') onGroupSelect: EventEmitter<string> =
    new EventEmitter();
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.getGroups().subscribe((res) => {
      this.data = res.data;
    });
  }

  selectGroup(id: string) {
    this.selectedGroup = id;
    this.onGroupSelect.emit(id);
  }
}
