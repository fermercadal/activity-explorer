import Link from "next/link";
import { fetchUserBoards } from "@/lib/api/user-boards";

export default async function Home() {
  const { username, boards } = await fetchUserBoards();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <p className="text-sm text-gray-500 mb-3">Signed in as {username}</p>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Collaborative Board Activity Explorer
      </h1>
      <ul className="flex flex-col gap-3">
        {boards.map((board) => (
          <li key={board.slug}>
            <Link
              href={`/boards/${board.slug}`}
              className="block w-64 px-5 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              {board.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
