$(document).ready(function() {
  $("#dataTable").DataTable();
});

function viewQuestion(id) {
  $.ajax({
    method: "GET",
    url: `/questions/${id}`,
    success: (data) => {            
      if (data.data.questionType == "TEXT") {
        $('#viewText').modal('toggle');
        let viewTextFormAction= $('#urlPostEdit').data().action + id;
        $('#viewTextForm').attr('action',viewTextFormAction);
        $('#questionText_view').val(data.data.question)
        data.data.answers.map((item, index) => {
          $(`#view_answerQuestionText_${index + 1}`).val(item.text);
          if (item._id == data.data.correctAnswer._id) {
            $(`#view_answerText_${index + 1}`).attr('checked', 'checked');
          }
        })
      }
      else if(data.data.questionType=='VIDEO'){
        $('#viewVideo').modal('toggle');
        let viewVideoFormAction= $('#urlPostEdit').data().action + id;
        $('#viewVideoForm').attr('action',viewVideoFormAction);
        $('#questionVideo_view').val(data.data.question)
        data.data.answers.map((item, index) => {
          $(`#view_answerQuestionVideo_${index + 1}`).val(item.text);
          if (item._id == data.data.correctAnswer._id) {
            $(`#view_answerVideo_${index + 1}`).attr('checked', 'checked');
          }
        })
      }
      else if(data.data.questionType=='IMAGE'){
        $('#viewImage').modal('toggle');
        let viewImageFormAction= $('#urlPostEdit').data().action + id;
        $('#viewImageForm').attr('action',viewImageFormAction);
        console.log($('#viewImageForm').attr('action'))
        data.data.answers.map((item, index) => {
          console.log("TCL: viewQuestion -> item", item)
          $(`#view_answerQuestionImage_${index + 1}`).val(item.text);
          if (item._id == data.data.correctAnswer._id) {
            $(`#view_answerImage_${index + 1}`).attr('checked', 'checked');
          }
        })
      }
      // console.log(data)
    }
  })
}

function showDeleteConfirmModal(examId, itemId) {
  $('#btnDeleteConfirm').on('click', function(e) {
    e.preventDefault();
    deleteQuestion(examId, itemId);
  });
  $("#deleteModal").modal();
}

function deleteQuestion(examsId, questionsId) {
  $.ajax({
    method: "DELETE",
    url: `/questions/exams/${examsId}/questions/${questionsId}`,
    success: (data) => {
    }
  })
  window.location.reload();
}

$(".custom-file-input").on("change", function () {
  let file = this.files[0];
  let fileType = file['type'];
  if (!fileType.match(/^image\/.*?$/g)) {
    $(this).val('');
    $(this).siblings('.fail-file').removeClass('d-none');
    $(this).siblings(".custom-file-label").removeClass("selected").html('Chọn hình ảnh');
  } else {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    $(this).siblings('.fail-file').addClass('d-none');
  }
});