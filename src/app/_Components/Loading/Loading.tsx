import React from 'react'
import { BarLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className = "absolute flex justify-center items-center top-0 bottom-0 left-0 right-0  ">
        <BarLoader color="#634c9f" />
    </div>
  )
}
