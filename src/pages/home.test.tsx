import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/todo/todoSlice";
import { Home } from "./home";

function renderWithStore(ui: React.ReactNode) {
  const store = configureStore({
    reducer: { todo: todoReducer },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe("Home component", () => {
  it("renders header text", () => {
    renderWithStore(<Home title="My Todos" />);
    expect(
      screen.getByText(/Personal To Do List/i)
    ).toBeInTheDocument();
  });

  it("opens dialog when + button clicked", () => {
    renderWithStore(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /add-todo/i }));
    expect(screen.getByText(/Enter item/i)).toBeInTheDocument();
  });

  it("adds a new pending todo", () => {
    renderWithStore(<Home />);
    // open dialog
    fireEvent.click(screen.getByRole("button", { name: /add-todo/i }));

    // fill inputs
    fireEvent.change(screen.getByLabelText(/Label/i), {
      target: { value: "Task A" },
    });
    fireEvent.change(screen.getByLabelText(/Content/i), {
      target: { value: "Do homework" },
    });

    // click create
    fireEvent.click(screen.getByRole("button", { name: /Create/i }));

    // check it appears in Pending list
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.getByText("Do homework")).toBeInTheDocument();
  });
});
