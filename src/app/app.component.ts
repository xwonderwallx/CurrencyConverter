import { Component } from '@angular/core';
import { CurrencyApiDataService } from './currency-api-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  baseCurrency: string = 'EUR';

  title = 'currencyConverter';
  currencyJson: any = [];

  firstCurrency = 'EUR';
  secondCurrency = 'EUR';
  result: any = '1';

  eur: any = 0;
  usd: any = 0;
  uah: any = 0;

  changeFirstCurrency(currency: string) {
    this.firstCurrency = currency;
  }

  changeSecondCurrency(currency: string) {
    this.secondCurrency = currency;
  }

  getTheCurrentRate() {
    this.currency.getCurrencyData(this.baseCurrency).subscribe(data => {

      this.currencyJson = JSON.stringify(data);
      this.currencyJson = JSON.parse(this.currencyJson);

      this.eur = +this.currencyJson.rates.EUR;
      this.usd = +this.currencyJson.rates.USD;
      this.uah = +this.currencyJson.rates.UAH;
    });
  }

  constructor(private currency: CurrencyApiDataService) {
    this.getTheCurrentRate();
  }

  convert(from: string, to: string, amount: any) {
    return this.getTheCurrencyWeight(from, to) * amount;
  }

  getTheCurrencyWeight(from: string, to: string): any {

    if (from == to)
      this.result = 1;

    if (from == 'USD' && to == 'EUR')
      this.result = this.eur * this.usd;

    if (from == 'EUR' && to == 'USD')
      this.result = this.usd / this.eur;

    if (from == 'EUR' && to == 'UAH')
      this.result = this.uah * this.eur;

    if (from == 'UAH' && to == 'EUR')
      this.result = this.eur / this.uah;

    if (from == 'UAH' && to == 'USD')
      this.result = this.uah * this.usd;

    if (from == 'USD' && to == 'UAH')
      this.result = this.uah / this.usd;

    return +this.result;
  }

  convertCurrency(sender: any, target: any, id: any) {
    
    if (id == 1)
      target.value = this.convert(this.firstCurrency, this.secondCurrency, sender.value);
    else
      target.value = this.convert(this.secondCurrency, this.firstCurrency, sender.value);
  }

}
