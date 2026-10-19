import React from "react";
import { useSelector } from 'react-redux';
// This function takes a component...
function withRole(WrappedComponent) {
  // ...and returns another component...
  return function WithRoleComponent() {
    const auth = useSelector((state) => state.auth);
    // ... and renders the wrapped component with the fresh data!
    // Notice that we pass through any additional props
    return <WrappedComponent user={auth.user} />;
  }
}

export default withRole;