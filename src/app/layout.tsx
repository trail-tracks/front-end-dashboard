import { Toaster } from 'sonner';
import ClientProvider from './ClientProvider';

export const metadata = {
  title: 'Trilhas Interativas',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
