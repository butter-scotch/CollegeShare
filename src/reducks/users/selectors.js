import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getOrdersHistory = createSelector(
  [usersSelector],
  state => state.orders
);

export const getProductsInFavorite = createSelector(
  [usersSelector],
  state => state.favorite
);

export const getSchoolId = createSelector(
  [usersSelector],
  state => state.sid
);

export const getSchoolname = createSelector(
  [usersSelector],
  state => state.schoolname
);

export const getSells = createSelector(
  [usersSelector],
  state => state.sells
);

export const getSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
);

export const getUserId = createSelector(
  [usersSelector], 
  state => state.uid
);

export const getUsername = createSelector(
  [usersSelector],
  state => state.username
);

export const getUserIcon = createSelector(
  [usersSelector],
  state => state.icon
);
