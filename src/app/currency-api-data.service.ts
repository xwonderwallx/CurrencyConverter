import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiDataService {

  constructor(private http: HttpClient) { }

  getCurrencyData(country: string) {
    let url = 'https://api.exchangerate.host/latest?base=USD' + country;
    return this.http.get(url);
  }
}
