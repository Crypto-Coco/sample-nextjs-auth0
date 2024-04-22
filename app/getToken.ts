// getSession can only run on the server
'use server';

import {getSession} from '@auth0/nextjs-auth0';

export const getToken = async () => {
  try {
    // getSession will return a valid session or undefined, depending on if the user is auth'd or not
    const token = (await getSession())?.idToken;
    return token;
  } catch (e) {
    // If getSession returns an error, you should assume the user is unauthenticated
    return undefined;
  }
};
