"use client";

import { useState, useEffect } from 'react';

export function ClientTimestamp({ timestamp }: { timestamp: string }) {
  const [localeString, setLocaleString] = useState('');

  useEffect(() => {
    setLocaleString(new Date(timestamp).toLocaleString());
  }, [timestamp]);
  
  // Render a placeholder on the server and during the initial client render
  if (!localeString) {
    return null;
  }

  return <>{localeString}</>;
}
