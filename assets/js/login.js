(function () {
  //提示信息
  function getmsage(res) {
    layer.msg(
      res.message,
      {
        icon: 1,
        time: 1000, //2秒关闭（如果不配置，默认是3秒）
      },
      function () {
        //do something
      }
    );
  }
  //1.登录注册切换
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#links").on("click", function () {
    $(this).parents(".reg-box").hide().siblings().show();
  });
  //2.书写表单验证规则
  layui.form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var password = $(".reg-box [name=password]").val();
      if (value !== password) {
        return "两次输入的密码不一致";
      }
    },
  });
  //3.实现表单注册功能
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    var data = {
      username: $(".reg-box [name=username]").val().trim(),
      password: $(".reg-box [name=password]").val().trim(),
    };
    console.log(data);
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data,
      success: function (res) {
        if (status == 0) {
          getmsage(res);
        }
        $("#links").click();
      },
    });
  });
  // 4.登录功能的实现
  $("#form-login").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $.ajax({
      type: "post",
      url: "/api/login",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        getmsage(res);
        console.log(res.token);
        localStorage.setItem("token", res.token);
        //跳转到后台主页
        location.href = "/index.html";
      },
    });
  });
  //5.
})();
