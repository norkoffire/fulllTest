import { render, screen } from "@testing-library/react";
import SelectAllCheckBox from "./SelectAllCheckBox";

test("renders SelectAllCheckBox component", () => {
  render(<SelectAllCheckBox />);
  const checkbox = screen.getByTestId("select-all-checkbox");
  expect(checkbox).toBeInTheDocument();
});
