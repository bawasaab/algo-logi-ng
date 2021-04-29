import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'zerodha',
    loadChildren: () => import('./zerodha/zerodha-routing.module').then(m => m.ZerodhaRoutingModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then( m => m.AuthRoutingModule )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
