import React from 'react';
import { Search, Phone, User, Globe } from 'lucide-react';
import { useRouter } from 'next/router';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const router = useRouter();
  const currentLang = (router.query.lang as string) || 'en';

  const handleLanguageChange = (newLang: string): void => {
    const { pathname, query } = router;
    router.push({
      pathname,
      query: { ...query, lang: newLang },
    });
  };

  const getSearchPlaceholder = (): string => {
    return currentLang === 'bn' 
      ? 'ক্লাস, কোর্স, কিংবা স্কুল প্রোগ্রাম সার্চ করুন...'
      : 'Search for classes, courses, or school programs...';
  };

  const getUserText = (): string => {
    return currentLang === 'bn' ? 'বাই' : 'Hi';
  };

  const getLoginText = (): string => {
    return currentLang === 'bn' ? 'লগ-ইন' : 'Login';
  };

  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-black">10</span>
              <div className="text-sm leading-tight">
                <div className="font-semibold text-black">MINUTE</div>
                <div className="font-semibold text-black">SCHOOL</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={getSearchPlaceholder()}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-500"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLanguageChange(currentLang === 'en' ? 'bn' : 'en')}
              className="flex items-center space-x-1 text-gray-700 hover:text-green-600 font-medium py-2 transition-colors duration-200"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{currentLang === 'en' ? 'BN' : 'EN'}</span>
            </button>

            <div className="hidden md:flex items-center space-x-2 text-green-600">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">16910</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-5 h-5" />
              <span className="hidden md:inline font-medium">{getUserText()}</span>
            </div>
            <button 
              className="bg-green-700 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
              type="button"
            >
              {getLoginText()}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
