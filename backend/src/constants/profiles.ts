import { User } from "../entities/User.js";

export interface IProfile {
  scopes: (user: User) => string | string[]
  allowToCreate: string[]
}

export const profiles = {
  sudo: {
    scopes: () => '*',
    allowToCreate: ['sudo', 'standard']
  },
  standard: {
    scopes: (user: User) => [
      `users:${user.id}:*`,
      'conversations:*',
    ],
    allowToCreate: ['sudo', 'standard']
  },
} satisfies Record<string, IProfile>
