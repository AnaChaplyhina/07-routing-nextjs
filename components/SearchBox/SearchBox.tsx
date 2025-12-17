"use client";

import css from "./SearchBox.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className={css.container}>
      <input
        className={css.input}
        placeholder="Search notes..."
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}