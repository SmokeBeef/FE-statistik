import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Background from "../components/background";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import axios from "../utils/axios"

export default function Detail() {
  const tableRef = useRef(null);
  const today = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = today
    .toLocaleDateString("en-GB", options)
    .replace(/\//g, "-");

  const [dataMatch, setDataMatch] = useState([])
  const [data, setData] = useState([])
  const [player, setPlayer] = useState([])
  const [playerAway, setPlayerAway] = useState([])
  const [goalHome, setGoalHome] = useState()
  const [goalAway, setGoalAway] = useState()

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `Play- ${formattedDate}`,
    sheet: `Play- ${formattedDate}`,
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#ffffff",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      marginBottom: 10,
      fontFamily: "Helvetica",
      fontSize: 10,
      width: "100%",
    },
    tableHeader: {
      backgroundColor: "#f0f0f0",
      fontWeight: "bold",
    },
    tableRow: {
      borderBottomWidth: 1,
      borderColor: "#f0f0f0",
      flexDirection: "row",
    },
    tableCell: {
      padding: 5,
      color: "#000000",
    },
  });

  const MyDoc = () => (
    <Document>
      <Page size="A4">
        <View style={styles.section}>
          {/* Date */}
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Tanggal Permainan</Text>
          </View>

          <View style={styles.page}>
            {/* Image 1 */}
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                src={`${process.env.PUBLIC_URL}/profile.png`}
              />
            </View>

            {/* Score */}
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Score</Text>
              <Text style={styles.scoreText}>-</Text>
              <Text style={styles.scoreText}>Score</Text>
            </View>

            {/* Image 2 */}
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                src={`${process.env.PUBLIC_URL}/profile.png`}
              />
            </View>
          </View>

          {/* Table */}
          <View style={styles.table}>
            {player.map((data, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCell}>
                  <Text>{index + 1}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{data.name}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{data.numberJersey}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{data.position}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{data.team.name}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  const scoreTeamAway = async (idMatch, idTeam) => {

    await axios.get("goal/" + idMatch + "/" + idTeam)
      .then(res => {
        setGoalAway(res.data.data)
      })
      .catch()
  }
  const scoreTeamHome = async (idMatch, idTeam) => {

    await axios.get("goal/" + idMatch + "/" + idTeam)
      .then(res => {
        setGoalHome(res.data.data)
      })
      .catch()
  }

  const onChangeHandle = async (payload) => {
    const data = payload.split(" ")
    console.log(data);
    await axios.get("match/" + data[0])
      .then(res => {
        console.log(res.data);
        setData(res.data.data)

        setPlayer(res.data.data.home_team.player)
        setPlayerAway(res.data.data.away_team.player)

        scoreTeamHome(data[0], data[1])
        scoreTeamAway(data[0], data[2])
      })
      .catch(err => {

      })
  }
  const getMatch = async () => {
    await axios.get("match")
      .then(res => {
        setDataMatch(res.data.data)
      })
      .catch(err => { })
  }
  useEffect(() => {
    getMatch()
  }, [])

  return (
    <div>
      <Navbar />
      <Background />
      <main className="font-Poppins">
        {/* <PDFDownloadLink
          document={<MyDoc detail={detail} />}
          fileName={`Play-${formattedDate}.pdf`}
          className="bg-red-500 text-slate-100 rounded-lg py-2 px-3 ml-2 hover:bg-red-800 transition-colors"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Export to PDF"
          }
        </PDFDownloadLink> */}
        <button
          className="bg-green-500 text-slate-100 rounded-lg py-2 px-3 ml-4 mt-4 hover:bg-green-800 transition-colors shadow-md"
          onClick={onDownload}
        >
          Export to Excel
        </button>
        <form action="" className="mt-4 text-center">
          <div className="">
            <label
              htmlFor="match"
              className="block text-white text-3xl font-bold mb-2"
            >
              Detail Pertandingan
            </label>
            <select
              onChange={(e) => onChangeHandle(e.target.value)}
              name=""
              id="match"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">---Pilih Pertandingan---</option>
              {dataMatch.map(data => (
                <option className="text-center" value={`${data.id} ${data.home_team.id} ${data.away_team.id}`}>
                  <span>
                    {data.home_team.name}------
                  </span>
                  <span>
                    {data.away_team.name}
                  </span>
                </option>

              ))}
            </select>
          </div>
        </form>

        <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-6">
          <div className="flex justify-between bg-gray-200 text-gray-700 py-2 px-2">
            <div className="capitalize w-1/3 text-center text-2xl font-bold flex justify-center items-center">
              <span>{data ? data.home_team.name : "team kiri"}</span>
            </div>
            <div className="w-1/3 text-center text-5xl font-extrabold">
              <span>{goalHome} - {goalAway}</span>
            </div>
            <div className="capitalize w-1/3 text-center text-2xl font-bold flex justify-center items-center">
              <span>{data ? data.away_team.name : "team kanan"}</span>
            </div>
          </div>
          <div className="flex justify-between py-3 px-2">
            <div className="w-1/3 text-center text-lg font-medium flex justify-center items-center">
              <span>1</span>
            </div>
            <div className="w-1/3 text-center text-xl font-semibold">
              <span>Yellow Card</span>
            </div>
            <div className="w-1/3 text-center text-lg font-medium flex justify-center items-center">
              <span>3</span>
            </div>
          </div>
          <div className="flex justify-between py-3 px-2">
            <div className="w-1/3 text-center text-lg font-medium flex justify-center items-center">
              <span>1</span>
            </div>
            <div className="w-1/3 text-center text-xl font-semibold">
              <span>Red Card</span>
            </div>
            <div className="w-1/3 text-center text-lg font-medium flex justify-center items-center">
              <span>3</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-10">
          <table
            className="bg-white mt-5 border border-slate-400 w-[90%]"
            ref={tableRef}
          >
            <thead className="text-lg">
              <th className="p-2 border border-slate-300">No</th>
              <th className="p-2 border border-slate-300">Nama</th>
              <th className="p-2 border border-slate-300">Nomor Jersey</th>
              <th className="p-2 border border-slate-300">Posisi</th>
              <th className="p-2 border border-slate-300">Team</th>
              <th className="p-2 border border-slate-300">Kartu Merah</th>
              <th className="p-2 border border-slate-300">Kartu Kuning</th>
            </thead>
            <tbody className="text-center">
              {player.map((data, index) => (
                <tr>
                  <td className="p-2 border border-slate-300">{index + 1}</td>
                  <td className="p-2 border border-slate-300">{data.name}</td>
                  <td className="p-2 border border-slate-300">
                    {data.numberJersey}
                  </td>
                  <td className="p-2 border border-slate-300">
                    {data.position}
                  </td>
                  <td className="p-2 border border-slate-300">
                    {data.team.name}
                  </td>
                  <td className="p-2 border border-slate-300">
                    {((data.cards).filter(card => card.card_type === "red")).length}

                  </td>
                  <td className="p-2 border border-slate-300">
                    {((data.cards).filter(card => card.card_type === "yellow")).length}

                  </td>
                </tr>
              ))}
              {playerAway.map((data, index) => (


                <tr>
                  <td className="p-2 border border-slate-300">{index + 1}</td>
                  <td className="p-2 border border-slate-300">{data.name}</td>
                  <td className="p-2 border border-slate-300">
                    {data.numberJersey}
                  </td>
                  <td className="p-2 border border-slate-300">
                    {data.position}
                  </td>
                  <td className="p-2 border border-slate-300">
                    {data.team.name}
                  </td>
                  <td className="p-2 border border-slate-300">
                    {((data.cards).filter(card => card.card_type === "red")).length}

                  </td>
                  <td className="p-2 border border-slate-300">
                    {((data.cards).filter(card => card.card_type === "yellow")).length}

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}