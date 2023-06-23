import Blog from "@/src/screens/blog/Blog";
import { PostService } from "@/src/services/post.service";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/src/utils/getQueryClient";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Блог",
};

const BlogPage = async () => {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(["posts"], PostService.getAll);
	const dehydratedState = dehydrate(queryClient);

	return (
		<Hydrate state={dehydratedState}>
			<Blog />;
		</Hydrate>
	);
};

export default BlogPage;
