import RequestHelper from './request-helper';
import Plan, { PlanProperties } from './plan';
import Image, { ImageProperties } from './image';

export interface LocationProperties {
  slug: string;
  country: string;
  city: string;
  available: boolean;
  plans?: PlanProperties[];
}

export default class Location implements LocationProperties {
  private requestHelper: RequestHelper;

  public slug = '';
  public country = '';
  public city = '';
  public available = false;
  public plans?: Plan[];
  public images?: Image[];

  constructor(ssh: LocationProperties, requestHelper: RequestHelper) {
    this.requestHelper = requestHelper;

    this.setLocationData(ssh);
  }

  private setLocationData(location: LocationProperties) {
    this.slug = location.slug;
    this.country = location.country;
    this.city = location.city;
    this.available = location.available;
    this.plans = location.plans?.map(plan => new Plan(plan));
  }

  public getPlans() {
    return this.requestHelper
      .submitRequest<Record<string, Required<LocationProperties>>>(
        'GET',
        `/locations/${this.slug}/plans`,
      )
      .then(({ data: { data } }) => {
        const location = Object.values(data)[0];
        const plans = Object.values(location.plans).map(plan => new Plan(plan));

        this.plans = plans;

        return plans;
      });
  }

  public getImages() {
    return this.requestHelper
      .submitRequest<ImageProperties[]>('GET', `/locations/${this.slug}/images`)
      .then(({ data: { data } }) => {
        const images = data.map(image => new Image(image));

        this.images = images;

        return images;
      });
  }
}
