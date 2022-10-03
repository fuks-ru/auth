import { FC, ReactNode } from 'react';
import { Link as LinkBase, useLocation } from 'react-router-dom';

interface IProps {
  route: string;
  children: ReactNode;
  saveQuery?: boolean;
}

/**
 * Компонент ссылки внутри приложения. Умеет сохранять query-параметры.
 */
export const Link: FC<IProps> = ({ children, route, saveQuery = true }) => {
  const { search } = useLocation();

  const to = `${route}${saveQuery ? search : ''}`;

  return <LinkBase to={to}>{children}</LinkBase>;
};
