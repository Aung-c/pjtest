import { Component, EventEmitter, Output } from '@angular/core';
import { UserService, User } from '../../services/fish.service';

@Component({
  selector: 'app-aboutus',
  standalone: false,
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutUsComponent {

  @Output() senddata = new EventEmitter<any>();

  users: User[] = [];
  selectedId?: number;
  
  tempData:any = [];

  formData: User = {
    firstName: '',
    lastName: '',
    maidenName: '',
    age: 0
  };

  errors = {
    firstName: '',
    lastName: '',
    maidenName: '',
    age: ''
  };

  constructor(private userService: UserService) {}

  validateForm(): boolean {

    this.errors = {
      firstName: '',
      lastName: '',
      maidenName: '',
      age: ''
    };

    if (!this.formData.firstName.trim()) {
      this.errors.firstName = 'First Name Required';
    }

    if (!this.formData.lastName.trim()) {
      this.errors.lastName = 'Last Name Required';
    }

    if (!this.formData.maidenName.trim()) {
      this.errors.maidenName = 'Middle Name Required';
    }

    if (this.formData.age <= 0) {
      this.errors.age = 'Valid Age Required';
    }

    return !Object.values(this.errors).some(error => error);
  }

  // CREATE
  saveData(): void {
    console.log('this.validateForm()', this.validateForm());
    if (!this.validateForm()) return;

    this.userService.createUser(this.formData)
      .subscribe({
        next: (res) => {

          console.log('CREATE API RESPONSE');
          console.log(res);

          this.users.push({
            id: this.users.length + 1,
            ...this.formData
          });

          this.tempData.push(this.formData);

          this.senddata.emit(res);

          console.log('this.users', this.users);

          console.log( 'this.data', this.tempData);

          this.resetForm();
        },
        error: (err) => console.error(err)
      });
  }

  // SELECT
  editUser(user: User): void {

    this.selectedId = user.id;

    this.formData = {
      firstName: user.firstName,
      lastName: user.lastName,
      maidenName: user.maidenName,
      age: user.age
    };
  }

  // UPDATE
  updateUser(): void {

    if (this.selectedId === undefined) {
      alert('Select User First');
      return;
    }

    if (!this.validateForm()) return;

    const index = this.users.findIndex(
      user => user.id === this.selectedId
    );

    if (index > -1) {
      this.users[index] = {
        id: this.selectedId,
        ...this.formData
      };
    }

    this.userService.Edituser(
      this.selectedId,
      this.formData
    ).subscribe({
      next: (res) => {
        console.log('UPDATE API RESPONSE');
        console.log(res);
      },
      error: (err) => console.error(err)
    });

    this.resetForm();
  }

  // DELETE
  deleteUser(): void {

    if (this.selectedId === undefined) {
      alert('Select User First');
      return;
    }

    const id = this.selectedId;

    this.users = this.users.filter(
      user => user.id !== id
    );

    this.userService.deleteUser(id)
      .subscribe({
        next: (res) => {
          console.log('Delete API RESPONSE');
          console.log(res);
        },
        error: (err) => console.error(err)
      });

    this.resetForm();
  }

  // RESET
  resetForm(): void {

    this.formData = {
      firstName: '',
      lastName: '',
      maidenName: '',
      age: 0
    };

    this.selectedId = undefined;
    this.errors = {
      firstName: '',
      lastName: '',
      maidenName: '',
      age: ''
    };
  }
}