const bgSection_userAndDocsInfo = document.querySelector(
    '#main-section .background-section .user-info-and-docs-info'
)
const bgSection_userAvatar = bgSection_userAndDocsInfo.querySelector(
    '.user-info .user-avatar-wrapper'
)
const bgSection_nameOfUser = bgSection_userAndDocsInfo.querySelector('.user-info .name-of-user')
const bgSection_docsInfo = bgSection_userAndDocsInfo.querySelector('.docs-info')

const renderBackgroundSection = (user_profile_data) => {
    const user_avatar_img = document.createElement('img')
    user_avatar_img.classList.add('user-avatar-img')
    user_avatar_img.src = user_profile_data.avatar || '../img/default-user-avatar.svg'
    bgSection_userAvatar.appendChild(user_avatar_img)

    bgSection_nameOfUser.textContent = user_profile_data.displayedName

    const docsInfo = user_profile_data.docsInfo

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

const renderAccountPage = (user_profile_data) => {
    renderBackgroundSection(user_profile_data)
}
