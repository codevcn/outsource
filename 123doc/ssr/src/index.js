import express from 'express'
import { danhmuc, user } from './lib/data.js'

const app = express()
const port = 8080

// Thiết lập thư mục chứa các file ejs
app.set('views', 'src/views')

// Sử dụng EJS làm view engine
app.set('view engine', 'ejs')

// Thiết lập thư mục chứa các file tĩnh (CSS, JS, hình ảnh, ...)
app.use(express.static('src/public'))

// Định nghĩa route
app.get('/upload-page', (req, res) => {
    // res.render('test', { user, danhmuc })
    res.render('upload-page', { user, danhmuc })
})

const static_docs_arr = []
const static_docNames_arr = []
function generateRandomString(docId) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const length = Math.floor(Math.random() * (50 - 20 + 1)) + 20 // Sinh độ dài ngẫu nhiên từ 20 đến 50

    let result = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomIndex)
    }

    return `${result} - ${docId}`
}
app.post('/upload-doc', (req, res, next) => {
    static_docNames_arr.push(generateRandomString(static_docs_arr.length))
    static_docs_arr.push({
        id: static_docs_arr.length,
        name: static_docNames_arr[static_docNames_arr.length - 1],
        pagesCount: static_docs_arr.length * 25,
    })

    const docInfo_to_return = static_docs_arr[static_docs_arr.length - 1]

    res.status(200).json({
        docInfo: {
            id: docInfo_to_return.id,
            name: docInfo_to_return.name,
            pagesCount: docInfo_to_return.pagesCount,
        },
    })
    // res.status(400).json({success:false})
})

app.post('/upload-attaching-doc', (req, res, next) => {
    // res.status(400).json({ success: false })
    res.status(200).json({
        docs: [
            { id: 1, name: 'Yêu em dại khờ Lou Hoàng.exe', pagesCount: 199 },
            { id: 2, name: 'Yêu em quá lâu.mp3', pagesCount: 20 },
        ],
    })
})

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
