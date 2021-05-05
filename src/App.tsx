import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux"
import "./App.css";
import { LoadingOutlined } from "@ant-design/icons";
import { renderRoutes } from "./configs/routes";

const App: React.FC<Props> = ({ isLoading }) => {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="loader">
              <LoadingOutlined style={{ fontSize: "50px", color: "#E74A47" }} />
            </div>
          }
        >
          {isLoading && (
            <div className="loader">
              <LoadingOutlined style={{ fontSize: "50px", color: "#E74A47" }} />
            </div>
          )}
          <Switch>
            {renderRoutes.map(([key, route]) => (
              <Route
                key={key}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
            <Redirect from="*" to="/" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state: { isLoading: any; }) => {
  return {
    isLoading: state.isLoading
  }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
};

export default connector(App);
