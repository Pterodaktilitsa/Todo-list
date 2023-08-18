import { Input } from './input';

export const EditForms = (props) => {
	return (
		<>
			<button onClick={props.handleSorted}>Сортировка по алфавиту</button>
			<ol className={props.styles.todoList}>
				{props.filteredTodos.map(({ id, title }) => (
					<li key={id}>
						{title}
						<button onClick={() => props.requestDelete(id)}>удалить</button>
						<button onClick={() => props.handleOpenEditForm(id, title)}>редактировать</button>
						{props.showForm && props.editingTaskId === id && (
							<div>
								<form onSubmit={props.onSubmitEditForm}>
									<Input
										className="input-text"
										type="text"
										value={props.inputEditValue}
										onChange={(event) => props.setInputEditValue(event.target.value)}
									/>
									<button type="submit">Редактировать</button>
								</form>
							</div>
						)}
					</li>
				))}
			</ol>
		</>
	);
};
