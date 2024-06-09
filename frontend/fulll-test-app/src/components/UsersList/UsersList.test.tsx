import { render, screen } from "@testing-library/react";
import UsersList, { UsersListProps } from "./UsersList";

const initialUsersListProps: UsersListProps = {
  users: [
    {
      id: "id",
      login: "login",
      avatar_url: "avatar",
      html_url: "url",
      custom_id: "custom_id",
    },
  ],
  usersSelected: [],
  apiLimitReached: false,
  noResult: false,
};

test("renders UsersList component", () => {
  const usersListProps = { ...initialUsersListProps };
  render(<UsersList {...usersListProps} />);
  const searchInput = screen.getByTestId("users-list");
  expect(searchInput).toBeInTheDocument();
});

test("api reached limit", () => {
  const usersListProps = { ...initialUsersListProps, apiLimitReached: true };
  render(<UsersList {...usersListProps} />);
  const limitReachedDiv = screen.getByText(
    "Limite de l'api de github atteinte"
  );
  expect(limitReachedDiv).toBeInTheDocument();
});

test("no result", () => {
  const usersListProps = { ...initialUsersListProps, noResult: true };
  render(<UsersList {...usersListProps} />);
  const noResultDiv = screen.getByText("aucun résultat");
  expect(noResultDiv).toBeInTheDocument();
});
