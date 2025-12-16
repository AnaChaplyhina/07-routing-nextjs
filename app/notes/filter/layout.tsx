import { ReactNode } from "react";
import css from "./layout.module.css";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className={css.container}>
      <div className={css.sidebar}>{sidebar}</div>
      
      <div className={css.content}>{children}</div>
    </div>
  );
}