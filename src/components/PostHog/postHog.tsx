// app/providers.js
'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init("phc_Yk5iRBV467nlYXesqVTA3st47QBXWUKs1FMt36r1Bea", {
    api_host: "https://app.posthog.com", // usually 'https://app.posthog.com' or 'https://eu.posthog.com'
  })
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}