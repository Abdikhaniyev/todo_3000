import { NextResponse } from 'next/server';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { auth } from '@/shared/lib/firebase';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 });
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return NextResponse.json({
      message: 'Пользователь создан',
      uid: user.uid,
      email: user.email,
    });
  } catch (error: FirebaseError | unknown) {
    if (error instanceof FirebaseError) {
      return NextResponse.json({ error: error?.message }, { status: 500 });
    }
  }
}
