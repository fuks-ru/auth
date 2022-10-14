import { ComponentType, FC, ReactNode, Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

import { GoogleRecaptchaProvider } from 'frontend/app/providers/GoogleRecaptchaProvider';
import { RedirectFromProvider } from 'frontend/app/providers/RedirectFromProvider';
import { ThemeProvider } from 'frontend/app/providers/ThemeProvider';
import { SettingsProvider } from 'frontend/app/providers/SettingsProvider';
import { Preloader } from 'frontend/shared/ui';
import { LoginTypeProvider } from 'frontend/app/providers/LoginTypeProvider';

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
      <GoogleRecaptchaProvider>
        <ThemeProvider>
          <Wrapper>
            <SettingsProvider>
              <LoginTypeProvider>
                <RedirectFromProvider>
                  <Routes>{children}</Routes>
                </RedirectFromProvider>
              </LoginTypeProvider>
            </SettingsProvider>
          </Wrapper>
        </ThemeProvider>
      </GoogleRecaptchaProvider>
    </Suspense>
  </BrowserRouter>
);
