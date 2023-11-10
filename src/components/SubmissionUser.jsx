import PropTypes from "prop-types";

const SubmissionUser = ({ itemData }) => {
  const { userName, userProfile } = itemData || {};
  return (
    <div className="z-20 flex items-center m-2">
      {userProfile && (
        <img
          className="w-8 h-8 rounded-full m-2 ring-2 ring-primary ring-offset-2 object-cover object-center"
          src={userProfile}
          alt="admin profile"
        />
      )}
      <span className="bg-white rounded-sm px-1 text-sm font-medium shadow">
        {userName}
      </span>
    </div>
  );
};

SubmissionUser.propTypes = {
  itemData: PropTypes.object,
};

export default SubmissionUser;
