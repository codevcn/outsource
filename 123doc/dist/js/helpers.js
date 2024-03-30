const createIconForTypeOfPost = (type_of_file) => {
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

const formatNumberWithDot = (number) => {
    const numberString = number.toString()
    const numberStringLength = numberString.length
    const chunks = []
    let count = 0
    for (let i = numberStringLength - 1; i >= 0; i--) {
        if (count === 3) {
            chunks.push('.')
            count = 1
        } else {
            count++
        }
        chunks.push(numberString[i])
    }
    return chunks.reverse().join('')
}
