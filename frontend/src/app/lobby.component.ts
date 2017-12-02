import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { State } from './state/reducer';
import { User } from './user';
import { Room } from './room';

// Actions
import * as UserActions from './state/actions/user';
import * as RoomActions from './state/actions/room';
import * as GameActions from './state/actions/game';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  roomList: Observable<Room[]>;
  error: Observable<string | null>;
  lockImgPath = 'assets/img/lock.svg';

  constructor(private store: Store<State>) {
    const room = this.store.select('room');
    this.roomList = room.map(room => room.roomList);
    this.error = room.map(room => room.currentError);
  }

  ngOnInit() {
    this.store.dispatch(new RoomActions.GetRooms.Start({
      page: 1,
      count_per_page: 10,
    }));
  }

  gotoCreateGame() {
    this.store.dispatch(new UserActions.RedirectWithSignInState({
      when: 'not-signed-in',
      goTo: 'sign_in',
    }));
    this.store.dispatch(new UserActions.RedirectWithSignInState({
      when: 'signed-in',
      goTo: 'create_game',
    }));
  }

  gotoHallOfFame() {
    this.store.dispatch(new UserActions.RedirectWithSignInState({
      when: 'not-signed-in',
      goTo: 'sign_in',
    }));
    this.store.dispatch(new UserActions.RedirectWithSignInState({
      when: 'signed-in',
      goTo: 'hall_of_fame',
    }));
  }

  joinRoom(id: string) {
    // TODO: Ask password
    this.store.dispatch(new GameActions.JoinRoom({
      roomId: id,
    }));
  }

}
