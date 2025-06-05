import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:2525/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(to: string | null | undefined, subject:  string | null | undefined, text: string | null | undefined): Observable<any> {
    const body = { to, subject, text };
    return this.http.post(this.apiUrl, body);
  }
}
