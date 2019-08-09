 //load input fields
 $('.summernote-add-description').summernote({
  placeholder: 'Nhập mô tả ...',
  height: 200
});

//handle insert        
$('#btn-submit').click(function () {
  var name = $('#txtbox-name').val();
  var description = $('.summernote-add-description').summernote('code');
  if(name == '') {
      $("#txtNameError").removeClass('d-none');
      return;
  }
  $.ajax({
      url: '/activities/api',
      type: 'POST',
      data: {name, description},
      success: function() {
          alert("Thêm thành công");
          $('.summernote-add-description').summernote('destroy');
          window.location.replace('/activities');
      },
      error: function() {
          alert("Xảy ra lỗi, không thể tạo hoạt động.")
      }
  });        
});