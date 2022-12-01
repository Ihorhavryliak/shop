import React from 'react'
import { AdvantagesData } from '../../../data/advantages'

import './Advantages.scss'
export const Advantages = React.memo(() => {

  return (
    <section className="my-lg-14 my-8">
      <div className="container">
        <div className="row">
          {AdvantagesData.map((m, i) =>{
            return(
              <div key={`${i}_${m.name}`} className="col-md-6 col-lg-3">
              <div className="mb-8 mb-xl-0">
                <div className="mb-3 advantages__icon">
                {m.icon}</div>
                <h3 className="h5 mb-3 ">
                {m.name}
                </h3>
                <p className='advantages__color__text'>
                 {m.description}</p>
              </div>
            </div>
            )
          })}
        

        </div>
      </div>
    </section>
  )
})
