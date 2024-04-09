const uploadDocSection = document.querySelector('#main-section .upload-doc-section')
const uploadDocHelperTextBox = uploadDocSection.querySelector('.helper-text-box')
const docsUploadedSection = document.querySelector('#main-section .uploaded-docs-section')
const uploadProgress = docsUploadedSection.querySelector('.upload-progress')
const docsUploaded = document.querySelector('#main-section .uploaded-docs')

const clickInput = (target) => {
    target.parentElement.querySelector('input').click()
}

const create_docAvatarBtn = () => {
    const docAvatar = document.createElement('div')
    docAvatar.classList.add('doc-avatar-btn-wrapper')
    docAvatar.innerHTML = `
        <label
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-title="Thêm ảnh đại diện cho tài liệu của bạn"
            onclick="clickInput(this)"
        >
            <i class="bi bi-camera"></i>
            <span>Thêm ảnh đại diện</span>
        </label>
        <input
            type="file"
            accept="image/*"
            name="uploaded-doc-avatar" 
            hidden
        />`

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

const create_formGroup_docName = () => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-name'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Tên tài liệu' })}
        <div class="setting-up-container">
            <input type="text" name="uploaded-doc-name" placeholder="Tiêu đề phải dài hơn 20 kí tự..." />
        </div>`
    return formGroup
}

const create_formGroup_category = () => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-catrgory'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Danh mục' })}
        <div style="width: 100%;" class="setting-up-container">
            <div class="select-btn">
                <select class="form-select" name="uploaded-doc-category">
                    <option value="none" selected>- Danh mục -</option>
                    <option value="2000">Kỹ năng mềm</option>
                    <option value="3000">Mẫu slide</option>
                    <option value="50000">Kinh doanh - tiếp thị</option>
                    <option value="550000">Kinh tế - quản lí</option>
                </select>
            </div>
            <div class="select-btn">
                <select class="form-select" name="uploaded-doc-subcategory">
                    <option value="none" selected>- Danh mục con -</option>
                    <option value="2000">Kỹ năng mềm</option>
                    <option value="3000">Mẫu slide</option>
                    <option value="50000">Kinh doanh - tiếp thị</option>
                    <option value="550000">Kinh tế - quản lí</option>
                </select>
            </div>
        </div>`
    return formGroup
}

const create_formGroup_description = () => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-description'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Mô tả' })}
        <div class="setting-up-container">
            <textarea
                name="uploaded-doc-description" 
                rows="3" 
                placeholder="Để có thứ hạng cao tại kết quả tìm kiếm..."
            ></textarea>
        </div>`
    return formGroup
}

const create_formGroup_price = () => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-price-and-preview'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Giá bán' })}
        <div class="setting-up-container">
            <div class="select-btn price">
                <h6>Giá bán</h6>
                <select class="form-select" name="uploaded-doc-price">
                    <option value="none" selected>Chọn giá bán</option>
                    <option value="2000">2.000đ</option>
                    <option value="3000">3.000đ</option>
                    <option value="50000">50.000đ</option>
                    <option value="550000">550.000đ</option>
                    <option value="selft-type">Tự đặt giá</option>
                </select>
                <div class="setting-up-value set-price">
                    <input type="text" name="uploaded-doc-price-self-type" placeholder="Nhập giá..." />
                    <strong>123456đ</strong>
                </div>
            </div>
            <div class="select-btn preview">
                <h6>Xem trước</h6>
                <select class="form-select" name="uploaded-doc-preview">
                    <option value="none" selected>Số trang xem trước</option>
                    <option value="20">20%</option>
                    <option value="50">50%</option>
                    <option value="selft-type">Tự chọn</option>
                </select>
                <div class="setting-up-value set-preview">
                    <input type="text" name="uploaded-doc-preview-self-type" placeholder="Nhập số trang xem trước..." />
                    <strong>123456 trang</strong>
                </div>
            </div>
        </div>`
    return formGroup
}

const create_formGroup_keyword = () => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-keyword'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Từ khóa' })}
        <div class="setting-up-container">
            <input type="text" name="uploaded-doc-keyword" placeholder="Từ khóa..." />
        </div>`
    return formGroup
}

const create_formGroup_attachingDoc = () => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-attaching'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'File đính kèm' })}
        <div class="setting-up-container">
            <h6>Tài liệu tham khảo giá:</h6>
            <div style="display: flex; align-items: center; column-gap: 10px">
                <label class="attaching-doc-btn" onclick="clickInput(this)">Thêm file đính kèm</label>
                <input
                    type="file"
                    hidden
                    name="uploaded-doc-attaching"
                />
                <span class="attaching-doc-helper-text">Chỉ chấp nhận định dạng file ZIP/RAR (tối đa 32MB)</span>
            </div>
            <div class="attach-doc-loading inactive">
            
            </div>
            <input type="text" class="file-name" placeholder="Tên file đính kèm (ví dụ: Quản lí nhân công & quỹ đầu tư từ phòng đào tạo)" />
        </div>`
    return formGroup
}

const create_submit_button = () => {
    const submit_btn = document.createElement('button')
    submit_btn.setAttribute('type', 'submit')
    submit_btn.className = 'submit-btn'
    submit_btn.textContent = 'Lưu'
    return submit_btn
}

const uploadFile = async (data) => {
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

async function saveUploadFile(e) {
    e.preventDefault()
    const target = e.target
    const { elements } = target
    console.log('>>> elements >>>', elements)
    const docAvatar = elements['uploaded-doc-avatar'].files
    const docName = elements['uploaded-doc-name'].value
    const docCategory = elements['uploaded-doc-category'].value
    const docSubcategory = elements['uploaded-doc-subcategory'].value
    const docDescription = elements['uploaded-doc-description'].value
    const docKeyword = elements['uploaded-doc-keyword'].value
    const docAttaching = elements['uploaded-doc-attaching'].files
    let docPrice = elements['uploaded-doc-price'].value
    if (docPrice === 'self-type') {
        docPrice = elements['uploaded-doc-price-self-type'].value
    }
    let docPreview = elements['uploaded-doc-preview'].value
    if (docPreview === 'self-type') {
        docPreview = elements['uploaded-doc-preview-self-type'].value
    }
    console.log('>>> res >>>', {
        docAvatar,
        docAttaching,
        docName,
        docCategory,
        docSubcategory,
        docDescription,
        docKeyword,
        docPrice,
        docPreview,
    })
    try {
        await uploadFile({
            docAvatar,
            docAttaching,
            docName,
            docCategory,
            docSubcategory,
            docDescription,
            docKeyword,
            docPrice,
            docPreview,
        })
        toast.success('Đã lưu dữ liệu tài liệu thành công!')
    } catch (error) {
        toast.success(error.message)
    }
}

const createDocFormTitle = () => {
    const title = document.createElement('h2')
    title.classList.add('uploaded-doc-form-title')
    return title
}

const uploadFileOnDone = (is_adding_file, { fileName }) => {
    const uploadDocInput = document.createElement('input')
    uploadDocInput.setAttribute('id', 'uploaded-doc-input')
    uploadDocInput.setAttribute('name', 'uploaded-doc-input')
    uploadDocInput.setAttribute('type', 'file')
    uploadDocInput.setAttribute('hidden', true)
    uploadDocInput.setAttribute('onchange', 'uploadFileOnProgressHandler()')

    const fileUploadedForm = document.createElement('form')
    fileUploadedForm.classList.add('uploaded-doc-form')
    fileUploadedForm.setAttribute('action', '#')
    fileUploadedForm.addEventListener('submit', saveUploadFile)
    fileUploadedForm.classList.add('inactive')
    if (is_adding_file) {
        const preUploadedDocInput = document.getElementById('uploaded-doc-input')
        preUploadedDocInput.removeAttribute('id')
        const uploadedDocForm = preUploadedDocInput.closest('.uploaded-doc-form')
        uploadedDocForm.classList.remove('inactive')
        uploadedDocForm.querySelector('.uploaded-doc-form-title').textContent = fileName
    }

    const docTitle = createDocFormTitle()

    const docAvatar = create_docAvatarBtn()

    const docInfo = document.createElement('div')
    docInfo.classList.add('doc-info-box')

    const formGroup_docName = create_formGroup_docName()

    const formGroup_category = create_formGroup_category()

    const formGroup_description = create_formGroup_description()

    const formGroup_keyword = create_formGroup_keyword()

    const formGroup_price = create_formGroup_price()

    const formGroup_attachingDoc = create_formGroup_attachingDoc()

    const submit_btn = create_submit_button()

    const title_and_docInfo = document.createElement('div')
    title_and_docInfo.classList.add('doc-avatar-and-doc-info')
    title_and_docInfo.appendChild(docAvatar)
    title_and_docInfo.appendChild(docInfo)

    docInfo.appendChild(formGroup_docName)
    docInfo.appendChild(formGroup_category)
    docInfo.appendChild(formGroup_description)
    docInfo.appendChild(formGroup_keyword)
    docInfo.appendChild(formGroup_price)
    docInfo.appendChild(formGroup_attachingDoc)
    docInfo.appendChild(submit_btn)

    fileUploadedForm.appendChild(docTitle)
    fileUploadedForm.appendChild(title_and_docInfo)
    fileUploadedForm.appendChild(uploadDocInput)

    docsUploaded.prepend(fileUploadedForm)
}

const createProgressBar_fileUploaded = ({ fileName, fileLoaded, fileSize }) => {
    uploadProgress.innerHTML = `
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

const uploadFileOnProgress = (fileName) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/upload-doc', true)
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
        const status = xhr.status
        if (status >= 200 && status < 300) {
            uploadFileOnDone(true, { fileName })
        } else {
            toast.error('Lỗi không thể tải file lên!')
        }
    })
    const data = new FormData()
    data.append('file', document.getElementById('uploaded-doc-input').files[0])
    xhr.send(data)
}

const checkDuplicateFile = async (fileName) => {
    if (document.getElementById('uploaded-file-' + fileName)) {
        return true
    }
    // const is_duplicate_file = await checkDuplicateFile(fileName)
    // if (is_duplicate_file) {
    //     toast.error('Bạn đang tải lên một file bị trùng tên!')
    //     return
    // }
}

const uploadFileOnProgressHandler = async () => {
    const file = document.getElementById('uploaded-doc-input').files[0]
    if (file) {
        let fileName = file.name
        if (fileName.length >= MAX_CHARS_OF_FILE_NAME) {
            const splitName = fileName.split('.')
            fileName =
                splitName[0].substring(0, MAX_CHARS_OF_FILE_NAME + 1) + '... .' + splitName[1]
        }
        uploadDocHelperTextBox.classList.add('inactive')
        uploadProgress.classList.remove('inactive')
        uploadFileOnProgress(fileName)
    }
}
