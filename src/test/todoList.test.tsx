import reducer, { addPending } from "../redux/todo/todoSlice";

describe("todo reducer", () => {
  it("should add a new todo", () => {
    const initialState = {
        pendingValue: [],
        ongoingValue: [],
        fulfilledValue: [],
    };

    const newState = reducer(
      initialState,
      addPending({
        id: 1,
        label: "Test Todo",
        content: "Lorem ipsum"
    })
    );

    expect(newState.pendingValue.length).toBe(1);
    expect(newState.pendingValue[0]).toEqual({
        id: 1,
        label: "Test Todo",
        content: "Lorem ipsum"
    });
  });
});