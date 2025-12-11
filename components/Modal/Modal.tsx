'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import css from './Modal.module.css';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onDismiss = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onDismiss]);

  return (
    <div className={css.overlay} onClick={onDismiss}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onDismiss}>×</button>
        {children}
      </div>
    </div>
  );
}