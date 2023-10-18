import {useState} from "react";
import "./style.css";
import {
    useGetTodoQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from "../../features/apiSlice";
const ToDo = () => {
    // state
    const [newTodo, setNewTodo] = useState("");

    const {data, isLoading, isSuccess, isError, error} = useGetTodoQuery();

    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    //func (handle add item )
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({userId: 1, title: newTodo, completed: false});
        setNewTodo("");
    };

    //var to render in component
    const newSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter A New Todo Item</label>
            <div className="parent">
            <div>
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter New Item"
                />
            </div>
            <button className="add-btn">Add</button>
            </div>
        </form>
    );
    let content;

    if (isLoading) {
        content = <h1>Loading...</h1>;
    } else if (isSuccess) {
        content = data.map((e) => (
            <div key={Math.random()} className="section">
                <input
                    type="checkbox"
                    checked={e.completed}
                    id={e.id}
                    onChange={() => updateTodo({...e, completed: !e.completed})}
                />
                <label htmlFor={e.id}>{e.title}</label>

                <button className="delte-btn" onClick={() => deleteTodo({id: e.id})}>
                    Delete
                </button>
            </div>
        ));
    } else if (isError) {
        content = <p>{error}</p>;
    }
    return (
        <main>
            <h1>Content</h1>
            {newSection}
            {content}
        </main>
    );
};

export default ToDo;
