'use client';

import { useTheme } from 'next-themes';
import { Button, type ButtonProps } from '#ui/button';

interface ToggleThemeProps extends ButtonProps {}

export function ToggleTheme({ children, ...props }: ToggleThemeProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      variant='outline'
      size='icon'
      aria-label='toggle theme'
      {...props}
    >
      {children}
    </Button>
  );
}
