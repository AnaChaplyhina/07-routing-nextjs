import NoteForm from "@/components/NoteForm/NoteForm";

export default function Home() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create New Note</h1>
      
      <NoteForm />
      
    </main>
  );
}