"use client";

import Loader from "@/src/components/loader/Loader";
import PostsList from "@/src/components/posts-list/PostsList";
import RequestTime from "@/src/components/request-time/RequestTime";
import SearchForm from "@/src/components/search-form/SearchForm";
import { PostService } from "@/src/services/post.service";
import { IPosts } from "@/src/types/post.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import { useQuery } from "@tanstack/react-query";

type Props = {
	query: string;
};

const Search = ({ query }: Props) => {
	const { data, isLoading, isFetching, error } = useQuery(
		["search", query],
		() => PostService.getBySearch(query),
	);

	const posts: IPosts[] = data?.data.posts.nodes;

	const requestTime: number = data.requestTime;

	return (
		<div>
			<Container>
				{error ? (
					<p>О нет, произошла ошибка</p>
				) : isLoading || isFetching ? (
					<Loader />
				) : data ? (
					<>
						<Heading>
							Поиск
							{query && `: «${query}»`}
						</Heading>
						<RequestTime requestTime={requestTime} />
						<SearchForm />
						{posts.length == 0 ? (
							<div>Статей не найдено!</div>
						) : (
							<PostsList posts={posts} />
						)}
					</>
				) : null}
			</Container>
		</div>
	);
};

export default Search;
