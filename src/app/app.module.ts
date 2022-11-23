import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Material Form Controls
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Material Navigation
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
// Material Data tables
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
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
import { EditProfileConsumerComponent } from './pages/edit-profile-consumer/edit-profile-consumer.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';

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
    EditProfileConsumerComponent,
    ProfileSettingsComponent,
  ],
  imports: [
    BrowserModule,
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
    NgxMaskModule.forRoot()
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
