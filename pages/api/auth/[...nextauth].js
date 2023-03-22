// Import necessary packages and files for authentication and database operations
import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/User';
import db from '../../../utils/db';

// Configure NextAuth for authentication and session management
export default NextAuth({
  // Use the CredentialsProvider of MongoDB to authenticate users with email and password
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Connect to the database
        await db.connect();
        // Find the user with the given email
        const user = await User.findOne({
          email: credentials.email,
        });
        // Disconnect from the database
        await db.disconnect();
        // Check if the password matches the hashed password in the database
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          // Return the user's data if authentication is successful
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            // Any information of user that is needed can be stored in session
            sampleData: 'Hello2',
          };
        }
        // Throw an error if authentication is unsuccessful
        throw new Error('Invalid email or password');
      },
    }),
  ],

  // Use JWT for session management
  session: {
    strategy: 'jwt',
  },
  // Define callbacks to modify the token and session objects
  callbacks: {
    // Add the user ID and isAdmin property to the token object
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    // Add the user ID and isAdmin property to the session object
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
});
