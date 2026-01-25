'use client'

import React, { useState } from 'react'
import { ReactReader } from 'react-reader'

export default function EPub() {
  const [location, setLocation] = useState<string | number>(0)
  return (
    <div className='bg-gray-900' style={{ height: '100vh' }}>
      <ReactReader
        url="https://react-reader.metabits.no/files/alice.epub"
        location={location}
        locationChanged={epubcfi => setLocation(epubcfi)}
      />
    </div>
  )
}
