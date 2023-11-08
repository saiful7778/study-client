import featureImg from "../assets/img/undraw_book_lover_re_rwjy.svg";

const Feature = () => {
  return (
    <div>
      <div className="text-center mt-20 mb-10">
        <h3 className="text-5xl font-bold">Features</h3>
        <p className="text-gray-600">Our key features</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-20 p-2">
        <div className="w-full pl-4">
          <ol className="list-decimal marker:font-bold marker:text-xl space-y-4">
            <li>
              <h5 className="font-semibold text-xl">
                Collaborative Study Groups
              </h5>
              <p className="text-gray-600">
                Join or create study groups to collaborate with your peers,
                share resources, and discuss topics of interest.
              </p>
            </li>
            <li>
              <h5 className="font-semibold text-xl">
                Create and Manage Assignments
              </h5>
              <p className="text-gray-600">
                Students can effortlessly create new assignment projects, set
                deadlines, and keep track of their progress.
              </p>
            </li>
            <li>
              <h5 className="font-semibold text-xl">User-Friendly Dashboard</h5>
              <p className="text-gray-600">
                Our intuitive dashboard makes it easy to navigate and access all
                the tools you need.
              </p>
            </li>
            <li>
              <h5 className="font-semibold text-xl">Assignment Submission</h5>
              <p className="text-gray-600">
                Submit assignments securely and receive feedback from your
                fellow students or instructors.
              </p>
            </li>
          </ol>
        </div>
        <div className="w-full">
          <figure className="ml-auto max-w-[550px]">
            <img src={featureImg} alt="" />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Feature;
