import React from 'react'

function Captaindetail() {
  return (
    <div>
        <div className="h-2/5">
      
        <div className="flex justify-between items-center ">
          <div className="flex items-center justify-start gap-4 mx-3 mt-4">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
              alt="driver"
            />
            <h4 className="text-lg font-medium">Harsh patel</h4>
          </div>
          <div className="flex items-center justify-start gap-4 mx-3 mt-4">
            <h4 className="text-xl font-semibold ">$295.20</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>

         <div className="flex items-start bg-gray-200 justify-center gap-5 mt-6 border-0 rounded-xl mx-4 ">
        <div className="text-center">
          <i className="text-2xl font-thin ri-calendar-schedule-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="text-center">
          <i className="text-2xl font-thin ri-speed-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-thin ri-sticky-note-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Captaindetail