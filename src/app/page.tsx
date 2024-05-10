'use client'

import { useConfig } from "statsig-react";

export default function Home() {
  const { config } = useConfig('eyebrow');
  console.log('InvalidBootstrap Here', { value: config.value, details: config.getEvaluationDetails() })
  return (
    <div>
      <h1>Testing Statsig SSR</h1>
      <p>SSR Value: {config.value.localeKey as string}</p>
    </div>
  );
}
