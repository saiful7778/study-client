import Swal from "sweetalert2";

const sweetAlert = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-sm btn-primary m-2",
    cancelButton: "btn btn-sm btn-primary btn-outline m-2",
  },
  buttonsStyling: false,
});
export default sweetAlert;
