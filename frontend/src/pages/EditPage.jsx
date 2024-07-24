import React from 'react'
import EditBlog from "../components/BlogEdit/EditBlog"

function EditPage() {
  return (
    <div className='w-full flex justify-center min-h-screen pt-10 bg-slate-950'>
      <EditBlog btnType='save' editType='edit'/>
    </div>
  )
}

export default EditPage
