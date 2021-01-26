export interface Profileproperties {
  name: string;
  company_name: string | null;
  email: string;
  currency: '$' | 'R$';
  balance: string;
}

export default class Profile implements Profileproperties {
  public name: string;
  public company_name: string | null;
  public email: string;
  public currency: '$' | 'R$';
  public balance: string;

  constructor(profile: Profileproperties) {
    this.name = profile.name;
    this.company_name = profile.company_name;
    this.email = profile.email;
    this.currency = profile.currency;
    this.balance = profile.balance;
  }

  get currencyCode() {
    const currencyCodes = {
      $: 'USD',
      R$: 'BRL',
    };

    return currencyCodes[this.currency];
  }

  get balanceNumber() {
    return Number(this.balance);
  }

  get companyName() {
    return this.company_name;
  }
}
