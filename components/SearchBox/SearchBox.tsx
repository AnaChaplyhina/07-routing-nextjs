"use client";

import { useRouter, useSearchParams } from "next/navigation";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`?${params.toString()}`);
  };

  return (
    <div className={css.container}>
      <input
        className={css.input}
        placeholder="Search notes..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </div>
  );
}