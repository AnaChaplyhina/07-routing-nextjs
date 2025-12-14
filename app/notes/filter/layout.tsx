
import React from "react";
import css from "./layout.module.css";

export default function FilterLayout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className={css.pageContainer}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.content}>{children}</section>
      {modal}
    </div>
  );
}