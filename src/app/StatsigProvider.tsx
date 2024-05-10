'use client';

import type { PropsWithChildren } from 'react';
import {
  type StatsigOptions,
  StatsigProvider as StatsigAsyncProvider,
  StatsigSynchronousProvider,
  type StatsigUser,
} from 'statsig-react';

interface StatsigClientProviderProps extends PropsWithChildren {
  readonly user: StatsigUser;
  readonly values?: Record<string, unknown>;
}

export default function StatsigProvider({
  user,
  values,
  children,
}: StatsigClientProviderProps): JSX.Element {

  if (!process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY) {
    throw new Error(
      'Missing NEXT_PUBLIC_STATSIG_CLIENT_KEY environment variable.',
    );
  }

const stableId = user.customIDs?.['stableID'];

  const options: StatsigOptions = {
    disableAutoMetricsLogging: true,
    disableErrorLogging: true,
    environment: { tier: 'staging' },
    ...(stableId && { overrideStableID: stableId }),
  };

  if (values == null) {
    return (
      <StatsigAsyncProvider
        sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY}
        user={user}
        waitForInitialization={true}
        options={options}
      >
        {children}
      </StatsigAsyncProvider>
    );
  }
  return (
    <StatsigSynchronousProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY}
      user={user}
      initializeValues={values}
      options={options}
    >
      {children}
    </StatsigSynchronousProvider>
  );
}
