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

const createCardEleOfStandOutPosts = (posts) => {
    return posts.map((post) => {
        const card = document.createElement('div')
        card.classList.add('grid-item-card')

        const cover = document.createElement('div')
        cover.classList.add('grid-item-cover')
        cover.innerHTML = `
            <div class="icon-wrapper">
                ${createIconForTypeOfPost(post.fileType)}
            </div>
            <div class="cover-img-wrapper">
                <img src="${post.cover}" alt="post cover">
            </div>`

        const title = document.createElement('a')
        title.setAttribute('data-bs-toggle', 'tooltip')
        title.setAttribute('data-bs-placement', 'bottom')
        title.setAttribute('data-bs-title', post.title)
        title.classList.add('grid-item-title')
        title.textContent = post.title

        const details = document.createElement('div')
        details.classList.add('grid-item-details')
        details.innerHTML = `
            <div class="pages-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số trang của tài liệu">
                <i class="bi bi-file-earmark-text-fill"></i>
                <span class="count">${formatCount(post.pagesCount)}</span>
            </div>
            <div class="views-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số lượt xem tài liệu">
                <i class="bi bi-eye-fill"></i>
                <span class="count">${formatCount(post.viewsCount)}</span>
            </div>
            <div class="downloads-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số lượt tải tài liệu xuống">
                <i class="bi bi-download"></i>
                <span class="count">${formatCount(post.downloadsCount)}</span>
            </div>`

        card.appendChild(cover)
        card.appendChild(title)
        card.appendChild(details)

        return card
    })
}

const renderStandOutPosts = (posts) => {
    for (const card of createCardEleOfStandOutPosts(posts)) {
        standOutPostsContainer.appendChild(card)
    }
}

const createCardEleOfNewestPosts = (posts) => {
    return posts.map((post) => {
        const card = document.createElement('div')
        card.classList.add('list-card')

        const icon = document.createElement('div')
        icon.classList.add('list-card-icon')
        icon.innerHTML = createIconForTypeOfPost(post.fileType)

        const title = document.createElement('h3')
        title.setAttribute('data-bs-toggle', 'tooltip')
        title.setAttribute('data-bs-placement', 'bottom')
        title.setAttribute('data-bs-title', post.title)
        title.classList.add('list-card-title')
        title.textContent = post.title

        const details = document.createElement('div')
        details.classList.add('list-card-details')
        details.innerHTML = `
            <div class="pages-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số trang của tài liệu">
                <i class="bi bi-file-earmark-text-fill"></i>
                <span class="count">${formatCount(post.pagesCount)}</span>
            </div>
            <div class="views-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số lượt xem tài liệu">
                <i class="bi bi-eye-fill"></i>
                <span class="count">${formatCount(post.viewsCount)}</span>
            </div>
            <div class="downloads-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số lượt tải tài liệu xuống">
                <i class="bi bi-download"></i>
                <span class="count">${formatCount(post.downloadsCount)}</span>
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
    for (const card of createCardEleOfNewestPosts(posts)) {
        cardsContainer_economy.appendChild(card)
    }
}

const renderNewestPosts_science = (posts) => {
    for (const card of createCardEleOfNewestPosts(posts)) {
        cardsContainer_science.appendChild(card)
    }
}

const renderNewestPosts_technical = (posts) => {
    for (const card of createCardEleOfNewestPosts(posts)) {
        cardsContainer_technical.appendChild(card)
    }
}

const renderNewestPosts_enviroment = (posts) => {
    for (const card of createCardEleOfNewestPosts(posts)) {
        cardsContainer_enviroment.appendChild(card)
    }
}
