import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

import { auth } from '@/shared/lib/firebase';
import { AuthParams } from '@/shared/types/auth';

export const AuthService = {
  register: ({ email, password }: AuthParams) =>
    createUserWithEmailAndPassword(auth, email, password),

  login: ({ email, password }: AuthParams) => signInWithEmailAndPassword(auth, email, password),

  logout: () => signOut(auth),

  onAuthStateChanged: (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback),
};
