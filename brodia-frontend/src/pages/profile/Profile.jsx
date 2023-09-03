import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TimeLine from '../../components/timeline/TimeLine'
import Rightbar from '../../components/rightbar/Rightbar'
import "./Profile.css"

// homeContainerで囲むことでflexによる横並びが可能
// width 100% とかの意味を改めて把握しときたい

export default function profile() {
  return (
    <>
        <Topbar />
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src="assets/post/3.jpeg" alt="" className='profileCoverImg'/>
                    <img src="assets/person/1.jpeg" alt="" className='profileUserImg'/>
                </div>
                <div className="profileInfo">
                    <h4 className='profileInfoName'>Yuto Nose</h4>
                    <span className="profileInfoDesc">情報局長</span>
                </div>
            </div>
            <div className="profileRightBottom">
                <TimeLine />
                <Rightbar profile/>
            </div>
                
            </div>
        </div>
    </>
  )
}


