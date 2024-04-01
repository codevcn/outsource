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
    '#main-section .navigation-and-profile .profile-section'
)
const profileSection_displayedNameEditor = profileSection.querySelector(
    '.profile-box .profile-item.displayed-name .profile-item-editor'
)
const profileSection_personalInfoEditor = profileSection.querySelector(
    '.profile-box .profile-item.personal-info .profile-item-editor'
)
const profileSection_accountEmailEditor = profileSection.querySelector(
    '.profile-box .profile-item.account-email .profile-item-editor'
)
const profileSection_linkedAccountList = profileSection.querySelector(
    '.profile-box .profile-item.linked-account .linked-accounts-list'
)
const profileSection_linkedAccountOAuth = profileSection.querySelector(
    '.profile-box .profile-item.linked-account .linked-account-oauth'
)
const personalInfo_genderPicker = profileSection_personalInfoEditor.querySelectorAll(
    '.profile-box .profile-item-editor .card-editor .card-editor-form-group.gender .dropdown-menu .dropdown-item'
)
const profileSection_passwordCardEditor = profileSection.querySelector(
    '.profile-box .profile-item.password .profile-item-editor .card-editor'
)
const loginHistorySection = profileSection.querySelector('.profile-box .profile-item.login-history')
const deleteAccountBtn = profileSection.querySelector('.profile-box .delete-account button')

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

const updateDisplayedName = async (new_dispayed_name) => {
    // call api
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

const setDisplayedNameWarningMessage = (message) => {
    profileSection_displayedNameEditor.querySelector(
        '.card-editor .input-container .message'
    ).innerHTML = message
        ? `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${message}</span>`
        : ''
}

const updateDisplayedNameDone = (result) => {
    if (result instanceof Error) {
        setDisplayedNameWarningMessage(result.message)
    } else {
        setDisplayedNameWarningMessage(null)
        renderDisplayedName({ displayedName: result.displayedName })
        bgSection_nameOfUser.textContent = result.displayedName
    }
}

const validateUpdateDisplayedName = (new_dispayed_name) => {
    if (!new_dispayed_name) {
        setDisplayedNameWarningMessage('Bạn chưa nhập tên!')
    } else {
        setDisplayedNameWarningMessage(null)
    }
}

const updateDisplayedNameHandler = async () => {
    const new_dispayed_name = profileSection_displayedNameEditor.querySelector(
        '.card-editor .input-container input'
    ).value

    if (!validateUpdateDisplayedName(new_dispayed_name)) {
        const editor = profileSection_displayedNameEditor.querySelector(
            '.card-editor .actions .action-save'
        )

        editor.classList.toggle('inactive')
        editor.innerHTML = `
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`

        try {
            await updateDisplayedName(new_dispayed_name)
            updateDisplayedNameDone({ displayedName: new_dispayed_name })
            toast.success({ message: 'Đã cập nhật thông tin thành công!' })
        } catch (error) {
            updateDisplayedNameDone(error)
        }

        editor.classList.toggle('inactive')
        editor.innerHTML = 'Lưu'
    }
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
    // call api
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
        const editor_action_save = profileSection_personalInfoEditor.querySelector(
            '.card-editor .actions .action-save'
        )
        editor_action_save.classList.toggle('inactive')
        editor_action_save.innerHTML = `
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

        editor_action_save.classList.toggle('inactive')
        editor_action_save.innerHTML = 'Lưu'
    }
}

const renderAccountEmail = (user_profile_data) => {
    profileSection_accountEmailEditor.querySelector(
        '.profile-item-value'
    ).innerHTML = `<span className="value">${user_profile_data.accountEmail}</span>`
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

const setPasswordWarningMessage_type = (message) => {
    profileSection_passwordCardEditor.querySelector(
        '.card-editor-form-group.type-password .input-container .message'
    ).innerHTML = message
        ? `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${message}</span>`
        : ''
}

const setPasswordWarningMessage_retype = (message) => {
    profileSection_passwordCardEditor.querySelector(
        '.card-editor-form-group.retype-password .input-container .message'
    ).innerHTML = message
        ? `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${message}</span>`
        : ''
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
    if (password !== retypePassword) {
        setPasswordWarningMessage_retype('Mật khẩu nhập lại không khớp!')
        is_valid = false
    }
    return is_valid
}

const updatePassword = async ({ password }) => {
    // call api
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

const updatePasswordDone = (result) => {
    if (result instanceof Error) {
        setPasswordWarningMessage_type('Có lỗi gì đó!!!')
        setPasswordWarningMessage_retype('Có lỗi gì đó!!!')
    } else {
        setPasswordWarningMessage_type(null)
        setPasswordWarningMessage_retype(null)
    }
}

const updatePasswordHandler = async () => {
    const password = profileSection_passwordCardEditor.querySelector(
        '.card-editor-form-group.type-password .input-container input'
    ).value
    const retypePassword = profileSection_passwordCardEditor.querySelector(
        '.card-editor-form-group.retype-password .input-container input'
    ).value

    if (validateUpdatePassword({ password, retypePassword })) {
        const editor_action_save =
            profileSection_passwordCardEditor.querySelector('.actions .action-save')
        editor_action_save.classList.toggle('inactive')
        editor_action_save.innerHTML = `
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`

        try {
            await updatePassword({ password })
            toast.success({ message: 'Cập nhật mật khẩu của bạn thành công!' })
            updatePasswordDone(null)
        } catch (error) {
            updatePasswordDone(error)
        }

        editor_action_save.classList.toggle('inactive')
        editor_action_save.innerHTML = 'Cập nhật'
    }
}

const setUpdateEmailWarningMessage = (message) => {
    profileSection_accountEmailEditor.querySelector(
        '.card-editor .card-editor-form-group.update-email .message'
    ).innerHTML = message
        ? `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${message}</span>`
        : ''
}

const validateUpdateEmail = (email) => {
    let is_valid = true
    if (!email) {
        setUpdateEmailWarningMessage('Bạn chưa nhập email mới!')
        is_valid = false
    } else {
        setUpdateEmailWarningMessage(null)
    }
    const email_regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/

    if (email && !email_regex.test(email)) {
        setUpdateEmailWarningMessage('Vui lòng nhập đúng định dạng email!')
        is_valid = false
    }

    return is_valid
}

const updateEmailDone = (result) => {
    if (result instanceof Error) {
        setUpdateEmailWarningMessage('Có lỗi gì đó!!!')
    } else {
        setUpdateEmailWarningMessage(null)

        renderAccountEmail({ accountEmail: result.email })
    }
}

const updateEmail = async (email) => {
    // call api
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

const updateEmailHandler = async () => {
    const email = profileSection_accountEmailEditor.querySelector(
        '.card-editor .card-editor-form-group.update-email .input-container input'
    ).value

    if (validateUpdateEmail(email)) {
        const editor_action_save = profileSection_accountEmailEditor.querySelector(
            '.card-editor .actions .action-save'
        )
        editor_action_save.classList.toggle('inactive')
        editor_action_save.innerHTML = `
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`

        try {
            await updateEmail()
            toast.success({ message: 'Cập nhật email của bạn thành công!' })
            updateEmailDone({ email })
        } catch (error) {
            updateEmailDone(error)
        }

        editor_action_save.classList.toggle('inactive')
        editor_action_save.innerHTML = 'Cập nhật'
    }
}

const fetchLoginHistory = async () => {
    // call api
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (dayjs().second() % 2 === 0) {
                resolve(loginHistory_data)
            } else {
                reject(new Error('Có lỗi gì đó!'))
            }
        }, 500)
    })
}

const setLoginHistoryWarningMessage = (message) => {
    loginHistorySection.querySelector('.notify-text').innerHTML = message
        ? `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="warning-text">${message}</span>`
        : ''
}

const renderLoginHistoryItem = (history) => {
    const historyIcon = document.createElement('img')
    historyIcon.src = '../img/history-item-icon.svg'
    historyIcon.classList.add('history-item-icon-img')

    const device = document.createElement('p')
    device.classList.add('history-item-detail-device')
    device.textContent = history.device

    const message = document.createElement('p')
    message.classList.add('history-item-detail-message')
    message.textContent = history.message || 'Đăng nhập bằng ' + history.type

    const location = document.createElement('p')
    location.classList.add('history-item-detail-location')
    location.textContent = `${history.location} - ${dayjs(history.date).format('DD/MM/YYYY HH:mm')}`

    const historyDetail = document.createElement('div')
    historyDetail.classList.add('history-item-detail')

    historyDetail.appendChild(device)
    historyDetail.appendChild(message)
    historyDetail.appendChild(location)

    const historyItem = document.createElement('div')
    historyItem.classList.add('history-item')

    historyItem.appendChild(historyIcon)
    historyItem.appendChild(historyDetail)

    return historyItem
}

const renderLoginHistory = async (loginHistoryData) => {
    const statics_lists_container = loginHistorySection.querySelector('.statics-lists-container')
    statics_lists_container.classList.add('shown-statics-lists')

    const logged_in_history = statics_lists_container.querySelector(
        '.statics-lists .statics-list-box.logged-in-history .statics-list'
    )

    const linking_accounts_history = statics_lists_container.querySelector(
        '.statics-lists .statics-list-box.linking-accounts-history .statics-list'
    )

    for (const history of loginHistoryData.loggedInHistory) {
        logged_in_history.appendChild(renderLoginHistoryItem(history))
    }

    for (const history of loginHistoryData.linkingAccountsHistory) {
        linking_accounts_history.appendChild(renderLoginHistoryItem(history))
    }
}

const showLoginHistory = async () => {
    const statics_lists_container = loginHistorySection.querySelector('.statics-lists-container')

    if (statics_lists_container.classList.contains('shown-statics-lists')) {
        statics_lists_container.classList.remove('shown-statics-lists')
        statics_lists_container.querySelector(
            '.statics-list-box.logged-in-history .statics-list'
        ).innerHTML = ''
        statics_lists_container.querySelector(
            '.statics-list-box.linking-accounts-history .statics-list'
        ).innerHTML = ''
        loginHistorySection.querySelector(
            '.profile-item-title-container .profile-item-edit span'
        ).textContent = 'Xem'
        return
    }

    const show_btn = loginHistorySection.querySelector('.profile-item-title-container')
    show_btn.classList.toggle('inactive')
    let loginHistoryData
    try {
        loginHistoryData = await fetchLoginHistory()
        renderLoginHistory(loginHistoryData)
        setLoginHistoryWarningMessage(null)
        loginHistorySection.querySelector(
            '.profile-item-title-container .profile-item-edit span'
        ).textContent = 'Đóng'
    } catch (error) {
        setLoginHistoryWarningMessage(error.message)
    }
    show_btn.classList.toggle('inactive')
}

const deleteAccount = async () => {
    // call api
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (dayjs().second() % 2 === 0) {
                resolve({ success: true })
            } else {
                reject(new Error('Có lỗi gì đó!'))
            }
        }, 500)
    })
}

const deleteAccountHandler = () => {
    toast.confirm(
        {
            message: 'Hành động này không thể hoàn tác.',
            title: 'Bạn xác nhận sẽ xóa tài khoản?',
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xác nhận xóa',
        },
        async () => {
            deleteAccountBtn.innerHTML = `
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>`
            deleteAccountBtn.classList.toggle('inactive')

            try {
                await deleteAccount()
            } catch (error) {
                toast.error({ message: error.message })
            }

            deleteAccountBtn.innerHTML = `
                <i class="bi bi-trash3"></i>
                <span>Xóa tài khoản 123doc</span>`
            deleteAccountBtn.classList.toggle('inactive')
        }
    )
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
