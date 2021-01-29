import nock from 'nock';

import { SSH, SSHProperties } from '../../../src';
import RequestError from '../../../src/errors/request-error';
import RequestHelper from '../../../src/modules/request-helper';
import {
  fetchSshSuccessResponse,
  failsResponse,
  deleteSshSuccessResponse,
} from '../../fixtures/ssh';

const hostname = 'https://core.letscloud.io';
const defaultResource = '/api';

describe('SSH class', () => {
  const dummyReuqestHelper = new RequestHelper('apiKey');
  let defaultData: SSHProperties;

  afterEach(nock.cleanAll);
  afterAll(nock.restore);

  beforeEach(() => {
    defaultData = {
      public_key: 'RandomPublicSSHKey',
      slug: 'randompublicsshkey',
      title: 'My ssh key',
    };
  });

  it('Should provide snake case properties in lowerCamelCase', () => {
    defaultData.public_key = 'public key';
    defaultData.private_key = 'private key';

    const ssh = new SSH(defaultData, dummyReuqestHelper);

    expect(ssh).toHaveProperty('publicKey');
    expect(ssh.publicKey).toMatch(defaultData.public_key);

    expect(ssh).toHaveProperty('privateKey');
    expect(ssh.privateKey).toMatch(defaultData.private_key);
  });

  it('Should be able to access all properties returned from API', () => {
    defaultData.public_key = 'public key';
    defaultData.private_key = 'private key';

    const ssh = new SSH(defaultData, dummyReuqestHelper);

    // ignore snake case properties
    expect(ssh).toMatchObject({
      slug: defaultData.slug,
      title: defaultData.title,
      publicKey: defaultData.public_key,
      privateKey: defaultData.private_key,
    });
  });

  describe('Requests', () => {
    describe('Success', () => {
      it('Should successful fetch itself data', () => {
        defaultData.slug = 'my-random-key';
        defaultData.title = 'Ramdom key title';

        const ssh = new SSH(defaultData, dummyReuqestHelper);

        nock(hostname)
          .get(`${defaultResource}/sshkeys/my-random-key`)
          .reply(200, fetchSshSuccessResponse);

        expect.assertions(3);

        return ssh.fetchSSHKey().then(fetchedSsh => {
          expect(fetchedSsh).toBeInstanceOf(SSH);
          expect(ssh.title).toMatch(fetchSshSuccessResponse.data.title);
          expect(ssh.title).not.toMatch(defaultData.title);
        });
      });

      it('Should successful delete itself', () => {
        defaultData.slug = 'MIA2';
        const ssh = new SSH(defaultData, dummyReuqestHelper);

        nock(hostname)
          .delete(`${defaultResource}/sshkeys`, { slug: 'MIA2' })
          .reply(200, deleteSshSuccessResponse);

        expect.assertions(1);

        return ssh.deleteSSH().then(() => {
          expect(true).toBe(true); // Only for verify if enter in the `then` block
        });
      });
    });

    describe('Fails', () => {
      it('Should be able to handle with fails to fetch itself data with success false', () => {
        defaultData.slug = 'my-random-key';
        const ssh = new SSH(defaultData, dummyReuqestHelper);

        nock(hostname).get(`${defaultResource}/sshkeys/my-random-key`).reply(200, failsResponse);

        expect.assertions(3);

        return ssh.fetchSSHKey().catch(error => {
          expect(error).toBeInstanceOf(Error);
          expect(error).toBeInstanceOf(RequestError);
          expect(error).toHaveProperty('response');
        });
      });

      it('Should be able to handle with fails to fetch itself data with status error', () => {
        defaultData.slug = 'my-random-key';
        const ssh = new SSH(defaultData, dummyReuqestHelper);

        nock(hostname).get(`${defaultResource}/sshkeys/my-random-key`).reply(400, failsResponse);

        expect.assertions(2);

        return ssh.fetchSSHKey().catch(error => {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty('response');
        });
      });

      it('Should be able to handle with fails to delete itself data with success false', () => {
        defaultData.slug = 'my-random-key';
        const ssh = new SSH(defaultData, dummyReuqestHelper);

        nock(hostname)
          .delete(`${defaultResource}/sshkeys`, { slug: 'my-random-key' })
          .reply(200, failsResponse);

        expect.assertions(3);

        return ssh.deleteSSH().catch(error => {
          expect(error).toBeInstanceOf(Error);
          expect(error).toBeInstanceOf(RequestError);
          expect(error).toHaveProperty('response');
        });
      });

      it('Should be able to handle with fails to delete itself data with status error', () => {
        defaultData.slug = 'my-random-key';
        const ssh = new SSH(defaultData, dummyReuqestHelper);

        nock(hostname)
          .delete(`${defaultResource}/sshkeys`, { slug: 'my-random-key' })
          .reply(400, failsResponse);

        expect.assertions(2);

        return ssh.deleteSSH().catch(error => {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty('response');
        });
      });
    });
  });
});
