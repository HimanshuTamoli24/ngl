import { UserModel } from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env";


export const authOptions: NextAuthOptions = {
    providers: [

        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: any): Promise<any> {
                dbConnect()
                try {

                    const userAuthCheck = await UserModel.findOne({
                        $or: [
                            { email: credentials.email },
                            { username: credentials.username }
                        ]
                    })

                    // Check if the user exists
                    if (!userAuthCheck) {
                        throw new Error("No user found with the provided credentials")
                    }

                    // Check if the user is verified
                    if (!userAuthCheck.isVerified) {
                        throw new Error("User email is not verified")
                    }

                    // Compare the provided password with the stored hashed password
                    const isPasswordValid = await bcrypt.compare(credentials.password, userAuthCheck.password)
                    if (isPasswordValid) {
                        return userAuthCheck
                    } else {
                        throw new Error("Invalid password")
                    }

                } catch (error) {
                    console.error("Error during authorization:", error);
                    throw new Error("Authorization failed");

                }
            }
        })
    ],
    pages: {
        signIn: "/signin",
        

    },
    session: {
        strategy: "jwt",
    },
    secret: env.NEXTAUTH_SECRET,
    
    callbacks: {
        async jwt({ token, user }) {
            // Persist the user information in the token
            if (user) {
                token._id = user.id.toString();
                token.username = user.username;
                token.isVerified = user.isVerified; 
                token.isAcceptingMessages = user.isAcceptingMessages;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token._id;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
            }
            return session;
        }

    }

}