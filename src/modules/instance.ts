import RequestHelper from './request-helper';

export interface InstanceProperties {
  identifier: string;
  booted: boolean;
  built: boolean;
  locked: boolean;
  memory: number;
  total_disk_size: number;
  cpus: number;
  label: string;
  ip_addresses: string[];
  template_label: string;
  hostname: string;
}

export default class Instance implements InstanceProperties {
  private requestHelper: RequestHelper;

  public identifier = '';
  public booted = false;
  public built = false;
  public locked = false;
  public memory = 0;
  public total_disk_size = 0;
  public cpus = 0;
  public label = '';
  public ip_addresses: string[] = [];
  public template_label = '';
  public hostname = '';

  constructor(instance: InstanceProperties, requestHelper: RequestHelper) {
    this.requestHelper = requestHelper;

    this.setInstanceData(instance);
  }

  get totalDiskSize() {
    return this.total_disk_size;
  }

  get ipAddresses() {
    return this.ip_addresses;
  }

  get templateLabel() {
    return this.template_label;
  }

  private setInstanceData(instance: InstanceProperties) {
    this.identifier = instance.identifier;
    this.booted = instance.booted;
    this.built = instance.built;
    this.locked = instance.locked;
    this.memory = instance.memory;
    this.total_disk_size = instance.total_disk_size;
    this.cpus = instance.cpus;
    this.label = instance.label;
    this.ip_addresses = instance.ip_addresses;
    this.template_label = instance.template_label;
    this.hostname = instance.hostname;
  }

  public fetchInstance() {
    return this.requestHelper
      .submitRequest<InstanceProperties>('GET', `/instances/${this.identifier}`)
      .then(({ data: { data: instance } }) => {
        this.setInstanceData(instance);

        return this;
      });
  }

  public deleteInstance() {
    return this.requestHelper
      .submitRequest('DELETE', `/instances/${this.identifier}`)
      .then(({ data: { success } }) => success);
  }

  public changePower(turnOn: boolean) {
    const resource = `power-${turnOn ? 'on' : 'off'}`;

    return this.requestHelper
      .submitRequest('PUT', `/instances/${this.identifier}/${resource}`)
      .then(({ data: { success } }) => {
        this.booted = success ? turnOn : this.booted;

        return success;
      });
  }

  public rebootInstance() {
    return this.requestHelper
      .submitRequest('PUT', `/instances/${this.identifier}/reboot`)
      .then(({ data: { success } }) => success);
  }

  public resetPassword(newPassword: string) {
    return this.requestHelper
      .submitRequest('PUT', `/instances/${this.identifier}/reset-password`, {
        data: { password: newPassword },
      })
      .then(({ data: { success } }) => success);
  }
}
