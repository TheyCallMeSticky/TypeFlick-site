// hooks/use-email-check.ts
import { useState } from 'react'

interface EmailCheckResult {
  exists: boolean
  email: string
}

interface UseEmailCheckReturn {
  checkEmail: (email: string) => Promise<EmailCheckResult>
  isLoading: boolean
  error: string | null
}

export function useEmailCheck(): UseEmailCheckReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkEmail = async (email: string): Promise<EmailCheckResult> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to check email')
      }

      const data = await response.json()
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { checkEmail, isLoading, error }
}
