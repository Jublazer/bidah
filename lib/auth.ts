import { cookies } from 'next/headers';
import { verifyToken } from './auth/jwt';

export async function getServerSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('kidah_token')?.value;
    
    if (!token) return null;
    
    const user = verifyToken(token);
    return { user };
  } catch (error) {
    return null;
  }
}