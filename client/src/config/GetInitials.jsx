import React from 'react'

export default function GetInitials({name}) {
    let initials=name.split(" ")
    let initialsName=initials[0][0] 
    let names=initialsName.toUpperCase()
    if(initials.length > 1){
        let secondInitial=initials[1][0]
        names+=secondInitial.toUpperCase()
    }
   
  return (
  

    <div className="rounded-full bg-blue-950 w-10 text-center items-center flex justify-center text-white mr-4">{names}</div>
  )
}
