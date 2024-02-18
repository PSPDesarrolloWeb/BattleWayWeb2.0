import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface AdminData {
  displayName: string;

}

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername() {
    let userId = localStorage.getItem('user');
    console.log('Valor de user en localStorage:', userId);
    if (userId) {
      userId = userId.replace(/['"]+/g, '');
      // console.log('Valor de user después de eliminar comillas:', userId); 
      this.firestore.collection('admin').doc(userId).get().subscribe((doc) => {
        if (doc.exists) {
          const data = doc.data() as AdminData;
          this.username = data.displayName;
        } else {
          console.log('No se encontró el documento del usuario en Firestore');
        }
      });
    } else {
      console.log('No se encontró el ID de usuario en localStorage');
    }
  }


  logout() {
    this.authService.logout();
  }

}
