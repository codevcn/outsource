// init elements
const searchResultList = document.querySelector('#main-section .search-result-list')

const renderSearchResultText = () => {
    const url = 'http://localhost:8080/search/ngoại+ngữ?search=123vcn'

    // Tách đường dẫn thành các phần bằng "/"
    const parts = url.split('/')

    // Lấy phần tử sau "/search/"
    let searchTerm = parts[parts.indexOf('search') + 1]

    // Nếu giá trị của searchTerm có dấu "?", loại bỏ phần query string
    if (searchTerm.includes('?')) {
        searchTerm = searchTerm.split('?')[0]
    }
    document.querySelector('#main-section .search-result-text').innerHTML = `
        Kết quả với từ khóa <span class="result-keyword">"${searchTerm}"</span>`
}

const getSearchResultCards = (posts) => {
    return posts.map((post) => {
        const card = document.createElement('div')
        card.classList.add('search-result-card')
        const cover = document.createElement('img')
        cover.setAttribute('src', post.cover)
        cover.setAttribute('alt', 'Bìa ảnh')
        cover.classList.add('cover-img')
        const file_type_icon_wrapper = document.createElement('div')
        file_type_icon_wrapper.classList.add('file-type-icon-wrapper')
        file_type_icon_wrapper.innerHTML = getIconForTypeOfPost(post.fileType)
        const cover_wrapper = document.createElement('div')
        cover_wrapper.classList.add('cover-img-wrapper')
        cover_wrapper.appendChild(cover)
        cover_wrapper.appendChild(file_type_icon_wrapper)

        const title = document.createElement('h2')
        title.setAttribute('data-bs-toggle', 'tooltip')
        title.setAttribute('data-bs-placement', 'bottom')
        title.setAttribute('data-bs-title', post.title)
        title.classList.add('search-result-title')
        title.textContent = post.title
        const description = document.createElement('p')
        description.classList.add('search-result-description')
        description.textContent = post.description
        const uploadDate = document.createElement('p')
        uploadDate.classList.add('search-result-upload-date')
        uploadDate.textContent =
            'Ngày tải lên: ' + dayjs(post.updateDate).format('DD/MM/YYYY, HH:mm')
        const details = document.createElement('div')
        details.classList.add('search-result-details')
        details.innerHTML = `
            <div class="pages-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số trang của tài liệu">
                <i class="bi bi-file-earmark-text-fill"></i>
                <span class="count">${post.pagesCount}</span>
            </div>
            <div class="views-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số lượt xem tài liệu">
                <i class="bi bi-eye-fill"></i>
                <span class="count">${post.viewsCount}</span>
            </div>
            <div class="downloads-count-box" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Số lượt tải tài liệu xuống">
                <i class="bi bi-download"></i>
                <span class="count">${post.downloadsCount}</span>
            </div>`

        const card_info = document.createElement('div')
        card_info.classList.add('search-result-card-info')
        card_info.appendChild(title)
        card_info.appendChild(description)
        card_info.appendChild(uploadDate)
        card_info.appendChild(details)

        card.appendChild(cover_wrapper)
        card.appendChild(card_info)

        return card
    })
}

const renderSearchResultList = (posts) => {
    for (const card of getSearchResultCards(posts)) {
        searchResultList.appendChild(card)
    }
}
