$(document).ready(function () {
  $("#dataTable").DataTable();

  $('.btn-edit').on('click', function (e) {
    e.preventDefault();
    // get all td item in current row
    let row = $(this).parent().siblings();
    let name = row[1].innerHTML;
    let description = row[2].innerHTML;
    let id = $(this).data().id;
    editExam(id, name, description);
  });

  $(".btn-change-status").on('click', function(e) {
    e.preventDefault();
    let id = $(this).data().id;
    let status = $(this).data().status;
    let reqURL = `/questions/exams/${id}/status/${status}/change-status`;
    let currentButton = $(this);

    $.ajax({
      type: "PUT",
      url: reqURL,
      success: function(res) {
        if (status === true) {
          $(currentButton).data().status = false;
          $(currentButton).html("Ngừng thi");
        } else if (status === false) {
          $(currentButton).data().status = true;
          $(currentButton).html("Cho phép thi");
        }
      },
      err: function(err) {
        alert("Xảy ra lỗi không thể thay đổi trạng thái bộ đề" + JSON.stringify(err))
      }
    });    
  });

});

function showDeleteConfirmModal(id) {
  $('#btnDeleteConfirm').on('click', function (e) {
    e.preventDefault();
    deleteExams(id);
  });
  $("#deleteModal").modal();
}

function deleteExams(id) {
  $.ajax({
    method: "DELETE",
    url: `/questions/exams/${id}`,
    success: function () { window.location.reload(); },
    error: function () { alert('Xảy ra lỗi, không thể xóa bộ câu hỏi này, xin hãy thử lại sau'); }
  })

}

function editExam(id, name, description) {
  $("#txtId").val(id);
  $("#txtName").val(name);
  $("#txtDescription").val(description);
  $("#editModal").modal();
}