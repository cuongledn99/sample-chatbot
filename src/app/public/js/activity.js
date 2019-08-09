// Call the dataTables jQuery plugin
$(document).ready(function () {
  $("#dataTable").DataTable();
});

//handle delete
$(".delete").click(function () {
  $("#btn-confirm-delete").attr(
    "id-activity",
    $(this).attr("id-activity")
  );
});

$("#btn-confirm-delete").click(function () {
  var id = $(this).attr("id-activity");
  var reqURL = "activities/api/" + id;
  $.ajax({
    url: reqURL,
    type: "DELETE",
    success: function (result) {
      alert("Xóa thành công");
    },
    error: function (err) {
      alert("Xảy ra lỗi, không thể xóa hoạt động này! Xin hãy thử lại sau.")
    }
  });
  location.reload();
});

$(".summernote-add-description").summernote({
  placeholder: "Nhập mô tả ..."
});

//handle view detail
$(".detail").on('click', function (e) {
  e.preventDefault();
  var id = $(this).attr("id-activity");
  var reqURL = "activities/api/" + id;
  $.get(reqURL, function (data, status) {
    var name = data.name;
    var description = data.description;

    var createdDate = new Date(data.createdDate);
    var createdDateStr = createdDate.getDate() + '/'
    + (createdDate.getMonth() + 1) + '/'
    + createdDate.getFullYear() + ', '
    + createdDate.getHours() % 12 + ' : '
    + createdDate.getMinutes()
    + (createdDate.getHours() > 12 ? 'PM' : 'AM');

    var updatedDate = new Date(data.updatedDate);
    var updatedDateStr = updatedDate.getDate() + '/'
      + (updatedDate.getMonth() + 1) + '/'
      + updatedDate.getFullYear() + ', '
      + updatedDate.getHours() % 12 + ' : '
      + updatedDate.getMinutes()
      + (updatedDate.getHours() > 12 ? 'PM' : 'AM');

    var createdBy = data.createdBy;
    var updatedBy = data.updatedBy;

    $("#detail-modal-name").text(name);
    $("#detail-modal-createdBy").text(createdBy.username);
    $("#detail-modal-createdDate").text(createdDateStr);
    $("#detail-modal-updatedBy").text(updatedBy.username);
    $("#detail-modal-updatedDate").text(updatedDateStr);
    $("#detail-modal-description").html(description);
    $("#modal-detail").modal();
  });
});

//handle update
$(".edit").click(function () {
  var id = $(this).attr("id-activity");
  var a = document.createElement("a");
  a.href = "activities/edit/" + id;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

//handle export qr code
$(".qrcode").click(function () {
  var id = $(this).attr("id-activity");
  var reqURL = "activities/api/qrcode/" + id;
  console.log(reqURL);
  var btn = $(this);
  $.ajax({
    type: 'GET',
    url: reqURL,
    success: function (data) {
      var a = document.createElement("a");
      a.href = document.location.origin + data.data;
      a.target = "blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    error: function (err) {
      alert('Xảy ra lỗi, không thể tạo QRCode, xin hãy th')
    }
  });
});