const showData = (inputData) => {
  return `
      <div class="text-left text-sm">
        <div><span class="font-semibold">PDF link:</span> ${inputData.pdfLink}</div>
        <div><span class="font-semibold">Status:</span> ${inputData.status}</div>
        <p><span class="font-semibold">Note:</span> ${inputData.note}</p>
      </div>
    `;
};
export default showData;
