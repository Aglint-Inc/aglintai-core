'use client';
import Link from 'next/link';
import React from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact Us' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { queryParams } = useRouterPro();
  const isPreview = !!queryParams.isPreview;
  return (
    <footer className='mt-12 py-6'>
      <div className='container mx-auto px-4'>
        <div className='mb-4 flex flex-wrap justify-center'>
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              <Link
                href={isPreview ? '' : link.href}
                className='text-xs text-gray-700 transition-colors duration-200 hover:text-primary dark:text-gray-300'
              >
                {link.label}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className='mx-2 text-xs text-gray-700 dark:text-gray-300'>
                  |
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className='text-center text-xs text-gray-700 dark:text-gray-300'>
          © {currentYear} Powered by Aglint AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
