'use client'
import * as React from 'react'
import css from './menu.module.css'
import { Box } from '@mui/material'

const Page = (props: React.ComponentPropsWithoutRef<'main'>) => {
  return (
    <Box component="main" sx={{ p: 2 }} {...props} />
  )
}

export default Page
