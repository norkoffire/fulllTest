import { useContext, useEffect, useRef, useState } from "react";
import {
  Actions,
  UsersContext,
  UsersDispatchContext,
} from "../../contexts/UsersContext";

const SelectAllCheckBox = () => {
  const { users, usersSelected } = useContext(UsersContext);
  const [isChecked, setChecked] = useState(false);
  const dispatch = useContext(UsersDispatchContext);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usersSelected.length > 0 && usersSelected.length === users.length) {
      setChecked(true);
    }
    if (!usersSelected.length) {
      setChecked(false);
    }
  }, [users, usersSelected]);

  const isIndeterminate = () => {
    if (usersSelected.length) {
      return usersSelected.length < users.length;
    }
    return false;
  };

  if (checkboxRef.current) {
    checkboxRef.current.indeterminate = isIndeterminate();
  }

  const handleSelectAllUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked || event.target.indeterminate) {
      dispatch({
        type: Actions.SELECT_ALL_USERS,
      });
      setChecked(true);
    } else {
      setChecked(false);
    }
  };
  // we use ref to have access to the html component and set the indeterminate
  return (
    <div>
      <input
        data-testid="select-all-checkbox"
        type="checkbox"
        onChange={(event) => handleSelectAllUsers(event)}
        checked={isChecked}
        ref={checkboxRef}
      ></input>
      <label> {usersSelected.length} utilisateurs selectionnés</label>
    </div>
  );
};

export default SelectAllCheckBox;
