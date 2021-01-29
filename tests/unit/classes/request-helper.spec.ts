import nock, { Scope } from 'nock';

import RequestError from '../../../src/errors/request-error';
import RequestHelper from '../../../src/modules/request-helper';

const hostname = 'https://core.letscloud.io';
const defaultResource = '/api';

describe('RequestHelper class', () => {
  let scope: Scope;

  afterEach(nock.cleanAll);
  afterAll(nock.restore);

  beforeEach(() => {
    scope = nock(hostname);
  });

  it('Should reject the promise with RequestError when the API return success false', () => {
    const helper = new RequestHelper('invalid api');

    scope.get(`${defaultResource}/test-resource`).reply(200, {
      success: false,
      message: 'whatever',
    });

    expect.assertions(3);

    return helper.submitRequest('GET', '/test-resource').catch(error => {
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(RequestError);
      expect(error).toHaveProperty('response');
    });
  });

  it('Should reject the promise with AxiosError when the API return an status out of 2xx range', () => {
    const helper = new RequestHelper('invalid api');

    scope.get(`${defaultResource}/test-resource`).reply(400, {
      success: true,
      message: 'whatever',
    });

    expect.assertions(3);

    return helper.submitRequest('GET', '/test-resource').catch(error => {
      expect(error).toBeInstanceOf(Error);
      expect(error.isAxiosError).toBe(true);
      expect(error.response).toBeTruthy();
    });
  });
});
