import '@/styles/globals.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider deferLoading={true}>
        {/* The specific components set the auth into true? If ter then render it */}
        {Component.auth ? (
          <Auth adminOnly={Component.auth.adminOnly}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </PayPalScriptProvider>
    </SessionProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }

  return children;
}
