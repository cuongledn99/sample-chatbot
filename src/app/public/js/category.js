var selectId = "";
$(document).ready(function() {
  $("#dataTable").DataTable();
});

function seleteId(id) {
  selectId = id;
}

function deleteCategory() {
  $.ajax({
    url: `/categories/${selectId}`,
    method: "DELETE",
    success: (data) => {
      window.location.reload();
    }
  })
}

function showCreateForm() {       
    $("#Title_Edit").val('');
    $('#editModal .modal-title').html('Tạo nhóm thông báo mới');
    $("#updateForm").attr("action", "/categories");
    $('#buttonForm').text("Tạo mới")
}

function loadDataToModal(id) {
  selectId = id;
  $.ajax({
    url: `/categories/${id}`,
    method: "GET",
    success: res => {
      $("#Title_Edit").val(res.data.title);
      $("#updateForm").attr("action", "/categories/" + selectId);
      $('#buttonForm').text("Chỉnh sửa")
      $('#editModal .modal-title').html('Chỉnh sửa nhóm thông báo');
    }
  });
}