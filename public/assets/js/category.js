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

// 通过事件委托为删除按钮添加点击事件
$('#categoryBox').on('click', '.delete', function () {
    if(confirm('您确定要执行删除操作吗？')) {
        // 获取被删除分类数据的id
        var id = $(this).attr('data-id');
        // 调用接口发送删除请求
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (response) {
                location.reload();
            }
        })
    }
});

// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');

// 为全选复选框添加onchange事件
selectAll.on('change', function () {
    var selectStatus = $(this).prop('checked');
    if (selectStatus) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
    $('#categoryBox').find('input').prop('checked', selectStatus);
});

// 当分类数据前面的复选框状态发生改变时
$('#categoryBox').on('change', '.categoryStatus', function () {
    var inputs = $('#categoryBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
    }
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});

// 为批量删除按钮添加点击事件
deleteMany.on('click', function () {
    var ids = [];
    // 获取选中的用户
    var checkedUser = $('#categoryBox').find('input').filter(':checked');
    // 循环复选框 从复选框元素上获得data-id属性的值
    checkedUser.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });
    
    if(confirm('您确认进行批量删除操作吗？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + ids.join('-'),
            success: function () {
                location.reload();
            }
        })
    }
});