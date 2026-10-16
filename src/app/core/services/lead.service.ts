import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import type {
  BriefPayload,
  CallbackPayload,
  ConsultationPayload,
  ContactPayload,
  OrderPayload,
  SubscribePayload,
} from '../models/models';

/** Submits the six lead forms to the backend. */
@Injectable({ providedIn: 'root' })
export class LeadService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/requests`;

  contact(payload: ContactPayload) {
    return this.http.post(`${this.base}/contact/`, payload);
  }

  callback(payload: CallbackPayload) {
    return this.http.post(`${this.base}/callback/`, payload);
  }

  order(payload: OrderPayload) {
    return this.http.post(`${this.base}/order/`, payload);
  }

  brief(payload: BriefPayload) {
    return this.http.post(`${this.base}/brief/`, payload);
  }

  consultation(payload: ConsultationPayload) {
    return this.http.post(`${this.base}/consultation/`, payload);
  }

  subscribe(payload: SubscribePayload) {
    return this.http.post(`${this.base}/subscribe/`, payload);
  }
}
