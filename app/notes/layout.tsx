import React from "react";
import css from "./NotesLayout.module.css";

interface NotesLayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export default function NotesLayout({ children, modal, sidebar }: NotesLayoutProps) {
  return (
    <div className={css.container}>
      {sidebar && <aside className={css.sidebar}>{sidebar}</aside>}
      <main className={css.main}>{children}</main>
      {modal && <div className={css.modal}>{modal}</div>}
    </div>
  );
}