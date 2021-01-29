import { AxiosError } from 'axios';
import nock, { Scope } from 'nock';

import { Instance, InstanceProperties } from '../../../src';
import RequestError from '../../../src/errors/request-error';
import RequestHelper from '../../../src/modules/request-helper';
import {
  actionSshSuccessResponse,
  fetchInstanceSuccessResponse,
  failsResponse,
} from '../../fixtures/instance';

const hostname = 'https://core.letscloud.io';
const defaultResource = '/api';

describe('Location class', () => {
  let scope: Scope;
  const dummyReuqestHelper = new RequestHelper('apiKey');
  let defaultData: InstanceProperties;

  afterEach(nock.cleanAll);
  afterAll(nock.restore);

  beforeEach(() => {
    defaultData = {
      identifier: 'your-instance-identifier',
      booted: true,
      built: true,
      locked: false,
      memory: 1024,
      total_disk_size: 10,
      cpus: 1,
      label: 'your-instance-label',
      ip_addresses: [],
      template_label: 'CentOS 7.4 x64',
      hostname: 'your-instance-hostname',
    };

    scope = nock(hostname);
  });

  it('Should provide snake case properties in lowerCamelCase', () => {
    defaultData.total_disk_size = 40;
    defaultData.ip_addresses = ['ip1', 'ip2', 'ip3'];
    defaultData.template_label = 'My first instance';

    const instance = new Instance(defaultData, dummyReuqestHelper);

    expect(instance).toHaveProperty('totalDiskSize');
    expect(instance.totalDiskSize).toBe(defaultData.total_disk_size);

    expect(instance).toHaveProperty('ipAddresses');
    expect(instance.ipAddresses).toMatchObject(defaultData.ip_addresses);

    expect(instance).toHaveProperty('templateLabel');
    expect(instance.templateLabel).toMatch(defaultData.template_label);
  });

  it('Should be able to access all properties returned from API', () => {
    const instance = new Instance(defaultData, dummyReuqestHelper);

    // ignore snake case properties
    expect(instance).toMatchObject({
      identifier: defaultData.identifier,
      booted: defaultData.booted,
      built: defaultData.built,
      locked: defaultData.locked,
      memory: defaultData.memory,
      cpus: defaultData.cpus,
      label: defaultData.label,
      hostname: defaultData.hostname,
      totalDiskSize: defaultData.total_disk_size,
      ipAddresses: defaultData.ip_addresses,
      templateLabel: defaultData.template_label,
    });
  });

  describe('Requests', () => {
    describe('Success', () => {
      it('Should successful fetch itself data', () => {
        defaultData.identifier = 'auto-generated-identifier';
        defaultData.label = 'Label to make diff';

        const instance = new Instance(defaultData, dummyReuqestHelper);

        nock(hostname)
          .get(`${defaultResource}/instances/${defaultData.identifier}`)
          .reply(200, fetchInstanceSuccessResponse);

        expect.assertions(3);

        return instance.fetchInstance().then(fetchedInstance => {
          expect(fetchedInstance).toBeInstanceOf(Instance);
          expect(instance.label).toMatch(fetchInstanceSuccessResponse.data.label);
          expect(instance.label).not.toMatch(defaultData.label);
        });
      });

      it('Should successful delete itself', () => {
        defaultData.identifier = 'auto-generated-identifier';

        const instance = new Instance(defaultData, dummyReuqestHelper);

        nock(hostname)
          .delete(`${defaultResource}/instances/${defaultData.identifier}`)
          .reply(200, actionSshSuccessResponse);

        expect.assertions(1);

        return instance.deleteInstance().then(() => {
          expect(true).toBe(true); // Only for verify if enter in the `then` block
        });
      });

      it('Should successful turn off itself', () => {
        defaultData.identifier = 'auto-generated-identifier';

        const instance = new Instance(defaultData, dummyReuqestHelper);

        nock(hostname)
          .put(`${defaultResource}/instances/${defaultData.identifier}/power-off`)
          .reply(200, actionSshSuccessResponse);

        expect.assertions(1);

        return instance.changePower(false).then(() => {
          expect(true).toBe(true); // Only for verify if enter in the `then` block
        });
      });

      it('Should successful turn on itself', () => {
        defaultData.identifier = 'auto-generated-identifier';

        const instance = new Instance(defaultData, dummyReuqestHelper);

        nock(hostname)
          .put(`${defaultResource}/instances/${defaultData.identifier}/power-on`)
          .reply(200, actionSshSuccessResponse);

        expect.assertions(1);

        return instance.changePower(true).then(() => {
          expect(true).toBe(true); // Only for verify if enter in the `then` block
        });
      });

      it('Should successful reboot itself', () => {
        defaultData.identifier = 'auto-generated-identifier';

        const instance = new Instance(defaultData, dummyReuqestHelper);

        nock(hostname)
          .put(`${defaultResource}/instances/${defaultData.identifier}/reboot`)
          .reply(200, actionSshSuccessResponse);

        expect.assertions(1);

        return instance.rebootInstance().then(() => {
          expect(true).toBe(true); // Only for verify if enter in the `then` block
        });
      });

      it('Should successful reset root password itself', () => {
        defaultData.identifier = 'auto-generated-identifier';

        const instance = new Instance(defaultData, dummyReuqestHelper);

        nock(hostname)
          .put(`${defaultResource}/instances/${defaultData.identifier}/reset-password`)
          .reply(200, actionSshSuccessResponse);

        expect.assertions(1);

        return instance.resetPassword('my-complex-password').then(() => {
          expect(true).toBe(true); // Only for verify if enter in the `then` block
        });
      });
    });

    describe('Fails', () => {
      let instance: Instance;

      const verifyErrorSuccess = (error: RequestError) => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(RequestError);
        expect(error?.response).toBeTruthy();
      };

      const verifyErrorStatus = (error: AxiosError | RequestError) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.response).toBeTruthy();
      };

      beforeEach(() => {
        defaultData.identifier = 'auto-generated-identifier';
        instance = new Instance(defaultData, dummyReuqestHelper);
      });

      it('Should be able to handle with fails to fetch itself data with success false', () => {
        scope
          .get(`${defaultResource}/instances/${defaultData.identifier}`)
          .reply(200, failsResponse);

        expect.assertions(3);

        return instance.fetchInstance().catch(verifyErrorSuccess);
      });

      it('Should be able to handle with fails to fetch itself data with error status', () => {
        scope
          .get(`${defaultResource}/instances/${defaultData.identifier}`)
          .reply(400, failsResponse);

        expect.assertions(2);

        return instance.fetchInstance().catch(verifyErrorStatus);
      });

      it('Should be able to handle with fails to change power with success false', () => {
        scope
          .put(`${defaultResource}/instances/${defaultData.identifier}/power-on`)
          .reply(200, failsResponse);

        scope
          .put(`${defaultResource}/instances/${defaultData.identifier}/power-off`)
          .reply(200, failsResponse);

        expect.assertions(6);

        return Promise.all([
          instance.changePower(true).catch(verifyErrorSuccess),
          instance.changePower(false).catch(verifyErrorSuccess),
        ]);
      });

      it('Should be able to handle with fails to change power with error status', () => {
        scope
          .put(`${defaultResource}/instances/${defaultData.identifier}/power-on`)
          .reply(400, failsResponse);

        scope
          .put(`${defaultResource}/instances/${defaultData.identifier}/power-off`)
          .reply(400, failsResponse);

        expect.assertions(4);

        return Promise.all([
          instance.changePower(true).catch(verifyErrorStatus),
          instance.changePower(false).catch(verifyErrorStatus),
        ]);
      });

      it('Should fail to reboot itself with success false', () => {
        scope
          .put(`${defaultResource}/instances/${defaultData.identifier}/reboot`)
          .reply(200, failsResponse);

        expect.assertions(3);

        return instance.rebootInstance().catch(verifyErrorSuccess);
      });

      it('Should fail to reboot itself with status code', () => {
        nock(hostname)
          .put(`${defaultResource}/instances/${defaultData.identifier}/reboot`)
          .reply(400, actionSshSuccessResponse);

        expect.assertions(2);

        return instance.rebootInstance().catch(verifyErrorStatus);
      });

      it('Should fail to reset root password with success false', () => {
        scope
          .put(`${defaultResource}/instances/${defaultData.identifier}/reset-password`)
          .reply(200, failsResponse);

        expect.assertions(3);

        return instance.resetPassword('whatever').catch(verifyErrorSuccess);
      });

      it('Should fail to reset root password with status code', () => {
        nock(hostname)
          .put(`${defaultResource}/instances/${defaultData.identifier}/reset-password`)
          .reply(400, actionSshSuccessResponse);

        expect.assertions(2);

        return instance.resetPassword('whatever').catch(verifyErrorStatus);
      });
    });
  });
});
