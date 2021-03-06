import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import * as WebSocket from '../../websocket';
import * as GameActions from '../actions/game';
import * as RouterActions from '../actions/router';
import * as WebSocketActions from '../actions/websocket';

@Injectable()
export class GameEffects {
  @Effect()
  joinRoom$: Observable<Action> =
    this.actions$.ofType(GameActions.JOIN_ROOM)
    .mergeMap((action: GameActions.JoinRoom) => {
      const payload: WebSocket.Data.RoomJoin = {
        'room_id': action.payload.roomId
      };
      if (action.payload.password) {
        payload.password = action.payload.password;
      }
      const req = new WebSocket.Requests.RoomJoin(payload);
      return Observable.of(
        new WebSocketActions.Request(req) as Action,
        new RouterActions.Go({ path: ['room', action.payload.roomId] }) as Action
      );
    });

  @Effect()
  joinRoomFailed$: Observable<Action> =
    this.actions$.ofType(GameActions.JOIN_ROOM_FAILED)
    .map(_ => new RouterActions.GoByUrl('lobby'));

  @Effect()
  leaveRoom$: Observable<Action> =
    this.actions$.ofType(GameActions.LEAVE_ROOM)
    .map((action: GameActions.LeaveRoom) =>
      new WebSocketActions.Request(
        new WebSocket.Requests.RoomLeave()
      )
    );

  @Effect()
  ready$ =
    this.actions$.ofType(GameActions.READY)
    .map((action: GameActions.Ready) =>
      new WebSocketActions.Request(
        new WebSocket.Requests.RoomReady(action.ready)
      )
    );

  constructor(
    private actions$: Actions,
  ) {}
}
