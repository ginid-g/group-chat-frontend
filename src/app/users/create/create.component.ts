import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../services/users/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [UserService],
})
export class CreateComponent {
  registrationForm!: FormGroup;
  @Input('user') user: any = {};

  errorMessage: string | undefined = '';

  constructor(
    private formBuilder: FormBuilder,
    private modalRef: BsModalRef,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      username: [
        this.user?.username,
        [Validators.required, Validators.minLength(3)],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Accessors for form controls
  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }
  get username() {
    return this.registrationForm.get('username');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.registrationForm.value);

    let apiCall;

    if (this.user?._id) {
      apiCall = this.userService.updateUser(
        this.user._id,
        this.registrationForm.value
      );
    } else {
      apiCall = this.userService.createUser(this.registrationForm.value);
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
