import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { getGlobalConfig } from '@/api/utils';
import { GoogleAnalytics } from '@next/third-parties/google';

export async function generateMetadata(): Promise<Metadata> {
  const globalConfig = await getGlobalConfig();
  return {
    title: globalConfig.meta.title,
    description: globalConfig.meta.description,
    keywords: globalConfig.meta.keywords,
    icons: globalConfig.meta.favicon,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_Analytics_ID || '';
  return (
    <html lang="en">
      <body>{children}</body>
      {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
    </html>
  );
}
