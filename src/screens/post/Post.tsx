"use client";

import { PostService } from "@/src/services/post.service";
import Heading from "@/src/ui/heading/Heading";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import styles from "./Post.module.scss";
import { IPost } from "@/src/types/post.interface";
import RequestTime from "@/src/components/request-time/RequestTime";
import Loader from "@/src/components/loader/Loader";

type Props = {
	slug: string;
};

const Post = ({ slug }: Props) => {
	const { data, isLoading, isFetching, error } = useQuery(["post", slug], () =>
		PostService.getBySlug(slug),
	);

	const post: IPost = data?.data.post;

	const requestTime: number = data?.requestTime;

	return (
		<div>
			<Container>
				{error ? (
					<p>О нет, произошла ошибка</p>
				) : isLoading || isFetching ? (
					<Loader />
				) : data ? (
					<>
						<RequestTime requestTime={requestTime} />
						<article>
							<Heading>{post.title}</Heading>
							<div
								className={styles.content}
								dangerouslySetInnerHTML={{ __html: post.content }}
							/>
						</article>
					</>
				) : null}
			</Container>
		</div>
	);
};

export default Post;
