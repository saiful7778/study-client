import spinner from "../assets/img/Animation - 1699411161636.gif";

const Loader = () => {
  return (
    <div className="w-full min-h-[50vh] flex justify-center items-center">
      <img className="w-20" src={spinner} alt="loading spinner" />
    </div>
  );
};

export default Loader;
