"use client"

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

import Link from 'next/link'
import React, { useState } from 'react';
import Image from 'next/image'

const options = [
  "Lighting",
  "Aircon",
  "Electricity",
  "Cleanliness",
  "Security",
  "Horticulture",
  "Elevator",
  "Others",
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
        <div className="flex flex-wrap justify-center p-10">
            {imageUrls.map((imageUrl, index) => (
                <div
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 pt-6 pb-6 flex justify-center items-center overflow-hidden transition duration-100 ease-in-out transform hover:bg-purple-50"
                key={index}
                onMouseEnter={() => setIndex(index)}
                onMouseLeave={() => setIndex(null)}
                >
                    <Link href={`/tenant/${options[index]}`}>
                        <Image
                        src={hoveredIndex === index ? hoveredimageUrls[index] : imageUrl}
                        alt={`Image ${index + 1}`}
                        />
                    </Link>  
             </div>
            ))}
        </div>
        
    )
}