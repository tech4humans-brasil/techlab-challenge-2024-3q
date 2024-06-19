import { useContext, useMemo } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext.js";

export function useAuthenticationContext() {
  return useContext(AuthenticationContext)
}

export function useAuthenticatedUser() {
  const { user } = useAuthenticationContext()

  if (!user) throw new Error('User not authenticated')

  return user
}

export function useHasScope(...oneOfScopes: [string, ...string[]]) {
  const { token } = useAuthenticationContext()

  if (!token) throw new Error('Token not found')

  return useMemo(() => {
    if (token.scopes.includes('*')) return true

    for (const scope of oneOfScopes)
      if (token.scopes.includes(scope))
        return true

    return false

    // I know what I'm doing, okay?
  }, [token, ...oneOfScopes])
}

export function useAccessToken() {
  const { accessToken } = useAuthenticationContext()

  if (!accessToken) throw new Error('Access token not found')

  return accessToken
}
