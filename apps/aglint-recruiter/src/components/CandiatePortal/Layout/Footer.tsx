import Link from 'next/link';
import React from 'react';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact Us' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-secondary py-6 mt-auto'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap justify-center mb-4'>
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              <Link
                href={link.href}
                className='text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200 text-xs'
              >
                {link.label}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className='mx-2 text-gray-700 dark:text-gray-300 text-xs'>|</span>
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