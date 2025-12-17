import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getNotes = async (
  tag?: string, 
  search?: string, 
  page: number = 1
): Promise<Note[]> => {
  
  const params: any = {
    page,
    perPage: 6, 
  };

  if (tag && tag !== 'all') {
    params.tag = tag;
  }
  
  if (search) {
    params.search = search;
  }

  try {
    const { data } = await api.get<{ data: Note[] } | Note[]>('/notes', { params });
    if (Array.isArray(data)) return data;
    return (data as any).data || [];
  } catch (error) {
    console.error("Помилка завантаження нотаток:", error);
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
