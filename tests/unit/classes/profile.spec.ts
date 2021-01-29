import { Profile, Profileproperties } from '../../../src';

describe('Profile class', () => {
  let defaultData: Profileproperties;

  beforeEach(() => {
    defaultData = {
      balance: '22.32',
      company_name: null,
      currency: '$',
      email: 'email@gmail.com',
      name: 'name',
    };
  });

  it('Should provide snake case properties in lowerCamelCase', () => {
    defaultData.company_name = 'my company name';

    const profile = new Profile(defaultData);

    expect(profile).toHaveProperty('companyName');
    expect(profile.companyName).toMatch(defaultData.company_name);
  });

  it('Should provide a number type from balance value', () => {
    const balances = ['22.35', '22', '0.00', '00.01', '-1.23', '-0.01'];
    const balancesInNumber = [22.35, 22, 0, 0.01, -1.23, -0.01];

    balances.forEach((balance, index) => {
      defaultData.balance = balance;

      const profile = new Profile(defaultData);

      expect(profile).toHaveProperty('balanceNumber');
      expect(profile.balanceNumber).toBe(balancesInNumber[index]);
    });
  });

  it('Should provide correct currencyCode in ISO 4217 format', () => {
    const currencies: Array<'$' | 'R$'> = ['$', 'R$', '$', 'R$'];
    const currencyCodes = ['USD', 'BRL', 'USD', 'BRL'];

    currencies.forEach((currency, index) => {
      defaultData.currency = currency;

      const profile = new Profile(defaultData);

      expect(profile).toHaveProperty('currencyCode');
      expect(profile.currencyCode).toBe(currencyCodes[index]);
    });
  });

  it('Should be able to access all properties returned from API', () => {
    defaultData = {
      balance: '20.00',
      company_name: 'Awesome company name',
      email: 'example@gmail.com',
      currency: '$',
      name: 'User name',
    };

    const profile = new Profile(defaultData);

    // ignore snake case properties
    expect(profile).toMatchObject({
      balance: defaultData.balance,
      email: defaultData.email,
      currency: defaultData.currency,
      name: defaultData.name,
      companyName: defaultData.company_name,
    });
  });
});
