import { render, screen } from "@testing-library/react";
import User, { UserProps } from "./User";

const initialUserProps: UserProps = {
  custom_id: "custom_id",
  id: "id",
  login: "login",
  avatar_url: "avatar",
  html_url: "url",
  isSelected: false,
};

test("renders User component", () => {
  render(<User {...initialUserProps} />);
  const user = screen.getByTestId("user");
  expect(user).toBeInTheDocument();
});
