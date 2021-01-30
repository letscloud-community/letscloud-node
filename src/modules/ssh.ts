import RequestHelper from './request-helper';

export interface SSHProperties {
  title: string;
  slug: string;
  public_key: string;
  private_key?: string;
}

export default class SSH implements SSHProperties {
  private requestHelper: RequestHelper;

  public title = '';
  public slug = '';
  public public_key = '';
  public private_key?: string;

  constructor(ssh: SSHProperties, requestHelper: RequestHelper) {
    this.requestHelper = requestHelper;

    this.setSSHData(ssh);
  }

  get publicKey() {
    return this.public_key;
  }

  get privateKey() {
    return this.private_key;
  }

  private setSSHData(ssh: SSHProperties) {
    this.title = ssh.title;
    this.slug = ssh.slug;
    this.public_key = ssh.public_key;
    this.private_key = ssh.private_key || this.private_key;
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
    return this.requestHelper.submitRequest('DELETE', `/sshkeys`, {
      data: { slug: this.slug },
    });
  }
}
