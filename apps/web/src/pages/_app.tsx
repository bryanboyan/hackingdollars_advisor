import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import { DirectionProvider } from '@purplefish/cascadia/components/ui/direction-provider';

import { Layout } from '@/components/layout';
import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/globals.css';
import { trpcClient } from '@/trpc-client';

const inter = Inter({
  // Inter also support 'greek', 'cyrillic' but because the subsets are not as frequently used,
  // we opt for system fonts instead.
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  // https://github.com/tailwindlabs/tailwindcss/blob/cd4711cc21b8790d52ff62ffa8bfc03d4e031fdb/packages/tailwindcss/preflight.css#L33
  fallback: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ],
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <style
        // eslint-disable-next-line react/no-unknown-property
        jsx
        // eslint-disable-next-line react/no-unknown-property
        global
      >{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

      <DirectionProvider dir="ltr">
        <NextSeo
          titleTemplate="%s - Purplefish"
          defaultTitle="Chatbot"
          description="AI chatbot"
        />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DirectionProvider>
    </ThemeProvider>
  );
};

export default trpcClient.withTRPC(App);
