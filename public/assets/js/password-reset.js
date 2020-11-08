// 当修改密码表单发生提交行为时
$('#modifyForm').on('submit', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 调用接口实现密码修改功能
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function (response) {
            console.log(1111);
            console.log(response);
            location.href = '/admin/login.html';
        },
        error: function (xhr) {
            var errorMsg = JSON.parse(xhr.responseText).message;
            alert(errorMsg);
        }
    })
    // 阻止默认提交行为
    return false;
})