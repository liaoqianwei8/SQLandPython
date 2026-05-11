import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Code, FileText, Target } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/learn', label: '从零到一', icon: BookOpen },
  { path: '/translator', label: 'SQL翻译官', icon: Code },
  { path: '/summary', label: '规律总结', icon: FileText },
  { path: '/practice', label: '场景练习', icon: Target },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="glass sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-3xl">🐱</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              喵SQL
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300',
                    isActive
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                  )}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <span>🔥</span>
              <span className="font-medium">学习天数: 1</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="md:hidden flex items-center justify-around py-2 px-4 border-t border-gray-100">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex flex-col items-center space-y-1 p-2 rounded-lg transition-all',
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-500'
              )}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
