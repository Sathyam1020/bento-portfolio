import React from 'react';

const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };
  return (
    <footer>
        <div className="relative z-10 mt-8 sm:mt-10 flex flex-col items-center justify-center border-t border-gray-200 py-5 sm:py-6 px-3 sm:px-0">
          <div className="flex flex-col sm:flex-row items-center text-center text-xs text-gray-500 dark:text-slate-200 gap-2 sm:gap-0">
            © {getYear()} by{' '}
            <a
              href="https://www.linkedin.com/in/sathyam-sahu-824946253/"
              target="_blank"
              className="ml-1 text-gray-500 transition-all hover:text-gray-700 dark:text-slate-200 dark:hover:text-gray-200"
            >
              Sathyam Sahu 
            </a>
            <div className="hidden sm:block mx-2 h-5 border-r border-gray-400"></div>
            <a
              href=""
              target="_blank"
              className="text-gray-500 transition-all hover:text-gray-700 dark:text-slate-200 dark:hover:text-gray-200"
            >
              {'version 1.0.0'}
            </a>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
