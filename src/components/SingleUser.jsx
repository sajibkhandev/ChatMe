import React from 'react'
import Profile2 from '../assets/profile2.png'

const SingleUser = ({name,email}) => {
  return (
    <div className='title-profile'>
                <div className='title-pere'>
                    <div className='image-box'><img src={Profile2} alt="" /></div>
                    <div>
                            <h4>{name}</h4>
                            <p>{email}</p>
                   </div>
                </div>
                <button>Add</button>
            </div>
  )
}

export default SingleUser