import React from 'react'
import EditBlog from '../components/BlogEdit/EditBlog'

function CreateBlog() {
  return (
    <div className='w-full flex justify-center min-h-screen pt-10 bg-slate-950'>
      <EditBlog btnType='Create' editType='create'/>
    </div>
  )
}

export default CreateBlog
