import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerHomeComponent } from './pages/consumer-home/consumer-home.component';
import { ConsumerViewAllComponent } from './pages/consumer-view-all/consumer-view-all.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpConsumerComponent } from './pages/sign-up-consumer/sign-up-consumer.component';
import { SignUpProviderComponent } from './pages/sign-up-provider/sign-up-provider.component';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { AuthenticatedGuard } from './shared/guards/authenticated.guard';
import { ProviderHomeComponent } from './pages/provider-home/provider-home.component';
import { ProviderGuard } from './shared/guards/provider.guard';
import { ConsumerGuard } from './shared/guards/consumer.guard';
import { AddServiceComponent } from './pages/add-service/add-service.component';
import { UnauthenticatedViewServicesComponent } from './pages/unauthenticated-view-services/unauthenticated-view-services.component';
import { ServiceEditComponent } from './pages/service-edit/service-edit.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { ConsumerPaymentsComponent } from './pages/consumer-payments/consumer-payments.component';
import { ProviderHistoryComponent } from './pages/provider-history/provider-history.component';
import { ProviderPendingComponent } from './pages/provider-pending/provider-pending.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AdminApproveProvidersComponent } from './pages/admin-approve-providers/admin-approve-providers.component';
import { AdminApproveServicesComponent } from './pages/admin-approve-services/admin-approve-services.component';
import { ChatHubComponent } from './pages/chat-hub/chat-hub.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'landing', component: LandingComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup-provider', component: SignUpProviderComponent },
  { path: 'signup-consumer', component: SignUpConsumerComponent },
  { path: 'unauthenticated-view-all', component: UnauthenticatedViewServicesComponent },
  { path: 'service-details', component: ServiceDetailsComponent},
  { path: 'home', component: SideNavComponent, canActivate: [AuthenticatedGuard], children: [
    { path: 'consumer-view-all', component: ConsumerViewAllComponent, canActivate: [ConsumerGuard] },
    { path: 'service-details', component: ServiceDetailsComponent, canActivate: [ConsumerGuard] },
    { path: 'consumer-home', component: ConsumerHomeComponent, canActivate: [ConsumerGuard] },
    { path: 'provider-home', component: ProviderHomeComponent, canActivate: [ProviderGuard] },
    { path: 'add-service', component: AddServiceComponent, canActivate: [ProviderGuard] },
    { path: 'service-edit', component: ServiceEditComponent, canActivate: [ProviderGuard] },
    { path: 'profile-edit', component: ProfileSettingsComponent, canActivate: [AuthenticatedGuard] },
    { path: 'consumer-payments', component: ConsumerPaymentsComponent, canActivate: [ConsumerGuard] },
    { path: 'provider-history', component: ProviderHistoryComponent, canActivate: [ProviderGuard] },
    { path: 'provider-pending', component: ProviderPendingComponent, canActivate: [ProviderGuard] },
    { path: 'admin-home', component: AdminHomeComponent, canActivate: [AdminGuard] },
    { path: 'admin-approve-providers', component: AdminApproveProvidersComponent, canActivate: [AdminGuard] },
    { path: 'admin-approve-services', component: AdminApproveServicesComponent, canActivate: [AdminGuard] },
    { path: 'chat-hub', component: ChatHubComponent, canActivate: [AuthenticatedGuard] },
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
