import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

import { Badge } from './ui/badge';

type Props = HTMLAttributes<HTMLHeadingElement>;

const Logo = (props: Props) => {
  const { className, ...other } = props;

  return (
    <h1 className={cn('font-bold tracking-tight', className)} {...other}>
      TODO{' '}
      <Badge variant="secondary" className="tracking-normal">
        3000
      </Badge>
    </h1>
  );
};

export default Logo;
