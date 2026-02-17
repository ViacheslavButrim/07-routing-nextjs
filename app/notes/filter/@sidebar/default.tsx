import Link from "next/link";

const tags = ["all", "work", "personal", "important"];

export default function Sidebar() {
  return (
    <nav>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/notes/filter/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}