'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api/notes';
import css from './NoteForm.module.css'; 

export default function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Work');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    try {
      await createNote({ title, content, tags: [tag] });
      setTitle('');
      setContent('');
      router.refresh(); 
    } catch (error) {
      alert('Error creating note');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h3 className={css.heading}>Add Note</h3>
      <input className={css.input} type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea className={css.textarea} placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
      <select className={css.select} value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
        <option value="Ideas">Ideas</option>
      </select>
      <button type="submit" className={css.button}>Create</button>
    </form>
  );
}