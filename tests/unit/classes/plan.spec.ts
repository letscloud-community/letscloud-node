import { Plan, PlanProperties } from '../../../src';

describe('Plan class', () => {
  let defaultData: PlanProperties;

  beforeEach(() => {
    defaultData = {
      shortcode: '$',
      core: 1,
      memory: 1024,
      disk: 10,
      bandwidth: 1000,
      monthly_value: '5.40',
      slug: '1vcpu-1gb-10ssd',
    };
  });

  it('Should provide snake case properties in lowerCamelCase', () => {
    defaultData.monthly_value = '34.00';

    const plan = new Plan(defaultData);

    expect(plan).toHaveProperty('monthlyValue');
    expect(plan.monthlyValue).toBe(34);
  });

  it('Should provide a number type from monthly value', () => {
    const values = ['22.35', '22', '0.00', '00.01', '-1.23', '-0.01'];
    const valuesInNumber = [22.35, 22, 0, 0.01, -1.23, -0.01];

    values.forEach((value, index) => {
      defaultData.monthly_value = value;

      const plan = new Plan(defaultData);

      expect(plan).toHaveProperty('monthlyValue');
      expect(plan.monthlyValue).toBe(valuesInNumber[index]);
    });
  });

  it('Should provide correct currencyCode in ISO 4217 format', () => {
    const shortcodes: Array<'$' | 'R$'> = ['$', 'R$', '$', 'R$'];
    const currencyCodes = ['USD', 'BRL', 'USD', 'BRL'];

    shortcodes.forEach((shortcode, index) => {
      defaultData.shortcode = shortcode;

      const plan = new Plan(defaultData);

      expect(plan).toHaveProperty('currencyCode');
      expect(plan.currencyCode).toBe(currencyCodes[index]);
    });
  });

  it('Should be able to access all properties returned from API', () => {
    defaultData = {
      shortcode: 'R$',
      core: 4,
      memory: 1024,
      disk: 20,
      bandwidth: 2000,
      monthly_value: '25.32',
      slug: '1vcpu-1gb-10ssd',
    };

    const plan = new Plan(defaultData);

    // ignore snake case properties
    expect(plan).toMatchObject({
      shortcode: defaultData.shortcode,
      core: defaultData.core,
      memory: defaultData.memory,
      disk: defaultData.disk,
      bandwidth: defaultData.bandwidth,
      slug: defaultData.slug,
      monthlyValue: 25.32,
    });
  });

  it('Should correctly return value in megabytes values in megabytes', () => {
    const values = [
      {
        disk: 10,
        bandwidth: 1000,
      },
      {
        disk: 20,
        bandwidth: 1500,
      },
      {
        disk: 30,
        bandwidth: 2000,
      },
      {
        disk: 40,
        bandwidth: 3000,
      },
    ];

    values.forEach(value => {
      const plan = new Plan({
        ...defaultData,
        ...value,
      });

      expect(plan.diskInMegabyte).toBe(value.disk * 1024);
      expect(plan.bandwidthInMegabyte).toBe(value.bandwidth * 1024);
    });
  });
});
