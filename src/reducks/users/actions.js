export const ADD_ICON = "ADD_ICON";
export const addIconAction = (userState) => {
  return {
    type: "ADD_ICON",
    payload: {
      icon: userState.icon,
      isSignedIn: true,
      role: userState.role,
      schoolname: userState.schoolname,
      sid: userState.sid,
      uid: userState.uid,
      username: userState.username,
    },
  };
};

export const DELETE_PRODUCT_ACTION = "DELETE_PRODUCT_ACTION";
export const deleteProductAction = (products) => {
  return {
    type: "DELETE_PRODUCT_ACTION",
    payload: products
  };
};

export const DELETE_SELL_ACTION = "DELETE_SELL_ACTION";
export const deleteSellAction = (sells) => {
  return {
    type: "DELETE_SELL_ACTION",
    payload: sells
  };
};

export const FETCH_ORDERS_HISTORY = "FETCH_ORDERS_HISTORY";
export const fetchOrdersHistoryAction = (history) => {
  return {
    type: "FETCH_ORDERS_HISTORY",
    payload: history
  };
};

export const FETCH_PRODUCTS_IN_FAVORITE = "FETCH_PRODUCTS_IN_FAVORITE";
export const fetchProductsInFavoriteAction = (products) => {
  return {
    type: "FETCH_PRODUCTS_IN_FAVORITE",
    payload: products
  };
};

export const FETCH_SELLS_ACTION = "FETCH_SELLS_ACTION";
export const fetchSellsAction = (sells) => {
  return {
    type: "FETCH_SELLS_ACTION",
    payload: sells
  };
};

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      role: userState.role,
      schoolname: userState.schoolname,
      sid: userState.sid,
      uid: userState.uid,
      username: userState.username,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      uid: "",
      username: "",
    },
  };
};
