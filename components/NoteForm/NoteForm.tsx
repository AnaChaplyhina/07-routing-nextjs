"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/notes";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      alert("Note created successfully!");
      setTitle("");
      setContent("");
      setCategory("Personal");
      
      if (onClose) {
        onClose();
      }
    },
    onError: (error) => {
      console.error(error);
      alert("Error creating note");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }
    mutation.mutate({ title, content, category });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      
      <div className={css.field}>
        <label className={css.label}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className={css.input}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content"
          className={css.textarea}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={css.select}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Family">Family</option>
          <option value="Study">Study</option>
          <option value="Ideas">Ideas</option>
        </select>
      </div>

      <button type="submit" disabled={mutation.isPending} className={css.button}>
        {mutation.isPending ? "Creating..." : "Create Note"}
      </button>
    </form>
  );
}