'use client'
import React from "react"
import { useEffect, useState } from "react"
import { RadialBarChart, RadialBar, Legend, Tooltip, PieChart, Pie } from 'recharts';

const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];

const data = [
    {
      "name": "Percentage",
      "uv": 100,
      "pv": 2400,
      "fill": "transparent"
    },
    {
      "name": "Percentage",
      "uv": 72,
      "pv": 4567,
      "fill": "#34C759"
    }
];

const PlayerStats = () => {

    return (
        <div className="bg-white bg-opacity-10 rounded-xl border-2 border-white flex flex-col w-full">
            <div className=" w-auto h-[20%] mx-3 mt-3 rounded-xl flex gap-2">
                <div className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col">
                    <p className="text-white text-lg ml-2 mt-2">Player Stats</p>
                    <p className="text-white text-5xl font-bold ml-2">30</p>
                </div>
                <div className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col">
                    <p className="text-white text-lg ml-2 mt-2">Player Stats</p>
                    <p className="text-white text-5xl font-bold ml-2">30</p>
                </div>
                <div className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col">
                    <p className="text-white text-lg ml-2 mt-2">Player Stats</p>
                    <p className="text-white text-5xl font-bold ml-2">30</p>
                </div>
                <div className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col">
                    <p className="text-white text-lg ml-2 mt-2">Player Stats</p>
                    <p className="text-white text-5xl font-bold ml-2">30</p>
                </div>
            </div> 
            <div className=" w-auto h-[60%] m-3 rounded-xl flex gap-2">
                <div className="w-[30%] rounded-xl flex flex-col gap-2">
                    <div className="bg-white bg-opacity-20 h-[50%] rounded-xl flex flex-col">
                        <p className="text-white text-lg ml-2 mt-2">Player Stats</p>
                        <RadialBarChart 
                            width={200} 
                            height={100} 
                            innerRadius="10%" 
                            outerRadius="80%" 
                            data={data} 
                            startAngle={180} 
                            endAngle={0}
                            >
                            <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
                            <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                            <Tooltip />
                        </RadialBarChart>
                    </div>
                    <div className="bg-white bg-opacity-20 h-[50%] rounded-xl flex flex-col">
                        <p className="text-white text-lg ml-2 mt-2">Player Stats</p>
                        <PieChart width={200} height={100}>
                            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#34C759" />
                            {/* <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
                        </PieChart>
                    </div>
                </div>
                <div className="w-[70%] rounded-xl flex flex-col gap-2">
                    <div className="bg-white bg-opacity-20 h-[65%] rounded-xl flex gap-2">
                    <p className="text-white text-lg ml-2 mt-2">Player Stats</p>
                    </div>
                    <div className="h-[35%] rounded-xl flex gap-2">
                        <div className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col">
                        <p className="text-white text-lg ml-2 mt-2">Player Stats</p>
                        <p className="text-white text-5xl font-bold ml-2">30</p>
                        </div>
                        <div className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col">
                        <p className="text-white text-lg ml-2 mt-2">Player Stats</p>
                        <p className="text-white text-5xl font-bold ml-2">30</p>
                        </div>
                        <div className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col">
                        <p className="text-white text-lg ml-2 mt-2">Player Stats</p>
                        <p className="text-white text-5xl font-bold ml-2">30</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white bg-opacity-20 w-auto h-[30%] mb-3 mx-3 rounded-xl flex gap-2">
            <p className="text-white text-lg ml-2 mt-2">Player Stats</p>
            </div>
        </div>
    )
}

export default PlayerStats