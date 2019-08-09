
// Call the dataTables jQuery plugin
$(document).ready(function () {
  $("#dataTable").DataTable();
  $('#dataTable_filter').append($('#categaryFilterArea'));

  $('#sl_wards').multiselect({
    buttonWidth: '100%',
    buttonClass: 'form-control text-left',
    includeSelectAllOption: true,
    selectAllValue: 'all',
    selectAllText: 'Tất cả đơn vị',
    allSelectedText: 'Tất cả đơn vị',
    nonSelectedText: 'Chọn đơn vị'
  });

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

  $('#slFilter').on('change', function () {
    if ($(this).val() === '') {
      window.location = '/news';
      return;
    }
    window.location = '/news?c=' + $(this).val();
  });

  $('#frmCreateNewCategory').on('submit', function (e) {
    e.preventDefault();
    let title = $('#txtCategoryTitle').val();
    let type = 'ajax';
    $.ajax({
      url: '/categories',
      type: 'POST',
      data: { title, type },
      success: function (res) {
        let append = `<option value="${res.data._id}">${res.data.title}</option>`
        $('#slNewCategory').append(append);
        $('#slNewCategory').children().each((index, item) => {
          if (item.value === res.data._id) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        })
      },
      error: function (err) {
        alert('Xảy ra lỗi, không thể tạo nhóm hoạt động mới');
      }
    });
    $('#createNewCategory').modal('hide');
  });
});


function seleteId(id) {
  selectId = id;
}
function deleteNews() {
  $.ajax({
    url: `/news/api/${selectId}`,
    method: "DELETE",
    success: (data) => {
      window.location.reload();
    }
  })
}
function showNews(id) {
  selectId = id;
  $.ajax({
    url: `/news/api/${id}`,
    method: "GET",
    success: (res) => {
      $('#newsImg').attr('src', '');
      $('#newsImg').attr('src', res.data.imageLink);
      $('#newsTitle').text(`${res.data.title} - ${res.data.category.title}`);
      $('#newsContent').text(res.data.content);
      $('#newsShortDescription').text(res.data.shortDescription);
    }
  })
}
function loadDataToModal(id) {
  selectId = id;
  $.ajax({
    url: `/news/api/${id}`,
    method: "GET",
    success: function (res) {
      console.log(res.data);
      $("#title").val(res.data.title);
      $("#shortDescription_update").val(res.data.shortDescription);
      $("#content_update").val(res.data.content);
      $("#news_id").val(selectId);
      $("#updateForm").attr("action", "/news/update/" + selectId);
      $("#slCategories").children().each(function (index, item) {
        if (item.value === res.data.category._id) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
    }
  });
}