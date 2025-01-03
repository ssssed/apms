import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          throw new Error("Invalid email or password");
        }

        // Преобразование id в строку
        return {
          ...user,
          id: user.id.toString(),
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log("trigger", trigger);

      if (trigger === "update") {
        for (const key of Object.keys(session)) {
          token[key] = session[key as keyof typeof session];
        }
      }

      if (user) {
        for (const key of Object.keys(user)) {
          token[key] = user[key as keyof typeof user];
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          ...token,
          id: token.id,
          role: token.role,
          avatar: token.avatar,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email!,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
