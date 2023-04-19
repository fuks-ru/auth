import { ComponentType, FC, ReactNode, Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

import { GoogleRecaptchaProvider } from 'frontend/app/providers/GoogleRecaptchaProvider';
import { RedirectFromProvider } from 'frontend/app/providers/RedirectFromProvider';
import { ThemeProvider } from 'frontend/app/providers/ThemeProvider';
import { SettingsProvider } from 'frontend/app/providers/SettingsProvider';
import { Preloader } from 'frontend/shared/ui';
import { LoginTypeProvider } from 'frontend/app/providers/LoginTypeProvider';
import { ReduxProvider } from 'frontend/app/providers/ReduxProvider';
import { GlobalNavigate } from 'frontend/shared/lib/navigate';

interface IProps {
  children: ReactNode;
  Wrapper: ComponentType<{ children: ReactNode }>;
}

/**
 * Провайдер для всего приложения.
 */
export const AppProvider: FC<IProps> = ({ children, Wrapper }) => (
  <ReduxProvider>
    <BrowserRouter>
      <GlobalNavigate />
      <Suspense fallback={<Preloader />}>
        <ThemeProvider>
          <GoogleRecaptchaProvider>
            <Wrapper>
              <SettingsProvider>
                <LoginTypeProvider>
                  <RedirectFromProvider>
                    <Routes>{children}</Routes>
                  </RedirectFromProvider>
                </LoginTypeProvider>
              </SettingsProvider>
            </Wrapper>
          </GoogleRecaptchaProvider>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  </ReduxProvider>
);
