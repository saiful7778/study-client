import PropTypes from "prop-types";
import Data from "./Data";

const SubmittedItem = ({ itemData }) => {
  const { submission, title, level, mark, dueData, _id } = itemData || {};
  const renderSubmission = submission?.map((ele, idx) => {
    const data = { userData: ele, title, level, mark, dueData, _id };
    return <Data key={"sbma" + idx} itemData={data} />;
  });
  return <>{renderSubmission}</>;
};
SubmittedItem.propTypes = {
  itemData: PropTypes.object,
};

export default SubmittedItem;
