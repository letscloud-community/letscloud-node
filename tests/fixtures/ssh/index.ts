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

export const fetchSshSuccessResponse = defaultStructure<SSHProperties>(true, {
  public_key: 'RandomPublicSSHKey',
  slug: 'my-awesome-ssh-key-title',
  title: 'My awesome ssh key title',
});

export const deleteSshSuccessResponse = defaultStructure(true, undefined, 'Something went wrong');
export const failsResponse = defaultStructure(false, undefined, 'Something went wrong');
