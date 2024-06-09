import { useCallback, useContext } from "react";
import {
  Actions,
  UsersContext,
  UsersDispatchContext,
} from "../../contexts/UsersContext";
import { UserType } from "../../types/types";
import SelectAllCheckBox from "../SelectAllCheckBox/SelectAllCheckBox";
import User from "../User/User";
import "./UsersList.css";
import { ReactComponent as DuplicateLogo } from "../../assets/images/Duplicate.svg";
import { ReactComponent as TrashLogo } from "../../assets/images/Trash.svg";

export interface UsersListProps {
  users: UserType[];
  usersSelected: UserType[];
  apiLimitReached: boolean;
  noResult: boolean;
}
const UsersList = ({
  users,
  usersSelected,
  apiLimitReached,
  noResult,
}: UsersListProps) => {
  const { editMode } = useContext(UsersContext);
  const dispatch = useContext(UsersDispatchContext);

  const isUserSelected = useCallback(
    (userId: string) => {
      return usersSelected.some((user) => user.custom_id === userId);
    },
    [usersSelected]
  );

  const handleDuplicateClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch({ type: Actions.DUPLICATE_USERS });
  };

  const handleTrashClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch({ type: Actions.DELETE_USERS });
  };

  if (apiLimitReached) {
    return <div>Limite de l'api de github atteinte</div>;
  }
  if (noResult) {
    return <div>aucun résultat</div>;
  }

  return (
    <div className={"usersList"}>
      {editMode && (
        <div className={"usersList__controls"}>
          <SelectAllCheckBox></SelectAllCheckBox>
          <div className={"controls__buttons"}>
            <button
              className={"buttons__button"}
              onClick={(event) => {
                handleDuplicateClick(event);
              }}
            >
              <DuplicateLogo className={"button__logo"}></DuplicateLogo>
            </button>
            <button
              className={"buttons__button"}
              onClick={(event) => {
                handleTrashClick(event);
              }}
            >
              <TrashLogo className={"button__logo"}></TrashLogo>
            </button>
          </div>
        </div>
      )}
      <div className={"container"}>
        <div data-testid="users-list" className={"usersList__list"}>
          {users.map((user) => (
            <User
              custom_id={user.custom_id}
              key={user.custom_id}
              id={user.id}
              login={user.login}
              html_url={user.html_url}
              avatar_url={user.avatar_url}
              isSelected={isUserSelected(user.custom_id)}
            ></User>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
