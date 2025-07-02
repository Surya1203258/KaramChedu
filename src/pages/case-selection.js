import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CaseSelection() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/case-selection/tips-strategies');
  }, [router]);

  return null;
} 