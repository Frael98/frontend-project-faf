import React from 'react'
import imagen from './imgs/error404quees.jpg'
export function NotFound() {
  return (
    <>
      <div className='container bg-dark rounded my-2 p-2'>
        <h1 className='text-center text-white'>
          NotFound 404
        </h1>
        <div className='row justify-content-center mb-5 mx-auto d-block'>
          <img src={imagen} className="rounded img-thumbnail
          "></img>
        </div>
      </div>
    </>
  )
}
