import { createSelector } from "reselect";

const schoolsSelector = (state) => state.schools;

export const getProducts = createSelector(
  [schoolsSelector],
  state => state.products
);

