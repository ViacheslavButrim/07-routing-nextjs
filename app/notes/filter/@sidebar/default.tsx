import Link from "next/link";

const tags = ["All", "Work", "Personal", "Todo", "Meeting", "Shopping"] as const;

export default function Sidebar() {
  return (
    <nav>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/notes/filter/${tag.toLowerCase()}`}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}