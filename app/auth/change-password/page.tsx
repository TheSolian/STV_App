import { ChangePasswordForm } from '@/components/auth/change-password-form'
import { Suspense } from 'react'

type Props = {}

const Page: React.FC<Props> = ({}) => {
  return (
    <Suspense>
      <ChangePasswordForm />
    </Suspense>
  )
}

export default Page
