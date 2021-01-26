import RequestHelper from './request-helper';

export interface SSHProperties {
  title: string;
  slug: string;
  public_key: string;
}

export default class Insntace implements SSHProperties {
  private requestHelper: RequestHelper;

  public title = '';
  public slug = '';
  public public_key = '';

  constructor(ssh: SSHProperties, requestHelper: RequestHelper) {
    this.requestHelper = requestHelper;

    this.setSSHData(ssh);
  }

  get publicKey() {
    return this.public_key;
  }

  private setSSHData(ssh: SSHProperties) {
    this.title = ssh.title;
    this.slug = ssh.slug;
    this.public_key = ssh.public_key;
  }

  public fetchSSHKey() {
    return this.requestHelper
      .submitRequest<SSHProperties>('GET', `/sshkeys/${this.slug}`)
      .then(({ data: { data: ssh } }) => {
        this.setSSHData(ssh);

        return this;
      });
  }

  public deleteSSH() {
    return this.requestHelper
      .submitRequest('DELETE', `/sshkeys`, {
        data: { slug: this.slug },
      })
      .then(({ data: { success } }) => success);
  }
}
