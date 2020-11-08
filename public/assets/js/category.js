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
});

// 通过事件委托为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function () {
    // 获取要修改分类数据的id
    var id = $(this).attr('data-id');
    // 向服务器端发送ajax请求获取要修改的分类数据
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            // 使用模板引擎展示要修改的分类数据
            var html = template('modifyCategoryTpl', response);
            $('#formBox').html(html);
        }
    })
});

// 为修改分类数据表单发生提交行为时
$('#formBox').on('submit', '#modifyCategory', function() {
    // 获取表单内容
    var formData = $(this).serialize();
    // 获取被修改分类数据的id属性
    var id = $(this).attr('data-id');
    // 调用修改分类数据接口发送修改请求
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function (response) {
            location.reload();
        }
    })
    // 阻止默认提交行为
    return false;
});