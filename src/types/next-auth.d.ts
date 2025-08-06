import  "next-auth"

declare module "next-auth" {
    interface User {
        _id?: string;
        username?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
    }
    interface Session {
        user:{
            id?: string;
            username?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
        }& DefaultSession["user"];
    }
    interface JWT {
        _id?: string;
        username?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
    }
}