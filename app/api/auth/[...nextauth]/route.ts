import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";

/**
 * authOptions defines the login strategy and and comparing the creds with db values
 */
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      authorize: async (credentails) => {
        if (!credentails?.email || !credentails?.password) {
          throw new Error("invalid credentails");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentails.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("invalid credentails");
        }

        const isCorrect = await bcrypt.compare(
          credentails.password,
          user.hashedPassword
        );

        if (!isCorrect) {
          throw new Error("invalid credentails");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
