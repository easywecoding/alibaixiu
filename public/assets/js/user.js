// 当表单发生提交行为时
$('#userForm').on('submit', function () {
    // 获取用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            // 刷新页面
            location.reload();
        },
        error: function () {
            alert('用户添加失败');
        }
    })
    // 组织表单的默认提交行为
    return false;
})

// 当用户选择文件时
$('#modifyBox').on('change', '#avatar', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 不要解析请求参数
        processData: false,
        // 不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
})

// 获取用户列表
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        // 使用模板引擎将数据和HTML字符串拼接
        var html = template('userTpl', {
            data: response
        });
        // 将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
})

// 通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
    // 获取被点击用户的id
    var id = $(this).attr('data-id');
    // 根据id获取用户的详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })
});

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改用户的id值
    var id = $(this).attr('data-id');
    // 发送请求 修改用户信息
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            // 修改成功重新加载页面
            location.reload();
        }
    })
    // 阻止表单默认提交
    return false;
})
