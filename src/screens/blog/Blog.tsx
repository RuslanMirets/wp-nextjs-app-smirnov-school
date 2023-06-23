"use client";

import Loader from "@/src/components/loader/Loader";
import PostsList from "@/src/components/posts-list/PostsList";
import QueryLog from "@/src/components/query-log/QueryLog";
import RequestTime from "@/src/components/request-time/RequestTime";
import SearchForm from "@/src/components/search-form/SearchForm";
import { PostService } from "@/src/services/post.service";
import { IPosts } from "@/src/types/post.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import { useQuery } from "@tanstack/react-query";

const Blog = () => {
	const { data, isLoading, isError } = useQuery(["posts"], PostService.getAll);

	const posts: IPosts[] = data?.data.posts.nodes;

	const requestTime: number = data?.requestTime;

	return (
		<section>
			<Container>
				<Heading>Блог</Heading>
				{isError && <div>О нет, произошла ошибка</div>}
				{isLoading && <Loader />}
				{data && (
					<>
						<RequestTime requestTime={requestTime} />
						<SearchForm />
						<PostsList posts={posts} />
					</>
				)}
			</Container>
		</section>
	);
};

export default Blog;
