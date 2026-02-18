import Link from "next/link";
import css from "./Sidebar.module.css";

const tags = [
  { label: "All notes", slug: "all" },
  { label: "Work", slug: "work" },
  { label: "Personal", slug: "personal" },
  { label: "Todo", slug: "todo" },
  { label: "Meeting", slug: "meeting" },
  { label: "Shopping", slug: "shopping" },
] as const;

export default function Sidebar() {
  return (
    <nav className={css.sidebar}>
      <ul className={css.list}>
        {tags.map((tag) => (
          <li key={tag.slug} className={css.item}>
            <Link
              href={`/notes/filter/${tag.slug}`}
              className={css.link}
            >
              {tag.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}