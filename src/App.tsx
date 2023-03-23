import { CreatePost } from 'pages/blog/components/CreatePost'
import { PostList } from 'pages/blog/components/PostList'

function App() {
  return (
    <div className='p-5'>
      <CreatePost />
      <PostList />
    </div>
  )
}

export default App
