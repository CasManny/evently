import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navitems = () => {
    const pathname = usePathname()
    
  return (
      <ul className='md:flex-between flex w-full flex-col items-start md:flex-row'>
          {headerLinks.map((link) => {
            const active = pathname === link.route
              return (
                  <li key={link.label} className={`${active && 'text-primary-500'} flex-center p-medium-16 whitespace-nowrap`}>
                      <Link href={link.route}>{link.label }</Link>
                  </li>
              )
          })}
    </ul>
  )
}

export default Navitems