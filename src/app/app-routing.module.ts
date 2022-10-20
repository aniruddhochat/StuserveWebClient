import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerForYouComponent } from './pages/consumer-for-you/consumer-for-you.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpConsumerComponent } from './pages/sign-up-consumer/sign-up-consumer.component';
import { SignUpProviderComponent } from './pages/sign-up-provider/sign-up-provider.component';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { AuthenticatedGuard } from './shared/guards/authenticated.guard';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'landing', component: LandingComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup-provider', component: SignUpProviderComponent },
  { path: 'signup-consumer', component: SignUpConsumerComponent },
  { path: 'home', component: SideNavComponent, canActivate: [AuthenticatedGuard], children: [
    { path: 'main-view', component: MainViewComponent, canActivate: [AuthenticatedGuard] },
    { path: 'service-details', component: ServiceDetailsComponent, canActivate: [AuthenticatedGuard] },
    { path: 'consumer-foryou', component: ConsumerForYouComponent, canActivate: [AuthenticatedGuard] },
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
