/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as AuthSignupIndexImport } from './routes/auth/signup/index'
import { Route as AuthSecuredIndexImport } from './routes/auth/secured/index'
import { Route as AuthLoginIndexImport } from './routes/auth/login/index'
import { Route as AuthEmailConfirmIndexImport } from './routes/auth/email/confirm/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignupIndexRoute = AuthSignupIndexImport.update({
  path: '/auth/signup/',
  getParentRoute: () => rootRoute,
} as any)

const AuthSecuredIndexRoute = AuthSecuredIndexImport.update({
  path: '/auth/secured/',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  path: '/auth/login/',
  getParentRoute: () => rootRoute,
} as any)

const AuthEmailConfirmIndexRoute = AuthEmailConfirmIndexImport.update({
  path: '/auth/email/confirm/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/login/': {
      preLoaderRoute: typeof AuthLoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/secured/': {
      preLoaderRoute: typeof AuthSecuredIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/signup/': {
      preLoaderRoute: typeof AuthSignupIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/email/confirm/': {
      preLoaderRoute: typeof AuthEmailConfirmIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AuthLoginIndexRoute,
  AuthSecuredIndexRoute,
  AuthSignupIndexRoute,
  AuthEmailConfirmIndexRoute,
])

/* prettier-ignore-end */
