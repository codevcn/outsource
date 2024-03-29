const getIconForTypeOfPost = (type_of_file) => {
    switch (type_of_file) {
        case 'docx':
            return `<i class="bi bi-file-word-fill"></i>`
        case 'ppt':
            return `<i class="bi bi-file-ppt-fill"></i>`
        case 'pdf':
            return `<i class="bi bi-filetype-pdf"></i>`
    }
}
