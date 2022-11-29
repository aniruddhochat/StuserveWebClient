import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { Stripe } from '@fireflysemantics/angular-stripe-service/lib/types';
import { PayementRequest } from '../../models/payement-request.model';
import { ApiClientService } from '../../services/api-client.service';


@Component({
  selector: 'app-stripe-form',
  templateUrl: './stripe-form.component.html',
  styleUrls: ['./stripe-form.component.css']
})
export class StripeFormComponent implements AfterViewInit, OnDestroy {
  @Input()
  amount!: number;

  @ViewChild('cardInfo', { static: false }) cardInfo!: ElementRef;

  stripe!: Stripe;
  loading = false;
  confirmation: any;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string = "";

  constructor(
    private cd: ChangeDetectorRef,
    private stripeService:AngularStripeService,
    //private apiClient: ApiClientService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StripeFormComponent>) {
      this.amount = data;
    }

  ngAfterViewInit() {
    this.stripeService.setPublishableKey('pk_test_51M8f13BD0YyA16ecifI5LNhpAr3QuuPNOss5sLqAiJx9JYBK1nvRDk38QSKD3voeSdZjcmbNb02i4bumu61186zT00zdf9r8IK').then(
      stripe=> {
        this.stripe = stripe;
    const elements = stripe.elements();    
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
    });
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange(obj: any) {
    if (obj.error) {
      this.error = obj.error.message;
    } else {
      this.error = "";
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const {token, error} = await this.stripe.createToken(this.card);
    if (token) {
      this.onSuccess(token);
    } else {
      this.onError(error);
    }
  }


  onSuccess(token: string) {
    this.dialogRef.close({token});
  }

  onError(error: any) {
    if (error.message) {
        this.error = error.message;
    }
  }
}