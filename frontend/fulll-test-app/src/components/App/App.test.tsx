import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App component", () => {
  render(<App />);
  const searchInput = screen.getByTestId("search-input");
  expect(searchInput).toBeInTheDocument();
});
