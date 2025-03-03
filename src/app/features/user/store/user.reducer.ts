import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as UserActions from './user.actions';

export interface AppState {
  user: UserState;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  
  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),
  
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  on(UserActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user]
  })),
  
  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u)
  })),
  
  on(UserActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id)
  }))
);