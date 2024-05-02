const uploadDocSection = document.querySelector('#main-section .upload-doc-section')
const uploadDocHelperTextBox = uploadDocSection.querySelector('.helper-text-box')
const uploadedDocsSection = document.querySelector('#main-section .uploaded-docs-section')
const uploadedDocs = uploadedDocsSection.querySelector('.uploaded-docs')
const uploadedDocInput = document.getElementById('upload-docs-input')
const uploadedDocsTitle = uploadedDocsSection.querySelector('.uploaded-docs-title')
const addInfoForAllDocsSection = uploadedDocsSection.querySelector('.add-info-for-all-docs-section')
const addInfoForAllDocs_form = addInfoForAllDocsSection.querySelector('.add-info-for-all-docs-form')

const doc_preview_regex = /^[0-9]{1,}%?$/
const doc_price_regex = /^[0-9]{1,}$/

const clickInput = (target) => {
    target.parentElement.querySelector('input').click()
}

const cancelDocAvatar = (target) => {
    const docAvatarBtn = target.closest('.doc-avatar-btn-wrapper')
    docAvatarBtn.querySelector('.doc-avatar-preview-image').remove()
    docAvatarBtn.querySelector('input').value = ''
    docAvatarBtn.querySelector('label').removeAttribute('hidden')
    target.remove()
}

const uploadDocAvatarImage = async (target, docId) => {
    const file = target.files[0]

    if (file) {
        const previewImage = document.createElement('img')
        previewImage.classList.add('doc-avatar-preview-image')
        previewImage.setAttribute('alt', 'Ảnh đại diện')

        const avatarImageURL = URL.createObjectURL(file)
        previewImage.setAttribute('src', avatarImageURL)
        previewImage.onload = function () {
            URL.revokeObjectURL(avatarImageURL)
        }

        const cancelDocAvatarBtn = document.createElement('div')
        cancelDocAvatarBtn.classList.add('cancel-doc-avatar-btn')
        cancelDocAvatarBtn.innerHTML = `<span><i class="bi bi-x-circle-fill"></i></span>`
        cancelDocAvatarBtn.setAttribute('onclick', 'cancelDocAvatar(this)')

        const docAvatarBtn = uploadedDocs.querySelector(
            `.uploaded-doc-form[data-doc-id="${docId}"] .doc-avatar-and-doc-info .doc-avatar-btn-wrapper`
        )
        docAvatarBtn.querySelector('label').setAttribute('hidden', true)
        docAvatarBtn.appendChild(previewImage)
        docAvatarBtn.appendChild(cancelDocAvatarBtn)
    }
}

const create_docAvatarBtn = (docId) => {
    const docAvatarBtn = document.createElement('div')
    docAvatarBtn.classList.add('doc-avatar-btn-wrapper')
    const label = document.createElement('label')
    label.setAttribute('onclick', 'clickInput(this)')
    label.innerHTML = `
        <i class="bi bi-camera"></i>
        <span>Thêm ảnh đại diện</span>`

    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.setAttribute('name', 'uploaded-doc-avatar')
    input.setAttribute('hidden', true)
    input.setAttribute('onchange', `uploadDocAvatarImage(this,${docId})`)

    docAvatarBtn.appendChild(label)
    docAvatarBtn.appendChild(input)

    return docAvatarBtn
}

const createFromGroupLabel = ({ labelText }, is_required) => {
    return `<label class="form-group-title">
    ${labelText}
    ${is_required ? `<span class="required-dot">(*)</span>` : ''}
    </label>`
}

const create_formGroup_docName = (fileName) => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-name'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Tên tài liệu' }, true)}
        <div class="setting-up-container">
            <input
                type="text"
                name="uploaded-doc-name"
                placeholder="Tiêu đề phải dài hơn 20 kí tự..." 
                value="${fileName}"
            />
            <div class="message"></div>
        </div>`
    return formGroup
}

const create_formGroup_category = () => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-category'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Danh mục' }, true)}
        <div style="width: 100%;" class="setting-up-container">
            <div class="form-select-container">
                <select class="form-select" name="uploaded-doc-category">
                    <option value="none" selected>- Danh mục -</option>
                    <option value="2000">Kỹ năng mềm</option>
                    <option value="3000">Mẫu slide</option>
                    <option value="50000">Kinh doanh - tiếp thị</option>
                    <option value="550000">Kinh tế - quản lí</option>
                </select>
            </div>
            <div class="form-select-container">
                <select class="form-select" name="uploaded-doc-subcategory">
                    <option value="none" selected>- Danh mục con -</option>
                    <option value="2000">Kỹ năng mềm</option>
                    <option value="3000">Mẫu slide</option>
                    <option value="50000">Kinh doanh - tiếp thị</option>
                    <option value="550000">Kinh tế - quản lí</option>
                </select>
            </div>
            <div class="message"></div>
        </div>`
    return formGroup
}

const create_formGroup_description = () => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-description'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Mô tả' }, true)}
        <div class="setting-up-container">
            <textarea
                name="uploaded-doc-description" 
                rows="3" 
                placeholder="Để có thứ hạng cao tại kết quả tìm kiếm..."
            ></textarea>
            <div class="message"></div>
        </div>`
    return formGroup
}

const selectDocPrice = (target) => {
    const { value } = target
    const setPriceEle = target
        .closest('.form-select-container.price')
        .querySelector('.setting-up-value.set-price')
    if (value === 'self-type') {
        setPriceEle.classList.remove('inactive')
    } else {
        if (!setPriceEle.classList.contains('inactive')) {
            setPriceEle.classList.add('inactive')
        }
    }
}

const selectDocPreview = (target) => {
    const { value } = target
    const setPriceEle = target
        .closest('.form-select-container.preview')
        .querySelector('.setting-up-value.set-preview')
    if (value === 'self-type') {
        setPriceEle.classList.remove('inactive')
    } else {
        if (!setPriceEle.classList.contains('inactive')) {
            setPriceEle.classList.add('inactive')
        }
    }
}

const selfTypeDocPrice = (target) => {
    const { value } = target
    if (value === '') {
        target.nextElementSibling.textContent = ''
    } else if (doc_price_regex.test(value) && value * 1 <= MAX_PRICE_DOCUMENT) {
        target.nextElementSibling.textContent = `${formatNumberWithDelimiter(value, ',')}đ`
    }
}

const selfTypeDocPreview = (target) => {
    const { value } = target
    if (value === '') {
        target.nextElementSibling.textContent = ''
    } else if (doc_preview_regex.test(value) && value * 1 <= MAX_NUMBER_OF_PREVIEW_PAGES) {
        target.nextElementSibling.textContent = `${value} trang`
    }
}

const create_formGroup_priceAndPreview = () => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-price-and-preview'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Giá bán' }, true)}
        <div class="setting-up-container">
            <div class="form-select-container price">
                <h6>Giá bán</h6>
                <select class="form-select" onchange="selectDocPrice(this)" name="uploaded-doc-price">
                    <option value="none" selected>Chọn giá bán</option>
                    <option value="2000">2.000đ</option>
                    <option value="3000">3.000đ</option>
                    <option value="50000">50.000đ</option>
                    <option value="550000">550.000đ</option>
                    <option value="self-type">Tự đặt giá</option>
                </select>
                <div class="setting-up-value set-price inactive">
                    <input
                        type="text"
                        name="uploaded-doc-price-self-type"
                        placeholder="Nhập giá..." 
                        oninput="selfTypeDocPrice(this)"
                    />
                    <strong>0đ</strong>
                </div>
                <div class="message"></div>
            </div>
            <div class="form-select-container preview">
                <h6>Xem trước</h6>
                <select class="form-select" onchange="selectDocPreview(this)" name="uploaded-doc-preview">
                    <option value="none" selected>Số trang xem trước</option>
                    <option value="20%">20%</option>
                    <option value="50%">50%</option>
                    <option value="self-type">Tự chọn</option>
                </select>
                <div class="setting-up-value set-preview inactive">
                    <input
                        type="text"
                        name="uploaded-doc-preview-self-type"
                        placeholder="Nhập số trang xem trước..."
                        oninput="selfTypeDocPreview(this)"
                    />
                    <strong>0 trang</strong>
                </div>
                <div class="message"></div>
            </div>
        </div>`
    return formGroup
}

const create_formGroup_keyword = () => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-keyword'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'Từ khóa' }, true)}
        <div class="setting-up-container">
            <input type="text" name="uploaded-doc-keyword" placeholder="Từ khóa..." />
            <div class="message"></div>
        </div>`
    return formGroup
}

const setAttachingDoc_warningMessage = (target, message) => {
    target.closest('.setting-up-container').querySelector('.attach-doc-upload-status').innerHTML =
        message
            ? `<div class="warning">
                <i class="bi bi-exclamation-triangle-fill"></i>
                <span>${message}</span>
            </div>`
            : ''
}

const createAttachingDoc_progressBar = (target, { fileLoaded, fileName }) => {
    target.closest('.setting-up-container').querySelector('.attach-doc-upload-status').innerHTML = `
        <div class="on-progress">
            ${
                fileLoaded === 100
                    ? `
                    <i class="bi bi-check-circle-fill"></i>
                    <span>${fileName} • Đã tải lên ${fileLoaded}%</span>`
                    : `
                    <div class="on-progress-circle">
                        <div class="on-progress-solid" style="width: ${fileLoaded}%"></div>
                    </div>
                    <span>${fileName} • Đang tải lên ${fileLoaded}%</span>`
            }
        </div>`
}

const uploadAttachingDocOnProgressHandler = async (target, docId) => {
    const files = target.files
    if (files && files.length > 0) {
        uploadDocHelperTextBox.classList.add('inactive')

        const file = files[0]
        const fileSize = file.size
        console.log('>>> fileSize >>>', { fileSize, inMB: fileSize / (1024 * 1024) })
        if (fileSize / (1024 * 1024) > 32) {
            setAttachingDoc_warningMessage(target, 'Tệp tin không được phép vượt quá 32MB')
            return
        }

        const data = new FormData()
        data.append('file', file)
        let fileName = file.name
        if (fileName.length >= MAX_CHARS_OF_FILE_NAME) {
            const splitName = fileName.split('.')
            fileName =
                splitName[0].substring(0, MAX_CHARS_OF_FILE_NAME + 1) + '... .' + splitName[1]
        }
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/upload-attaching-doc', true)
        xhr.upload.addEventListener('progress', ({ loaded, total }) => {
            const fileLoaded = Math.floor((loaded / total) * 100)
            createAttachingDoc_progressBar(target, { fileLoaded, fileName })
            if (loaded == total) {
                createAttachingDoc_progressBar(target, { fileName, fileLoaded: 100 })
            }
        })
        xhr.addEventListener('load', () => {
            const status = xhr.status
            if (status < 200 || status > 299) {
                setAttachingDoc_warningMessage(target, 'Lỗi không thể tải tệp đính kèm lên!')
            }
        })
        xhr.send(data)
    }
}

const create_formGroup_attachingDoc = (docId) => {
    const formGroup = document.createElement('div')
    formGroup.className = 'doc-info-form-group doc-attaching'
    formGroup.innerHTML = `
        ${createFromGroupLabel({ labelText: 'File đính kèm' })}
        <div class="setting-up-container">
            <h6>Tài liệu tham khảo giá:</h6>
            <div class="attaching-doc-btn-container">
                <label class="attaching-doc-btn" onclick="clickInput(this)">Thêm file đính kèm</label>
                <input
                    type="file"
                    hidden
                    name="uploaded-doc-attaching"
                    onchange="uploadAttachingDocOnProgressHandler(this,${docId})"
                    accept=".zip,.rar"
                />
                <span class="attaching-doc-helper-text">Chỉ chấp nhận định dạng file ZIP/RAR (tối đa 32MB)</span>
            </div>
            <div class="attach-doc-upload-status"></div>
            <input type="text" class="uploaded-doc-attaching-file-name" placeholder="Tên file đính kèm (ví dụ: Quản lí nhân công & quỹ đầu tư từ phòng đào tạo)" />
            <div class="message"></div>
        </div>`
    return formGroup
}

const create_submit_button = () => {
    const submit_btn = document.createElement('button')
    submit_btn.setAttribute('type', 'submit')
    submit_btn.className = 'submit-form-btn'
    submit_btn.textContent = 'Lưu'
    return submit_btn
}

const saveDocInfo = async (docId, data) => {
    console.log('>>> api payload >>>', { docId, data })
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

const setDocName_warningMessage = (target, message) => {
    target.querySelector('.doc-info-form-group.doc-name .setting-up-container .message').innerHTML =
        message
            ? `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span>${message}</span>`
            : ''
}

const setDocCategory_warningMessage = (target, message) => {
    target.querySelector(
        '.doc-info-form-group.doc-category .setting-up-container .message'
    ).innerHTML = message
        ? `
        <i class="bi bi-exclamation-triangle-fill"></i>
        <span>${message}</span>`
        : ''
}

const setDocDescription_warningMessage = (target, message) => {
    target.querySelector(
        '.doc-info-form-group.doc-description .setting-up-container .message'
    ).innerHTML = message
        ? `
        <i class="bi bi-exclamation-triangle-fill"></i>
        <span>${message}</span>`
        : ''
}

const setDocKeyword_warningMessage = (target, message) => {
    target.querySelector(
        '.doc-info-form-group.doc-keyword .setting-up-container .message'
    ).innerHTML = message
        ? `
        <i class="bi bi-exclamation-triangle-fill"></i>
        <span>${message}</span>`
        : ''
}

const setDocPrice_warningMessage = (target, message) => {
    target.querySelector(
        '.doc-info-form-group.doc-price-and-preview .setting-up-container .form-select-container.price .message'
    ).innerHTML = message
        ? `
        <i class="bi bi-exclamation-triangle-fill"></i>
        <span>${message}</span>`
        : ''
}

const setDocPreview_warningMessage = (target, message) => {
    target.querySelector(
        '.doc-info-form-group.doc-price-and-preview .setting-up-container .form-select-container.preview .message'
    ).innerHTML = message
        ? `
        <i class="bi bi-exclamation-triangle-fill"></i>
        <span>${message}</span>`
        : ''
}

const setDocAttaching_warningMessage = (target, message) => {
    target.querySelector(
        '.doc-info-form-group.doc-attaching .setting-up-container .message'
    ).innerHTML = message
        ? `
        <i class="bi bi-exclamation-triangle-fill"></i>
        <span>${message}</span>`
        : ''
}

const validateSaveDocInfo = (
    target,
    { docName, docCategory, docSubcategory, docDescription, docKeyword, docPrice, docPreview }
) => {
    let is_valid = true
    if (!docName) {
        setDocName_warningMessage(target, 'Vui lòng nhập tiêu đề cho tài liệu!')
        is_valid = false
    } else {
        setDocName_warningMessage(target, null)
    }
    if (!docCategory || docCategory === 'none') {
        setDocCategory_warningMessage(target, 'Vui lòng chọn danh mục!')
        is_valid = false
    } else {
        if (!docSubcategory || docSubcategory === 'none') {
            setDocCategory_warningMessage(target, 'Vui lòng chọn danh mục con!')
            is_valid = false
        } else {
            setDocCategory_warningMessage(target, null)
        }
    }
    if (!docDescription) {
        setDocDescription_warningMessage(target, 'Vui lòng nhập mô tả cho tài liệu!')
        is_valid = false
    } else {
        setDocDescription_warningMessage(target, null)
    }
    if (!docKeyword) {
        setDocKeyword_warningMessage(target, 'Vui lòng nhập từ khóa cho tài liệu!')
        is_valid = false
    } else {
        setDocKeyword_warningMessage(target, null)
    }
    if (!docPrice || docPrice === 'none') {
        setDocPrice_warningMessage(target, 'Vui lòng chọn hoặc đặt giá bán cho tài liệu!')
        is_valid = false
    } else {
        if (!doc_price_regex.test(docPrice)) {
            setDocPrice_warningMessage(target, 'Giá bán chỉ được phép chứa số!')
            is_valid = false
        } else if (docPrice * 1 > MAX_PRICE_DOCUMENT) {
            setDocPrice_warningMessage(target, 'Giá bán tối đa được phép là 99,999,999đ!')
            is_valid = false
        } else {
            setDocPrice_warningMessage(target, null)
        }
    }
    if (!docPreview || docPreview === 'none') {
        setDocPreview_warningMessage(
            target,
            'Vui lòng chọn hoặc đặt số trang có thể xem trước của tài liệu!'
        )
        is_valid = false
    } else {
        if (!doc_preview_regex.test(docPreview)) {
            setDocPreview_warningMessage(target, 'Số trang xem trước chỉ được phép chứa số!')
            is_valid = false
        } else if (docPreview * 1 > MAX_NUMBER_OF_PREVIEW_PAGES) {
            setDocPreview_warningMessage(target, 'Số trang xem trước tối đa được phép là 100!')
            is_valid = false
        } else {
            setDocPreview_warningMessage(target, null)
        }
    }
    return is_valid
}

const removeFormAfterSubmitFormInfo = (target) => {
    const uploadedInfoSuccess = document.createElement('div')
    uploadedInfoSuccess.classList.add('uploaded-info-success')
    uploadedInfoSuccess.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        <span>Đã lưu thông tin của tài liệu thành công.</span>`

    target.closest('form.uploaded-doc-form').replaceWith(uploadedInfoSuccess)
}

const saveUploadDocInfoHandler = (docData) => {
    //:MARK one
    return async function (e) {
        e.preventDefault()
        const { target } = e
        const { elements } = target

        const docAvatar = elements['uploaded-doc-avatar'].files
        const docName = elements['uploaded-doc-name'].value
        const docCategory = elements['uploaded-doc-category'].value
        const docSubcategory = elements['uploaded-doc-subcategory'].value
        const docDescription = elements['uploaded-doc-description'].value
        const docKeyword = elements['uploaded-doc-keyword'].value
        const docAttachingName = elements['uploaded-doc-attaching'].value
        let docPrice = elements['uploaded-doc-price'].value
        let docPreview = elements['uploaded-doc-preview'].value
        if (docPrice === 'self-type') {
            docPrice = elements['uploaded-doc-price-self-type'].value
        }
        if (docPreview === 'self-type') {
            docPreview = elements['uploaded-doc-preview-self-type'].value
        }

        if (
            validateSaveDocInfo(target, {
                docName,
                docCategory,
                docSubcategory,
                docDescription,
                docKeyword,
                docPrice,
                docPreview,
            })
        ) {
            const submitBtn = target.querySelector('.submit-form-btn')
            submitBtn.innerHTML = `
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`
            submitBtn.classList.add('inactive')

            try {
                await saveDocInfo(docData.id, {
                    docAvatar,
                    docName,
                    docCategory,
                    docSubcategory,
                    docDescription,
                    docKeyword,
                    docPrice,
                    docPreview,
                    docAttachingName,
                })
                toast.success({
                    message: 'Lưu thông tin tài liệu thành công!',
                    title: 'Lưu thông tin thành công',
                })
                removeFormAfterSubmitFormInfo(target)
            } catch (error) {
                toast.error({ message: error.message, title: 'Lỗi lưu thông tin tài liệu' })
            }

            target.querySelector('.submit-form-btn').innerHTML = 'Lưu'
            submitBtn.classList.remove('inactive')
        }
    }
}

const createDocFormTitle = (fileName) => {
    const title = document.createElement('h2')
    title.classList.add('uploaded-doc-form-title')
    title.textContent = fileName
    return title
}

const createUploadedDocForm = (docData) => {
    const form = document.createElement('form')
    form.classList.add('uploaded-doc-form')
    form.setAttribute('action', '#')
    form.setAttribute('method', 'POST')
    form.setAttribute('data-doc-id', docData.id)
    form.addEventListener('submit', saveUploadDocInfoHandler(docData))
    form.classList.add('inactive')
    return form
}

const uploadFileOnDone = (docData, uploadedDocSectionId) => {
    uploadedDocsTitle.classList.remove('inactive')
    addInfoForAllDocsSection.classList.remove('inactive')

    const fileUploadedDocForm = createUploadedDocForm(docData)

    const docTitle = createDocFormTitle(docData.name)

    const docAvatar = create_docAvatarBtn(docData.id)

    const docInfo = document.createElement('div')
    docInfo.classList.add('doc-info-box')

    const formGroup_docName = create_formGroup_docName(docData.name)

    const formGroup_category = create_formGroup_category()

    const formGroup_description = create_formGroup_description()

    const formGroup_keyword = create_formGroup_keyword()

    const formGroup_price = create_formGroup_priceAndPreview()

    const formGroup_attachingDoc = create_formGroup_attachingDoc(docData.id)

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

    fileUploadedDocForm.appendChild(docTitle)
    fileUploadedDocForm.appendChild(title_and_docInfo)

    const uploadedDocSection = uploadedDocs.querySelector(
        `.uploaded-doc-section-id-${uploadedDocSectionId}`
    )
    uploadedDocSection.appendChild(fileUploadedDocForm)
}

const renderProgressBar_failToUploadFile = ({ fileName }, uploadedDocSectionId) => {
    const uploadProgressContent_htmlString = `
        <div class="upload-progress-details progress-fail">
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span class="upload-progress-name">${fileName} • <strong>Tải lên thất bại</strong></span>
        </div>`

    const uploadProgressContent_exist = uploadedDocs.querySelector(
        `.uploaded-doc-section-id-${uploadedDocSectionId} .upload-progress`
    )
    if (uploadProgressContent_exist) {
        uploadProgressContent_exist.innerHTML = uploadProgressContent_htmlString
    } else {
        const uploadProgressContent = document.createElement('div')
        uploadProgressContent.classList.add('upload-progress')
        uploadProgressContent.innerHTML = uploadProgressContent_htmlString

        uploadedDocs.appendChild(uploadProgressContent)
    }
}

const renderProgressBar_fileUploaded = (
    { fileName, fileLoaded, fileSize },
    uploadedDocSectionId
) => {
    const uploadProgressContent_htmlString = `
        <div class="upload-progress-details">
            <div style="display: flex; align-items: center; column-gap: 5px;">
                ${
                    fileSize
                        ? `
                        <i class="bi bi-check-circle-fill"></i>
                        <div class="details">
                            <span class="name">${fileName} • <strong>Đã tải lên</strong></span>
                            <span class="size">${fileSize}</span>
                        </div>`
                        : `
                        <i class="bi bi-cloud-arrow-up-fill"></i>
                        <span class="upload-progress-name">${fileName} • <strong>Đang tải lên</strong></span>`
                }
            </div>
            <span class="upload-progress-percent">${fileLoaded}%</span>
        </div>
        <div class="upload-progress-bar">
            <div class="upload-progress-animate" style="width: ${fileLoaded}%"></div>
        </div>`

    const existing_uploadedDocSection = uploadedDocs.querySelector(
        `.uploaded-doc-section-id-${uploadedDocSectionId} .upload-progress`
    )
    if (existing_uploadedDocSection) {
        existing_uploadedDocSection.innerHTML = uploadProgressContent_htmlString
    } else {
        const uploadProgress = document.createElement('div')
        uploadProgress.classList.add('upload-progress')
        uploadProgress.innerHTML = uploadProgressContent_htmlString

        const uploadedDocSection = document.createElement('section')
        uploadedDocSection.classList.add('uploaded-doc-section')
        uploadedDocSection.classList.add(`uploaded-doc-section-id-${uploadedDocSectionId}`)
        uploadedDocSection.appendChild(uploadProgress)

        uploadedDocs.appendChild(uploadedDocSection)
    }
}

const uploadFilesOnProgress = (files) => {
    for (const { file, fileIndex } of files) {
        let fileName = file.name
        if (fileName.length >= MAX_CHARS_OF_FILE_NAME) {
            const splitName = fileName.split('.')
            fileName =
                splitName[0].substring(0, MAX_CHARS_OF_FILE_NAME + 1) + '... .' + splitName[1]
        }

        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/upload-doc', true)
        xhr.upload.addEventListener('progress', ({ loaded, total }) => {
            const fileLoaded = Math.floor((loaded / total) * 100)
            const fileTotal = Math.floor(total / 1000)
            let fileSize
            fileTotal < 1024
                ? (fileSize = fileTotal + ' KB')
                : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + ' MB')
            renderProgressBar_fileUploaded({ fileLoaded, fileName }, fileIndex)
            if (loaded == total) {
                renderProgressBar_fileUploaded(
                    {
                        fileName,
                        fileSize,
                        fileLoaded: 100,
                    },
                    fileIndex
                )
            }
        })
        xhr.addEventListener('load', () => {
            const status = xhr.status
            if (status >= 200 && status < 300) {
                const { docInfo } = JSON.parse(xhr.responseText)
                uploadFileOnDone(
                    {
                        id: docInfo.id,
                        pagesCount: docInfo.pagesCount,
                        name: docInfo.name,
                    },
                    fileIndex
                )
            } else {
                renderProgressBar_failToUploadFile({ fileName }, fileIndex)
            }
        })

        const data = new FormData()
        data.append('file', file)

        xhr.send(data)
    }
}

const uploadFilesOnProgressHandler = async () => {
    const files = uploadedDocInput.files
    if (files && files.length > 0) {
        uploadDocHelperTextBox.classList.add('inactive')
        uploadFilesOnProgress(Array.from(files).map((file, index) => ({ file, fileIndex: index })))
    }
}

const openAddInfoForAllDocs = () => {
    addInfoForAllDocs_form.classList.toggle('inactive')
}

const validateAddInfoForAllDocs = (
    target,
    { docCategory, docSubcategory, docPrice, docPreview }
) => {
    let is_valid = true
    if (!docCategory || docCategory === 'none') {
        setDocCategory_warningMessage(target, 'Vui lòng chọn danh mục!')
        is_valid = false
    } else {
        if (!docSubcategory || docSubcategory === 'none') {
            setDocCategory_warningMessage(target, 'Vui lòng chọn danh mục con!')
            is_valid = false
        } else {
            setDocCategory_warningMessage(target, null)
        }
    }
    if (!docPrice || docPrice === 'none') {
        setDocPrice_warningMessage(target, 'Vui lòng chọn hoặc đặt giá bán cho tài liệu!')
        is_valid = false
    } else {
        if (!doc_price_regex.test(docPrice)) {
            setDocPrice_warningMessage(target, 'Giá bán chỉ được phép chứa số!')
            is_valid = false
        } else if (docPrice * 1 > MAX_PRICE_DOCUMENT) {
            setDocPrice_warningMessage(target, 'Giá bán tối đa được phép là 99,999,999đ!')
            is_valid = false
        } else {
            setDocPrice_warningMessage(target, null)
        }
    }
    if (!docPreview || docPreview === 'none') {
        setDocPreview_warningMessage(
            target,
            'Vui lòng chọn hoặc đặt số trang có thể xem trước của tài liệu!'
        )
        is_valid = false
    } else {
        if (!doc_preview_regex.test(docPreview)) {
            setDocPreview_warningMessage(target, 'Số trang xem trước chỉ được phép chứa số!')
            is_valid = false
        } else if (docPreview * 1 > MAX_NUMBER_OF_PREVIEW_PAGES) {
            setDocPreview_warningMessage(target, 'Số trang xem trước tối đa được phép là 100!')
            is_valid = false
        } else {
            setDocPreview_warningMessage(target, null)
        }
    }
    return is_valid
}

const addInfoForAllDocs = async (docId_list) => {
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

const addInfoForAllDocsHandler = async (e) => {
    //:MARK all
    e.preventDefault()
    const { target } = e
    const { elements } = target
    const docCategory = elements['uploaded-doc-category'].value
    const docSubcategory = elements['uploaded-doc-subcategory'].value
    let docPrice = elements['uploaded-doc-price'].value
    let docPreview = elements['uploaded-doc-preview'].value
    if (docPrice === 'self-type') {
        docPrice = elements['uploaded-doc-price-self-type'].value
    }
    if (docPreview === 'self-type') {
        docPreview = elements['uploaded-doc-preview-self-type'].value
    }

    if (
        validateAddInfoForAllDocs(target, {
            docCategory,
            docSubcategory,
            docPrice,
            docPreview,
        })
    ) {
        const submitBtn = target.querySelector('.submit-form-btn')
        submitBtn.innerHTML = `
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`
        submitBtn.classList.add('inactive')

        let docId_list = []
        for (const form of uploadedDocs.querySelectorAll('.uploaded-doc-form')) {
            docId_list.push(form.getAttribute('data-doc-id'))
        }

        try {
            await addInfoForAllDocs(docId_list, {
                docCategory,
                docSubcategory,
                docPrice,
                docPreview,
            })

            toast.success({
                message: 'Lưu thông tin tài liệu thành công!',
                title: 'Lưu thông tin thành công',
            })
        } catch (error) {
            toast.error({ message: error.message, title: 'Lỗi lưu thông tin tài liệu' })
        }

        target.querySelector('.submit-form-btn').innerHTML = 'Lưu thông tin'
        submitBtn.classList.remove('inactive')
    }
}
