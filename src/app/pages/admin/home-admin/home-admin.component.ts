import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  games: Observable<any[]> = new Observable<any[]>();

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.games = this.firestore.collection('games', ref => ref.where('status', '==', true)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return Object.assign({ id }, data);
      }))
    );
  }
}