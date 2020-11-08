// 当添加分类表单提交时
$('#addCategory').on('submit', function () {
    // 获取表单里的值
    var formData = $(this).serialize();
    // 发送请求
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function (response) {
            location.reload()
        },
        error: function (xhr) {
            var errorMsg = JSON.parse(xhr.responseText).message;
            alert(errorMsg);
        }
    })
    // 阻止默认提交行为
    return false;
});

// 向服务器端发送Ajax请求，索要分类页面数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // 将服务器端返回的数据和HMTL模板进行拼接
        var html = template('categoryListTpl', {
            data: response
        });
        // 将拼接好的内容放在页面中
        $('#categoryBox').html(html);
    }
})