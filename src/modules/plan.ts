export interface PlanProperties {
  shortcode: '$' | 'R$';
  core: number;
  memory: number;
  disk: number;
  bandwidth: number;
  monthly_value: string;
  slug: string;
}

export default class Plan implements PlanProperties {
  public slug: string;
  public shortcode: '$' | 'R$';
  public core: number;
  public memory: number;
  public disk: number;
  public bandwidth: number;
  public monthly_value: string;

  constructor(plan: PlanProperties) {
    this.slug = plan.slug;
    this.shortcode = plan.shortcode;
    this.core = plan.core;
    this.memory = plan.memory;
    this.disk = plan.disk;
    this.bandwidth = plan.bandwidth;
    this.monthly_value = plan.monthly_value;
  }

  get monthlyValue() {
    return Number(this.monthly_value);
  }

  get diskInMegabyte() {
    return Plan.gigaToMegaByte(this.bandwidth);
  }

  get bandwidthInMegabyte() {
    return Plan.gigaToMegaByte(this.bandwidth);
  }

  get currencyCode() {
    const currencyCodes = {
      $: 'USD',
      R$: 'BRL',
    };

    return currencyCodes[this.shortcode];
  }

  static gigaToMegaByte(gigas: number | string) {
    return Number(gigas) * 1024;
  }
}
