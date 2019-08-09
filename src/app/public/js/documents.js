$(document).ready(function() {
  $("#dataTable").DataTable();
  $("#dataTable_filter").append($("#categaryFilterArea"));
  $(".custom-file-input").on("change", function() {
    let file = this.files[0];
    let fileType = file["type"];
    if (!fileType.match(/.xlsx|.xls|.doc|.docx|.ppt|.pptx|.txt|.pdf/g)) {
      $(this).val("");
      $(this).siblings(".fail-file").removeClass("d-none");
      $(this).siblings(".custom-file-label").removeClass("selected").html("Chọn văn bản");
    } else {
      var fileName = $(this).val().split("\\").pop();
      $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
      $(this).siblings(".fail-file").addClass("d-none");
    }
  });
  $(".delete").click(function() {
    $("#btn-confirm-delete").attr("id-documents", $(this).attr("id-documents"));
  });
  $("#btn-confirm-delete").click(function() {
    var id = $(this).attr("id-documents");
    var reqURL = "/documents/" + id;
    $.ajax({
      url: reqURL,
      type: "DELETE",
      success: function(result) {
        alert("Xóa thành công");
      },
      error: function(err) {
        alert("Xảy ra lỗi, không thể xóa hoạt động này! Xin hãy thử lại sau.");
      },
    });
    location.reload();
  });
});
