import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t p-5'>
      <div className="flex-center wrapper flex-between flex flex-col md:flex-row p-5 text-center xs:flex-col">
        <Link href='/'>
          <Image src="/assets/images/logo.svg" alt='logo' width={128} height={28} />
        </Link>
        <p>2023 EventMeet. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer