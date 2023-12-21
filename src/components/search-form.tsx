"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const showButton = search.length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return;

    router.push(`/events/${search}`);
  };

  return (
    <form className="w-full sm:w-[580px] relative" onSubmit={handleSubmit}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10 pr-16"
        placeholder="Search events in any city..."
        spellCheck={false}
      />
      {showButton && (
        <Link
          href={`/events/${search}`}
          className="absolute h-12 w-12 top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-white/[14%] rounded-lg mr-[-1rem] transition hover:bg-white/[20%]"
        >
          <ArrowRightIcon className="w-full h-full text-accent" />
        </Link>
      )}
    </form>
  );
}
