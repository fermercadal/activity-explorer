import { AppLink } from "@/components/ui";
import { fetchUserBoards } from "@/lib/api/user-boards";

export default async function Home() {
	const { username, boards } = await fetchUserBoards();

	return (
		<main className="min-h-screen bg-gray-50 p-8">
			<p className="mb-3 text-sm text-gray-500">Signed in as {username}</p>
			<h1 className="mb-8 text-3xl font-bold text-gray-800">
				Collaborative Board Activity Explorer
			</h1>
			<ul className="flex flex-col gap-3">
				{boards.map((board) => (
					<li key={board.slug}>
						<AppLink href={`/boards/${board.slug}`} variant="board">
							{board.label}
						</AppLink>
					</li>
				))}
			</ul>
		</main>
	);
}
