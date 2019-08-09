$(document).ready(function() {
  $("#dataTable").DataTable();
});
$(".delete").click(function() {
  $("#btn-confirm-delete").attr("id-todo", $(this).attr("id-todo"));
});
$(".delete-task").click(function() {
  $("#btn-confirm-delete-task").attr("id-todo", $(this).attr("id-todo"));
  $("#btn-confirm-delete-task").attr("id-task", $(this).attr("id-task"));
});
$("#btn-confirm-delete").click(function() {
  var id = $(this).attr("id-todo");
  var reqURL = "/todo-list/" + id;
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

$("#btn-confirm-delete-task").click(function() {
  var id = $(this).attr("id-todo");
  var task = $(this).attr("id-task");
  var reqURL = "/todo-list/" + id + "/" + task;
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
})

function viewTask(id, taskId) {
    $.ajax({
        url: "/todo-list/" + id + "/" + taskId,
        type: "GET",
        success: function(result) {
            const { tasks } = result.data
            var deadline = new Date(tasks[0].deadline).toISOString().split('T')[0];

            $("#edit-title").val(tasks[0].title)
            $("#edit-description").val(tasks[0].description)
            $("#edit-assignTo").val(tasks[0].assignTo)
            $('#edit-deadline').val(deadline)
            $('#edit-form').attr('action', `/todo-list/${id}/${taskId}/edit`)
        }
    })
}

function deleteTask(id, taskId) {
  console.log(id, taskId)
  $.ajax({
    url: "/todo-list/" + id + "/" + taskId,
    type: "DELETE",
  })
}