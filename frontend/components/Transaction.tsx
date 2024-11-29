'use client'
import React from 'react'
import { Button } from '@mui/material';

function Transaction(props: any) {
    const { classname } = props;    
  return (
    <div className={`flex flex-col w-full h-full justify-center border-white rounded-3xl align-middle bg-[#2E1919] border-[1px] border-opacity-5 ${classname}`}>
        <div className='w-full font-bold text-3xl text-center pb-3 mt-3 border-white border-opacity-5 border-b-2'>Transaction</div>
        <div className='flex flex-col'>
            <div className='w-full justify-between flex px-5 mb-4 mt-4'>
                <p className='font-bold text-xl'> Fantasy Point</p>
                <div className='px-8 py-1 rounded-sm bg-[#34C759] w-fit font-bold text-2xl text-[#271919]'>+12</div>
            </div>
            <div className='w-full justify-between flex px-5 mb-4'>
                <p className='text-xl'> Strike Rate </p>
                <div className='px-8 py-1 rounded-sm bg-[#4D3232] w-fit font-bold text-xl text-[#34C759]'>+12</div>
            </div>
            <div className='w-full justify-between flex px-5 mb-4'>
                <p className='text-xl'> Economy Rate</p>
                <div className='px-8 py-1 rounded-sm bg-[#4D3232] w-fit font-bold text-xl text-[#34C759]'>+12</div>
            </div>
        </div>
        <div className='flex w-full items-center justify-center'>
            <Button
                type="button"
                variant="contained"
                className=" hover:bg-[#b03434] bg-[#F64848] font-bold rounded-lg p-2 justify-center align-middle mb-4"
            >
                View Detailed Analysis
            </Button>
        </div>
    </div>
  )
}

export default Transaction