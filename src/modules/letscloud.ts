import RequestHelper from './request-helper';
import Instance, { InstanceProperties } from './instance';
import SSH, { SSHProperties } from './ssh';
import Location, { LocationProperties } from './location';
import Profile, { Profileproperties } from './profile';

interface CreateInstanceRequest {
  locationSlug: string;
  planSlug: string;
  hostname: string;
  label: string;
  imageSlug: string;
  sshSlug?: string;
}

export default class Letscloud {
  private requestHelper: RequestHelper;
  private profileDetails?: Profile;
  private locationsDetails?: Location[];
  private sshKeys?: SSH[];
  private instancesDetails?: Instance[];

  constructor(apiToken: string) {
    this.requestHelper = new RequestHelper(apiToken);
  }

  get profile() {
    return this.profileDetails;
  }

  get locations() {
    return this.locationsDetails;
  }

  get sshs() {
    return this.sshKeys;
  }

  get instances() {
    return this.instancesDetails;
  }

  public getProfile() {
    return this.requestHelper
      .submitRequest<Profileproperties>('GET', '/profile')
      .then(({ data: { data } }) => {
        const profile = new Profile(data);

        this.profileDetails = profile;
        return profile;
      });
  }

  public getLocations() {
    return this.requestHelper
      .submitRequest<LocationProperties[]>('GET', '/locations')
      .then(({ data: { data } }) => {
        const locations = data.map(
          location => new Location(location, this.requestHelper),
        );

        this.locationsDetails = locations;
        return locations;
      });
  }

  public getSSHKeys() {
    return this.requestHelper
      .submitRequest<SSHProperties[]>('GET', '/sshkeys')
      .then(({ data: { data: dataRaw } }) => {
        const data = dataRaw || [];
        const sshs = data.map(ssh => new SSH(ssh, this.requestHelper));

        this.sshKeys = sshs;

        return sshs;
      });
  }

  public getSSHKey(sshSlug: string) {
    return this.requestHelper
      .submitRequest<SSHProperties>('GET', `/sshkeys/${sshSlug}`)
      .then(({ data: { data: ssh } }) => new SSH(ssh, this.requestHelper));
  }

  public createSSHKey(title: string, key?: string) {
    return this.requestHelper
      .submitRequest<SSHProperties & { private_key: string }>(
        'POST',
        '/sshkeys',
        {
          data: {
            title,
            key,
          },
        },
      )
      .then(({ data: { data: ssh } }) => new SSH(ssh, this.requestHelper));
  }

  public getInstances() {
    return this.requestHelper
      .submitRequest<Record<string, InstanceProperties>>('GET', '/instances')
      .then(({ data: { data } }) => {
        const instances = Object.values(data).map(
          instance => new Instance(instance, this.requestHelper),
        );

        this.instancesDetails = instances;

        return instances;
      });
  }

  public getInstance(identifier: string) {
    return this.requestHelper
      .submitRequest<InstanceProperties>('GET', `/instances/${identifier}`)
      .then(
        ({ data: { data: instance } }) =>
          new Instance(instance, this.requestHelper),
      );
  }

  public createInstance(instanceData: CreateInstanceRequest) {
    return this.requestHelper
      .submitRequest('POST', '/instances', {
        data: {
          location_slug: instanceData.locationSlug,
          plan_slug: instanceData.planSlug,
          image_slug: instanceData.imageSlug,
          ssh_slug: instanceData.sshSlug,
          hostname: instanceData.hostname,
          label: instanceData.label,
        },
      })
      .then(({ data: { success } }) => success);
  }
}
