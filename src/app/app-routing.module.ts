import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerHomeComponent } from './pages/consumer-home/consumer-home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpConsumerComponent } from './pages/sign-up-consumer/sign-up-consumer.component';
import { SignUpProviderComponent } from './pages/sign-up-provider/sign-up-provider.component';
import { AuthenticatedGuard } from './shared/guards/authenticated.guard';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'landing', component: LandingComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup-provider', component: SignUpProviderComponent },
  { path: 'signup-consumer', component: SignUpConsumerComponent },
  { path: 'home-consumer', component: ConsumerHomeComponent, canActivate: [AuthenticatedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
