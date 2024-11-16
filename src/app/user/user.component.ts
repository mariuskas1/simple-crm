import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { User } from './../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';





@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatCardModule, RouterModule ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  user: User = new User();
  users$!: Observable<User[]>;
  allUsers: User[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore){ }


  ngOnInit() {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;

    this.users$.subscribe((changes) => {
      this.allUsers = changes;
    });
  }


  openDialog(){
    this.dialog.open(AddUserDialogComponent);
  }


  async deleteUser(id:string | undefined){
    const userDocRef = doc(this.firestore, `users/${id}`);
    await deleteDoc(userDocRef).catch((err) => {
      console.error(err);
    });
  }

}
