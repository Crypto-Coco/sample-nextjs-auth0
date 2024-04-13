import { handleAuth } from '@auth0/nextjs-auth0';
console.log('process.env.AUTH0_SECRET:', process.env.AUTH0_SECRET);
export const GET = handleAuth();
