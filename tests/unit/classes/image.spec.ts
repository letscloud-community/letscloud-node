import { Image } from '../../../src';

describe('Image class', () => {
  it('Should be able to access all properties returned from API', () => {
    const defaultData = {
      distro: 'CentOS 6.9 x64',
      os: 'linux',
      slug: 'centos-69-x64',
    };

    const image = new Image(defaultData);

    expect(image).toMatchObject(defaultData);
  });
});
