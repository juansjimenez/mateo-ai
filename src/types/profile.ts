import { Preference } from '.';

interface Profile {
  identifier: string;
  name: string;
  email?: string;
  preferences: Preference[];
}

export type { Profile }