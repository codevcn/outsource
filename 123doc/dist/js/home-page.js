// init elements
const cardsContainer_economy = document.querySelector(
    '#main-section .newest-posts-section .newest-posts-lists .category-list-box.economy-category .category-list'
)
const cardsContainer_science = document.querySelector(
    '#main-section .newest-posts-section .newest-posts-lists .category-list-box.science-category .category-list'
)
const cardsContainer_technical = document.querySelector(
    '#main-section .newest-posts-section .newest-posts-lists .category-list-box.technical-category .category-list'
)
const cardsContainer_enviroment = document.querySelector(
    '#main-section .newest-posts-section .newest-posts-lists .category-list-box.enviroment-category .category-list'
)
const standOutPostsContainer = document.querySelector(
    '#main-section .stand-out-posts-section .stand-out-posts-grid-container'
)

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

const switchToRegister = () => {
    loginDialogSection.classList.add('inactive')
    registerDialogSection.classList.remove('inactive')
}

const switchToLogin = () => {
    registerDialogSection.classList.add('inactive')
    loginDialogSection.classList.remove('inactive')
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

const getCardEleOfStandOutPosts = (posts) => {
    return posts.map((post) => {
        const card = document.createElement('div')
        card.classList.add('grid-item-card')

        const cover = document.createElement('div')
        cover.classList.add('grid-item-cover')
        cover.innerHTML = `
            <div class="icon-wrapper">
                ${getIconForTypeOfPost(post.fileType)}
            </div>
            <div class="cover-img-wrapper">
                <img src="${post.cover}" alt="post cover">
            </div>`

        const title = document.createElement('h3')
        title.setAttribute('data-bs-toggle', 'tooltip')
        title.setAttribute('data-bs-placement', 'bottom')
        title.setAttribute('data-bs-title', post.title)
        title.classList.add('grid-item-title')
        title.textContent = post.title

        const details = document.createElement('div')
        details.classList.add('grid-item-details')
        details.innerHTML = `
            <div class="pages-count-box">
                <i class="bi bi-file-earmark-text-fill"></i>
                <span class="count">${post.pagesCount}</span>
            </div>
            <div class="views-count-box">
                <i class="bi bi-eye-fill"></i>
                <span class="count">${post.viewsCount}</span>
            </div>
            <div class="downloads-count-box">
                <i class="bi bi-download"></i>
                <span class="count">${post.downloadsCount}</span>
            </div>`

        card.appendChild(cover)
        card.appendChild(title)
        card.appendChild(details)

        return card
    })
}

const renderStandOutPosts = (posts) => {
    for (const card of getCardEleOfStandOutPosts(posts)) {
        standOutPostsContainer.appendChild(card)
    }
}

const getIconForTypeOfPost = (type_of_file) => {
    switch (type_of_file) {
        case 'docx':
            return `<i class="bi bi-file-word-fill"></i>`
        case 'ppt':
            return `<i class="bi bi-file-ppt-fill"></i>`
        case 'pdf':
            return `<i class="bi bi-filetype-pdf"></i>`
    }
}

const getCardEleOfNewestPosts = (posts) => {
    return posts.map((post) => {
        const card = document.createElement('div')
        card.classList.add('list-card')

        const icon = document.createElement('div')
        icon.classList.add('list-card-icon')
        icon.innerHTML = getIconForTypeOfPost(post.fileType)

        const title = document.createElement('h3')
        title.setAttribute('data-bs-toggle', 'tooltip')
        title.setAttribute('data-bs-placement', 'bottom')
        title.setAttribute('data-bs-title', post.title)
        title.classList.add('list-card-title')
        title.textContent = post.title

        const details = document.createElement('div')
        details.classList.add('list-card-details')
        details.innerHTML = `
            <div class="pages-count-box">
                <i class="bi bi-file-earmark-text-fill"></i>
                <span class="count">${post.pagesCount}</span>
            </div>
            <div class="views-count-box">
                <i class="bi bi-eye-fill"></i>
                <span class="count">${post.viewsCount}</span>
            </div>
            <div class="downloads-count-box">
                <i class="bi bi-download"></i>
                <span class="count">${post.downloadsCount}</span>
            </div>`

        const title_and_details = document.createElement('div')
        title_and_details.classList.add('title-and-details')
        title_and_details.appendChild(title)
        title_and_details.appendChild(details)

        card.appendChild(icon)
        card.appendChild(title_and_details)

        return card
    })
}

const renderNewestPosts_economy = (posts) => {
    for (const card of getCardEleOfNewestPosts(posts)) {
        cardsContainer_economy.appendChild(card)
    }
}

const renderNewestPosts_science = (posts) => {
    for (const card of getCardEleOfNewestPosts(posts)) {
        cardsContainer_science.appendChild(card)
    }
}

const renderNewestPosts_technical = (posts) => {
    for (const card of getCardEleOfNewestPosts(posts)) {
        cardsContainer_technical.appendChild(card)
    }
}

const renderNewestPosts_enviroment = (posts) => {
    for (const card of getCardEleOfNewestPosts(posts)) {
        cardsContainer_enviroment.appendChild(card)
    }
}
