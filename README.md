# Letscloud Node

Api Wrapper to use [letscloud API](https://developers.letscloud.io/). This is built with typescript to better IntelliSense and learning.

## Summary

- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Usage](#usage)
  - [Profile](#profile)
  - [Locations](#locations)
    - [Plans](#plans)
    - [Images](#images)
  - [Ssh](#ssh)
  - [Instance](#instance)
- [Contribuiting](#Contribuiting)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)

## Getting Started

### Installing
How to install in yout project

Add to project
```sh
# install with yarn
yarn add @letscloud/node

# install with npm
npm install @letscloud/node --save
```

import in the file
```typescript
import LetsCloud from '@letscloud/node';

const letscloud = new LetsCloud('<your api token>');

letcloud.getProfile().then(profile => {
  // ...
});
```


## Usage
All the methods that consume the API endpoints are Promises, then you can choose which will use, async/await or then/catch. Here we will use then/catch in most cases. The catch methods will receive an error with property response that contains the [Axios response](https://github.com/axios/axios#response-schema) object.

> Note: Going forward I will assume that the [initialization](#installing) code has already been made

### Profile
The profile class represents the profile respective to the provided token. 

Getting the profile
```typescript
  letscloud.getProfile().then(profile => {
    // ...
  })

  // Or

  await letscloud.getProfile();
  console.log(letscloud.profile);
```

The profile class contains the following properties
```typescript
{
  // The name in the token owner account
  name: string,

  // The email in the token owner account
  email: string,

  // The company name register in the token owner account
  // `comany_name` is the raw property name returned from API
  // `companyName` is a getter that follow js variables naming convension
  company_name: string,
  companyName: string,

  // The currency that the token owner registered the account
  // `currency` is the raw value returned from API
  // `currencyCode` is a getter that return the curency code in ISO 4217 format
  currency: '$' | 'R$',
  currencyCode: 'USD' | 'BRL',
  companyName: string,

  // The currency that the token owner registered the account
  // `balance` is the raw value returned from API fixed with two decimal places
  // `balanceNumber` is a getter that return the balance as a number
  balance: string,
  balanceNumber: number,
}
```

### Locations
The location class represents one location

Getting all locations
```typescript
  // Each location in the array is one Location class
  letscloud.getLocations().then(locations => {
    // ...
  })

  // Or

  await letscloud.getLocations();
  console.log(letscloud.locationsDetails);
```

The Location class contains the following properties and methods
```typescript
{
  // The slug of location
  slug: string,

  // The country where the location is
  country: string,

  // The city where the location is
  city: string,
ssh
  // If the location is available or not
  available: boolean,

  // Plans availables in this location
  // This property could be undefined if called before `getPlans()`
  plans?: Plan[],

  // Images allowed in the location
  // This property could be undefined if called before `getImages()`
  images?: Image[],

  // Get plans for this location and stores in `plans`. Also returns the fetched plans
  getPlans: () => Promise<Plan[]>,

  // Get images for this location and stores in `images`. Also returns the fetched plans
  getImages: () => Promise<Image[]>,
}
```
> NOTE: To see about [Plan](#plans) and [Image](#images)

#### Plans

Getting all plans availables in location
```typescript
  // Each location in the array is one Location class
  letscloud.getLocations().then(locations => {
    const location = locations[0];

    location.getPlans().then(console.log);
    // Or
    await location.getPlans();
    console.log(location.plans)
  })
```

The Plan class contains the following properties and methods
```typescript
{
  // The plan slug
  slug: string;

  // The shortcode of your currency
  shortcode: '$' | 'R$';

  // The currency code in ISO 4217
  currencyCode: 'USD' | 'BRL',

  // Number of Core
  core: number;

  // Number of Memory RAM in MB
  memory: number;

  // Size of disk in GB
  disk: number;
  diskInMegabyte: number;

  // Number of bandwith in GB
  bandwidth: number;
  bandwidthInMegabyte: number;

  // `monthly_value` is the raw value returned from API
  // `monthlyValue` is a getter that follow js variables naming convension
  monthly_value: string;
  monthlyValue: string;
}
```

#### Images

Getting all images availables in location
```typescript
  // Each location in the array is one Location class
  letscloud.getLocations().then(locations => {
    const location = locations[0];

    location.getImages().then(console.log);
    // Or
    await location.getImages();
    console.log(location.images)
  })
```

The Image class contains the following properties and methods
```typescript
{
  // The base distribution used for this image
  distro: string;

  // The operating system that the distro is based on
  os: string;

  // The image slug
  slug: string;
}
```

### SSH
The SSH class represents one ssh key

Getting all ssh keys
```typescript
  // Each ssh in the array is one SSH class
  letscloud.getSSHKeys().then(sshKeys => {
    // ...
  })

  // Or

  await letscloud.getSSHKeys();
  console.log(letscloud.sshs);
```

Getting one ssh key
```typescript
  // The second parameter is optional, if not passed a new key will be generated and returned from API
  letscloud.getSSHKey('<ssh-key-slug>', '<the-public-key>').then(sshKey => {
    // ...
  })

  // Or

  letscloud.getSSHKey('<ssh-key-slug>').then(sshKey => {
    console.log(sshKey.privateKey) // 
    // ...
  })
```

Storing a new one ssh key
```typescript
  letscloud.createSSHKey('<ssh-key-title>').then(sshKey => {
      // ...
  })
```

The SSH class contains the following properties and methods
```typescript
{
  // The title of thee ssh
  title: string,
  
  // The slug of the ssh key
  slug: string,

  // The public key
  // `public_key` is the raw property name returned from API
  // `publicKey` is a getter that follow js variables naming convension
  public_key: string,
  publicKey: string,

  // The private key. Only will be populate if a new ssh key is generated by API
  // `private_key` is the raw property name returned from API
  // `privateKey` is a getter that follow js variables naming convension
  private_key?: string,
  privateKey?: string,

  // Sync object data with the data in the API and return itself to allow chaining
  fetchSSHKey: () => Promise<Plan>,

  // Delete the ssh and return if the operation was successful or not
  deleteSSH: () => Promise<boolean>,
}
```

### Instance
The Instance class represents one instance

Getting all instances
```typescript
  // Each instance in the array is one Instance class
  letscloud.getInstances().then(instances => {
    // ...
  })

  // Or

  await letscloud.getInstances();
  console.log(letscloud.instances);
```

Getting one instance
```typescript
  letscloud.getInstance('<instance-identifier>').then(instance => {
    // ...
  })
```

Creating a new instance
```typescript
  const instanceData = {
    locationSlug: '<one-valid-location-slug>',
    planSlug: '<one-plan-slug-valid-in-this-location>',
    hostname: '<instace-hostname>',
    label: '<instance-label>',
    imageSlug: '<image-slug-to-build-instance>',
    // optional
    sshSlug: '<ssh-slug-to-add-in-instance>'
  }

  letscloud.createInstance(instanceData).then(success => {
      // ...
  })
```

The Instance class contains the following properties and methods
```typescript
{
  // A unique identifier for each instance. This is automatically generated upon instance creation
  identifier: string,

  // A boolean value indicating whether the instance has been booted
  booted: boolean,

  // A boolean value indicating whether the instance has been built
  built: boolean,

  // A boolean value indicating whether the instance has been locked, preventing actions by users
  locked: boolean,

  // The RAM memory of instance in MB
  memory: number,

  // The size of instance diks in GB
  // `total_disk_size` is the raw property name returned from API
  // `totalDiskSize` is a getter that follow js variables naming convension
  total_disk_size: number,
  totalDiskSize: number,

  // The number of virtual CPUs
  cpus: number,

  // The friendly name set for the instance
  label: string,

  // An array of ips addresses set in the instance
  // `ip_addresses` is the raw property name returned from API
  // `ipAddresses` is a getter that follow js variables naming convension
  ip_addresses: string[],
  ipAddresses: string[],

  // The name of the operating system set for the instance
  // `template_label` is the raw property name returned from API
  // `templateLabel` is a getter that follow js variables naming convension
  template_label: string,
  templateLabel: string,

  // The hostname set for the instance.
  hostname: string,

  // Fetch the instance data and returns itself allowing chaining
  fetchInstance: () => Promise<Instance>,

  // Destroy the instance. Return if the action was executed
  deleteInstance: () => Promise<boolean>,

  // Pass `true` to turn on and `false` to turn Off the instance. Return if the action was executed
  changePower: (turnOn: boolean) => Promise<boolean>,

  // Reboot the instance. Return if the action was executed
  rebootInstance: () => Promise<boolean>,

  // Reset the root passowrd of the instance. Return if the action was executed
  resetPassword: () => Promise<boolean>,
}
```

## Deployment

(Comming)

## Built With

- [Contributor Covenant](https://www.contributor-covenant.org/) - Used for the Code of Conduct
- [Creative Commons](https://creativecommons.org/) - Used to choose the license

## Contribuiting

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code
of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions
available, see the [tags on this repository](https://github.com/letscloud-community/letscloud-node/tags).

## Authors

- **Letscloud Inc** - [github](https://github.com/letscloud-community)

See also the list of [contributors](https://github.com/letscloud-community/letscloud-node/graphs/contributors) who participated in this project.

## License

This project is licensed under the [MIT](LICENSE.md) - see the [LICENSE.md](LICENSE.md) file for details
