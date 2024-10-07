import React from 'react'

function DocItem(props: any) {
  return (
    <li onClick={()=>{/*props.delOne(props.data.doc)*/}}><code>{JSON.stringify(props.data)}</code></li>
  )
}

export default DocItem