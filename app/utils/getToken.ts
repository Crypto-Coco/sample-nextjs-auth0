'use server';
import { getSession } from '@auth0/nextjs-auth0';

export async function getToken() {
  try {
    const token = (await getSession())?.idToken;
    return token;
  } catch (e) {
    return undefined;
  }
}
