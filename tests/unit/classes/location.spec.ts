import nock from 'nock';

import { Location, LocationProperties, Plan, Image } from '../../../src';
import RequestError from '../../../src/errors/request-error';
import RequestHelper from '../../../src/modules/request-helper';
import {
  listPlansSuccessResponse,
  listImagesSuccessResponse,
  listFailsResponse,
} from '../../fixtures/location/index';

const hostname = 'https://core.letscloud.io';
const defaultResource = '/api';

describe('Location class', () => {
  const dummyReuqestHelper = new RequestHelper('apiKey');
  let defaultData: LocationProperties;

  afterEach(nock.cleanAll);
  afterAll(nock.restore);

  beforeEach(() => {
    defaultData = {
      slug: 'MIA1',
      country: 'United States',
      city: 'Miami',
      available: false,
    };
  });

  it('Should be able to access all properties returned from API', () => {
    const location = new Location(defaultData, dummyReuqestHelper);

    expect(location).toMatchObject(defaultData);
  });

  describe('Requests', () => {
    describe('Success', () => {
      it('Should successful fetch plans to current location', done => {
        defaultData.slug = 'MIA2';
        const location = new Location(defaultData, dummyReuqestHelper);

        nock(hostname)
          .get(`${defaultResource}/locations/MIA2/plans`)
          .reply(200, listPlansSuccessResponse);

        location
          .getPlans()
          .then(plans => {
            plans.forEach(plan => expect(plan).toBeInstanceOf(Plan));
            expect(location.plans).toMatchObject(plans);
            done();
          })
          .catch(done);
      });

      it('Should successful fetch OS images available in current location', done => {
        defaultData.slug = 'MIA2';
        const location = new Location(defaultData, dummyReuqestHelper);

        nock(hostname)
          .get(`${defaultResource}/locations/MIA2/images`)
          .reply(200, listImagesSuccessResponse);

        location
          .getImages()
          .then(images => {
            images.forEach(image => expect(image).toBeInstanceOf(Image));
            expect(location.images).toMatchObject(images);
            done();
          })
          .catch(done);
      });
    });

    describe('Fails', () => {
      it('Should be able to handle with fails to fetch plans with success false', () => {
        defaultData.slug = 'MIA2';
        const location = new Location(defaultData, dummyReuqestHelper);

        nock(hostname).get(`${defaultResource}/locations/MIA2/plans`).reply(200, listFailsResponse);

        expect.assertions(3);

        return location.getPlans().catch(error => {
          expect(error).toBeInstanceOf(Error);
          expect(error).toBeInstanceOf(RequestError);
          expect(error).toHaveProperty('response');
        });
      });

      it('Should be able to handle with fails to fetch images with error status', () => {
        defaultData.slug = 'MIA2';
        const location = new Location(defaultData, dummyReuqestHelper);

        nock(hostname)
          .get(`${defaultResource}/locations/MIA2/images`)
          .reply(400, listFailsResponse);

        return location.getImages().catch(error => {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty('response');
        });
      });
    });
  });
});
