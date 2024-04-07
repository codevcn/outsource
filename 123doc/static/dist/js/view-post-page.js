// init elements
const post_section = document.querySelector('#main-section .post-section')
const postTitle = post_section.querySelector('.post-title-box')
const postDetails = post_section.querySelector('.post-details-box')
const topAction_userAvatar = post_section.querySelector(
    '.post-top-actions-box .user-action .user-avatar-wrapper'
)
const topAction_nameOfUser = post_section.querySelector(
    '.post-top-actions-box .user-action .action-box .name-of-user'
)
const topAction_downloadsCount = post_section.querySelector(
    '.post-top-actions-box .post-action .download .downloads-count-wrapper .downloads-count-value'
)
const topAction_purchaseAmount = post_section.querySelector(
    '.post-top-actions-box .post-action .purchase .purchase-amount'
)
const slidesBox = post_section.querySelector('.post-sildes-box')
const bottomAction_downloadBtnBox = post_section.querySelector(
    '.post-bottom-actions-box .action-box .post-bottom-action.download'
)
const bottomAction_actionText = post_section.querySelector('.post-bottom-actions-box .action-text')
const postDescriptionContainer = post_section.querySelector(
    '.post-description-box .description-and-details'
)
const extensionBar = document.querySelector('#extension-bar')
const extensionBar_currentViewedSlidePage = extensionBar.querySelector('.current-viewed-slide-page')
const extensionBar_downloadBox = extensionBar.querySelector('.download-box')
const extensionBar_currentViewedSlidePage_input =
    extensionBar_currentViewedSlidePage.querySelector('input')

const renderTitle = (post) => {
    const title = document.createElement('h2')
    title.classList.add('post-tile')
    title.textContent = post.title

    const fileTypeWrapper = document.createElement('div')
    fileTypeWrapper.classList.add('file-type-wrapper')
    fileTypeWrapper.innerHTML = createIconForTypeOfPost(post.fileType)

    postTitle.appendChild(title)
    postTitle.appendChild(fileTypeWrapper)
}

const renderDetails = (post) => {
    const details = document.createElement('div')
    details.classList.add('post-details')

    const post_details = post.details

    details.innerHTML = `
            <div class="pages-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số trang của tài liệu">
                <i class="bi bi-file-earmark-text-fill"></i>
                <span class="count">${formatCount(post_details.pagesCount)}</span>
            </div>
            <div class="views-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số lượt xem tài liệu">
                <i class="bi bi-eye-fill"></i>
                <span class="count">${formatCount(post_details.viewsCount)}</span>
            </div>
            <div class="downloads-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số lượt tải tài liệu xuống">
                <i class="bi bi-download"></i>
                <span class="count">${formatCount(post_details.downloadsCount)}</span>
            </div>`

    postDetails.appendChild(details)
}

const renderTopActions = (post, user) => {
    const user_avatar_img = document.createElement('img')
    user_avatar_img.src = user.avatar || '../img/default-user-avatar.svg'
    topAction_userAvatar.appendChild(user_avatar_img)
    topAction_nameOfUser.textContent = user.name
    topAction_downloadsCount.textContent = post.details.downloadsCount
    topAction_purchaseAmount.textContent = formatNumberWithDot(post.price.value) + 'đ'
}

const renderSlides = (slides) => {
    const slidesCount = slides.length
    for (let i = 0; i < slidesCount; i++) {
        const slideContainer = document.createElement('div')
        slideContainer.classList.add('post-slide-container')
        slideContainer.classList.add(`post-slide-container-number-${i + 1}`)

        slideContainer.textContent = 'Trang số ' + (i + 1)

        slidesBox.appendChild(slideContainer)
    }
}

const renderBottomActions = (post) => {
    bottomAction_downloadBtnBox.querySelector('.download-btn').innerHTML = `
        <span>TẢI XUỐNG</span>
        <span class="price">(${formatNumberWithDot(post.price.value)}đ - ${
        post.details.pagesCount
    } trang)</span>`
    bottomAction_downloadBtnBox.querySelector('.downloads-count').innerHTML =
        post.details.downloadsCount

    if (post.price) {
        bottomAction_actionText.textContent =
            'Tài liệu hạn chế xem trước, để xem đầy đủ mời bạn chọn "Tải xuống"'
    }
}

const renderPostDescriptionAndDetails = (post) => {
    postDescriptionContainer.querySelector('.post-description').textContent =
        post.description + post.description + post.description

    postDescriptionContainer.querySelector('.post-details').innerHTML = `
        <div class="upload-date">${
            'Ngày đăng: ' + dayjs(post.uploadDate).format('DD/MM/YYYY, HH:mm')
        }</div>`
}

const renderExtensionBar = (post) => {
    extensionBar_downloadBox.querySelector('.download-btn').innerHTML = `
        <span>TẢI XUỐNG</span>
        <span class="price">(${formatNumberWithDot(post.price.value)}đ - ${
        post.details.pagesCount
    } trang)</span>`
    extensionBar_downloadBox.querySelector('.downloads-count').innerHTML =
        post.details.downloadsCount

    const currentSlidePageInput = document.createElement('input')
    currentSlidePageInput.setAttribute('data-bs-toggle', 'tooltip')
    currentSlidePageInput.setAttribute('data-bs-title', 'Nhập số trang cần xem')
    const totalPage = document.createElement('div')
    totalPage.classList.add('total-page')
    totalPage.textContent = `/ ${post.details.pagesCount} trang`

    extensionBar_currentViewedSlidePage.appendChild(currentSlidePageInput)
    extensionBar_currentViewedSlidePage.appendChild(totalPage)
}

const setCurrentViewedSildePage = (page) => {
    extensionBar_currentViewedSlidePage.querySelector('input').value = page
}

const displayCurrentViewedSildePage = async () => {
    // Lấy chiều cao của cửa sổ trình duyệt
    const windowHeight = window.innerHeight
    // Lấy vị trí cuộn hiện tại của trình duyệt
    const scrollTop = window.scrollY || window.scrollY || document.documentElement.scrollTop
    // Tính vị trí giữa của cửa sổ trình duyệt
    const middlePosition = scrollTop + windowHeight / 2

    const slides = document.querySelectorAll('.post-slide-container') // Thay 'slide' bằng selector của div của bạn

    // Lặp qua từng slide
    const slidesCount = slides.length
    let slide
    for (let i = 0; i < slidesCount; i++) {
        slide = slides[i]
        // Lấy vị trí Y của slide so với phần trên của trang
        const divOffsetTop = slide.offsetTop

        // Kiểm tra xem vị trí giữa của màn hình trình duyệt có nằm trong khoảng của slide hay không
        if (middlePosition >= divOffsetTop && middlePosition < divOffsetTop + slide.clientHeight) {
            setCurrentViewedSildePage(i + 1) // set số thứ tự của slide (bắt đầu từ 1)
            return
        }
    }

    setCurrentViewedSildePage('') // nếu không có slide nào nằm trong vùng giữa của trình duyệt
}

const createJumpToSlidePageEvent = () => {
    extensionBar_currentViewedSlidePage.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const input_value = e.target.value
            if (/^[0-9]+$/.test(input_value)) {
                const slides = document.querySelectorAll('.post-slide-container')
                const slidesCount = slides.length
                if (input_value * 1 > slidesCount) return
                slidesBox
                    .querySelector('.post-slide-container-number-' + e.target.value)
                    .scrollIntoView({ behavior: 'instant' })
            }
        }
    })
}

const renderMainSection = (post_data) => {
    const post = post_data.post
    const user = post_data.user
    renderTitle(post)
    renderDetails(post)
    renderTopActions(post, user)
    renderSlides([1, 2, 3])
    renderBottomActions(post)
    renderPostDescriptionAndDetails(post)
    renderExtensionBar(post)
}
