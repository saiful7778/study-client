const SubmitForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full min-h-screen fixed left-0 top-0 z-[1000] bg-gray-900 opacity-75 pointer-events-none flex justify-center items-center">
      <div className="p-2 rounded bg-white shadow-md">
        <h4 className="text-4xl font-semibold text-center">
          Submit assignment
        </h4>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="input input-bordered input-primary w-full"
            type="url"
            name="pefLink"
            placeholder="PDF link"
            required
          />
          <textarea
            className="textarea textarea-primary w-full"
            name="note"
            placeholder="Assignment notes"
            required
          ></textarea>
          <button className="btn btn-info" type="submit">
            submit assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;
