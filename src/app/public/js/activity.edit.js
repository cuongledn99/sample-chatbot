
//load data to input fields
var id = $('#btn-submit').attr('id-activity');
var reqURL = '/activities/api/' + id;

$.get(reqURL, function (data, status) {
  $('#txtbox-name').val(data.name);
  $('.summernote-add-description').summernote('code', data.description);
})

$('.summernote-add-description').summernote({
  height: 300,
  focus: true,
  placeholder: 'Nhập mô tả ...'
});

$('#btn-submit').click(function () {
  var name = $('#txtbox-name').val();
  if (name === '') {
    $('#txtNameError').removeClass('d-none');
    return;
  }

  var description = $('.summernote-add-description').summernote('code');

  $.ajax({
    url: reqURL,
    type: 'PUT',
    data: { name, description },
    success: function (data) {
      alert('Cập nhật thành công');
      window.location.replace('/activities');
    },
    error: function () {
      alert('Xảy ra lỗi, không thể cập nhật thông tin cho hoạt động này!');
    }
  })

});