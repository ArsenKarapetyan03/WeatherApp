import { PageHeader } from "@/components/layout/PageHeader.tsx";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {

	return (
		<>
			<PageHeader />

			<main className="max-w-2/3 mx-auto mt-20 flex flex-col gap-4">
				<Outlet />
			</main>
		</>
	)
}