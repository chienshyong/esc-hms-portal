import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            role: { label: "Role", type: "text", placeholder: "role"},
            username: { label: "Username", type: "text", placeholder: "username" },
            password: { label: "Password", type: "password", placeholder: "password" }
          },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            const {role, username, password} = credentials
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  username: username,
                  password: password
                })
            };
                console.log("Attempting to login %s and %s", username, password)
                const response = await fetch(`${process.env.api}/auth/${role}-login`, requestOptions);
                if (response.status === 200) {
                  const user = await response.json()
                  console.log("Login success.")
                  console.log(user)
                  return user
                } else {
                  console.log('Login failed.')
                  // let error = new Error(response.statusText)
                  // error.response = response
                  // throw error
                  return null
                }
          },
        })
      ],
      callbacks: {
        jwt: async ({ token, user }) => {
          user && (token.user = user);
          return Promise.resolve(token);
        },
        session: async ({ session, token }) => {  
          session.user = token.user;
          return Promise.resolve(session);
        },
       },
      
      session: {
        strategy:"jwt"
      },

      pages: {
        signIn: "/login"
      }
})

export { handler as GET, handler as POST }