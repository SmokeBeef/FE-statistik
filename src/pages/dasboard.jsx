import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "../utils/axios";
import { MdSwapVert } from "react-icons/md";
import Background from "../components/background";

export default function Dasboard() {
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  // Form match
  const [homeTeam, setHomeTeam] = useState();
  const [awayTeam, setAwayTeam] = useState();

  // Data hasil fetch
  const [team, setTeam] = useState([]);

  // For match
  const [playerHome, setPlayerHome] = useState([]);
  const [playerAway, setPlayerAway] = useState([]);

  // Countdown
  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setCountdown(0);
    setIsRunning(false);
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  // -------

  // Fetching

  const getTeam = async () => {
    const res = await axios.get("team");
    setTeam(res.data.data);
  };

  // -------

  // Button

  const onSubmitMatch = async () => {
    const res = await axios.post("match/add", {});
  };
  // ------

  // onChangeHandle

  const onChangeHandleHome = async (e, data) => {
    setHomeTeam(data);

    if (data) {
      const res = await axios.get("player/id/" + data);
      setPlayerHome(res.data.data);
      console.log(data);
    } else {
      setPlayerHome([]);
    }
  };
  const onChangeHandleAway = async (e, data) => {
    setAwayTeam(data);
    if (data) {
      const res = await axios.get("player/id/" + data);
      setPlayerAway(res.data.data);
      console.log(data);
    } else {
      setPlayerAway([]);
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  useEffect(() => {
    if (countdown === 2700) setIsRunning(false);
    if (countdown === 5400) setIsRunning(false);
  }, [countdown]);
  return (
    <div className="font-Poppins">
      <Navbar />
      <Background/>
      <main className="mt-4 w-full h-full px-6 z-1 main-content">
        <div className="flex justify-between items-center h-1/2">
          <div className="w-1/3">
            <div className="flex flex-rows justify-center ">
              <label
                htmlFor="homeTeam"
                className="block text-white text-2xl mr-3 font-bold"
              >
                Home Team
              </label>
              <select
                id="homeTeam"
                name=""
                className="shadow appearance-none border rounded w-40 py-2 px-3 text-base text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={homeTeam}
                onChange={(e) => onChangeHandleHome(e, e.target.value)}
              >
                <option value="">---Pilih Team---</option>
                {team.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center">
              <h3 className="text-6xl text-white font-bold pt-10">0</h3>
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-center bg-slate-200">
            <div className="flex justify-center">
              <div className="w-72 py-5 text-center">
                <h1 className="text-2xl font-semibold">Time</h1>
                <h2 className="text-3xl my-5 font-bold">
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </h2>
                {!isRunning ? (
                  <button
                    className="bg-green-600 p-2 w-20 hover:bg-green-700 transition-colors rounded-lg text-slate-50"
                    onClick={handleStart}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    className="bg-yellow-600 hover:bg-yellow-700 p-2 w-20 rounded-lg"
                    onClick={handlePause}
                  >
                    Pause
                  </button>
                )}
                <button
                  type="submit"
                  className=" bg-blue-600 hover:bg-blue-700 transition-colors text-slate-100 py-2 px-3 rounded-lg mx-3"
                >
                  Submit
                </button>
                <button
                  className="p-2 rounded-lg w-20 hover:bg-red-700 bg-red-600 mt-4 text-slate-100"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex flex-rows justify-center ">
              <label
                htmlFor="awayTeam"
                className="block text-white text-2xl mr-3 font-bold"
              >
                Away Team
              </label>
              <select
                id="awayTeam"
                name=""
                className="shadow appearance-none border rounded w-40 py-2 px-3 text-base text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={awayTeam}
                onChange={(e) => onChangeHandleAway(e, e.target.value)}
              >
                <option value="">---Pilih Team---</option>
                {team.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center">
              <h3 className="text-6xl text-white font-bold pt-10">0</h3>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="team w-1/3 mt-10 ">
            {playerHome.map((data) => (
              <div key={data.numberJersey} className="flex">
                <button className="text-slate-100 py-2 px-3 rounded z-[1] bg-slate-800 hover:bg-slate-900 w-14 h-14 flex justify-center items-center">
                  {data.numberJersey}
                </button>
                <h3 className="flex items-center bg-slate-700 text-slate-100 rounded-r-xl -ml-4 h-14 pl-8 w-56 capitalize">
                  {data.name}
                </h3>
                <h3 className="w-[4.5rem] -z-[1] h-14 flex -ml-4 pl-4 items-center justify-center text-slate-100 bg-slate-600 rounded">
                  {data.position}
                </h3>
                <div className="ml-5">
                  <button className="w-10 h-14 bg-yellow-300 rounded"></button>
                </div>
                <div className="ml-5">
                  <button className="w-10 h-14 bg-red-600 rounded"></button>
                </div>
                <div className="flex items-center justify-center ml-5">
                  <button className="text-slate-500 hover:text-slate-800 transition-colors text-4xl">
                    <MdSwapVert className="text-white"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="team w-1/3 mt-10">
            {playerAway.map((data) => (
              <div key={data.numberJersey} className="flex">
                <div className="flex items-center justify-center mr-5">
                  <button className="text-slate-500 hover:text-slate-800 transition-colors text-4xl">
                    <MdSwapVert className="text-white"/>
                  </button>
                </div>
                <div className="mr-5">
                  <button className="w-10 h-14 bg-red-600 rounded"></button>
                </div>
                <div className="mr-5">
                  <button className="w-10 h-14 bg-yellow-300 rounded"></button>
                </div>
                <h3 className="w-[4.5rem] -mr-4 pr-4 -z-[1] h-14 flex items-center justify-center text-slate-100 bg-slate-600 rounded">
                  {data.position}
                </h3>
                <h3 className="flex items-center bg-slate-700 text-slate-100 rounded-l-xl justify-end pr-8 -mr-4 h-14 px-4 w-56 capitalize">
                  {data.name}
                </h3>
                <button className="text-slate-100 py-2 px-3 rounded z-[1] bg-slate-800 hover:bg-slate-900 w-14 h-14 flex justify-center items-center">
                  {data.numberJersey}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
