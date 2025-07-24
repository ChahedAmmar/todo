// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  console.log('SignUp page is rendering')
  return (
    <div>
      <h1>Sign Up Page</h1>
      <SignUp />
    </div>
  )
}