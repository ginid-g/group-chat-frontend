import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../services/groups/group.service';
import { AlertModule } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    AlertModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [GroupService],
})
export class CreateComponent {
  form!: FormGroup;
  @Input('group') group: any = {};
  @Input('users') users: any[] = [];

  errorMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private modalRef: BsModalRef,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.group.name, Validators.required],
      members: [this.group.members || [], Validators.required],
    });
  }

  // Accessors for form controls
  get name() {
    return this.form.get('name');
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.form.value);

    let apiCall;
    if (this.group?._id) {
      apiCall = this.groupService.updateGroup(this.group._id, this.form.value);
    } else {
      apiCall = this.groupService.createGroup(this.form.value);
    }

    this.errorMessage = undefined;
    apiCall.subscribe(
      () => {
        this.close();
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }

  close() {
    this.modalRef.hide();
  }
}
