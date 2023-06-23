import Post from "@/src/screens/post/Post";
import { PostService } from "@/src/services/post.service";
import getQueryClient from "@/src/utils/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const data = await PostService.getBySlug(params.slug);

	return {
		title: data.data.post.title,
	};
}

const PostPage = async ({ params }: Props) => {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(["post", params.slug], () =>
		PostService.getBySlug(params.slug),
	);
	const dehydratedState = dehydrate(queryClient);

	return (
		<Hydrate state={dehydratedState}>
			<Post slug={params.slug} />
		</Hydrate>
	);
};

export default PostPage;
