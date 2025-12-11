
import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api'; 

const api = axios.create({
  baseURL: BASE_URL,
});

export const getNotes = async (tag?: string): Promise<Note[]> => {
  const params = tag && tag !== 'all' ? { tag } : {};
  const { data } = await api.get<Note[]>('/notes', { params });
  return data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};