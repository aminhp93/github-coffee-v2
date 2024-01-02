/* eslint-disable */
import "@/styles/globals.css";

// Import packages
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ReactElement, ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";

import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  ThemeComponent,
  SettingsConsumer,
  SettingsProvider,
} from "webpmp-v5-theme";
import { NotificationProvider } from "@/@core/components/notification";
import "@/@core/configs/i18n";

import { LicenseInfo } from "@mui/x-license-pro";

yarn add
 nprogress @emotion/cache @emotion/react 
@mui/material @mui/icons-material lodash 
immer zustand next-i18next notistack qs zod swr uuid

// Import local components
import { AuthProvider } from "@/features/auth/AuthContext";
import Login from "@/features/auth/Login";
import Head from "next/head";
import UserLayout, { LIST_NAV_ITEMS } from "@/features/layouts/UserLayout";
import { findItemByHref } from "@/@core/layouts/Layout.utils";
import useLayoutStore from "@/@core/layouts/Layout.store";
import "../@core/configs/i18n";

LicenseInfo.setLicenseKey(
  "dcefdac96a87b8f5dc734ed67a1c7c22Tz03MDQ3OSxFPTE3MjA3NzgxMzMwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y"
);

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

const AuthGuard = dynamic(() => import("@/features/auth/AuthGuard"), {
  ssr: false,
});

const GuestGuard = dynamic(() => import("@/features/auth/GuestGuard"), {
  ssr: false,
});
import { appWithTranslation } from "next-i18next";

export const createEmotionCache = () => {
  return createCache({ key: "css" });
};

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  authGuard?: boolean;
  guestGuard?: boolean;
  setConfig?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SettingsProps = any;

type Props = AppProps & {
  // Component: NextPageWithLayout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any;
  getLayout?: (page: ReactElement) => ReactNode;
  authGuard?: boolean;
  guestGuard?: boolean;
  emotionCache: EmotionCache;
  setConfig?: () => void;
};

const App = (props: Props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  const setSelectedNavItem = useLayoutStore(
    (state) => state.setSelectedNavItem
  );
  // Variables
  const setConfig = Component.setConfig ?? undefined;
  const authGuard = Component.authGuard ?? true;
  const guestGuard = Component.guestGuard ?? false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLayout =
    Component.getLayout ?? ((page: any) => <UserLayout>{page}</UserLayout>);

  useEffect(() => {
    const foundItem = findItemByHref(LIST_NAV_ITEMS, router.pathname);
    if (!foundItem) return;
    setSelectedNavItem(foundItem);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`Webpmp v5`}</title>
        <meta
          name="description"
          content={`Next-generation SaaS solutions for process control, analytics and automation.`}
        />
        <meta
          name="keywords"
          content="Process control, Process analytics, Industrial IT"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
          <SettingsConsumer>
            {({ settings }: SettingsProps) => {
              return (
                <ThemeComponent settings={settings}>
                  <NotificationProvider>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      {getLayout(<Component {...pageProps} />)}
                    </Guard>
                  </NotificationProvider>
                </ThemeComponent>
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </AuthProvider>
    </CacheProvider>
  );
};

export default appWithTranslation(App);

const Guard = ({
  children,
  authGuard,
  guestGuard,
}: {
  children: ReactNode;
  authGuard?: boolean;
  guestGuard?: boolean;
}) => {
  if (guestGuard) {
    return <GuestGuard fallback={<div>Loading</div>}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Login />}>{children}</AuthGuard>;
  }
};
