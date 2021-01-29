import { ImageProperties, LocationProperties } from '../../../src';

const defaultStructure = <Data>(
  success: boolean,
  data: Data,
  message: string | undefined = undefined,
) => ({
  success,
  data,
  message,
});

type listPlansSuccesfulResponse = Omit<LocationProperties, 'available'>;

export const listPlansSuccessResponse = defaultStructure<listPlansSuccesfulResponse>(true, {
  country: 'United States',
  city: 'Miami',
  slug: 'MIA2',
  plans: [
    {
      shortcode: '$',
      core: 1,
      memory: 1024,
      disk: 10,
      bandwidth: 1000,
      monthly_value: '5.40',
      slug: '1vcpu-1gb-10ssd',
    },
    {
      shortcode: '$',
      core: 1,
      memory: 2048,
      disk: 20,
      bandwidth: 1500,
      monthly_value: '9.35',
      slug: '1vcpu-2gb-20ssd',
    },
    {
      shortcode: '$',
      core: 2,
      memory: 4096,
      disk: 30,
      bandwidth: 2000,
      monthly_value: '17.70',
      slug: '2vcpu-4gb-30ssd',
    },
  ],
});

export const listImagesSuccessResponse = defaultStructure<ImageProperties[]>(true, [
  {
    distro: 'CentOS 6.9 x64',
    os: 'linux',
    slug: 'centos-69-x64',
  },
  {
    distro: 'Fedora 27 x64',
    os: 'linux',
    slug: 'fedora-27-x64',
  },
  {
    distro: 'FreeBSD 10.4 x64',
    os: 'freebsd',
    slug: 'freebsd-104-x64',
  },
  {
    distro: 'FreeBSD 11.1 x64',
    os: 'freebsd',
    slug: 'freebsd-111-x64',
  },
]);

export const listFailsResponse = defaultStructure(false, undefined, 'Something went wrong');
