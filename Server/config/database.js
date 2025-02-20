import mongoose from 'mongoose'
import env from './env.js'

const connectDB = async () => {
    if (!env.MONGODB_URI) {
        console.error('MONGODB_URI is not defined in environment variables')
        process.exit(1)
    }

    try {
        await mongoose.connect(env.MONGODB_URI)
        console.log('MongoDB connected successfully✅')
    } catch (error) {
        console.error('MongoDB connection error❌:', error)
        process.exit(1)
    }
}

export default connectDB 