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
app.post('/upload-doc', (req, res, next) => {
    // res.status(400).json({success:false})
    res.status(200).json({
        docs: [
            { id: 1, name: 'Yêu em dại khờ Lou Hoàng.exe', pagesCount: 199 },
            { id: 2, name: 'Yêu em quá lâu.mp3', pagesCount: 20 },
        ],
    })
})
app.post('/upload-attaching-doc', (req, res, next) => {
    res.status(400).json({success:false})
    // res.status(200).json({
    //     docs: [
    //         { id: 1, name: 'Yêu em dại khờ Lou Hoàng.exe', pagesCount: 199 },
    //         { id: 2, name: 'Yêu em quá lâu.mp3', pagesCount: 20 },
    //     ],
    // })
})

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
