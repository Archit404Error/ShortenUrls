import Head from 'next/head'
import Image from 'next/image'
import GoogleButton from 'react-google-button'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "../../.firebase.json"
import { initializeApp } from "firebase/app";
import { useContext } from 'react'
import { UserContext, UserContextType } from '@/context/user'
import { NextRouter, useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

initializeApp(firebaseConfig);

const googleAuth = async (ctx: UserContextType | null, router: NextRouter) => {

  const auth = getAuth();
  const res = await signInWithPopup(auth, new GoogleAuthProvider())
  const credential = GoogleAuthProvider.credentialFromResult(res);
  const idToken = credential?.idToken;
  const accessToken = credential?.accessToken;
  const user = res.user;

  if (user.email !== "cornellappdev@gmail.com")
    return;

  ctx?.setUserInfo({
    email: user.email,
    accessToken: accessToken!,
    idToken: idToken!
  })

  router.push("/createLink")
}

export default function Home() {
  const userContext = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>AppDev Shortlinks</title>
        <meta name="description" content="A website to generate internal shortlinks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {userContext?.userInfo?.email !== "cornellappdev@gmail.com" &&
          <GoogleButton onClick={() => googleAuth(userContext, router)} />
        }
        {
          userContext?.userInfo?.email === "cornellappdev@gmail.com" &&
          <h1>Logged In</h1>
        }
      </main>
    </>
  )
}
