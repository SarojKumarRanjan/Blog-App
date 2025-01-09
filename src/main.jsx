
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import { lazy,Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import {AuthLayout }from './components/index.js'
import Profile from './components/Profile.jsx'
import Home from './components/Pages/Home.jsx'
import Login from './components/Pages/Login.jsx'
import SignUpPage from './components/Pages/SignUpPage.jsx'
import AllPost from './components/Pages/AllPost.jsx'



import Post from './components/Pages/Post.jsx'
import { ThemeProvider } from './utils/ThemeProvider.jsx'

// eslint-disable-next-line react-refresh/only-export-components
const AddPost = lazy(() =>import ('./components/Pages/AddPost.jsx') )

// eslint-disable-next-line react-refresh/only-export-components
const EditPost = lazy(() => import('./components/Pages/EditPost.jsx'))




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignUpPage />
                </AuthLayout>
            ),
        },
        {
            path: "/all-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPost />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Suspense>
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
                </Suspense>
            ),
        },
        {
            path: "/profile",
            element: (
              
                <AuthLayout authentication>
                    {" "}
                    <Profile />
                </AuthLayout>
                
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Suspense>
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
                </Suspense>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    </ThemeProvider>
  
)
