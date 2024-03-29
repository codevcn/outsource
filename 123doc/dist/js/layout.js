// register elements
const registerDialogSection = document.querySelector(
    '#login-register-dialog .modal-dialog .modal-content.modal-content-register'
)
const formRegister = registerDialogSection.querySelector('.modal-body .form-register')
const formRegister_fullNameInput = formRegister.querySelector(
    '.form-group.full-name .input-wrapper input'
)
const formRegister_fullNameMessage = formRegister.querySelector('.form-group.full-name .message')
const formRegister_phoneNumbderInput = formRegister.querySelector(
    '.form-group.phone-number .input-wrapper input'
)
const formRegister_phoneNumbderMessage = formRegister.querySelector(
    '.form-group.phone-number .message'
)
const formRegister_emailInput = formRegister.querySelector('.form-group.email .input-wrapper input')
const formRegister_emailMessage = formRegister.querySelector('.form-group.email .message')
const formRegister_passwordInput = formRegister.querySelector(
    '.form-group.password .input-wrapper input'
)
const formRegister_passwordMessage = formRegister.querySelector('.form-group.password .message')
const formRegister_retypePasswordInput = formRegister.querySelector(
    '.form-group.retype-password .input-wrapper input'
)
const formRegister_retypePasswordMessage = formRegister.querySelector(
    '.form-group.retype-password .message'
)
const formRegister_submitBtn = formRegister.querySelector('.submit-btn')

// login elements
const loginDialogSection = document.querySelector(
    '#login-register-dialog .modal-dialog .modal-content.modal-content-login'
)
const formLogin = loginDialogSection.querySelector('.modal-body .form-login')
const formLogin_message = formLogin.querySelector('.message')
const formLogin_submitBtn = formLogin.querySelector('.submit-btn')

const switchToRegister = () => {
    loginDialogSection.classList.add('inactive')
    registerDialogSection.classList.remove('inactive')
}

const switchToLogin = () => {
    registerDialogSection.classList.add('inactive')
    loginDialogSection.classList.remove('inactive')
}

const hideShowPassword = (target, is_shown) => {
    const password_input = target.parentElement.querySelector('input')
    if (is_shown) {
        password_input.type = 'text'
        target.classList.add('inactive')
        target.nextElementSibling.classList.remove('inactive')
    } else {
        password_input.type = 'password'
        target.classList.add('inactive')
        target.previousElementSibling.classList.remove('inactive')
    }
}

const register = async () => {
    formRegister_submitBtn.innerHTML = `
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`

    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Thông tin đăng ký không đúng!'))
            }, 500)
        })
        formRegister_submitBtn.innerHTML = `Đăng ký`
    } catch (error) {
        formRegister_submitBtn.innerHTML = `Đăng ký`
    }
}

const validateRegisterForm = async () => {
    const fullName = formRegister_fullNameInput.value
    const phoneNumber = formRegister_phoneNumbderInput.value
    const email = formRegister_emailInput.value
    const password = formRegister_passwordInput.value
    const retypePassword = formRegister_retypePasswordInput.value

    let is_value = true

    if (!fullName || true) {
        is_value = false
        formRegister_fullNameMessage.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${'Có lỗi gì đó...'}</span>`
    }
    if (!phoneNumber || true) {
        is_value = false
        formRegister_phoneNumbderMessage.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${'Có lỗi gì đó...'}</span>`
    }
    if (!email || true) {
        is_value = false
        formRegister_emailMessage.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${'Có lỗi gì đó...'}</span>`
    }
    if (!password || true) {
        is_value = false
        formRegister_passwordMessage.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${'Có lỗi gì đó...'}</span>`
    }
    if (!retypePassword || true) {
        is_value = false
        formRegister_retypePasswordMessage.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${'Có lỗi gì đó...'}</span>`
    }
    if (!is_value) {
        throw new Error()
    }
}

const submitRegisterForm = () => {
    validateRegisterForm().then(() => {
        register()
    })
    return false
}

const loginFail = (error) => {
    formLogin_message.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill"></i>
        <span class="warning-text">${error.message}</span>`
}

const login = async () => {
    formLogin_submitBtn.innerHTML = `
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`

    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Thông tin đăng nhập không đúng!'))
            }, 500)
        })
        formLogin_submitBtn.innerHTML = `Đăng nhập`
    } catch (error) {
        loginFail(error)
        formLogin_submitBtn.innerHTML = `Đăng nhập`
    }
}

const submitLoginForm = () => {
    login()
    return false
}
