import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ProjectProvider } from '@/contexts/ProjectContext'
import { ProfileProvider } from '@/contexts/ProfileContext'
import Layout from '@/components/layout/Layout'
import ProjectLayout from '@/components/layout/ProjectLayout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import ProjectDetailPage from '@/pages/ProjectDetailPage'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import TermsOfService from '@/pages/TermsOfService'
import NotFound from '@/pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: 'projects/:id',
    element: <ProjectLayout />,
    children: [
      {
        index: true,
        element: <ProjectDetailPage />,
      },
    ],
  },
  {
    path: 'privacy-policy',
    element: <ProjectLayout />,
    children: [
      {
        index: true,
        element: <PrivacyPolicy />,
      },
    ],
  },
  {
    path: 'terms-of-service',
    element: <ProjectLayout />,
    children: [
      {
        index: true,
        element: <TermsOfService />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ProjectProvider>
        <ProfileProvider>
          <RouterProvider router={router} />
        </ProfileProvider>
      </ProjectProvider>
    </ThemeProvider>
  </StrictMode>,
)
