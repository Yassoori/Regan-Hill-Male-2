import React from 'react'
import { TailSpin } from "react-loader-spinner";


const Loading = () => {
  return (
    <div>
      <TailSpin
        // color="#e53131"
        height={100}
        width={100}
      />
    </div>
  )
}

export default Loading
