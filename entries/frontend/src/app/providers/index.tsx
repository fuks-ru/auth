import { ComponentType, FC, ReactNode, Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

import { GoogleRecaptchaProvider } from 'frontend/app/providers/GoogleRecaptchaProvider';
import { RedirectFromProvider } from 'frontend/app/providers/RedirectFromProvider';
import { ThemeProvider } from 'frontend/app/providers/ThemeProvider';
import { Preloader } from 'frontend/shared/ui';

interface IProps {
  children: ReactNode;
  Wrapper: ComponentType<{ children: ReactNode }>;
}

/**
 * Провайдер для всего приложения.
 */
export const AppProvider: FC<IProps> = ({ children, Wrapper }) => (
  <BrowserRouter>
    <Suspense fallback={<Preloader />}>
      <ThemeProvider>
        <Wrapper>
          <GoogleRecaptchaProvider>
            <RedirectFromProvider>
              <Routes>{children}</Routes>
            </RedirectFromProvider>
          </GoogleRecaptchaProvider>
        </Wrapper>
      </ThemeProvider>
    </Suspense>
  </BrowserRouter>
);
