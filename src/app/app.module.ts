import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { HomeComponent } from './pages/public/home/home.component';
import { PublicNavbarComponent } from './components/public-navbar/public-navbar.component';
import { LoginComponent } from './pages/public/login/login.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { HomeAdminComponent } from './pages/admin/home-admin/home-admin.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { TournamentsComponent } from './pages/admin/tournaments/tournaments.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from './environments/environment.prod';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NotFoundComponent } from './pages/public/not-found/not-found.component';
import { AddTournamentModalComponent } from './components/add-tournament-modal/add-tournament-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

registerLocaleData(localeEs);

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      PublicNavbarComponent,
      LoginComponent,
      RegisterComponent,
      HomeAdminComponent,
      AdminNavbarComponent,
      TournamentsComponent,
      LoadingSpinnerComponent,
      NotFoundComponent,
      AddTournamentModalComponent

   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      MatProgressSpinnerModule,
      AngularFireModule.initializeApp(environment.firebase),
      provideFirebaseApp(() => initializeApp(
         {
            projectId: "battlewaycloud",
            appId: "1:964979681643:web:adae995feec8aa3a2e442e",
            storageBucket: "battlewaycloud.appspot.com",
            apiKey: "AIzaSyC2HTEf8u_67WlaZ3pAUyp-s26h0iT7tqM",
            authDomain: "battlewaycloud.firebaseapp.com",
            messagingSenderId: "964979681643",
            measurementId: "G-SBPC6LNDFZ"
         })),
      provideAuth(() => getAuth()),
      MatSelectModule,
      MatTabsModule,
      MatButtonModule,
   ],
   providers: [
      provideClientHydration(),
      provideAnimationsAsync()
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
