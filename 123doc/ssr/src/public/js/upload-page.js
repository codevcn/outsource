const uploadDocSection = document.querySelector('#main-section .upload-doc-section')
const uploadDocInput = uploadDocSection.querySelector('.upload-doc-input')
const uploadDocHelperTextBox = uploadDocSection.querySelector('.helper-text-box')
const filesUploadedSection = document.querySelector('#main-section .files-uploaded-section')
const fileUploadedProgress = filesUploadedSection.querySelector('.file-uploaded-progress')
const filesUploaded = document.querySelector('#main-section .files-uploaded')

const createProgressBar_fileUploaded = ({ fileName, fileLoaded, fileSize }) => {
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

const createDocAvatarBtn = () => {
    const docAvatar = document.createElement('div')
    docAvatar.classList.add('doc-avatar-btn-wrapper')
    docAvatar.innerHTML = `
        <label
            for="upload-document-avatar-input"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-title="Thêm ảnh đại diện cho tài liệu của bạn"
        >
            <i class="bi bi-camera"></i>
            <span>Thêm ảnh đại diện</span>
        </label>
        <input type="file" id="upload-document-avatar-input" hidden />`

    return docAvatar
}

const createFromGroupLabel = ({ labelText }) => {
    return `
        <label>
            ${labelText} <span 
                class="required-dot"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Trường này là bắt buộc"
            >(*)</span>
        </label>`
}

const uploadFileOnDone = (file, { fileName }) => {
    const fileUploadedBox = document.createElement('div')
    fileUploadedBox.classList.add('file-uploaded-box')

    const docAvatar = createDocAvatarBtn()

    const docInfo = document.createElement('div')
    docInfo.classList.add('doc-info-box')

    const formGroup_docName = document.createElement('div')
    formGroup_docName.className = 'doc-info-form-group doc-name'
    formGroup_docName.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Tên tài liệu' })}
        <div class="setting-up-container">
            <input type="text" placeholder="Tiêu đề phải dài hơn 20 kí tự..." />
        </div>`

    const formGroup_category = document.createElement('div')
    formGroup_category.className = 'doc-info-form-group doc-catrgory'
    formGroup_category.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Danh mục' })}
        <div style="width: 100%;" class="setting-up-container">
            <div class="select-btn">
                <select class="form-select" aria-label="document-price-select">
                    <option value="none" selected>- Danh mục -</option>
                    <option value="2000">Kỹ năng mềm</option>
                    <option value="3000">Mẫu slide</option>
                    <option value="50000">Kinh doanh - tiếp thị</option>
                    <option value="550000">Kinh tế - quản lí</option>
                </select>
            </div>
            <div class="select-btn">
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
        ${createFromGroupLabel({ labelText: 'Mô tả' })}
        <div class="setting-up-container">
            <textarea name="document-description" rows="3" placeholder="Để có thứ hạng cao tại kết quả tìm kiếm..."></textarea>
        </div>`

    const formGroup_keyword = document.createElement('div')
    formGroup_keyword.className = 'doc-info-form-group doc-keyword'
    formGroup_keyword.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Từ khóa' })}
        <div class="setting-up-container">
            <input type="text" placeholder="Từ khóa..." />
        </div>`

    const formGroup_price = document.createElement('div')
    formGroup_price.className = 'doc-info-form-group doc-price-and-preview'
    formGroup_price.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Giá bán' })}
        <div class="setting-up-container">
            <div class="select-btn price">
                <h6>Giá bán</h6>
                <select class="form-select" aria-label="document-price-select">
                    <option value="none" selected>Chọn giá bán</option>
                    <option value="2000">2.000đ</option>
                    <option value="3000">3.000đ</option>
                    <option value="50000">50.000đ</option>
                    <option value="550000">550.000đ</option>
                    <option value="selft-type">Tự đặt giá</option>
                </select>
                <div class="setting-up-value set-price">
                    <input type="text" placeholder="Nhập giá..." />
                    <strong>123456đ</strong>
                </div>
            </div>
            <div class="select-btn preview">
                <h6>Xem trước</h6>
                <select class="form-select" aria-label="document-price-select">
                    <option value="none" selected>Số trang xem trước</option>
                    <option value="20">20%</option>
                    <option value="50">50%</option>
                    <option value="selft-type">Tự chọn</option>
                </select>
                <div class="setting-up-value set-preview">
                    <input type="text" placeholder="Nhập số trang xem trước..." />
                    <strong>123456 trang</strong>
                </div>
            </div>
        </div>`

    const formGroup_attachingDoc = document.createElement('div')
    formGroup_attachingDoc.className = 'doc-info-form-group doc-attaching'
    formGroup_attachingDoc.innerHTML = `
        ${createFromGroupLabel({ labelText: 'File đính kèm' })}
        <div class="setting-up-container">
            <h6>Tài liệu tham khảo giá:</h6>
            <div style="display: flex; align-items: center; column-gap: 10px">
                <label class="attaching-doc-btn" for="attaching-document-input">Thêm file đính kèm</label>
                <input type="file" hidden id="attaching-document-input" />
                <span class="attaching-doc-helper-text">Chỉ chấp nhận định dạng file ZIP/RAR (tối đa 32MB)</span>
            </div>
            <input type="text" class="file-name" placeholder="Tên file đính kèm (ví dụ: Quản lí nhân công & quỹ đầu tư từ phòng đào tạo)" />
        </div>`

    const submit_btn = document.createElement('button')
    submit_btn.className = 'submit-btn'
    submit_btn.textContent = 'Lưu'

    docInfo.appendChild(formGroup_docName)
    docInfo.appendChild(formGroup_category)
    docInfo.appendChild(formGroup_description)
    docInfo.appendChild(formGroup_keyword)
    docInfo.appendChild(formGroup_price)
    docInfo.appendChild(formGroup_attachingDoc)
    docInfo.appendChild(submit_btn)

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
        createProgressBar_fileUploaded({ fileLoaded, fileName })
        if (loaded == total) {
            createProgressBar_fileUploaded({ fileName, fileSize, fileLoaded: 100 })
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
