import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  games: any[] = [];
  tournaments: any[] = [];
  gameTournaments: { [gameId: string]: any } = {};

  constructor(private firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.getGames();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getGames() {
    this.firestore.collection('games', ref => ref.where('status', '==', true)).get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const game = Object.assign({
          id: doc.id
        }, doc.data());
        this.games.push(game);
      });
    });
  }

  listTournaments(event: MatTabChangeEvent) {
    const gameId = this.games[event.index].id;
    let allTournaments: any[] = [];
    this.firestore.collection('tournaments', ref => ref.where('game', '==', gameId)).get().subscribe((querySnapshot) => {
        allTournaments = [];
        querySnapshot.forEach((doc) => {
            const tournament = Object.assign({
                id: doc.id,
            }, doc.data());
            allTournaments.push(tournament);
        });

        allTournaments = allTournaments.map(tournament => {
            tournament.date = tournament.date.toDate();
            return tournament;
        });
        // Almacena los torneos filtrados en gameTournaments
        this.gameTournaments[gameId] = {
            all: allTournaments,
            created: allTournaments.filter(tournament => tournament.status === 'created'),
            online: allTournaments.filter(tournament => tournament.status === 'online'),
            ended: allTournaments.filter(tournament => tournament.status === 'ended')
        };
    });
}

}