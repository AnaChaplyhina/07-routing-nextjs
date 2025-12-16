export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string; 
}

export interface CreateNoteDto {
  title: string;
  content: string;
  category: string;
}