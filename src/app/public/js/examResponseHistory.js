$("#dataTable").dataTable();
$(document).ready(function() {

  $("#dataTable_filter").prepend($("#slWardFilterArea"));

  $(".btn-detail-res").on('click', function(e) {
    e.preventDefault();
    let id = $(this).data().id;
    let reqURL = `/questions/exam-response/${id}`;
    $.ajax({
      type: 'GET',
      url: reqURL,
      success: function(res) {
        $("#detailContent").html(res);
        $("#modal-detail").modal();
      },
      error: function(res) {
        alert("Xảy ra lỗi, không thể xem chi tiết")
      }
    });
  });

  $("#slWardFilter").on('change', function() {
    let id = $(this).data().id;
    let wardIđ = $(this).val();
    let url = "/questions/exams/" + id + "/exams-response-history?w=" + wardIđ;
    window.location = url;
  });
});