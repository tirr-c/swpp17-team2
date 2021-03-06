import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { UserState, userReducer } from './reducers/user';
import { ProfileState, profileReducer } from './reducers/profile';
import { RoomState, roomReducer } from './reducers/room';
import { WebSocketState, websocketReducer } from './reducers/websocket';
import { GameState, gameReducer } from './reducers/game';

export interface State {
  user: UserState;
  room: RoomState;
  router: RouterReducerState;
  profile: ProfileState;
  websocket: WebSocketState;
  game: GameState;
}
export const reducers = {
  user: userReducer,
  room: roomReducer,
  router: routerReducer,
  profile: profileReducer,
  websocket: websocketReducer,
  game: gameReducer,
};
