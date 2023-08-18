import { Input } from './input';

export const Forms = (props) => {
	return (
		<>
			<form onSubmit={props.onSubmit}>
				<Input
					name="todo"
					type="text"
					placeholder="Введите задачу"
					value={props.inputValue}
					onChange={props.onChangeAddInput}
				/>
				<button type="submit">добавить</button>
			</form>
			<form>
				<Input
					name="search"
					type="text"
					placeholder="Поиск"
					value={props.searchInputValue}
					onChange={props.onChangeSearchInput}
				/>
			</form>
		</>
	);
};
