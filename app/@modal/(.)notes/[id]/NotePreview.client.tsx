"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import type { Note } from "@/types/note";

export default function NotePreview() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  const handleClose = () => router.back();

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </Modal>
  );
}