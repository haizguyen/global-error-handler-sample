import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  imports: [
    UserListComponent,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: [
    UserListComponent
  ]
})
export class UserModule { }