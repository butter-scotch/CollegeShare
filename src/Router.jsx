import React from "react";
import { Route, Switch } from "react-router";
import {
  SignIn,
  SignUp,
  ProductList,
  Reset,
  ProductDetail,
  FavoriteList,
  OrderHistory,
  ProductEdit,
  OrderConfirm,
  MyPage,
  SellList,
  OrderComplete,
} from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin/reset"} component={Reset} />

      <Auth>
        <Route exact path={"/:sid/:uid"} component={ProductList} />
        <Route exact path={"/:sid/:uid/product/:id"} component={ProductDetail} />
        <Route path={"/:sid/:uid/product/edit(/:id)?"} component={ProductEdit} />
        <Route exact path={"/:sid/:uid/favorite"} component={FavoriteList} />
        <Route exact path={"/:sid/:uid/order/history"} component={OrderHistory} />
        <Route exact path={"/:sid/:uid/order/complete"} component={OrderComplete} />
        <Route exact path={"/:sid/:uid/:id/order/confirm"} component={OrderConfirm} />
        <Route exact path={"/:sid/:uid/mypage"} component={MyPage} />
        <Route exact path={"/:sid/:uid/sell"} component={SellList} />

      </Auth>
    </Switch>
  );
};

export default Router;
