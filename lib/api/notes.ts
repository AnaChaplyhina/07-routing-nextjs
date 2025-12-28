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


const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const getNotes = async (
  tag?: string, 
  search?: string, 
  page: number = 1
): Promise<FetchNotesResponse> => {
  
  const params: any = {
    page,
    perPage: 6, 
  };

  
  if (tag && tag !== 'all') {
    params.category = capitalize(tag); 
  }
  
  if (search) {
    params.search = search;
  }

  try {
    const { data } = await api.get('/notes', { params });
    
    if ('data' in data && Array.isArray(data.data)) {
      return {
        notes: data.data,
        totalPages: data.totalPages || 1
      };
    }
    
    if (Array.isArray(data)) {
      return { notes: data, totalPages: 1 };
    }

    return { notes: [], totalPages: 1 };
  } catch (error) {
    console.error("Помилка завантаження нотаток:", error);
    return { notes: [], totalPages: 1 };
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