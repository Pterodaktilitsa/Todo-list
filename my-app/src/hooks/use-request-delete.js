import { useState } from 'react';

export const useRequestDelete = (refreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDelete = (id) => {
		setIsDeleting(true);
		fetch(`http://localhost:3004/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача удалена');
				refreshTodos();
			})
			.finally(() => setIsDeleting(false));
	};

	return {
		requestDelete,
		isDeleting,
	};
};
