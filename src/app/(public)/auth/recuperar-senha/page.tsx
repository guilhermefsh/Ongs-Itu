import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">ONGs Itu</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Recupere sua senha</p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  )
}
