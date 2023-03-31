import { configureStore } from '@reduxjs/toolkit'
import blogReduce from 'pages/blog/blog.reduce'
export const store = configureStore({
  reducer: { blog: blogReduce }
})

// Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>
