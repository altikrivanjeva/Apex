import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient, ObjectId } from "mongodb";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

// Extend the JWT type to include a 'role' property
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

// Extend the Session type to include a 'role' property on the user
declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    } & Session["user"];
  }
}

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

let client: MongoClient | null = null;
async function getClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await getClient();
        const db = client.db(dbName);
        const user = await db.collection("users").findOne({ username: credentials?.username });
        if (user && user.password === credentials?.password) {
          // You should use password hashing here for security!
          return { id: user._id.toString(), name: user.username, role: user.role || "user" };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        // Here, we explicitly type user to get the role
        token.role = (user as any).role || "user";
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export default NextAuth(authOptions);