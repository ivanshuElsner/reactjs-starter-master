import { lazy } from 'react'

export const routes = {
  homepage: {
    path: '/',
    component: lazy(() => import('../pages/home/home')),
    exact: true,
  },
}

export const renderRoutes = Object.entries(routes)
