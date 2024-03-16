import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
  posthog.init('phc_wreB3nk3wTWq8kzYlrA6SqCb5nASQPimsQIaCneC7Gj', {
    api_host: 'https://app.posthog.com' // usually 'https://app.posthog.com' or 'https://eu.posthog.com'
  });
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
