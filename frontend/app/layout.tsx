import '../styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'EduTrack',
  description: 'Student progress tracking'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header className="glass-dark sticky top-0 z-50 border-b border-white/20">
            <Navbar />
          </header>
          <main className="container py-8 min-h-[calc(100vh-80px)]">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
