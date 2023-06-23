import Search from "@/src/screens/search/Search";
import { PostService } from "@/src/services/post.service";
import getQueryClient from "@/src/utils/getQueryClient";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import { Metadata } from "next";

// export const metadata: Metadata = {
// 	title: "Поиск",
// };

type Props = {
	searchParams: { query: string };
};

export async function generateMetadata({
	searchParams,
}: Props): Promise<Metadata> {
	return {
		title: searchParams.query || "Поиск",
	};
}

const SearchPage = async ({ searchParams }: Props) => {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(["search", searchParams.query], () =>
		PostService.getBySearch(searchParams.query),
	);
	const dehydratedState = dehydrate(queryClient);

	return (
		<Hydrate state={dehydratedState}>
			<Search query={searchParams.query} />
		</Hydrate>
	);
};

export default SearchPage;
