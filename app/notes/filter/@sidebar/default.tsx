
import Link from 'next/link';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './SidebarNotes.module.css';

const TAGS = ['Work', 'Personal', 'Study', 'Ideas'];

export default function Sidebar() {
  return (
    <div className={css.container}>
      <div>
        <h3 className={css.title}>Filters</h3>
        <ul className={css.menuList}>
          <li>
            <Link href="/notes/filter/all" className={css.menuLink}>All notes</Link>
          </li>
          {TAGS.map(tag => (
            <li key={tag}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #eaeaea' }} />
      
      <NoteForm />
    </div>
  );
}