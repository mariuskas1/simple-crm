import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from './../../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';






@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [ MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, FormsModule, MatProgressBarModule ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent {
  user: User = new User();
  birthDate!: Date;
  loading = false;
  
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>){}

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();

    try {
      // Create a reference to the "users" collection
      const usersCollection = collection(this.firestore, 'users');
      // Add a new document with the user's data
      const result = await addDoc(usersCollection, { ...this.user });
      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

closeDialog(){
  this.dialogRef.close()
}


}

