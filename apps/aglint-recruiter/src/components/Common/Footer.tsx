import React from 'react';

interface FooterProps {
  brand?: boolean;
}

const Footer: React.FC<FooterProps> = ({ brand = false }) => {
  return (
    <footer className="py-4 flex justify-center items-center">
      {brand ? (
        <div className="flex items-center justify-center">
          <p className="text-sm text-neutral-600 flex items-center">
            Powered by
            <svg className="ml-1 mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="16" rx="2" fill="#FF9C00" fillOpacity="0.160784"/>
              <path d="M11.1625 7.80223C10.085 7.53223 9.545 7.39971 9.17252 7.02719C8.8 6.65219 8.66748 6.11471 8.39748 5.03721L8 3.44971L7.60252 5.03721C7.33252 6.11471 7.2 6.65471 6.82748 7.02719C6.45248 7.39971 5.915 7.53223 4.8375 7.80223L3.25 8.19971L4.8375 8.59719C5.915 8.86719 6.455 8.99971 6.82748 9.37223C7.2 9.74723 7.33252 10.2847 7.60252 11.3622L8 12.9497L8.39748 11.3622C8.66748 10.2847 8.8 9.74471 9.17252 9.37223C9.54752 8.99971 10.085 8.86719 11.1625 8.59719L12.75 8.19971L11.1625 7.80223Z" fill="#F76B15"/>
              <path d="M11.8541 3.66714C11.4949 3.57714 11.3149 3.53298 11.1907 3.40881C11.0666 3.28381 11.0224 3.10464 10.9324 2.74548L10.7999 2.21631L10.6674 2.74548C10.5774 3.10464 10.5332 3.28464 10.4091 3.40881C10.2841 3.53298 10.1049 3.57714 9.74571 3.66714L9.21655 3.79964L9.74571 3.93214C10.1049 4.02214 10.2849 4.06631 10.4091 4.19048C10.5332 4.31548 10.5774 4.49464 10.6674 4.85381L10.7999 5.38298L10.9324 4.85381C11.0224 4.49464 11.0666 4.31464 11.1907 4.19048C11.3157 4.06631 11.4949 4.02214 11.8541 3.93214L12.3832 3.79964L11.8541 3.66714Z" fill="#F76B15"/>
            </svg>
            &copy; {new Date().getFullYear()} Aglint Inc. All rights reserved.
          </p>
        </div>
      ) : (
        <p className="text-sm text-neutral-600">
          &copy; {new Date().getFullYear()} Aglint Inc. All rights reserved.
        </p>
      )}
    </footer>
  );
};

export default Footer;
