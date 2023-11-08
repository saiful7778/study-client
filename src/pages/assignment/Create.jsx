const Create = () => {
  return (
    <div className="md:w-4/5 w-full mx-auto bg-white p-4 rounded-md shadow-md border border-gray-300 my-20">
      <h4 className="text-4xl font-bold text-primary text-center mb-4">
        Create new assignment
      </h4>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered input-primary w-full"
            required
          />
          <input
            type="number"
            placeholder="Total marks"
            className="input input-bordered input-primary w-full"
            required
          />
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full"
            accept="image/*"
          />
          <select className="select select-primary w-full">
            <option disabled selected>
              Difficulty level
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Create;
