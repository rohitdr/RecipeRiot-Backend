import React from 'react'
import { Button } from '@nextui-org/react'
import { AnimatePresence } from 'framer-motion'
import AnimatedPage from './AnimatedPage'
export default function NoResult(props) {
  return (
    <>
<AnimatedPage>
<section className="">

  <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{backgroundColor: "hsl(0, 0%, 96%)"}}>
    <div className="container">
      <div className="row gx-lg-5 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <h1 className="my-5 display-3 fw-bold ls-tight text-primary">
          {props.heading}<br />
            <span className=""></span>
          </h1>
          <p style={{color: "hsl(217, 10%, 50.8%)"}}>
          {props.paragraph}
          </p>
         {props.button}
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card box_decrease_size_animation_for_recipeitem">
            <div className="card-body py-5 px-md-5 ">
             <img src={props.img} alt="result not found" className=''/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</section>
</AnimatedPage>
    </>
  )
}
