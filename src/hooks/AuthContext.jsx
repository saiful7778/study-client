import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthData = createContext(null);

const AuthContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const authInfo = { userData };
  return <AuthData.Provider value={authInfo}>{children}</AuthData.Provider>;
};

AuthContext.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
