<template>
  <div class="box" :style="backgroundDiv">
    <div class="login-box">
      <div class="login-title text-center">
        <h1>
          <small>建筑垃圾全过程实时监测与智能管控云平台</small>
        </h1>
      </div>
      <div class="login-content">
        <div class="form">
          <form id="modifyPassword" class="form-horizontal" action method="post">
            <!-- 用户名输入 -->
            <div class="form-group">
              <div class="col-xs-10 col-xs-offset-1">
                <div class="input-group">
                  <span class="input-group-addon">
                    <span class="glyphicon glyphicon-user"></span>
                  </span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    class="form-control"
                    placeholder="用户名"
                    v-model="namel"
                  >
                  <!-- v-model="user.name" -->
                  <!-- value="20190402" -->
                </div>
              </div>
            </div>

            <!-- 密码输入 -->
            <div class="form-group">
              <div class="col-xs-10 col-xs-offset-1">
                <div class="input-group">
                  <span class="input-group-addon">
                    <span class="glyphicon glyphicon-lock"></span>
                  </span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    placeholder="密码"
                    v-model="pass"
                  >
                  <!-- v-model="user.pass" -->
                  <!-- value="123456" -->
                </div>
              </div>
            </div>

            <!-- 登录重置按钮 -->
            <div class="form-group form-actions">
              <div class="col-xs-12 text-center">
                <button type="button" id="login" class="btn btn-sm btn-success" @click="login">
                  <span class="fa fa-check-circle"></span>登录
                </button>
                <button type="button" id="reset" class="btn btn-sm btn-danger" @click="reset">
                  <span class="fa fa-close"></span> 重置
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index'
export default {
  data() {
    return {
      data1: [],
      backgroundDiv: {
        // src\assets
        backgroundImage: "url(" + require("../Home/img/login.jpg") + ")",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        hight: "",
        weight: ""
      },
      pass: "",
      namel: "",
      flag: true,
      identity: ""
    };
  },
  created() {
    this.hh();
  },
  methods: {
    hh() {
      this.backgroundDiv.height = window.innerHeight + "px";
      this.backgroundDiv.weight = window.innerWeight + "px";
    },

    login() {
      const namel = this.namel.trim();
      const pass = this.pass.trim();
      if (!namel || !pass) {
        alert("姓名或内容不能为空");
        return;
      }
      console.log(this.identity);
      if (this.namel == "") {
        alert("用户名不能为空！");
      } else if (this.pass == "") {
        alert("密码不能为空！");
      } else if (this.pass != "" && this.pass.length < 6) {
        alert("密码不能小于6位！");
      } else if (this.namel != "" && this.pass != "" && this.pass.length >= 6) {
        var url = "/api/user/login";
        var value = "";

        this.$axios({
          method: "post",
          url,
          params: {
            username: this.namel,
            password: this.pass
          }
        }).then(res => {
          let data = res.data.data.token;
          this.$store.commit("set_token", data);
          let usern = res.data.data.role;
          this.$store.commit("set_user", usern);
          let namen = res.data.data.userName;
          this.$store.commit("set_name", namen);
           if (store.state.token){
             var rol = res.data.data.role;
              if (rol == "customer") {
            alert("登录成功！");
            this.$router.push("/home");
          //  this.$router.push("/query");
              // this.$router.push("/mainViewer");
          } else if (rol == "admin,customer") {
            alert("登录成功！");
            this.$router.push("/home");
            // this.$router.push("/mainViewer")
          //  this.$router.push("/query");
            console.log(this.$store.state.namen);
          }            
           } else {
             this.$router.replace('/')
             alert("用户名或密码错误，请重新填写");
           }
        }).catch(err => {
        console.log(err)
      });
        // $.ajax({
        //   url,
        //   data: {
        //     username: this.namel,
        //     password: this.pass
        //   },
        //   type: "POST",
        //   dataType: "json",
        //   async: false,
        //   cache: false,
        //   success: function(res) {
        //     console.log(res);
        //     //  this.data1.push({
        //     //   role :res.data.role,
        //     //   success: res.success
        //     //  })
        //     let data = res.data.token;
        //     // this.$store.commit('set_token', this.data);
        //     console.log(data);
        //     if (res) {
        //       value = res;
        //     }
        //   },
        //   error: function(res) {
        //     //console.log(res);
        //   }
        // });
      
        
        // console.log(result);
        // console.log(this.$store.state.count);
        //console.log(typeof(bool.data)); //一般是在这里拿，要看后端是煮面封装的

        // if (bool == false) {
        //   console.log("error");
        //   alert("用户名错误，请重新填写");
        // } else if (bool == true) {
        //   var rol = result.data.role;
        //   if (rol == "") {
        //     alert("密码错误，请重新输入密码");
        //   } else if (rol == "customer") {
        //     alert("登录成功！");
        //     this.$router.push("/HomeDomestic");
        //   } else if (rol == "admin") {
        //     alert("登录成功！");
        //     this.$router.push("/admin");
        //   }
        // }
      }
      // console.log(data);
      //写登录界面
    },
    reset() {
      //   this.$router.replace("/");
      this.namel = "";
      this.pass = "";
      this.identity = "";
    },
    setTokenToCookie(value) {
      var Days = 1; //此 cookie 将被保存 30 天
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie =
        "my_token =" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getCookie(name) {
      var cookieValue = "啥也没有！！";
      if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
          var cookie = $.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) === name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
  }
};
</script>

<style>
.form {
  background: rgba(255, 255, 255, 0.2);
  width: 400px;
  margin: 120px auto;
}
/*阴影*/
.fa {
  display: inline-block;
  top: 27px;
  left: 6px;
  position: relative;
  color: #ccc;
}
input[type="text"],
input[type="password"] {
  padding-left: 26px;
}
.checkbox {
  padding-left: 21px;
}

.label {
  float: left;
  width: 400px;
  height: auto;
  background: rgba(255, 255, 255, 0.2);
  margin: 5px auto;
  color: white;
}
.form-title {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: "Glyphicons Halflings";
  -webkit-font-smoothing: antialiased;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -moz-osx-font-smoothing: grayscale;
}

.box {
  /* background:  no-repeat center center; */
  /* background-size: cover; */

  margin: 0 auto;
  /* position: relative; */
  /* width: 1437px; */
  /* height: 789px; */
  width: 100%;
  height: 100%;
  /* width: "1437px" */
  /* 定位盒子的背景图片的长宽 */
}

.login-box {
  width: 100%;
  max-width: 630px;
  height: 400px;
  position: absolute;
  top: 50%;

  margin-top: -200px;
  /*设置负值，为要定位子盒子的一半高度*/
}

@media screen and (min-width: 630px) {
  .login-box {
    left: 50%;
    /*设置负值，为要定位子盒子的一半宽度*/
    margin-left: -310px;
  }
}

.form {
  width: 100%;
  max-width: 500px;
  height: 250px;
  margin: 2px auto 0px auto;
}

.login-content {
  /* background:url("../image/03.png") no-repeat center center; */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  height: 250px;
  width: 100%;
  max-width: 630px;
  background-color: rgba(255, 250, 255, 0.6);
  float: left;
}

.input-group {
  margin: 30px 0px 0px 0px !important;
}

.form-control,
.input-group {
  height: 40px;
}

.form-actions {
  margin-top: 18px;
}

.form-group {
  margin-bottom: 0px !important;
}
.radio-group {
  margin-top: 10px;
  margin-left: 45px;
}
.login-title {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 20px 10px;
  background-color: rgba(0, 0, 0, 0.6);
}

.login-title h1 {
  margin-top: 10px !important;
}

.login-title small {
  color: #fff;
}

.link p {
  line-height: 20px;
  margin-top: 30px;
}

.btn-sm {
  padding: 8px 24px !important;
  font-size: 16px !important;
}

.flag {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-weight: bold;
  font: 14px / normal "microsoft yahei", "Times New Roman", "宋体", Times, serif;
}
#login,
#reset {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
