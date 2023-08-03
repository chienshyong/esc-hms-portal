import Image from 'next/image'
import house from '../../../public/house.svg'
import LoginForm from '@/components/logreg/loginform'
import Link from 'next/link'

export default function Login() {
  return (
    <main className={`grid gap-8 md:grid-cols-2 min-h-screen`}>
      <div className={`flex flex-col justify-center items-center`}>
        <h1 className={`mt-1 mb-1 text-4xl font-extrabold`}>Welcome Back</h1>
        <p className={`mt-1 mb-1 text-base font-thin`}>please enter your details</p>
        <LoginForm></LoginForm>
        <p className={`mt-3 mb-3 text-base font-thin`}>⎯⎯⎯⎯⎯⎯⎯⎯ OR ⎯⎯⎯⎯⎯⎯⎯⎯</p>
        <Link href="/register">Sign Up!</Link>
      </div>
      <div className={`hidden md:flex md:items-center md:justify-center`}>
        <Image class="bg-indigo-600 rounded-lg h-5/6" src={house} width={500} height={500}></Image>
      </div>
    </main>
  )
}