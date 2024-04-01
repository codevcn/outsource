const bgSection_userAndDocsInfo = document.querySelector(
    '#main-section .background-section .user-info-and-docs-info'
)
const bgSection_userAvatar = bgSection_userAndDocsInfo.querySelector(
    '.user-info .user-avatar-wrapper'
)
const bgSection_nameOfUser = bgSection_userAndDocsInfo.querySelector(
    '.user-info .displayed-name-of-user'
)
const bgSection_docsInfo = bgSection_userAndDocsInfo.querySelector('.docs-info')
const profileSection = document.querySelector(
    '#main-section .navigation-and-profile .profile-section .profile-box'
)
const profileSection_displayedNameEditor = profileSection.querySelector(
    '.profile-item.displayed-name .profile-item-editor'
)
const profileSection_personalInfoEditor = profileSection.querySelector(
    '.profile-item.personal-info .profile-item-editor'
)
const profileSection_accountEmailEditor = profileSection.querySelector(
    '.profile-item.account-email .profile-item-editor'
)
const profileSection_linkedAccountList = profileSection.querySelector(
    '.profile-item.linked-account .linked-accounts-list'
)
const profileSection_linkedAccountOAuth = profileSection.querySelector(
    '.profile-item.linked-account .linked-account-oauth'
)
const personalInfo_genderPicker = profileSection_personalInfoEditor.querySelectorAll(
    '.profile-item-editor .card-editor .card-editor-form-group.gender .dropdown-menu .dropdown-item'
)
const profileSection_passwordCardEditor = profileSection.querySelector(
    '.profile-item.displayed-name .profile-item-editor .card-editor'
)

const renderBackgroundSection = (docsInfo) => {
    const user_avatar_img = document.createElement('img')
    user_avatar_img.classList.add('user-avatar-img')
    user_avatar_img.src = user_profile_data.avatar || '../img/default-user-avatar.svg'
    bgSection_userAvatar.appendChild(user_avatar_img)

    bgSection_nameOfUser.textContent = user_profile_data.displayedName

    bgSection_docsInfo.querySelector('.views-count .count-value').textContent = formatCount(
        docsInfo.viewsCount
    )
    bgSection_docsInfo.querySelector('.docs-count .count-value').textContent = formatCount(
        docsInfo.docsCount
    )
    bgSection_docsInfo.querySelector('.downloads-count .count-value').textContent = formatCount(
        docsInfo.downloadsCount
    )
}

const renderDisplayedName = (user_profile_data) => {
    profileSection_displayedNameEditor.querySelector(
        '.profile-item-value'
    ).innerHTML = `<span className="value">${user_profile_data.displayedName}</span>`
    profileSection_displayedNameEditor.querySelector('.card-editor .input-container input').value =
        user_profile_data.displayedName
}

const updateDisplayedNameDone = (result) => {
    if (result instanceof Error) {
        profileSection_displayedNameEditor.querySelector(
            '.card-editor .input-container .message'
        ).innerHTML = `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${result.message}</span>`
    } else {
        profileSection_displayedNameEditor.querySelector(
            '.card-editor .input-container .message'
        ).innerHTML = ''

        renderDisplayedName({ displayedName: result.displayedName })

        bgSection_nameOfUser.textContent = result.displayedName
    }
}

const updateDisplayedName = async (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (dayjs().second() % 2 === 0) {
                resolve({ success: true })
            } else {
                reject(new Error('Có lỗi gì đó'))
            }
        }, 500)
    })
}

const updateDisplayedNameHandler = async () => {
    const value = profileSection_displayedNameEditor.querySelector(
        '.card-editor .input-container input'
    ).value

    if (!value) {
        updateDisplayedNameDone(new Error('Bạn chưa nhập tên!'))
        return
    }

    const editor = profileSection_displayedNameEditor.querySelector(
        '.card-editor .actions .action-save'
    )

    editor.classList.toggle('inactive')
    editor.innerHTML = `
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`

    try {
        await updateDisplayedName(value)
        updateDisplayedNameDone({ displayedName: value })
        toast.success({ message: 'Đã cập nhật thông tin thành công!' })
    } catch (error) {
        updateDisplayedNameDone(error)
    }

    editor.classList.toggle('inactive')
    editor.innerHTML = 'Lưu'
}

const openCloseInfoEditor = (target) => {
    const parentEle = target.closest('.profile-item')
    parentEle
        .querySelector('.profile-item-editor .profile-item-value')
        ?.classList.toggle('inactive')
    parentEle.querySelector('.profile-item-editor .card-editor')?.classList.toggle('inactive')
}

const renderPersonalInfo = (personalInfo) => {
    profileSection_personalInfoEditor.querySelector(
        '.profile-item-value .date-of-birth .value'
    ).innerHTML = personalInfo.dateOfBirth || `<span class="value-unset">Chưa được đặt</span>`
    profileSection_personalInfoEditor.querySelector(
        '.profile-item-value .gender .value'
    ).innerHTML = personalInfo.gender || `<span class="value-unset">Chưa được đặt</span>`
    profileSection_personalInfoEditor.querySelector(
        '.profile-item-value .address .value'
    ).innerHTML = personalInfo.address || `<span class="value-unset">Chưa được đặt</span>`

    flatpickr('.flatpickr-date-picker', { dateFormat: 'd-m-Y' })
}
const onPickGender_personalInfo = () => {
    for (const gender_item of personalInfo_genderPicker) {
        gender_item.addEventListener('click', function (e) {
            const target = e.target
            const button = target
                .closest('.card-editor-form-group')
                .querySelector('.dropdown button')
            button.querySelector('p').textContent = target.textContent
            button.setAttribute('data-gender-picked', target.getAttribute('data-gender-value'))
        })
    }
}

const setPersonalInfoWarningMessage_dateOfBirth = (message) => {
    profileSection_personalInfoEditor.querySelector(
        '.card-editor .card-editor-form-group.date-of-birth .input-container .message'
    ).innerHTML = message
        ? `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${message}</span>`
        : ''
}
const setPersonalInfoWarningMessage_gender = (message) => {
    profileSection_personalInfoEditor.querySelector(
        '.card-editor .card-editor-form-group.gender .gender-dropdown .message'
    ).innerHTML = message
        ? `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${message}</span>`
        : ''
}
const setPersonalInfoWarningMessage_address = (message) => {
    profileSection_personalInfoEditor.querySelector(
        '.card-editor .card-editor-form-group.address .input-container .message'
    ).innerHTML = message
        ? `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${message}</span>`
        : ''
}

const validateUpdatePersonalInfo = ({ dateOfBirth, gender, address }) => {
    let is_valid = true
    if (!dateOfBirth) {
        setPersonalInfoWarningMessage_dateOfBirth('Bạn chưa nhập ngày sinh!')
        is_valid = false
    } else {
        setPersonalInfoWarningMessage_dateOfBirth(null)
    }
    if (!gender) {
        setPersonalInfoWarningMessage_gender('Bạn chưa chọn một giá trị!')
        is_valid = false
    } else {
        setPersonalInfoWarningMessage_gender(null)
    }
    if (!address) {
        setPersonalInfoWarningMessage_address('Bạn chưa nhập địa chỉ!')
        is_valid = false
    } else {
        setPersonalInfoWarningMessage_address(null)
    }
    return is_valid
}

const updatePersonalInfoDone = (result) => {
    if (result instanceof Error) {
        setPersonalInfoWarningMessage_dateOfBirth('Có lỗi gì đó!!!')
        setPersonalInfoWarningMessage_gender('Có lỗi gì đó!!!')
        setPersonalInfoWarningMessage_address('Có lỗi gì đó!!!')
    } else {
        const { dateOfBirth, gender, address } = result
        setPersonalInfoWarningMessage_dateOfBirth(null)
        setPersonalInfoWarningMessage_gender(null)
        setPersonalInfoWarningMessage_address(null)

        renderPersonalInfo({ dateOfBirth, gender, address })
    }
}

const updatePersonalInfo = async ({ dateOfBirth, gender, address }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (dayjs().second() % 2 === 0) {
                resolve({ success: true })
            } else {
                reject(new Error('Có lỗi gì đó!!!'))
            }
        }, 500)
    })
}

const updatePersonalInfoHandler = async () => {
    const dateOfBirth = profileSection_personalInfoEditor.querySelector(
        '.card-editor .card-editor-form-group.date-of-birth .input-container input'
    ).value
    const gender = profileSection_personalInfoEditor
        .querySelector('.card-editor .card-editor-form-group.gender .gender-dropdown button')
        .getAttribute('data-gender-picked')
    const address = profileSection_personalInfoEditor.querySelector(
        '.card-editor .card-editor-form-group.address .input-container input'
    ).value

    if (validateUpdatePersonalInfo({ dateOfBirth, gender, address })) {
        const editor = profileSection_personalInfoEditor.querySelector(
            '.card-editor .actions .action-save'
        )
        editor.classList.toggle('inactive')
        editor.innerHTML = `
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`

        try {
            await updatePersonalInfo({ dateOfBirth, gender, address })
            updatePersonalInfoDone({ dateOfBirth, gender, address })
            toast.success({ message: 'Cập nhật thông tin cá nhân của bạn thành công!' })
        } catch (error) {
            updatePersonalInfoDone(error)
        }

        editor.classList.toggle('inactive')
        editor.innerHTML = 'Lưu'
    }
}

const renderAccountEmail = (user_profile_data) => {
    const value = document.createElement('span')
    value.classList.add('value')
    value.textContent = user_profile_data.accountEmail

    profileSection_accountEmailEditor.querySelector('.profile-item-value').appendChild(value)
}

const renderLinkedAccounts = (linkedAccounts) => {
    const { google, facebook, zalo } = linkedAccounts

    if (google) {
        profileSection_linkedAccountList.querySelector(
            '.linked-account-item.google .account'
        ).textContent = google.email
        profileSection_linkedAccountOAuth
            .querySelector('.oauth-options .oauth-option.google')
            .classList.add('inactive')
    } else {
        profileSection_linkedAccountList
            .querySelector('.linked-account-item.google')
            .classList.add('inactive')
    }

    if (facebook) {
        profileSection_linkedAccountList.querySelector(
            '.linked-account-item.facebook .account'
        ).textContent = facebook.email
        profileSection_linkedAccountOAuth
            .querySelector('.oauth-options .oauth-option.facebook')
            .classList.add('inactive')
    } else {
        profileSection_linkedAccountList
            .querySelector('.linked-account-item.facebook')
            .classList.add('inactive')
    }

    if (zalo) {
        profileSection_linkedAccountList.querySelector(
            '.linked-account-item.zalo .account'
        ).textContent = zalo.email
        profileSection_linkedAccountOAuth
            .querySelector('.oauth-options .oauth-option.zalo')
            .classList.add('inactive')
    } else {
        profileSection_linkedAccountList
            .querySelector('.linked-account-item.zalo')
            .classList.add('inactive')
    }
}

const hideShowPassword_cardEditor = (target, is_shown) => {
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

const setPasswordWarningMessage_type = () => {
    // :MARK >>>continue
}

const setPasswordWarningMessage_retype = () => {
    // :MARK >>>continue
}

const validateUpdatePassword = ({ password, retypePassword }) => {
    let is_valid = true
    if (!password) {
        setPasswordWarningMessage_type('Bạn chưa nhập mật khẩu!')
        is_valid = false
    } else {
        setPasswordWarningMessage_type(null)
    }
    if (!retypePassword) {
        setPasswordWarningMessage_retype('Bạn chưa nhập lại mật khẩu!')
        is_valid = false
    } else {
        setPasswordWarningMessage_retype(null)
    }
    return is_valid
}

const updatePasswordHandler = () => {
    const password = profileSection_passwordCardEditor.querySelector(
        '.card-editor-form-group.type-password .input-container input'
    ).value
    const retypePassword = profileSection_passwordCardEditor.querySelector(
        '.card-editor-form-group.retype-password .input-container input'
    ).value

    if (validateUpdatePassword({ password, retypePassword })) {
        // :MARK >>>continue
    }
}

const renderProfileSection = (user_profile_data) => {
    renderDisplayedName(user_profile_data)
    renderPersonalInfo(user_profile_data.personalInfo)
    renderAccountEmail(user_profile_data)
    renderLinkedAccounts(user_profile_data.linkedAccounts)
    onPickGender_personalInfo()
}

const renderAccountPage = (user_profile_data) => {
    renderBackgroundSection(user_profile_data.docsInfo)
    renderProfileSection(user_profile_data)
}
