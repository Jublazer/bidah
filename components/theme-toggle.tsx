'use client';

import { useTheme } from '@/providers/theme-provider';
import { Moon, Sun, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-full transition-all ${
          theme === 'light'
            ? 'bg-white text-yellow-500 shadow-md'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        <Sun size={18} />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-full transition-all ${
          theme === 'dark'
            ? 'bg-gray-900 text-blue-400 shadow-md'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        <Moon size={18} />
      </button>
      
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-full transition-all ${
          theme === 'system'
            ? 'bg-gray-200 dark:bg-gray-700 text-green-500 shadow-md'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        <Monitor size={18} />
      </button>
    </div>
  );
}