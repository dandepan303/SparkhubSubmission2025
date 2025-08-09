'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Onboard from '@/components/onboard';

export default function Onboarding() {
  const router = useRouter();

  return <Onboard />;
}
