import { sortTodosByTitle } from './utils';
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { useRequestAdd, useRequestDelete, useRequestGet, useRequestEdit } from './hooks';
import { Forms } from './components/forms';
import { EditForms } from './components/edit-forms';

export const App = () => {
	const [showForm, setShowForm] = useState(false);
	const [inputEditValue, setInputEditValue] = useState('');

	const [inputValue, setInputValue] = useState('');
	const [searchInputValue, setSearchInputValue] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);
	const [isSorted, setIsSorted] = useState(false);

	const [editingTaskId, setEditingTaskId] = useState(null);

	const { todos, setTodos } = useRequestGet(refreshTodosFlag);
	const { requestAdd } = useRequestAdd(refreshTodos);
	const { requestDelete } = useRequestDelete(refreshTodos);
	const { requestEdit } = useRequestEdit(refreshTodos, setEditingTaskId);

	const [filteredTodos, setFilteredTodos] = useState(todos);

	const onSubmit = (event) => {
		event.preventDefault();
		requestAdd({ title: inputValue });
		setInputValue('');
	};

	const handleOpenEditForm = (id, title) => {
		setEditingTaskId(id);
		setInputEditValue(title);
		setShowForm(!showForm);
	};

	const handleSorted = () => {
		if (!isSorted) {
			setTodos(sortTodosByTitle(todos));
			setIsSorted(true);
		} else {
			refreshTodos();
			setIsSorted(false);
		}
	};

	const onSubmitEditForm = (event) => {
		event.preventDefault();
		const submitData = { title: inputEditValue };
		requestEdit(editingTaskId, submitData);
		setShowForm(!showForm);
	};

	useEffect(() => {
		const filterTodos = async () => {
			const filteredList = await todos.filter(async (todo) => {
				const title = todo.title.toLowerCase();
				return title.includes(searchInputValue);
			});
			setFilteredTodos(filteredList);
		};
		filterTodos();
	}, [searchInputValue, todos]);

	const onChangeAddInput = (event) => setInputValue(event.target.value);
	const onChangeSearchInput = (event) => setSearchInputValue(event.target.value);
	return (
		<div className={styles.app}>
			<h1>Cписок задач</h1>
			<Forms
				onSubmit={onSubmit}
				inputValue={inputValue}
				onChangeAddInput={onChangeAddInput}
				searchInputValue={searchInputValue}
				onChangeSearchInput={onChangeSearchInput}
			/>
			<EditForms
				handleSorted={handleSorted}
				styles={styles}
				filteredTodos={filteredTodos}
				requestDelete={requestDelete}
				handleOpenEditForm={handleOpenEditForm}
				showForm={showForm}
				editingTaskId={editingTaskId}
				onSubmitEditForm={onSubmitEditForm}
				setInputEditValue={setInputEditValue}
			/>
		</div>
	);
};
