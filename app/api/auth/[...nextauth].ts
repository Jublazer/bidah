import NextAuth from "next-auth";
import { CredentialsProvider} from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            Credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials){
                if(!credentials)return null;

                const client = await clientPromise;
                const db = client.db();

                const user = await db.collection('users').findOne({email:credentials.email});

                if (user && bcrypt.compareSync(credentials.password, user.password)){
                    return{
                        id:user._id.toString(),
                        email:user.email,
                        userType:user.userType,
                        name:`${user.profille.firstName} ${user.profile.lastName}`
                    };
                }else{
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.userType = user.userType;
            }
            return token;
        }
        async session({session, token}){
            session.user.id = token.sub;
            session.user.userType = token.userType;
            return session;
        }
    },
    session:{
        strategy:'jwt'
    },
    pages: {
        signIn: '/login'
    }
})