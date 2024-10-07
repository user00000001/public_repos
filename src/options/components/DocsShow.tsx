import React from 'react'
import DocItem from './DocItem'

function RecordItem(props: any) {
  return (
    <ol>
      {props.data.map((v: any) => <DocItem key={v.id} delOne={props.delOne} data={v}/>)}
    </ol>
  )
}

export default RecordItem