import Auth0Provider from "next-auth/providers/auth0";
import connectDB from "@/config/database";
import User from "@/app/models/User";
import NextAuth from "next-auth/next";

export const authOptions = {
  // secret: process.env.AUTH0_SECRET,
  providers: [
    Auth0Provider({
    
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      authorization: {
        params: {
          // audience: process.env.AUTH0_AUDIENCE,
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/auth0`,
        },
      },
      scope: process.env.AUTH0_SCOPE,
      cacheLocation: "localStorage",
    }),
  ],

  callbacks:{
    //Invoked on successful sign in
    async signIn({profile}){
        // 1. Connect to the database
        await connectDB();

        // 2. Check if the user exists in the database
        const userExists = await User.findOne({email: profile.email});

        // 3. If it does not, create a new user
        if(!userExists){
          await User.create({
            email: profile.email,
            nickname: profile.nickname,
            name: profile.name,
            image: profile.picture,
          });
        }
        // 4. Return true to allow sign in
        return true;
    },
   
   
    //Modifies the sessionn object
    async session({session}){
        // 1. Add the user ID to the session
        const user = await User.findOne({email: session.user.email});
        // 2. Return the session
        if(user){
          session.user.id = user._id.toString();
        }
        // 3. Return the session
        return session;
    }
  }
};


export default NextAuth(authOptions);