import { AxiosResponse } from 'axios';

import Letscloud from './src/modules/letscloud';

export type ApiResponse<Data> = AxiosResponse<{ data: Data; success: boolean }>;

export interface Profile {
  name: string;
  // eslint-disable-next-line camelcase
  company_name: string | null;
  email: string;
  currency: '$' | 'R$';
  balance: string;
}

export interface Location {
  slug: string;
  country: string;
  city: string;
  available: boolean;
}

export interface Plan {
  shortcode: string;
  core: number;
  memory: number;
  disk: number;
  bandwidth: number;
  // eslint-disable-next-line camelcase
  monthly_value: string;
  slug: string;
}

export interface Image {
  distro: string;
  os: string;
  slug: string;
}

export interface SSHKey {
  title: string;
  slug: string;
  // eslint-disable-next-line camelcase
  public_key: string;
}

export interface Instance {
  identifier: string;
  booted: boolean;
  built: boolean;
  locked: boolean;
  memory: number;
  // eslint-disable-next-line camelcase
  total_disk_size: number;
  cpus: number;
  label: string;
  // eslint-disable-next-line camelcase
  ip_addresses: string[];
  // eslint-disable-next-line camelcase
  template_label: string;
  hostname: string;
}

export default Letscloud;
