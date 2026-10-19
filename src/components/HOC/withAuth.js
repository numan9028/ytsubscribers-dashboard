import React from "react";
import { isAuth } from 'src/Redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
// This function takes a component...
function withAuthentication(WrappedComponent) {
  // ...and returns another component...
  return function WithAuthComponent() {
    // const [loading, setLoading] = React.useState(false);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    React.useEffect(() => {
      // setLoading(true);
      dispatch(isAuth());
      // setLoading(false);
    }, []);
    // ... and renders the wrapped component with the fresh data!
    // Notice that we pass through any additional props
    return <WrappedComponent user={auth.user} loading={auth.loading} />;
  }
}

export default withAuthentication;