<template>
  <div id="login">
    <div class="container">
      <div class="avatar">
        <img src="@/assets/avatar.jpg" alt="" />
      </div>
      <!-- 登录 -->
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [{ required: true, message: '请输入手机号!' }],
              },
            ]"
            placeholder="请输入手机号"
          >
            <a-icon
              slot="prefix"
              type="phone"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入密码!' }],
              },
            ]"
            type="password"
            placeholder="请输入密码"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            记住我
          </a-checkbox>
          <a class="login-form-forgot" href=""> 忘记密码</a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登录
          </a-button>
          或
          <a href=""> 注册新的! </a>
        </a-form-item>
      </a-form>

      <!-- 注册 -->
    </div>
  </div>
</template>
<script>
import { getLogin } from "@/api/getLogin";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "normal_login" }),
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        const data = getLogin(err, values);
        // if (!data.code == 200) return;
        this.$Message.success({
          content: "登录成功",
          duration: 1.5,
        });
        this.$router.push("/home");
        this.$store.commit("USER_UID", data.account.id);
        // this.USER_UID(data.account.id);
        localStorage.setItem("token", data.token);
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: deepskyblue;
  .avatar {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 2px solid greenyellow;
    }
  }
  .container {
    position: relative;
    display: flex;
    align-items: center;
    width: 700px;
    height: 500px;
    border-radius: 10px;
    background-color: rgb(175, 255, 182);
    #components-form-demo-normal-login {
      width: 80%;
      margin: 0 auto;
      .login-form {
        max-width: 300px;
      }
      .login-form-forgot {
        float: right;
      }
      .login-form-button {
        width: 100%;
      }
    }
  }
}
</style>
