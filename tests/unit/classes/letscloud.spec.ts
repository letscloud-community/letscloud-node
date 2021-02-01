import nock from 'nock';
import axios, { AxiosError } from 'axios';
import Letscloud, { Instance, Location, Profile, SSH } from '../../../src';

import RequestError from '../../../src/errors/request-error';
import {
  defaultErrorResponse,
  profileSuccessResponse,
  LocationsSuccessResponse,
  sshKeysSuccessResponse,
  instancesSuccessResponse,
  sshKeySuccessResponse,
  instanceSuccessResponse,
  sshCreateSuccessResponse,
} from '../../fixtures/letscloud';

axios.defaults.adapter = require('axios/lib/adapters/http');

const hostname = 'https://core.letscloud.io';
const defaultResource = '/api';

describe('LetsCloud class', () => {
  let lets: Letscloud;

  afterEach(nock.cleanAll);
  afterAll(nock.restore);

  beforeEach(() => {
    lets = new Letscloud('AnyRandomApiKey');
  });

  describe('Profile', () => {
    it('Should return from promise the profile content as Profile class', () => {
      expect.assertions(3);

      nock(hostname).get(`${defaultResource}/profile`).reply(200, profileSuccessResponse);

      return lets.getProfile().then(profile => {
        expect(profile).toBeInstanceOf(Profile);
        expect(profile).toMatchObject(profileSuccessResponse.data);
        expect(lets.profile).toMatchObject(profileSuccessResponse.data);
      });
    });
  });

  describe('SSH', () => {
    it('Should return from promise the ssh keys as SSH class array', done => {
      nock(hostname).get(`${defaultResource}/sshkeys`).reply(200, sshKeysSuccessResponse);

      return lets
        .getSSHKeys()
        .then(sshKeys => {
          expect(sshKeys).toBeInstanceOf(Array);
          sshKeys.forEach(ssh => expect(ssh).toBeInstanceOf(SSH));
          expect(lets.sshs).toMatchObject(sshKeys);
          done();
        })
        .catch(done);
    });

    it('Should return from promise the ssh', () => {
      nock(hostname).get(`${defaultResource}/sshkeys/ssh-slug`).reply(200, sshKeySuccessResponse);

      expect.assertions(2);

      return lets.getSSHKey('ssh-slug').then(ssh => {
        expect(ssh).toBeInstanceOf(SSH);
        expect(ssh).toMatchObject(sshKeySuccessResponse.data);
      });
    });

    it('Should generate a new ssh and return itself', () => {
      nock(hostname).post(`${defaultResource}/sshkeys`).reply(200, sshCreateSuccessResponse);

      expect.assertions(2);

      return lets.createSSHKey(sshCreateSuccessResponse.data.title).then(ssh => {
        expect(ssh).toBeInstanceOf(SSH);
        expect(ssh).toMatchObject(sshCreateSuccessResponse.data);
      });
    });

    it('Should create a new ssh and return itself', () => {
      nock(hostname).post(`${defaultResource}/sshkeys`).reply(200, sshCreateSuccessResponse);

      expect.assertions(2);

      return lets
        .createSSHKey(sshCreateSuccessResponse.data.title, sshCreateSuccessResponse.data.public_key)
        .then(ssh => {
          expect(ssh).toBeInstanceOf(SSH);
          expect(ssh).toMatchObject(sshCreateSuccessResponse.data);
        });
    });
  });

  describe('Instance', () => {
    it('Should return from promise the instances as Instance class array', done => {
      nock(hostname).get(`${defaultResource}/instances`).reply(200, instancesSuccessResponse);

      return lets
        .getInstances()
        .then(instances => {
          expect(instances).toBeInstanceOf(Array);
          instances.forEach(instance => expect(instance).toBeInstanceOf(Instance));
          expect(lets.instances).toMatchObject(instances);
          done();
        })
        .catch(done);
    });

    it('Should return from promise the instance as Instance class', () => {
      nock(hostname)
        .get(`${defaultResource}/instances/instance-slug`)
        .reply(200, instanceSuccessResponse);

      return lets.getInstance('instance-slug').then(instance => {
        expect(instance).toBeInstanceOf(Instance);
        expect(instance).toMatchObject(instanceSuccessResponse.data);
      });
    });

    it('Should create a new instance', () => {
      nock(hostname).post(`${defaultResource}/instances`).reply(200, {
        success: true,
        message: 'Successful created',
      });

      const instance = {
        hostname: 'hostname',
        imageSlug: 'os-slug',
        label: 'label',
        locationSlug: 'MIA1',
        planSlug: 'plan-slug',
      };

      expect.assertions(1);

      return lets.createInstance(instance).then(() => {
        expect(true).toBe(true); // Only for verify if enter in the `then` block
      });
    });
  });

  describe('Location', () => {
    it('Should return from promise the locations as Location class array', done => {
      nock(hostname).get(`${defaultResource}/locations`).reply(200, LocationsSuccessResponse);

      return lets
        .getLocations()
        .then(locations => {
          expect(locations).toBeInstanceOf(Array);
          locations.forEach(location => expect(location).toBeInstanceOf(Location));
          expect(lets.locations).toMatchObject(locations);
          done();
        })
        .catch(done);
    });
  });

  describe('Failed calls', () => {
    const instance = {
      hostname: 'hostname',
      imageSlug: 'os-slug',
      label: 'label',
      locationSlug: 'MIA1',
      planSlug: 'plan-slug',
    };

    it('Should reject Promise when success property is false', async () => {
      const scope = nock(hostname);

      const catchBlock = (error: AxiosError | RequestError) => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(RequestError);
        expect(error.response).toBeTruthy();
      };

      scope.get(`${defaultResource}/profile`).reply(200, defaultErrorResponse);
      scope.get(`${defaultResource}/sshkeys`).reply(200, defaultErrorResponse);
      scope.get(`${defaultResource}/sshkeys/ssh-slug`).reply(200, defaultErrorResponse);
      scope.get(`${defaultResource}/instances`).reply(200, defaultErrorResponse);
      scope.get(`${defaultResource}/instances/my-instance`).reply(200, defaultErrorResponse);
      scope.get(`${defaultResource}/locations`).reply(200, defaultErrorResponse);
      scope.persist().post(`${defaultResource}/sshkeys`).reply(200, defaultErrorResponse);
      scope.post(`${defaultResource}/instances`).reply(200, defaultErrorResponse);

      await lets.getProfile().catch(catchBlock);
      await lets.getSSHKeys().catch(catchBlock);
      await lets.getSSHKey('ssh-slug').catch(catchBlock);
      await lets.getInstances().catch(catchBlock);
      await lets.getInstance('my-instance').catch(catchBlock);
      await lets.getLocations().catch(catchBlock);
      await lets.createInstance(instance).catch(catchBlock);
      await lets.createSSHKey('my-title').catch(catchBlock);
      await lets.createSSHKey('my-title', 'my-key').catch(catchBlock);
    });

    it('Should reject Promise when request return error satus code', async () => {
      const scope = nock(hostname);

      const catchBlock = (error: AxiosError) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.response).toBeTruthy();
      };

      scope.get(`${defaultResource}/profile`).reply(400, defaultErrorResponse);
      scope.get(`${defaultResource}/sshkeys`).reply(400, defaultErrorResponse);
      scope.get(`${defaultResource}/sshkeys/ssh-slug`).reply(400, defaultErrorResponse);
      scope.get(`${defaultResource}/instances`).reply(400, defaultErrorResponse);
      scope.get(`${defaultResource}/instances/my-instance`).reply(200, defaultErrorResponse);
      scope.get(`${defaultResource}/locations`).reply(400, defaultErrorResponse);
      scope.persist().post(`${defaultResource}/sshkeys`).reply(400, defaultErrorResponse);
      scope.post(`${defaultResource}/instances`).reply(400, defaultErrorResponse);

      await lets.getProfile().catch(catchBlock);
      await lets.getInstances().catch(catchBlock);
      await lets.getInstance('my-instance').catch(catchBlock);
      await lets.getSSHKeys().catch(catchBlock);
      await lets.getSSHKey('ssh-slug').catch(catchBlock);
      await lets.getLocations().catch(catchBlock);
      await lets.createInstance(instance).catch(catchBlock);
      await lets.createSSHKey('my-title').catch(catchBlock);
      await lets.createSSHKey('my-title', 'my-key').catch(catchBlock);
    });
  });
});
