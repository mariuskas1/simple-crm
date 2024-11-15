import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from './../../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [ MatButtonModule, MatInputModule, MatDialogModule, MatProgressBarModule, MatFormFieldModule, FormsModule, MatProgressBarModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user!: User;
  loading = false;
  userId:string | null = null;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>){}


  async editAddress() {
    try {
      this.loading = true;
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      await updateDoc(userDocRef, this.user.toJSON());
    } catch (err) {
      console.error('Error updating address:', err);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }

closeDialog(){
  this.dialogRef.close()
}
}
