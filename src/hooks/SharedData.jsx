import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const ContextData = createContext(null);

const SharedData = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal((prop) => !prop);
  };
  const allData = { showModal, handleShowModal };
  return (
    <ContextData.Provider value={allData}>{children}</ContextData.Provider>
  );
};

SharedData.propTypes = {
  children: PropTypes.node,
};

export default SharedData;
