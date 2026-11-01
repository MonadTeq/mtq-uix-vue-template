<script lang="ts" setup>
import type { LoginRequestData } from "./apis/type"
import ThemeSwitch from "@/features/theme"
import { Button } from "@/shared/ui"
import { message } from "@/shared/lib"
import { useSettingsStore } from "@/entities/settings"
import { useUserStore } from "@/entities/user"
import { getCaptchaApi, loginApi } from "./apis"
import Owl from "./components/Owl.vue"
import { useFocus } from "./composables/useFocus"

const route = useRoute()

const router = useRouter()

const userStore = useUserStore()

const settingsStore = useSettingsStore()

const { isFocus, handleBlur, handleFocus } = useFocus()

/** Login button loading */
const loading = ref(false)

/** Captcha image URL */
const codeUrl = ref("")

/** Login form data */
const loginFormData: LoginRequestData = reactive({
  username: "admin",
  password: "12345678",
  code: ""
})

/** Validate the login form; returns an error message or an empty string */
function validate() {
  if (!loginFormData.username.trim()) return "Please enter username"
  if (!loginFormData.password) return "Please enter password"
  if (loginFormData.password.length < 8 || loginFormData.password.length > 16) return "Length must be 8 to 16 characters"
  if (!loginFormData.code.trim()) return "Please enter captcha"
  return ""
}

/** Log in */
function handleLogin() {
  const error = validate()
  if (error) {
    message.error(error)
    return
  }
  loading.value = true
  loginApi(loginFormData).then(({ data }) => {
    userStore.setToken(data.token)
    router.push(route.query.redirect ? decodeURIComponent(route.query.redirect as string) : "/")
  }).catch(() => {
    createCode()
    loginFormData.password = ""
  }).finally(() => {
    loading.value = false
  })
}

/** Create the captcha */
function createCode() {
  loginFormData.code = ""
  codeUrl.value = ""
  getCaptchaApi().then((res) => {
    codeUrl.value = res.data
  })
}

// Initialize the captcha
createCode()
</script>

<template>
  <div class="login-container">
    <ThemeSwitch v-if="settingsStore.showThemeSwitch" class="theme-switch" />
    <Owl :close-eyes="isFocus" />
    <div class="login-card">
      <div class="title">
        <img src="@/shared/assets/images/layouts/logo-text-2.png">
      </div>
      <div class="content">
        <form class="login-form" @keyup.enter="handleLogin" @submit.prevent="handleLogin">
          <div class="field">
            <span class="field-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
            <input v-model.trim="loginFormData.username" placeholder="Username" type="text" tabindex="1" class="field-input">
          </div>
          <div class="field">
            <span class="field-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </span>
            <input
              v-model.trim="loginFormData.password"
              placeholder="Password"
              type="password"
              tabindex="2"
              class="field-input"
              @blur="handleBlur"
              @focus="handleFocus"
            >
          </div>
          <div class="field">
            <span class="field-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path fill="currentColor" d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
            </span>
            <input
              v-model.trim="loginFormData.code"
              placeholder="Captcha"
              type="text"
              tabindex="3"
              maxlength="7"
              class="field-input"
              @blur="handleBlur"
              @focus="handleFocus"
            >
            <img :src="codeUrl" class="captcha" draggable="false" @click="createCode">
          </div>
          <Button :loading="loading" class="login-btn" @click="handleLogin">
            Login
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px var(--color-border-default);
    background-color: var(--color-surface-default);
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      .login-form {
        .field {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-md);
          margin-bottom: 16px;
          padding: 0 12px;
          .field-icon {
            display: flex;
            align-items: center;
            color: var(--color-text-secondary);
            margin-right: 8px;
          }
          .field-input {
            flex: 1;
            padding: 12px 0;
            border: none;
            background: transparent;
            color: var(--color-text-primary);
            font-size: var(--font-size-md);
            &:focus {
              outline: none;
            }
          }
          .captcha {
            width: 100px;
            height: 40px;
            cursor: pointer;
            user-select: none;
          }
        }
        .login-btn {
          width: 100%;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
