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

const formatCount = (num) => {
    if (num < 1000) {
        return num.toString()
    } else {
        const formattedNum = (num / 1000).toFixed(1)
        return `${formattedNum}K`
    }
}
