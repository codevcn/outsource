// init elements
const searchResultList = document.querySelector('#main-section .search-result-list')
const paginationContainer = document.querySelector(
    '#main-section .pagination-wrapper ul.pagination'
)

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

const createSearchResultCards = (posts) => {
    return posts.map((post) => {
        const card = document.createElement('div')
        card.classList.add('search-result-card')
        const cover = document.createElement('img')
        cover.setAttribute('src', post.cover)
        cover.setAttribute('alt', 'Bìa ảnh')
        cover.classList.add('cover-img')
        const file_type_icon_wrapper = document.createElement('div')
        file_type_icon_wrapper.classList.add('file-type-icon-wrapper')
        file_type_icon_wrapper.innerHTML = createIconForTypeOfPost(post.fileType)
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
            'Ngày tải lên: ' + dayjs(post.uploadDate).format('DD/MM/YYYY, HH:mm')

        const post_details = post.details

        const details = document.createElement('div')
        details.classList.add('search-result-details')
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
    for (const card of createSearchResultCards(posts)) {
        searchResultList.appendChild(card)
    }
}

const renderPagination = async (current_page, total_of_posts) => {
    const pre_btn = `<li class="page-item">
                        <p
                            class="page-link"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            data-bs-title="Về trang trước"
                        >
                            <i class="bi bi-caret-left-fill"></i>
                        </p>
                    </li>`

    const next_btn = `<li class="page-item">
                        <p
                            class="page-link"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            data-bs-title="Trang tiếp theo"
                        >
                            <i class="bi bi-caret-right-fill"></i>
                        </p>
                    </li>`

    paginationContainer.innerHTML = `${pre_btn}${createPaginationElement(
        current_page,
        total_of_posts
    )}${next_btn}`
}

const createPaginationElement = (currentPage, totalPages) => {
    // Đảm bảo rằng số trang hiện tại nằm trong phạm vi từ 1 đến totalPages
    const current_page = Math.max(1, Math.min(currentPage, totalPages))

    // Tính toán phạm vi trang để hiển thị
    let startPage, endPage
    if (totalPages <= MAX_NUMBER_OF_PAGINATION_PAGES) {
        // Nếu tổng số trang nhỏ hơn hoặc bằng MAX_NUMBER_OF_PAGINATION_PAGES, hiển thị tất cả các trang
        startPage = 1
        endPage = totalPages
    } else {
        // Nếu tổng số trang lớn hơn MAX_NUMBER_OF_PAGINATION_PAGES, chỉ hiển thị một phần của các trang
        const halfPages = Math.floor(MAX_NUMBER_OF_PAGINATION_PAGES / 2)
        startPage = Math.max(1, current_page - halfPages)
        endPage = Math.min(totalPages, startPage + MAX_NUMBER_OF_PAGINATION_PAGES - 1)
        if (endPage - startPage + 1 < MAX_NUMBER_OF_PAGINATION_PAGES) {
            startPage = endPage - MAX_NUMBER_OF_PAGINATION_PAGES + 1
        }
    }

    // Tạo chuỗi HTML cho pagination
    let paginationHtml = ''
    for (let i = startPage; i <= endPage; i++) {
        if (i === current_page) {
            paginationHtml += `<li class="page-item current"><p class="page-link">${i}</p></li>`
        } else {
            paginationHtml += `<li class="page-item"><p class="page-link">${i}</p></li>`
        }
    }

    return paginationHtml
}
