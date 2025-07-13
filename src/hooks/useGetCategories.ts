import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { Category } from "../context/types";
import { db } from "../utils/firebaseConfig";

function useGetCategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		const categoriesQuery = query(
			collection(db, "category"),
			orderBy("createdAt", "asc"),
		);

		const unsub = onSnapshot(
			categoriesQuery,
			(snapShot) => {
				const categoriesList = [] as any;

				snapShot.docs.forEach((doc) => {
					categoriesList.push({ id: doc.id, ...doc.data() });
				});

				setIsLoading(false);
				setCategories(categoriesList);
			},
			(error) => {
				console.log(error);
			},
		);

		return () => {
			unsub();
		};
	}, []);

	return { categories, isLoading };
}

export default useGetCategories;
