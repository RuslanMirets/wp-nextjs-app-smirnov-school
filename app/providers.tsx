"use client";

import { CssBaseline } from "@mui/material";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
	return (
		<>
			<CssBaseline />
			{children}
		</>
	);
};

export default Providers;
