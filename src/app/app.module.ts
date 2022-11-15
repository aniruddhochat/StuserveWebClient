import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
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
