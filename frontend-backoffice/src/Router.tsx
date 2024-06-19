import { useAuthenticationContext } from "./hooks/useAuthenticationContext.js";
import { PrivateRouter } from "./PrivateRouter.js";
import { PublicRouter } from "./PublicRouter.js";

export function Router() {
  const context = useAuthenticationContext()

  if (context.isLoading) return 'Carregando informações do usuário'

  if (!context.user) return <PublicRouter />

  return <PrivateRouter />
}
