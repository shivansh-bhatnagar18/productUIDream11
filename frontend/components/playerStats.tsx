'use client';
import React, { useEffect, useState } from 'react';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import Rating from '@mui/material/Rating';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { PieChart } from '@mui/x-charts/PieChart';
import GraphModal from './graphModal';

interface Props {
  rowData: any[];
  playerName: string;
  match: string;
}
interface AiAlerts {
  final_rating: number;
  insights: string[];
  [key: string]: any;
}

export interface PlayerData {
  name: string;
  imageSrc: string;
  isSelected: boolean;
  isCaptain: boolean;
  isViceCaptain: boolean;
  toCompare: boolean;
  values: {
    batting_first_predicted_score: number[];
    chasing_first_predicted_score: number[];
    strike_rate: number[];
    economy: number[];
    ceil_value: number;
    floor_value: number;
    y_actual: number[];
    y_pred: number[];
    [key: string]: any;
  };
  ai_alerts: AiAlerts;
}

const sortRowDataByScore = (data: any[]) => {
  return data
    .filter(
      (player) => player && player.values && player.values.score !== undefined
    )
    .sort((a, b) => b.values.score - a.values.score);
};

const PlayerStats = (props: any) => {
  const { rowData, playerName, classname, match } = props;
  const [total, setTotal] = useState<number>(0);
  const [endAngle, setEndAngle] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [aiAlerts, setAiAlerts] = useState<AiAlerts | null>(null);
  const [pieData, setPieData] = useState<any[]>([
    { name: 'Group A', value: 100 },
  ]);
  const randomdata = [{ name: 'Group B', value: 100 }];
  const [databar, setDatabar] = useState<any[]>([
    { name: 'Match 1', actual: 0, predictions: 0 },
    { name: 'Match 2', actual: 0, predictions: 0 },
    { name: 'Match 3', actual: 0, predictions: 0 },
    { name: 'Match 4', actual: 0, predictions: 0 },
    { name: 'Match 5', actual: 0, predictions: 0 },
    { name: 'Match 6', actual: 0, predictions: 0 },
  ]);
  const [pitchData, setPitchData] = useState<any[]>([
    { name: 'Percentage', uv: 100, pv: 2400, fill: '#312D2C' },
    { name: 'Percentage', uv: 72, pv: 4567, fill: '#34C759' },
  ]);

  useEffect(() => {
    console.log('rowData:', rowData);
    const data = rowData.find((player: any) => player.name === playerName);
    console.log('Found player data:', data);
    setPlayerData(data);
    if (data) {
      setAiAlerts(data.ai_alerts);
    }
  }, [rowData, playerName]);

  useEffect(() => {
    if (rowData && rowData.length > 0) {
      const sortedRowData = sortRowDataByScore(rowData);
      console.log('Sorted rowData:', sortedRowData);
      let sum = 0;
      for (let i = 0; i < Math.min(11, sortedRowData.length); i++) {
        sum += sortedRowData[i].values.score;
      }
      setTotal(sum);
      const data = sortedRowData.find(
        (player: any) => player.name === playerName
      );
      console.log('Found player data:', data);
      setPlayerData(data);
      if (data) {
        setAiAlerts(data.ai_alerts);
      }
    }
  }, [rowData, playerName]);

  const updateDatabar = (y_actual: number[], y_pred: number[]) => {
    const updatedDatabar = databar.map((item, index) => ({
      ...item,
      actual: y_actual[index] || 0,
      predictions: y_pred[index] || 0,
    }));
    updatedDatabar[5].actual = null;
    setDatabar(updatedDatabar);
    return updatedDatabar;
  };

  useEffect(() => {
    if (playerData) {
      const updatedData = updateDatabar(
        playerData.values.y_actual,
        playerData.values.y_pred
      );
      const updatedPitchData = [
        { name: 'Percentage', uv: 100, fill: '#312D2C' },
        {
          name: 'Percentage',
          uv: Math.round(playerData.values.score),
          fill: '#34C759',
        },
      ];
      setPitchData(updatedPitchData);
    }
  }, [playerData]);

  const [alertEng, setAlertEng] = useState<string>('Loading...');
  const [alertHindi, setAlertHindi] = useState<string>('Loading...');

  useEffect(() => {
    if (aiAlerts) {
      const englishInsights = aiAlerts.insights
        .map((insight: any) => insight.en)
        .join('\n');
      const hindiInsights = aiAlerts.insights
        .map((insight: any) => insight.hi)
        .join('\n');
      setAlertEng(englishInsights);
      setAlertHindi(hindiInsights);
    }
  }, [aiAlerts]);

  // useEffect(() => {
  //   if (aiAlerts) {
  //     setAlertHindi(
  //       'प्लेयर एक्स ने शानदार शतक बनाया, लेकिन एक दुर्घटना का शिकार हो गया। \nप्लेयर एक्स की मैच विजेता प्रदर्शन के लिए प्रशंसा की गई। \nखिलाड़ी X को अगले मैच से पहले फिटनेस संबंधी चिंताओं का सामना करना पड़ता है।'
  //     );
  //   }
  // }, [aiAlerts]);

  useEffect(() => {
    if (playerData && total) {
      console.log(total);
      let endAngle = (playerData.values.score / total) * 100;
      setEndAngle(endAngle);
      setPieData([
        { name: playerName, value: endAngle, color: '#34C759' },
        {
          name: playerName,
          value: 100 - endAngle,
          color: '#312d2c',
        },
      ]);
    }
  }, [playerData, total]);

  const handleSpeakerClickEnglish = () => {
    if (!alertEng) {
      return;
    }

    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(alertEng);
    utterThis.rate = 1.5;
    utterThis.pitch = 1;
    utterThis.lang = 'en-US';

    synth.speak(utterThis);
  };
  const handleSpeakerClickHindi = () => {
    if (!alertHindi) {
      return;
    }

    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(alertHindi);
    utterThis.rate = 1;
    utterThis.pitch = 1;
    utterThis.lang = 'hi-IN';

    synth.speak(utterThis);
  };
  const riskLevels = ['High', 'Mid', 'Low'];
  const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
  const riskColor = randomRisk === 'High' ? '#D83D3D' : randomRisk === 'Mid' ? '#FFA500' : '#34C759';

  if (!playerData) {
    return (
      <div
      className={`bg-gray-600 bg-opacity-10 border-y-2 border-gray-600 border-opacity-60 flex flex-col w-full ${classname}`}
    >
      <div className="w-[95%] justify-between h-[20%] mt-3 flex ml-5">
        <GraphModal
          Component={() => (
            <div className="bg-[#312D2C] px-2 w-full rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Batting First</p>
              <div className="flex w-full mb-2 mt-2">
                <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">
                  {Math.round(
                    0
                  )}
                </p>
                <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                  FPts
                </p>
              </div>
            </div>
          )}
          Heading="Batting First"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut ea temporibus odio quaerat laudantium magnam repellat tempore, libero natus. Similique tempora consequatur velit facere quos aut cupiditate temporibus minima. Minima?"
          data={null}
        />
        <GraphModal
          Component={() => (
            <div className="bg-[#312D2C] mr-2 px-2 w-full rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Chasing</p>
              <div className="flex w-full mb-2 mt-2">
                <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">
                  {' '}
                  {Math.round(
                    0
                  )}
                </p>
                <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                  FPts
                </p>
              </div>
            </div>
          )}
          Heading="Chasing"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut ea temporibus odio quaerat laudantium magnam repellat tempore, libero natus. Similique tempora consequatur velit facere quos aut cupiditate temporibus minima. Minima?"
          data={null}
        />
        
        <GraphModal
          Component={() => (
            <div className="bg-[#312D2C] mr-2 px-2 w-full rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Strike Rate</p>
              <div className="flex w-full mb-2 mt-2">
                <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">
                  {Math.round(0)}
                </p>
                <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                  FPts
                </p>
              </div>
            </div>
          )}
          Heading="Strike Rate"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut ea temporibus odio quaerat laudantium magnam repellat tempore, libero natus. Similique tempora consequatur velit facere quos aut cupiditate temporibus minima. Minima?"
          data={null}
        />

        <GraphModal
          Component={() => (
            <div className="bg-[#312D2C] mr-2 px-2 w-full rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Economy Rate</p>
              <div className="flex w-full mb-2 mt-2">
                <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">
                  {' '}
                  {Math.round(0)}
                </p>
                <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                  FPts
                </p>
              </div>
            </div>
          )}
          Heading="Economy Rate"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut ea temporibus odio quaerat laudantium magnam repellat tempore, libero natus. Similique tempora consequatur velit facere quos aut cupiditate temporibus minima. Minima?"
          data={null}
        />
      </div>
      <div className=" w-auto h-[60%] m-3 rounded-2xl flex gap-2">
        <div className="w-[60%] rounded-xl flex flex-col gap-2">
          <div className="bg-[#312D2C] mt-1 mr-2 h-[50%] rounded-xl flex flex-col">
            <p className="text-[#E4DAD7] text-lg ml-2 mt-2 mb-2 font-bold pl-3">
              Pitch Performance Prediction
            </p>

            <div className="scale-[250%] mt-10 h-full w-full items-center justify-center">
              <RadialBarChart
                width={250}
                height={100}
                innerRadius={20}
                outerRadius={40}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  // minAngle={15}
                  label={{
                    fill: '#312D2C',
                    position: 'insideStart',
                    fontSize: 8,
                  }}
                  background
                  // clockWise={true}
                  dataKey="uv"
                />
              </RadialBarChart>
            </div>
            {/* <p className=''>High</p> */}
          </div>
          <div className="bg-[#312D2C] h-[50%] mt-2 mr-2 rounded-2xl flex flex-col pb-3">
            <p className="text-[#E4DAD7] text-lg ml-2 mt-2 font-bold pl-3">
              Relative FPts
            </p>
            <div className="scale-90 h-full w-full flex items-end justify-center">
              <PieChart
                height={150}
                width={250}
                series={[
                  {
                    color: '#34C759',
                    data: pieData,
                    innerRadius: 20,
                    outerRadius: 50,
                    paddingAngle: 3,
                    cornerRadius: 0,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 120,
                    cy: 80,
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-auto rounded-xl mt-1 flex flex-col gap-2">
          <div className="bg-[#312D2C] h-full rounded-2xl flex flex-col gap-2">
            <p className="text-[#E4DAD7] text-lg ml-2 mt-2 font-bold pl-2">
              Performance Prediction
            </p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={databar}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="predictions"
                  stroke="#367CEA"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="actual" stroke="#67B402" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className=" rounded-xl flex gap-1">
            <div className="bg-[#312D2C] w-full justify-center align-middle mt-2 mr-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-center text-lg mx-3">
                Ceil Fpts
              </p>
              <p className="text-[#E4DAD7] text-center text-4xl font-bold">
                {Number(0)}
              </p>
            </div>
            <div className="bg-[#312D2C] w-full justify-center align-middle mt-2 mr-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-center text-lg mx-3">
                Floor Fpts
              </p>
              <p className="text-[#E4DAD7] text-center text-4xl font-bold">
                {Number(0)}
              </p>
            </div>
            <div className="bg-[#312D2C] w-full mt-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-4 mt-2 mb-2">Risk</p>
              <p className="text-white mx-4 rounded-[3px] text-center text-2xl bg-[#D83D3D] font-bold mb-2 px-7 ">
                High
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#312D2C] w-auto h-[30%] mb-3 mt-1 mx-3 rounded-2xl flex flex-col gap-2">
        <div className="flex flex-col justify-between my-5">
          <div className="flex justify-between mb-5">
            <div className="text-white text-lg ml-9">Alerts</div>
            <Rating
              name="read-only"
              value={aiAlerts?.final_rating || 0}
              readOnly
            />
            <div className="flex justify-around gap-2 ">
              <div
                onClick={() => {
                  setIsClicked((prev) => !prev);
                }}
                className={`${isClicked ? 'text-[#787878]' : 'text-white'}`}
              >
                English
              </div>
              <div>|</div>
              <div
                onClick={() => {
                  setIsClicked((prev) => !prev);
                }}
                className={`${isClicked ? 'text-white' : 'text-[#787878]'}`}
              >
                हिन्दी
              </div>
            </div>
            <VolumeUpIcon
              className="mr-5"
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth.speaking) {
                  synth.cancel();
                } else {
                  isClicked
                    ? handleSpeakerClickHindi()
                    : handleSpeakerClickEnglish();
                }
              }}
            />
          </div>
          
        </div>
      </div>
    </div>
    );
  }
  console.log(playerData);
  console.log(rowData);
  return (
    <div
      className={`bg-gray-600 bg-opacity-10 border-y-2 border-gray-600 border-opacity-60 flex flex-col w-full ${classname}`}
    >
      <div className="w-[95%] justify-between h-[20%] mt-3 flex ml-5">
        <GraphModal
          Component={() => (
            <div className="bg-[#312D2C] px-2 w-full rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Batting First</p>
              <div className="flex w-full mb-2 mt-2">
                <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">
                  {Math.round(
                    playerData.values.batting_first_predicted_score[0]
                  )}
                </p>
                <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                  FPts
                </p>
              </div>
            </div>
          )}
          Heading="Batting First"
          description="These show how many fantasy points a player scores when their team bats first or chases a target. Use this to see if a player performs better under pressure or when setting the pace."
          data={playerData.values.batting_first_predicted_score}
        />
        <GraphModal
          Component={() => (
            <div className="bg-[#312D2C] mr-2 px-2 w-full rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Chasing</p>
              <div className="flex w-full mb-2 mt-2">
                <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">
                  {' '}
                  {Math.round(
                    playerData.values.chasing_first_predicted_score[3]
                  )}
                </p>
                <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                  FPts
                </p>
              </div>
            </div>
          )}
          Heading="Chasing"
          description="These show how many fantasy points a player scores when their team bats first or chases a target. Use this to see if a player performs better under pressure or when setting the pace."
          data={playerData.values.chasing_first_predicted_score}
        />

        <GraphModal
          Component={() => (
            <div className="bg-[#312D2C] mr-2 px-2 w-full rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Strike Rate</p>
              <div className="flex w-full mb-2 mt-2">
                <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">
                  {Math.round(playerData.values.strike_rate[0])}
                </p>
                <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                  FPts
                </p>
              </div>
            </div>
          )}
          Heading="Strike Rate"
          description="This is how quickly a batter scores runs or how efficiently a bowler takes wickets. Higher is usually better?"
          data={playerData.values.strike_rate}
        />

        <GraphModal
          Component={() => (
            <div className="bg-[#312D2C] mr-2 px-2 w-full rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Economy Rate</p>
              <div className="flex w-full mb-2 mt-2">
                <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">
                  {' '}
                  {Math.round(playerData.values.economy[0])}
                </p>
                <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                  FPts
                </p>
              </div>
            </div>
          )}
          Heading="Economy Rate"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut ea temporibus odio quaerat laudantium magnam repellat tempore, libero natus. Similique tempora consequatur velit facere quos aut cupiditate temporibus minima. Minima?"
          data={playerData.values.economy}
        />
      </div>
      <div className=" w-auto h-[60%] m-3 rounded-2xl flex gap-2">
        <div className="w-[60%] rounded-xl flex flex-col gap-2">
          <div className="bg-[#312D2C] mt-1 mr-2 h-[50%] rounded-xl flex flex-col">
            <p className="text-[#E4DAD7] text-lg ml-2 mt-2 mb-2 font-bold pl-3">
              Pitch Performance Prediction
            </p>

            <div className="scale-[250%] mt-10 h-full w-full items-center justify-center">
              <RadialBarChart
                width={250}
                height={100}
                innerRadius={20}
                outerRadius={40}
                data={pitchData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  // minAngle={15}
                  label={{
                    fill: '#312D2C',
                    position: 'insideStart',
                    fontSize: 8,
                  }}
                  background
                  // clockWise={true}
                  dataKey="uv"
                />
              </RadialBarChart>
            </div>
            {/* <p className=''>High</p> */}
          </div>
          <div className="bg-[#312D2C] h-[50%] mt-2 mr-2 rounded-2xl flex flex-col pb-3">
            <p className="text-[#E4DAD7] text-lg ml-2 mt-2 font-bold pl-3">
              Relative FPts
            </p>
            <div className="scale-90 h-full w-full flex items-end justify-center">
              <PieChart
                height={150}
                width={250}
                series={[
                  {
                    color: '#34C759',
                    data: pieData,
                    innerRadius: 20,
                    outerRadius: 50,
                    paddingAngle: 3,
                    cornerRadius: 0,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 120,
                    cy: 80,
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-auto rounded-xl mt-1 flex flex-col gap-2">
          <div className="bg-[#312D2C] h-full rounded-2xl flex flex-col gap-2">
            <p className="text-[#E4DAD7] text-lg ml-2 mt-2 font-bold pl-2">
              Performance Prediction
            </p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={databar}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="predictions"
                  stroke="#367CEA"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="actual" stroke="#67B402" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className=" rounded-xl flex gap-1">
            <div className="bg-[#312D2C] w-full justify-center align-middle mt-2 mr-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-center text-lg mx-3">
                Ceil Fpts
              </p>
              <p className="text-[#E4DAD7] text-center text-4xl font-bold">
                {Number(playerData.values.ceil_value.toFixed(2))}
              </p>
            </div>
            <div className="bg-[#312D2C] w-full justify-center align-middle mt-2 mr-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-center text-lg mx-3">
                Floor Fpts
              </p>
              <p className="text-[#E4DAD7] text-center text-4xl font-bold">
                {Number(playerData.values.floor_value.toFixed(2))}
              </p>
            </div>
            <div className="bg-[#312D2C] w-full mt-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-4 mt-2 mb-2">Risk</p>
              <p className={`text-white mx-4 rounded-[3px] text-center text-2xl bg-[${riskColor}] font-bold mb-2 px-7`}>
                  {randomRisk}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#312D2C] w-auto h-[30%] mb-3 mt-1 mx-3 rounded-2xl flex flex-col gap-2">
        <div className="flex flex-col justify-between my-5">
          <div className="flex justify-between mb-5">
            <div className="text-white text-lg ml-9">Alerts</div>
            <Rating
              name="read-only"
              value={aiAlerts?.final_rating || 0}
              readOnly
            />
            <div className="flex justify-around gap-2 ">
              <div
                onClick={() => {
                  setIsClicked((prev) => !prev);
                }}
                className={`${isClicked ? 'text-[#787878]' : 'text-white'}`}
              >
                English
              </div>
              <div>|</div>
              <div
                onClick={() => {
                  setIsClicked((prev) => !prev);
                }}
                className={`${isClicked ? 'text-white' : 'text-[#787878]'}`}
              >
                हिन्दी
              </div>
            </div>
            <VolumeUpIcon
              className="mr-5"
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth.speaking) {
                  synth.cancel();
                } else {
                  isClicked
                    ? handleSpeakerClickHindi()
                    : handleSpeakerClickEnglish();
                }
              }}
            />
          </div>
          {isClicked
            ? alertHindi.split('\n').map((line, index) => (
                <p key={index} className="text-white text-sm ml-10">
                  • {line}
                </p>
              ))
            : alertEng.split('\n').map((line, index) => (
                <p key={index} className="text-white text-sm ml-10">
                  • {line}
                </p>
              ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
