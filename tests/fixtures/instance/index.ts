import { InstanceProperties } from '../../../src';

const defaultStructure = <Data>(
  success: boolean,
  data: Data,
  message: string | undefined = undefined,
) => ({
  success,
  data,
  message,
});

export const fetchInstanceSuccessResponse = defaultStructure<InstanceProperties>(true, {
  identifier: 'your-instance-identifier',
  booted: true,
  built: true,
  locked: false,
  memory: 1024,
  total_disk_size: 10,
  cpus: 1,
  label: 'fetched new label',
  ip_addresses: [],
  template_label: 'CentOS 7.4 x64',
  hostname: 'your-instance-hostname',
});

export const actionSshSuccessResponse = defaultStructure(true, undefined, 'Something went wrong');
export const failsResponse = defaultStructure(false, undefined, 'Something went wrong');
