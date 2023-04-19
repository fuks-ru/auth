import { FC } from 'react';

import { useNavigate } from 'frontend/shared/lib/useNavigate';

// eslint-disable-next-line import/no-mutable-exports
export let navigate: (pathname: string, saveQuery?: boolean) => void;

export const GlobalNavigate: FC = () => {
  navigate = useNavigate();

  return null;
};
