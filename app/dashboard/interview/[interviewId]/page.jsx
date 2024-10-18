"use client"
import React, { useEffect } from 'react'

const Interview = ({params}) => {

    useEffect(()=>{
         console.log(params)
    },[])

  return (
    <div>Interview</div>
  )
}

export default Interview