'use client'
import React from 'react'
import CreateFiscalComp from '../CreateFiscal'
import { useParams } from 'next/navigation'
import {GetFiscalById} from '@/services/apiServices/office/officeServices'
import { useQuery } from '@tanstack/react-query'
export default function EditFiscalYear() {
    const {id}:{id:string} = useParams()
    const getFiscalYearById = async()=>{
        const {data} = await GetFiscalById(id)
        return data
    }
const {data:FiscalById} = useQuery({
    queryKey:['fiscalyearbyid'],
    queryFn: getFiscalYearById
})

  return (
    <div>
      <CreateFiscalComp clickedDataId = {FiscalById} />
    </div>
  )
}
