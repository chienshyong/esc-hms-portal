'use client'
import { Grid } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react';
import Image from 'next/image'

import lighting from '../../public/options/lighting.svg'
import aircon from '../../public/options/aircon.svg'
import electricity from '../../public/options/electricity.svg'
import cleanliness from '../../public/options/cleanliness.svg'
import security from '../../public/options/security.svg'
import horticulture from  '../../public/options/horticulture.svg'
import elevator from  '../../public/options/elevator.svg'
import others from  '../../public/options/others.svg'

import lightingc from '../../public/options/lightingc.svg'
import airconc from '../../public/options/airconc.svg'
import electricityc from '../../public/options/electricityc.svg'
import cleanlinessc from '../../public/options/cleanlinessc.svg'
import securityc from '../../public/options/securityc.svg'
import horticulturec from  '../../public/options/horticulturec.svg'
import elevatorc from  '../../public/options/elevatorc.svg'
import othersc from  '../../public/options/othersc.svg'

const options = [
  "lighting",
  "aircon",
  "electricity",
  "cleanliness",
  "security",
  "horticulture",
  "elevator",
  "others",
]

const imageUrls = [
  lighting,
  aircon,
  electricity,
  cleanliness,
  security,
  horticulture,
  elevator,
  others,
]

const hoveredimageUrls = [
  lightingc,
  airconc,
  electricityc,
  cleanlinessc,
  securityc,
  horticulturec,
  elevatorc,
  othersc,
]

export default function Options(){
    const [hoveredIndex, setIndex] = useState(null)
    return(
        <Grid container sx={{padding:"0 10vw"}}>
            {imageUrls.map((imageUrl, index) => (
              <Grid item xs={6} sm={4} md={4} lg={3} 
                key={index}
                sx={{display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                '&:hover': {
                backgroundColor: "#F8F4FF"},
                padding:"5ch 0"
              }}
                onMouseEnter={() => setIndex(index)}
                onMouseLeave={() => setIndex(null)}
              > 
              <Link href={`/tenant/${options[index]}`}>
                <Image
                src={hoveredIndex === index ? hoveredimageUrls[index] : imageUrl}
                alt={`Image ${index + 1}`}
                />
              </Link>  
              </Grid>
              ))}
           </Grid>
    )
}