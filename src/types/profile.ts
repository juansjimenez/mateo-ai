interface Preference {
  category: string;
  value: string;
}
interface Profile {
  identifier: string;
  name: string;
  email?: string;
  preferences: Preference[];
}

export type { Profile, Preference }