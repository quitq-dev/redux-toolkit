import { createAction, createReducer, createSlice, current, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { initialPostList } from 'constants/blog'
import { Post } from 'type/blog.type'

interface BlogState {
  postList: Post[]
  editPost: Post | null
}

const initialState: BlogState = {
  postList: initialPostList,
  editPost: null
}

// export const addPost = createAction('blog/addPost', function (post: Omit<Post, 'id'>) {
//   return {
//     payload: {
//       ...post,
//       id: nanoid()
//     }
//   }
// })
// export const deletePost = createAction<string>('blog/deletePost')
// export const startEditPost = createAction<string>('blog/startEditPost')
// export const finishEditPost = createAction<Post>('blog/finishEditPost')
// export const cancelEditPost = createAction('blog/cancelEditPost')

// const blogReduce = createReducer(initialState, (builder) => {
//   builder.addCase(addPost, (state, action) => {
//     state.postList.push(action.payload)
//   })
//   builder.addCase(deletePost, (state, action) => {
//     const postId = action.payload
//     const postIndex = state.postList.findIndex((post) => post.id === postId)
//     if (postIndex !== -1) {
//       state.postList.splice(postIndex, 1)
//     }
//   })
//   builder.addCase(startEditPost, (state, action) => {
//     const postId = action.payload
//     const foundPost = state.postList.find((post) => post.id === postId) || null
//     state.editPost = foundPost
//   })
//   builder.addCase(cancelEditPost, (state) => {
//     state.editPost = null
//   })
//   builder.addCase(finishEditPost, (state, action) => {
//     const postId = action.payload.id
//     state.postList.some((post, index) => {
//       if (post.id === postId) {
//         state.postList[index] = action.payload
//         return true
//       }
//       return false
//     })
//     state.editPost = null
//   })
// })

// export default blogReduce

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.postList.push(action.payload)
      },
      prepare: (post: Omit<Post, 'id'>) => {
        return {
          payload: {
            ...post,
            id: nanoid()
          }
        }
      }
    },
    deletePost: (state, action) => {
      const postId = action.payload
      const postIndex = state.postList.findIndex((post) => post.id === postId)
      if (postIndex !== -1) {
        state.postList.splice(postIndex, 1)
      }
    },
    startEditPost: (state, action) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editPost = foundPost
    },
    cancelEditPost: (state) => {
      state.editPost = null
    },
    finishEditPost: (state, action) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editPost = null
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state, action) => console.log(current(state))
      )
      .addDefaultCase((state, action) => {
        console.log(action.type)
      })
  }
})

const blogReduce = blogSlice.reducer

export const { addPost, deletePost, startEditPost, cancelEditPost, finishEditPost } = blogSlice.actions
export default blogReduce
