import React from "react";
import css from "./NotesLayout.module.css";

interface NotesLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode; 
}

export default function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <div className={css.container}>
      {sidebar && <aside className={css.sidebar}>{sidebar}</aside>}
      <main className={css.main}>{children}</main>
    </div>
  );
}