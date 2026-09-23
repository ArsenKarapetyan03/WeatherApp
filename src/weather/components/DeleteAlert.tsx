import type { Dispatch, SetStateAction } from "react";
import { Trash2Icon } from "lucide-react";
import { CustomButton } from "custom-ui-components/src/components/CustomButton.tsx";

export const DeleteAlert = (
	{
		onClick,
		onClose,
	}: {
		onClick: () => void;
		onClose: Dispatch<SetStateAction<boolean>>;
	}) => {

	return (
		<div className="flex flex-col items-center gap-4">

			<div className="px-1 py-2 text-red-500 bg-red-100 rounded-lg">
				<Trash2Icon size={48} strokeWidth={2}/>
			</div>
			<p className="font-bold text-xl">Delete city?</p>
			<p>This will permanently delete this city weather information</p>
			<div className="flex justify-center gap-2">
				<CustomButton
					onClick={() => onClose(false)}
					className="transition duration-200"
				>
					Cancel
				</CustomButton>
				<CustomButton
					onClick={onClick}
					className="font-semibold text-red-500  bg-red-100 hover:bg-white hover:text-red-500 hover:border-red-300 transition duration-200"
				>
					Delete
				</CustomButton>
			</div>
		</div>
	)
}