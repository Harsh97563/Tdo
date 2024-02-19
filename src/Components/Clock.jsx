import React, {useState, useEffect} from 'react'

function Clock({Name}) {
    const [time, settime] = useState(new Date())
    useEffect(() => {
        setInterval(() => {
          settime(new Date())
        }, 1000);
      }, [])
  return (
    <div className='m-4 md:m-8 bg-teal-900 w-[92vw] md:w-[20vw] flex flex-col items-center justify-center text-lime-500  h-[20vh] rounded-3xl'>
        <div className=' text-white font-bold font-mono text-2xl'>Welcome, {Name}</div>
        <div className='text-7xl duration-100' >
          {time.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit',second: '2-digit', hour12: false })}
        </div>
        <div className=' text-white font-mono font-bold text-2xl'>
          {time.toLocaleDateString('en-IN', { weekday: 'long' })}
        </div>
      </div>
  )
}

export default Clock