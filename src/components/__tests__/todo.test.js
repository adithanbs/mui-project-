import { render, screen, cleanup } from "@testing-library/react"
import Todo from "../testExamples/todo"

test('should render todo component', () => {
   render(<Todo/>)
   const todoElement = screen.getByTestId('todo-1');
   expect(todoElement).toBeInTheDocument();
   expect(todoElement).toHaveTextContent("todo");
})