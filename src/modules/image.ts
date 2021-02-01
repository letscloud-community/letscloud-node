export interface ImageProperties {
  distro: string;
  os: string;
  slug: string;
}

export default class Image implements ImageProperties {
  public distro: string;
  public os: string;
  public slug: string;

  constructor(image: ImageProperties) {
    this.slug = image.slug;
    this.os = image.os;
    this.distro = image.distro;
  }
}
