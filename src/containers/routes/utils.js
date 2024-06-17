import { Route, Redirect } from "react-router-dom";
export const PrivateRoute = ({ component: InternalComponent, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = localStorage.getItem("token");
      return token ? (
        <InternalComponent {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            // eslint-disable-next-line
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

export const PublicRoute = ({ component: InternalComponent, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = localStorage.getItem("token");
      return !token ? (
        <InternalComponent {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/dashboard",
            // eslint-disable-next-line
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

