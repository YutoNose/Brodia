import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TimeLine from '../../components/timeline/TimeLine'
import Rightbar from '../../components/rightbar/Rightbar'
import "./Home.css"

// homeContainerで囲むことでflexによる横並びが可能
// width 100% とかの意味を改めて把握しときたい

export default function home() {
  return (
    <>
        <Topbar />
        <div className="homeContainer">
          <Sidebar />
          <TimeLine />
          <Rightbar/>
        </div>
    </>
  )
}

