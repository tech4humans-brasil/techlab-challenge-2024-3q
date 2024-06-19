import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConversationsScreen } from "./screens/ConversationsScreen.js";
import { Dashboard } from "./components/Dashboard.js";
import { UsersScreen } from "./screens/UsersScreen.js";
import { ConversationScreen } from "./screens/ConversationScreen.js";
import { UserScreen } from "./screens/UserScreen.js";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { path: '/', element: <ConversationsScreen /> },
      {
        path: '/conversations',
        element: <ConversationsScreen />,
        children: [
          {
            path: '/conversations/:conversationId',
            element: <ConversationScreen />
          }
        ]
      },
      { path: '/users', element: <UsersScreen /> },
      { path: '/users/:userId', element: <UserScreen /> },
    ]
  },
])

export function PrivateRouter() {
  return <RouterProvider router={router} />
}
