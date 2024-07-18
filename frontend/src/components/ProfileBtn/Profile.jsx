import React from 'react'

function Profile({profilePic}) {
  return (
    <div className='w-[40px] relative h-[40px] rounded-full overflow-hidden'>
      <img className=" w-full object-contain" src={profilePic} alt={profilePic} />
    </div>
  )
}

export default Profile
