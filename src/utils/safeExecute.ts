export async function safeExecute<T>(
  fn: () => Promise<T>,
  errorMessage = 'An error occurred.'
): Promise<{ hasError: boolean; data?: T; message?: string }> {
  try {
    const data = await fn()
    return { hasError: false, data }
  } catch (error: unknown) {
    
    if (error instanceof Error) {
      const { message } = error

      return { hasError: true, message }
    }
    return { hasError: true, message: errorMessage }
  }
}
