'use client';
import React, { useEffect, useState } from 'react';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import Rating from '@mui/material/Rating';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
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

const PlayerStats = (props: any) => {
  const { rowData, playerName, classname, match } = props;
  const [value, setValue] = useState<number>(2);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [aiAlerts, setAiAlerts] = useState<AiAlerts | null>(null);
  const [pieData, setPieData] = useState<any[]>([
    { name: 'Group A', value: 70 },
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
      setAlertEng(aiAlerts.insights.join('\n'));
      const formattedInsights = aiAlerts.insights
        .map((insight) =>
          insight.split('\n')[0].split(':').slice(1).join(':').trim()
        )
        .join('\n');
      setAlertEng(formattedInsights);
    }
  }, [aiAlerts]);
  // "Headline: Vettori to leave Australia Test coaching duties for IPL auction
  // Sentiment: -1.00, Relevance: 2.54
  // "
  useEffect(() => {
    if (aiAlerts) {
      setAlertHindi(
        'प्लेयर एक्स ने शानदार शतक बनाया, लेकिन एक दुर्घटना का शिकार हो गया। \nप्लेयर एक्स की मैच विजेता प्रदर्शन के लिए प्रशंसा की गई। \nखिलाड़ी X को अगले मैच से पहले फिटनेस संबंधी चिंताओं का सामना करना पड़ता है।'
      );
    }
  }, [aiAlerts]);

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

  if (!playerData) {
    return (
      <div
        className={`bg-gray-600 bg-opacity-10 border-y-2 border-gray-600 border-opacity-60 flex flex-col w-full ${classname}`}
      >
        <div className="w-auto h-[20%] mx-3 mt-3 flex gap-2">
          <GraphModal
            Component={() => (
              <div className="bg-[#312D2C] mr-2 w-[25%] rounded-2xl flex flex-col">
                <p className="text-[#E4DAD7] text-lg ml-5 mt-2">
                  Batting First
                </p>
                <div className="flex w-full mb-2 mt-2">
                  <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">
                    0
                  </p>
                  <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                    FPts
                  </p>
                </div>
              </div>
            )}
            Heading="Batting First"
            data={randomdata}
          />
          <div className="bg-[#312D2C] mr-2 w-[25%] rounded-2xl flex flex-col">
            <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Chasing</p>
            <div className="flex w-full mb-2 mt-2">
              <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">0</p>
              <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                FPts
              </p>
            </div>
          </div>
          <div className="bg-[#312D2C] mr-2 w-[25%] rounded-2xl flex flex-col">
            <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Strike Rate</p>
            <div className="flex w-full mb-2 mt-2">
              <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">0</p>
              <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                FPts
              </p>
            </div>
          </div>
          <div className="bg-[#312D2C] w-[25%] rounded-2xl flex flex-col">
            <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Economy Rate</p>
            <div className="flex w-full mb-2 mt-2">
              <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">0</p>
              <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
                FPts
              </p>
            </div>
          </div>
        </div>
        <div className="w-auto h-[60%] m-3 rounded-2xl flex gap-2">
          <div className="w-[60%] rounded-xl flex flex-col gap-2">
            <div className="bg-[#312D2C] mt-1 mr-2 h-[50%] rounded-xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-2 mt-2 mb-2 font-bold pl-3">
                Pitch Performance Prediction
              </p>
              <RadialBarChart
                width={200}
                height={100}
                outerRadius="80%"
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  label={{ fill: '#666', position: 'insideStart' }}
                  background
                  dataKey="uv"
                />
              </RadialBarChart>
            </div>
            <div className="bg-[#312D2C] h-[50%] mt-2 mr-2 rounded-2xl flex flex-col pb-3">
              <p className="text-[#E4DAD7] text-lg ml-2 mt-2 mb-2 font-bold pl-3">
                Relative FPts
              </p>
              <div className="scale-90 h-full w-full flex items-center justify-center">
                <PieChart width={200} height={100}>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#36D25D"
                  />
                </PieChart>
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
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" stroke="white" />
                  <YAxis stroke="" />
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
            <div className="rounded-xl flex gap-2">
              <div className="bg-[#312D2C] w-full justify-center align-middle mt-2 mr-2 rounded-2xl flex flex-col">
                <p className="text-[#E4DAD7] text-center text-lg mx-3">
                  Ceil Fpts
                </p>
                <p className="text-[#E4DAD7] text-center text-3xl font-bold">
                  0
                </p>
              </div>
              <div className="bg-[#312D2C] w-full justify-center align-middle mt-2 mr-2 rounded-2xl flex flex-col">
                <p className="text-[#E4DAD7] text-center text-lg mx-3">
                  Floor Fpts
                </p>
                <p className="text-[#E4DAD7] text-center text-3xl font-bold">
                  0
                </p>
              </div>
              <div className="bg-[#312D2C] w-full mt-2 rounded-2xl flex flex-col">
                <p className="text-[#E4DAD7] text-lg ml-4 mt-2 mb-2">Risk</p>
                <p className="text-white mx-4 rounded-[3px] text-center text-2xl bg-[#D83D3D] font-bold mb-2 px-7">
                  High
                </p>
              </div>
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
      <div className="w-auto h-[20%] mx-3 mt-3 flex gap-2">
        <GraphModal
          Component={() => (
            <div className="bg-[#312D2C] mr-2 w-full rounded-2xl flex flex-col">
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
          data={playerData.values.batting_first_predicted_score}
        />
        <GraphModal
          Component={() => (
            <div className="bg-[#312D2C] mr-2 w-full rounded-2xl flex flex-col">
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
          data={playerData.values.chasing_first_predicted_score}
        />
        <div className="bg-[#312D2C] mr-2 w-[25%] rounded-2xl flex flex-col">
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
        <div className="bg-[#312D2C] w-[25%] rounded-2xl flex flex-col">
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
            <div className="scale-90 h-full w-full flex items-center justify-center">
              <PieChart width={200} height={100}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#36D25D"
                />
                <Cell fill="#34C759" />
              </PieChart>
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
          <div className=" rounded-xl flex gap-2">
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
