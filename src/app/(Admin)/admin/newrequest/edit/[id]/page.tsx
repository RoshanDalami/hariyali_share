'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import CreateApplicatonEdit from './ApplicationEdit'
import { useQuery } from '@tanstack/react-query'
import {
    GetRequestById
} from '@/services/apiServices/request/requestServices'
import Loading from '@/app/(Admin)/Components/Loading'
export default function RequestEdit() {
    const {id}:{id:string} = useParams()
    console.log(id)
    const getrequestById = async () =>{
        const {data} = await GetRequestById(id);
        return data
    }
    const {data:IndividualData,isError,isLoading} = useQuery({
        queryKey:['requestbyid'],
        queryFn:getrequestById
    })

  return (
    <div>
        {
            isLoading ? <Loading/> : 
      <CreateApplicatonEdit clickedDataId={IndividualData} />
        }
    </div>
  )
}
