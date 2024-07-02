import { Inter, Roboto_Mono, Sofia_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const sofiaSans = Sofia_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['1000', '800', '700', '600', '400'],
  style: ['normal', 'italic'],
  variable: '--font-sofia-sans',
});

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const pretendard = localFont({
  src: [
    {
      path: './pretendard/Pretendard-Bold.woff2',
      weight: '700',
    },
    {
      path: './pretendard/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: './pretendard/Pretendard-SemiBold.woff2',
      weight: '600',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});
