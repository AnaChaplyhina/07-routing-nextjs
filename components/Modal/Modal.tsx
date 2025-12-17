"use client";

import { ReactNode } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void; 
}

export default function Modal({ children, onClose }: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        {onClose && (
          <button className={css.closeButton} onClick={onClose}>
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  );
}