import '@styles/globals.scss'
import { AuthorizerProvider } from '@authorizerdev/authorizer-react'
import { config } from 'src/authorizer/authorizerConfig'

export default function App({ Component, pageProps }) {
  return (
    <AuthorizerProvider
      config={config}
      onStateChangeCallback={async ({ token }) => {
        await fetch('/api/session', {
          method: 'POST',
          body: JSON.stringify(token),
        });
      }}
    >
      <Component {...pageProps} />
    </AuthorizerProvider>
  )
}

