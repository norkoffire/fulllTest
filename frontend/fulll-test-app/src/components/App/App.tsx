import React, { useCallback, useEffect, useState } from "react";
import {
  Actions,
  UsersContext,
  UsersDispatchContext,
  useUsers,
} from "../../contexts/UsersContext";
import UsersList from "../UsersList/UsersList";
import "./App.css";
import { ReactComponent as EditLogo } from "../../assets/images/Edit.svg";

const App = () => {
  const githubUsersApiUrl = "https://api.github.com/search/users";
  const [apiLimitReached, setApiLimitReached] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [usersState, dispatch] = useUsers();
  const { users, usersSelected } = usersState;

  const onInputChange = (value: string) => {
    setSearchValue(value);
  };

  // fetch the github api, needs to be in a useCallback because it's in the useEffect dependency below
  const fetchUsers = useCallback(
    (userName: string) => {
      setNoResult(false);
      setApiLimitReached(false);
      const url = `${githubUsersApiUrl}?q=${userName}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            if (response.status === 403) {
              setApiLimitReached(true);
            }
          }
          return response.json();
        })
        .then((data) => {
          if (data.total_count > 0) {
            dispatch({ type: Actions.INITIATE_USERS, users: data.items });
          } else {
            setNoResult(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (searchValue.length > 0) {
      // we delay fetching users 500ms after end of typing to prevent multiple api calls and limit reached
      const delayInputTimeoutId = setTimeout(() => {
        fetchUsers(searchValue);
      }, 500);
      return () => clearTimeout(delayInputTimeoutId);
    } else {
      dispatch({ type: Actions.INITIATE_USERS, users: [] });
    }
  }, [dispatch, searchValue, fetchUsers]);

  const handleAdminClick = () => {
    dispatch({ type: Actions.EDIT_MODE });
  };

  return (
    <div className="app">
      <div className="app__header">
        <div className="header__title-div">
          <span className="title-div__title">Github Search</span>
          <button
            className="title-div__edit-mode-button"
            onClick={() => handleAdminClick()}
          >
            <EditLogo className="edit-mode-button__logo"></EditLogo>
          </button>
        </div>
      </div>
      <div className="content">
        <div>
          <input
            data-testid="search-input"
            placeholder="search input"
            className="searchInput"
            type="text"
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onInputChange(event.target.value);
            }}
          ></input>
        </div>
        {/* we provide the contexts to the rest of the app and split state and dispatch to prevent rerenders */}
        <UsersContext.Provider value={usersState}>
          <UsersDispatchContext.Provider value={dispatch}>
            {users.length > 0 && (
              <UsersList
                users={users}
                usersSelected={usersSelected}
                apiLimitReached={apiLimitReached}
                noResult={noResult}
              ></UsersList>
            )}
          </UsersDispatchContext.Provider>
        </UsersContext.Provider>
      </div>
    </div>
  );
};

export default App;
