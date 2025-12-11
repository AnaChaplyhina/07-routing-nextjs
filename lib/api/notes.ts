
import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const MY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXBseWhpbmEuYW5hc3Rhc2lpYUBnbWFpbC5jb20iLCJpYXQiOjE3NjM1Njk0NTZ9.yBuYcxYhgoPM_QZ-fiNR0ojgHlAHfmvjD5eIqzt6dXg';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${MY_TOKEN}`,
  },
});

export const getNotes = async (tag?: string): Promise<Note[]> => {
  const params = tag && tag !== 'all' ? { tag } : {};
  try {
    const { data } = await api.get<{ data: Note[] } | Note[]>('/notes', { params });
    if (Array.isArray(data)) return data;
    return (data as any).data || [];
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

export const getNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: Omit<Note, 'id' | 'date'>): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};