interface Profile {
  identifier: string;
  name: string;
  email?: string;
  interests?: string[];
}

export type { Profile }