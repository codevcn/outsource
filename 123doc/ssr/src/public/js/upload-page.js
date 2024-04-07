const uploadDocSection = document.querySelector('#main-section .upload-doc-section')
const uploadDocInput = uploadDocSection.querySelector('.upload-doc-input')
const uploadDocHelperTextBox = uploadDocSection.querySelector('.helper-text-box')
const filesUploadedSection = document.querySelector('#main-section .files-uploaded-section')
const fileUploadedProgress = filesUploadedSection.querySelector('.file-uploaded-progress')
const filesUploaded = document.querySelector('#main-section .files-uploaded')

const createProgressBar = ({ fileName, fileLoaded, fileSize }) => {
    fileUploadedProgress.innerHTML = `
        <div class="upload-progress-content">
            <div class="upload-progress-details">
                <div style="display: flex; align-items: center; column-gap: 5px;">
                    ${
                        fileSize
                            ? `
                            <i class="bi bi-check-circle-fill"></i>
                            <div class="details">
                                <span class="name">${fileName} • Đã tải lên</span>
                                <span class="size">${fileSize}</span>
                            </div>`
                            : `
                            <i class="bi bi-cloud-arrow-up-fill"></i>
                            <span class="upload-progress-name">${fileName} • Đang tải lên</span>`
                    }
                </div>
                <span class="upload-progress-percent">${fileLoaded}%</span>
            </div>
            <div class="upload-progress-bar">
                <div class="upload-progress-animate" style="width: ${fileLoaded}%"></div>
            </div>
        </div>`
}
const uploadFileOnDone = (file, { fileName }) => {
    const fileUploadedBox = document.createElement('div')
    fileUploadedBox.classList.add('file-uploaded-box')

    const docAvatar = document.createElement('div')
    docAvatar.classList.add('doc-avatar-wrapper')
    docAvatar.innerHTML = `
        <i class="bi bi-camera"></i>
        <span className="doc-avatar-text">Thêm ảnh đại diện</span>`

    const docInfo = document.createElement('div')
    docInfo.classList.add('doc-info-box')

    const formGroup_docName = document.createElement('div')
    formGroup_docName.className = 'doc-info-form-group doc-name'
    formGroup_docName.innerHTML = `
        <label>Tên tài liệu <span class="required-dot">(*)</span></label>
        <div class="input-wrapper">
            <input type="text" placeholder="Tiêu đề phải dài hơn 20 kí tự..." />
        </div>`

    const formGroup_category = document.createElement('div')
    formGroup_category.className = 'doc-info-form-group doc-catrgory'
    formGroup_category.innerHTML = `
        <label>Danh mục <span class="required-dot">(*)</span></label>
        <div style="width: 100%;">
            <div class="dropdown-btn">
                <select class="form-select" aria-label="document-price-select">
                    <option value="none" selected>- Danh mục -</option>
                    <option value="2000">Kỹ năng mềm</option>
                    <option value="3000">Mẫu slide</option>
                    <option value="50000">Kinh doanh - tiếp thị</option>
                    <option value="550000">Kinh tế - quản lí</option>
                </select>
            </div>
            <div class="dropdown-btn">
                <select class="form-select" aria-label="document-price-select">
                    <option value="none" selected>- Danh mục con -</option>
                    <option value="2000">Kỹ năng mềm</option>
                    <option value="3000">Mẫu slide</option>
                    <option value="50000">Kinh doanh - tiếp thị</option>
                    <option value="550000">Kinh tế - quản lí</option>
                </select>
            </div>
        </div>`

    const formGroup_description = document.createElement('div')
    formGroup_description.className = 'doc-info-form-group doc-description'
    formGroup_description.innerHTML = `
        <label>Mô tả <span class="required-dot">(*)</span></label>
        <div class="textarea-wrapper">
            <textarea name="doc-description" rows="3" placeholder="Để có thứ hạng cao tại kết quả tìm kiếm..."></textarea>
        </div>`

    const formGroup_keyword = document.createElement('div')
    formGroup_keyword.className = 'doc-info-form-group doc-keyword'
    formGroup_keyword.innerHTML = `
        <label>Từ khóa <span class="required-dot">(*)</span></label>
        <div class="input-wrapper">
            <input type="text" placeholder="Từ khóa..." />
        </div>`

    const formGroup_price = document.createElement('div')
    formGroup_price.className = 'doc-info-form-group doc-price'
    formGroup_price.innerHTML = `
        <label>Giá bán <span class="required-dot">(*)</span></label>
        <div class="price-box">
            <div class="price">
                <h6>Giá bán</h6>
                <select class="form-select" aria-label="document-price-select">
                    <option value="none" selected>Chọn giá bán</option>
                    <option value="2000">2.000đ</option>
                    <option value="3000">3.000đ</option>
                    <option value="50000">50.000đ</option>
                    <option value="550000">550.000đ</option>
                    <option value="selft-type">Tự đặt giá</option>
                </select>
            </div>
            <div class="preview">
                <h6>Xem trước</h6>
                <select class="form-select" aria-label="document-price-select">
                    <option value="none" selected>Số trang xem trước</option>
                    <option value="20">20%</option>
                    <option value="50">50%</option>
                    <option value="selft-type">Tự chọn</option>
                </select>
            </div>
        </div>`

    docInfo.appendChild(formGroup_docName)
    docInfo.appendChild(formGroup_category)
    docInfo.appendChild(formGroup_description)
    docInfo.appendChild(formGroup_keyword)
    docInfo.appendChild(formGroup_price)

    fileUploadedBox.appendChild(docAvatar)
    fileUploadedBox.appendChild(docInfo)

    filesUploaded.appendChild(fileUploadedBox)
}

uploadFileOnDone(null, {})
const uploadFileOnProgress = (fileName) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/upload', true)
    xhr.upload.addEventListener('progress', ({ loaded, total }) => {
        const fileLoaded = Math.floor((loaded / total) * 100)
        const fileTotal = Math.floor(total / 1000)
        let fileSize
        fileTotal < 1024
            ? (fileSize = fileTotal + ' KB')
            : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + ' MB')
        createProgressBar({ fileLoaded, fileName })
        if (loaded == total) {
            createProgressBar({ fileName, fileSize, fileLoaded: 100 })
        }
    })
    xhr.addEventListener('load', () => {
        uploadFileOnDone(uploadDocInput.files[0], { fileName })
    })
    const data = new FormData()
    data.append('file', uploadDocInput.files[0])
    xhr.send(data)
}

const uploadFileOnProgressHandler = () => {
    const file = uploadDocInput.files[0]
    if (file) {
        let fileName = file.name
        if (fileName.length >= MAX_CHARS_OF_FILE_NAME) {
            const splitName = fileName.split('.')
            fileName =
                splitName[0].substring(0, MAX_CHARS_OF_FILE_NAME + 1) + '... .' + splitName[1]
        }
        uploadDocHelperTextBox.classList.add('inactive')
        fileUploadedProgress.classList.add('on-progress')
        uploadFileOnProgress(fileName)
    }
}
