import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { GoogleMapsModule } from '@angular/google-maps'

import { LandingComponent } from './pages/landing/landing.component';
import { DefaultToolbarComponent } from './shared/components/default-toolbar/default-toolbar.component';
import { ToolbarWithSigninComponent } from './shared/components/toolbar-with-signin/toolbar-with-signin.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpConsumerComponent } from './pages/sign-up-consumer/sign-up-consumer.component';
import { SignUpProviderComponent } from './pages/sign-up-provider/sign-up-provider.component';
import { SignUpTypeSelectComponent } from './shared/components/sign-up-type-select/sign-up-type-select.component';
import { ConsumerViewAllComponent } from './pages/consumer-view-all/consumer-view-all.component';
import { ToolbarWithProfileComponent } from './shared/components/toolbar-with-profile/toolbar-with-profile.component';
import { NgxMaskModule } from 'ngx-mask';
import { FilterPopupComponent } from './shared/components/filter-popup/filter-popup.component';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { ConsumerHomeComponent } from './pages/consumer-home/consumer-home.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { ProviderHomeComponent } from './pages/provider-home/provider-home.component';
import { AddServiceComponent } from './pages/add-service/add-service.component';
import { UnauthenticatedViewServicesComponent } from './pages/unauthenticated-view-services/unauthenticated-view-services.component';
import { PostedServicePopupComponent } from './shared/components/posted-service-popup/posted-service-popup.component';
import { GoogleSignInComponent } from './pages/google-sign-in/google-sign-in.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ServiceEditComponent } from './pages/service-edit/service-edit.component';
import { ReviewPopupComponent } from './shared/components/review-popup/review-popup.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StripeFormComponent } from './shared/components/stripe-form/stripe-form.component';
import { ConsumerPaymentsComponent } from './pages/consumer-payments/consumer-payments.component';
import { ProviderHistoryComponent } from './pages/provider-history/provider-history.component';
import { ProviderPendingComponent } from './pages/provider-pending/provider-pending.component';
import {CloudinaryModule} from '@cloudinary/ng';
import { AdminLoginComponent } from './shared/components/admin-login/admin-login.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminApproveProvidersComponent } from './pages/admin-approve-providers/admin-approve-providers.component';
import { AdminApproveServicesComponent } from './pages/admin-approve-services/admin-approve-services.component';
import { AddCategoryComponent } from './shared/components/add-category/add-category.component';
import { ChatHubComponent } from './pages/chat-hub/chat-hub.component';
import { NewMessageComponent } from './shared/components/new-message/new-message.component';
import { ViewChatComponent } from './shared/components/view-chat/view-chat.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DefaultToolbarComponent,
    ToolbarWithSigninComponent,
    SignInComponent,
    SignUpConsumerComponent,
    SignUpProviderComponent,
    SignUpTypeSelectComponent,
    ConsumerViewAllComponent,
    ToolbarWithProfileComponent,
    FilterPopupComponent,
    ServiceDetailsComponent,
    SideNavComponent,
    ConsumerHomeComponent,
    ProviderHomeComponent,
    AddServiceComponent,
    UnauthenticatedViewServicesComponent,
    PostedServicePopupComponent,
    GoogleSignInComponent,
    ServiceEditComponent,
    ReviewPopupComponent,
    ProfileSettingsComponent,
    StripeFormComponent,
    ConsumerPaymentsComponent,
    ProviderHistoryComponent,
    ProviderPendingComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminApproveProvidersComponent,
    AdminApproveServicesComponent,
    AddCategoryComponent,
    ChatHubComponent,
    NewMessageComponent,
    ViewChatComponent
  ],
  imports: [
    BrowserModule,
    CloudinaryModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    SocialLoginModule,
    GoogleMapsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('155525793614-udf6ng70351hlvmtmfveafe83hpngl90.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
