import { createContext, useReducer } from "react";
import { UserType } from "../types/types";

export enum Actions {
  INITIATE_USERS = "INITIATE_USERS",
  USER_SELECTED = "USER_SELECTED",
  USER_UNSELECTED = "USER_UNSELECTED",
  SELECT_ALL_USERS = "SELECT_ALL_USERS",
  DUPLICATE_USERS = "DUPLICATE_USERS",
  DELETE_USERS = "DELETE_USERS",
  EDIT_MODE = "EDIT_MODE",
}

interface initiateUsersAction {
  type: Actions.INITIATE_USERS;
  users: UserType[];
}

interface selectedUserAction {
  type: Actions.USER_SELECTED;
  user: UserType;
}

interface unselectedUserAction {
  type: Actions.USER_UNSELECTED;
  user: UserType;
}

interface selectAllUsersAction {
  type: Actions.SELECT_ALL_USERS;
}

interface duplicateUsersAction {
  type: Actions.DUPLICATE_USERS;
}

interface deleteUsersAction {
  type: Actions.DELETE_USERS;
}

interface editModeAction {
  type: Actions.EDIT_MODE;
}

interface UsersState {
  users: UserType[];
  usersSelected: UserType[];
  editMode: boolean;
}

type Action =
  | initiateUsersAction
  | selectedUserAction
  | unselectedUserAction
  | selectAllUsersAction
  | duplicateUsersAction
  | deleteUsersAction
  | editModeAction;

const initialUserState: UsersState = {
  users: [],
  usersSelected: [],
  editMode: false,
};

export const usersReducer = (
  usersState: UsersState,
  action: Action
): UsersState => {
  // we make a hard copy of the previous state to be sure it's another object that is returned at the end
  const newState: UsersState = JSON.parse(JSON.stringify(usersState));
  switch (action.type) {
    case Actions.INITIATE_USERS: {
      const users: UserType[] = action.users.map((user) => {
        // we add a custom id to manage duplication, deletion etc we can't use github user id as an user id
        return { ...user, custom_id: crypto.randomUUID() };
      });
      return { ...newState, users: users, usersSelected: [] };
    }
    case Actions.USER_SELECTED: {
      newState.usersSelected.push(action.user);
      return newState;
    }
    case Actions.USER_UNSELECTED: {
      const newUsersSelected = newState.usersSelected.filter(
        (user: UserType) => user.custom_id !== action.user.custom_id
      );
      return { ...newState, usersSelected: newUsersSelected };
    }
    case Actions.SELECT_ALL_USERS: {
      return { ...newState, usersSelected: newState.users };
    }
    case Actions.DUPLICATE_USERS: {
      newState.usersSelected.forEach((user) => {
        newState.users.push({ ...user, custom_id: crypto.randomUUID() });
      });
      return {
        ...newState,
        usersSelected: [],
      };
    }
    case Actions.DELETE_USERS: {
      const deletedIds = newState.usersSelected.map((user) => user.custom_id);
      const users: UserType[] = newState.users.filter((user) => {
        return !deletedIds.includes(user.custom_id);
      });

      return { ...newState, users: users, usersSelected: [] };
    }
    case Actions.EDIT_MODE: {
      return { ...newState, editMode: !newState.editMode };
    }
    default:
      return usersState;
  }
};

// custom hook to export reducer in app and pass it to context
export const useUsers = () => {
  const [usersState, dispatch] = useReducer(usersReducer, initialUserState);
  return [usersState, dispatch] as const;
};

// we create and export our contexts
export const UsersContext = createContext<UsersState>(initialUserState);
export const UsersDispatchContext = createContext<React.Dispatch<Action>>(
  () => null
);
