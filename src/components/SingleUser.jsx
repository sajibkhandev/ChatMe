import React from 'react'
import Profile2 from '../assets/profile2.png'

const SingleUser = () => {
  return (
    <div className='title-profile'>
                <div className='title-pere'>
                    <div className='image-box'><img src={Profile2} alt="" /></div>
                    <div>
                            <h4>Friends Reunion</h4>
                            <p>Hi Guys, Wassup!</p>
                   </div>
                </div>
                <button>Join</button>
            </div>
  )
}

export default SingleUser