import RequestHelper from './request-helper';

import {
  Profile,
  Location,
  Plan,
  Image,
  SSHKey,
  Instance,
} from '../../letscloud-node';

interface LocationWithPlans extends Location {
  plans: Plan[];
}

interface CreateInstanceRequest {
  // eslint-disable-next-line camelcase
  location_slug: string;
  // eslint-disable-next-line camelcase
  plan_slug: string;
  hostname: string;
}

export default class Letscloud {
  private requestHelper: RequestHelper;
  private profileDetails?: Profile;
  private locationsDetails?: Location[];

  constructor(apiToken: string) {
    this.requestHelper = new RequestHelper(apiToken);
  }

  get profile() {
    return this.profileDetails;
  }

  get locations() {
    return this.locationsDetails;
  }

  public getProfile() {
    return this.requestHelper
      .submitRequest<Profile>('GET', '/profile')
      .then(({ data: { data: profile } }) => {
        this.profileDetails = profile;
        return profile;
      });
  }

  public getLocations() {
    return this.requestHelper
      .submitRequest<Location[]>('GET', '/locations')
      .then(({ data: { data: locations } }) => {
        this.locationsDetails = locations;
        return locations;
      });
  }

  public getLocationPlans(locationSlug: string) {
    return this.requestHelper
      .submitRequest<Record<string, LocationWithPlans>>(
        'GET',
        `/locations/${locationSlug}/plans`,
      )
      .then(({ data: { data } }) => Object.values(data)[0]);
  }

  public getLocationImages(locationSlug: string) {
    return this.requestHelper
      .submitRequest<Image[]>('GET', `/locations/${locationSlug}/images`)
      .then(({ data: { data: images } }) => images);
  }

  public getSSHKeys() {
    return this.requestHelper
      .submitRequest<SSHKey[]>('GET', '/sshkeys')
      .then(({ data: { data: sshs } }) => sshs);
  }

  public getSSHKey(sshSlug: string) {
    return this.requestHelper
      .submitRequest<SSHKey>('GET', `/sshkeys/${sshSlug}`)
      .then(({ data: { data: ssh } }) => ssh);
  }

  public createSSHKey(title: string, key?: string) {
    return (
      this.requestHelper
        // eslint-disable-next-line camelcase
        .submitRequest<SSHKey & { private_key: string }>('POST', '/sshkeys', {
          data: {
            title,
            key,
          },
        })
        .then(({ data: { data: ssh } }) => ssh)
    );
  }

  public deleteSSHKey(sshSlug: string) {
    return this.requestHelper
      .submitRequest('DELETE', `/sshkeys`, {
        data: { slug: sshSlug },
      })
      .then(({ data: { success } }) => success);
  }

  public getInstances() {
    return this.requestHelper
      .submitRequest<Record<string, Instance>>('GET', '/instances')
      .then(({ data: { data: instances } }) => instances);
  }

  public getInstance(identifier: string) {
    return this.requestHelper
      .submitRequest<Instance>('GET', `/instances/${identifier}`)
      .then(({ data: { data: instance } }) => instance);
  }

  public createInstance(instanceData: CreateInstanceRequest) {
    return this.requestHelper
      .submitRequest('POST', '/instances', { data: instanceData })
      .then(({ data: { success } }) => success);
  }

  public deleteInstance(instanceId: string) {
    return this.requestHelper
      .submitRequest('DELETE', `/instances/${instanceId}`)
      .then(({ data: { success } }) => success);
  }

  public changePower(instanceId: string, turnOn: boolean) {
    const resource = `power-${turnOn ? 'on' : 'off'}`;

    return this.requestHelper
      .submitRequest('PUT', `/instances/${instanceId}/${resource}`)
      .then(({ data: { success } }) => success);
  }

  public rebootInstance(instanceId: string) {
    return this.requestHelper
      .submitRequest('PUT', `/instances/${instanceId}/reboot`)
      .then(({ data: { success } }) => success);
  }

  public resetPassword(instanceId: string, newPassword: string) {
    return this.requestHelper
      .submitRequest('PUT', `/instances/${instanceId}/reset-password`, {
        data: { password: newPassword },
      })
      .then(({ data: { success } }) => success);
  }
}
