import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "../lib/prismadb";

/**
 * getSession function return the current session of the user
 * @returns 
 */
export const getSession = async () => {
  return await getServerSession(authOptions);
};

/**
 * getCurrentUser returns null or currentUser depends upon the value in the session
 * @returns 
 */

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
};
