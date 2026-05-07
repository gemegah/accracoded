import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type IconifyIconElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  icon?: string;
};

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': IconifyIconElementProps;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': IconifyIconElementProps;
    }
  }
}
