import React from 'react'

function GoalItem({item}) {
  return (
    <div className='goal'>
        <div>
            <h1>{item.Title}</h1>
        </div>
    </div>
  )
}

export default GoalItem