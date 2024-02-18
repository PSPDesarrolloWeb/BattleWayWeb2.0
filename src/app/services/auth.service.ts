import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router'
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(user.uid));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        // JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `user/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      // displayName: user.displayName,
      // photoURL: user.photoURL,
      // emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.afs.collection('admin', ref => ref.where('email', '==', user.email))
              .get()
              .subscribe((querySnapshot) => {
                if (querySnapshot.docs.length > 0) {
                  // El correo electrónico pertenece a la colección "admin"
                  this.router.navigate(['homeAdmin']);
                } else {
                  // El correo electrónico no se encuentra en la colección "admin"
                  this.router.navigate(['homeUser']);
                }
              }, (error) => {
                // Manejar el error de consulta a Firestore
              });
          }
        });
      })
      .catch(() => {
        // Manejar el error de inicio de sesión
      });
  }
  

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user?.sendEmailVerification();
        this.setUserData(result.user);
        this.router.navigate(['login'])
      }).catch(() => {
      })
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home'])
    })
  }
}