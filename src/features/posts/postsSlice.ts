import { createSlice } from "@reduxjs/toolkit"

export interface Post {
  id: string,
  title: string,
  content: string,
}

const initialState = [
  {
    id: '1', 
    title: 'First Post!', 
    content: 'Hello!'
  },
  {
    id: '2', 
    title: 'Second Post!', 
    content: 'More text'
  },
] as Post[]

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload)
    }
  }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
