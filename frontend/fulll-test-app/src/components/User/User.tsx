import { useContext, useState } from "react";
import {
  Actions,
  UsersContext,
  UsersDispatchContext,
} from "../../contexts/UsersContext";
import "./User.css";

export interface UserProps {
  custom_id: string;
  id: string;
  login: string;
  avatar_url: string;
  html_url: string;
  isSelected: boolean;
}

const User = (props: UserProps) => {
  const { custom_id, id, login, avatar_url, html_url, isSelected } = props;
  const [isChecked, setChecked] = useState(false);
  const { editMode } = useContext(UsersContext);
  const dispatch = useContext(UsersDispatchContext);

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((initialValue) => !initialValue);
    if (event.target.checked) {
      dispatch({
        type: Actions.USER_SELECTED,
        user: props,
      });
    } else {
      dispatch({
        type: Actions.USER_UNSELECTED,
        user: props,
      });
    }
  };

  return (
    <div data-testid="user" className={"userList__user"}>
      {editMode && (
        <input
          type="checkbox"
          className={"user__checkbox"}
          checked={isSelected ?? isChecked}
          onChange={(event) => onCheckboxChange(event)}
          value={custom_id}
        ></input>
      )}
      <img src={avatar_url} alt="avatar" />
      <span className={"user__idLogin"}>
        <span>{id}</span>
        <span>{login}</span>
      </span>
      <a href={html_url} target="_blank" rel="noreferrer">
        View profile
      </a>
    </div>
  );
};

export default User;
