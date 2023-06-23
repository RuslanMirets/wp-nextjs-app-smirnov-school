"use client";

import styles from "./SearchForm.module.scss";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchForm = () => {
	const router = useRouter();

	const methods = useForm<FieldValues>({
		defaultValues: {
			query: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		router.push(`/search?query=${data.query}`);
	};

	return (
		<form className={styles.root} onSubmit={methods.handleSubmit(onSubmit)}>
			<TextField
				className={styles.input}
				size="small"
				label="Поиск"
				{...methods.register("query")}
			/>
			<Button
				variant="contained"
				type="submit"
				disabled={methods.formState.isSubmitting}
			>
				{methods.formState.isSubmitting ? "Поиск..." : "Искать"}
			</Button>
		</form>
	);
};

export default SearchForm;
