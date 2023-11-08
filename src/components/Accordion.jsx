import PropTypes from "prop-types";
import { useState } from "react";

const Accordion = ({ children }) => {
  return <div className="join join-vertical w-full">{children}</div>;
};

Accordion.propTypes = {
  children: PropTypes.node,
};

const AccordionItem = ({ children, id }) => {
  const [showAccordion, setShowAccordion] = useState(false);
  return (
    <div className="collapse collapse-arrow join-item border border-gray-300">
      <input
        type="radio"
        name={id}
        checked={showAccordion}
        onChange={(e) => setShowAccordion(e.target.checked)}
      />
      {children}
    </div>
  );
};

AccordionItem.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};

const AccordionItemHeader = ({ children }) => {
  return <div className="collapse-title text-xl font-medium">{children}</div>;
};

AccordionItemHeader.propTypes = {
  children: PropTypes.string,
};

const AccordionItemContent = ({ children }) => {
  return <div className="collapse-content">{children}</div>;
};

AccordionItemContent.propTypes = {
  children: PropTypes.node,
};

export default Accordion;
export { AccordionItem, AccordionItemHeader, AccordionItemContent };
