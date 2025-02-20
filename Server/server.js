import express from 'express'
import cors from 'cors'
import connectDB from './config/database.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import env from './config/env.js'
import path from 'path'
import compression from 'compression'
import helmet from 'helmet'

const app = express()
const PORT = env.SERVER_PORT || 7000

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',  // Frontend dev server
        'https://dr-ayushi-shakya.onrender.com/'  // Add your Render frontend URL
    ],
    credentials: true
}))
app.use(express.json())

// Connect to database
await connectDB()

// API Routes
app.use('/api', appointmentRoutes)

// Add compression for better performance
app.use(compression())

// Add security headers
app.use(helmet())

// Remove static file serving since frontend and backend are separate services
// app.use(express.static(path.join(__dirname, 'frontend/dist')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
// })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err)
})
