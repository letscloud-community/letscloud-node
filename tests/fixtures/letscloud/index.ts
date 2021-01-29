import { SSHProperties } from '../../../src';

const defaultStructure = <Data>(
  success: boolean,
  data: Data,
  message: string | undefined = undefined,
) => ({
  success,
  data,
  message,
});

export const profileSuccessResponse = defaultStructure(true, {
  name: 'Sherman Vasquez',
  company_name: null,
  email: 'sherman@letscloud.io',
  currency: '$',
  balance: '0.01',
});

export const LocationsSuccessResponse = defaultStructure(true, [
  {
    slug: 'MIA1',
    country: 'United States',
    city: 'Miami',
    available: false,
  },
  {
    slug: 'MIA2',
    country: 'United States',
    city: 'Miami',
    available: true,
  },
  {
    slug: 'DAL1',
    country: 'United States',
    city: 'Dallas',
    available: false,
  },
]);

export const sshKeysSuccessResponse = defaultStructure(true, [
  {
    slug: 'my-project-1',
    title: 'My Project 1',
    public_key:
      'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQDaC0XXh8NnyKVHAV+DSXIhIC/GARx11HNyRNMhu+8Aat9MmR2V7Yi2TdvRJprRxk6dIixTFj6Rwp+oBScpuHfpqU0FG0C5bH+HeTSVDN7vue3V31mwaiSO3TNn9X4uYSukIkEOmRTf5Nxz2zeeRhoCsql3KPrFPx5yfGYYVv+BSQ== email@email.com',
  },
  {
    slug: 'my-project-2',
    title: 'My Project 2',
    public_key:
      'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQDetIl5eCtRBFTvUOKq5Q4w765LwsGjROStFdzjAZT3ZKLw/r5rV6iqpLewE/78DqVvs/OwFRBpCUNEywcd2p6djkfqG89eGMMO/0gH/ALoQjPt+jJUK1gR6+Wze1eSPsqi30ov/DkBSKAjFyz4l2By2q213MvQTzh+v2Iz72gr5Q== email@email.com',
  },
]);

export const sshKeySuccessResponse = defaultStructure(true, {
  slug: 'my-project-1',
  title: 'My Project 1',
  public_key:
    'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQDaC0XXh8NnyKVHAV+DSXIhIC/GARx11HNyRNMhu+8Aat9MmR2V7Yi2TdvRJprRxk6dIixTFj6Rwp+oBScpuHfpqU0FG0C5bH+HeTSVDN7vue3V31mwaiSO3TNn9X4uYSukIkEOmRTf5Nxz2zeeRhoCsql3KPrFPx5yfGYYVv+BSQ== email@email.com',
});

export const sshCreateSuccessResponse = defaultStructure<SSHProperties>(true, {
  title: 'My Project 2',
  slug: 'my-project-2',
  public_key:
    'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQDR1FmAN9+icdbXJbxLhB0xnlCowNF5cKjcKPhW7WCF3Zw9p9ZnfQIOe4D1CpB9RAbdziGbRh958BIsc5832ytemhJ5KtWAxCoWVwcDFYFnCfiVCQaZEuxH3SU99uWD4kdtD3mKUmcEpAHdB8CPe5RsVsqKofbVB0HXxbq2tyReTQ== phpseclib-generated-key',
  private_key:
    '-----BEGIN RSA PRIVATE KEY-----\r\nMIICWwIBAAKBgQDR1FmAN9+icdbXJbxLhB0xnlCowNF5cKjcKPhW7WCF3Zw9p9Zn\r\nfQIOe4D1CpB9RAbdziGbRh958BIsc5832ytemhJ5KtWAxCoWVwcDFYFnCfiVCQaZ\r\nEuxH3SU99uWD4kdtD3mKUmcEpAHdB8CPe5RsVsqKofbVB0HXxbq2tyReTQIDAQAB\r\nAoGAKtxwh9Nh+CG+2+XWZ6qN+BO5sC7q2x6bL5Wi3MbSX6XcA3AkSLFtWR37QpKs\r\n3xmlOWugy8HwLg1O+QuJK3S2j9afnXFFJV4CgdrM+2+XBliH8GcVJhZUi5qHevw/\r\nh5nUU/pUUqv4yMAjpQ4DLd4MHLE1NrfjVJsux5w21xeNN4ECQQD0tPTJdIkCfy/h\r\nAmA0YmMFt8qAsXUxVP6aD+fY3yR8zO1XAiwG0HewGqYUwPBlJ2QcCNZZuR+R8S0h\r\netCa9D7hAkEA24NXWQyL6zSIAahYDyQ35+hFm6LkIo8VawedhyJkCVN0D+QaE+mH\r\n3hOE3O0TC5pIP09K5KqfyDTAO0s2vpMo7QJAQH3QZaeI1FegzrRJloS3hDJD9FbQ\r\nhAfacc/vUoC8pQd9JYk1ATa/1HGxg5a1xHL1N04877iSUWw2cLRldfEZAQJAMDqQ\r\nM2l1SG0XQL368wCzI8m9mW9Vjl4/h2955dnhfscOJfuo2x0hE+LX+y4/U/pGy1oh\r\ni1INnxAv+BcTZRWyFQJACT8+oQQqxts9pL3rWVx93SUBcWekMfOQzn06HOVBCCTn\r\n3AZkaUAWN5TIx0ylxcp9YlL4kSdTLN2m3uGtemYV1Q==\r\n-----END RSA PRIVATE KEY-----',
});

export const instancesSuccessResponse = defaultStructure(true, [
  {
    identifier: 'your-instance-identifier',
    booted: false,
    built: false,
    locked: true,
    memory: 1024,
    total_disk_size: 10,
    cpus: 1,
    domain: 'localdomain',
    label: 'your-instance-label',
    ip_addresses: [
      {
        address: 'your-instance-ip',
      },
    ],
    template_label: 'CentOS 7.4 x64',
    hostname: 'your-instance-hostname',
  },
  {
    identifier: 'your-instance-identifier',
    booted: false,
    built: false,
    locked: true,
    memory: 1024,
    total_disk_size: 10,
    cpus: 1,
    domain: 'localdomain',
    label: 'your-instance-label',
    ip_addresses: [
      {
        address: 'your-instance-ip',
      },
    ],
    template_label: 'CentOS 7.4 x64',
    hostname: 'your-instance-hostname',
  },
]);

export const instanceSuccessResponse = defaultStructure(true, {
  identifier: 'your-instance-identifier',
  booted: true,
  built: true,
  locked: false,
  memory: 1024,
  total_disk_size: 10,
  cpus: 1,
  label: 'your-instance-label',
  ip_addresses: [
    {
      address: 'your-instance-ip',
    },
  ],
  template_label: 'CentOS 7.4 x64',
  hostname: 'your-instance-hostname',
});

export const defaultErrorResponse = defaultStructure(false, undefined, 'Something went wrong');
