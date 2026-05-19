import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'עוז',
  description: 'פלטפורמה לאיוש מגורי עובדים זרים בישראל',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
