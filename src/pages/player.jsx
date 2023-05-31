import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import axios from "../utils/axios";
import swal from "sweetalert";
import Background from "../components/background";
import { useDownloadExcel } from "react-export-table-to-excel";

export default function Player() {
  const [modalOpen, setModalOpen] = useState(false);
  const [player, setPlayer] = useState([]);
  const [team, setTeam] = useState([]);
  const [nama, setNama] = useState("");
  const [jersey, setJersey] = useState("");
  const [posisi, setPosisi] = useState("");
  const [teamId, setTeamId] = useState();

  const getTeam = async () => {
    const res = await axios.get("team/");
    setTeam(res.data.data);
  };

  const getAll = async () => {
    const res = await axios.get("player/");
    setPlayer(res.data.data);
  };

  const onSubmit = async (e) => {
    const data = {
      name: nama,
      numberJersey: jersey,
      position: posisi,
      team_id: teamId,
    };
    console.log(data);
    e.preventDefault();
    await axios.post("player/add", data).then((res) => {
      console.log(res);
      if (res.status === 201) {
        getAll();
        setModalOpen(false);
        setJersey();
        setNama();
        setPosisi();
        setTeamId();
      }
    });
  };

  const handleAdd = () => {
    getTeam();
    setModalOpen(true);
  };

  const onDelete = (id) => {
    swal({
      title: "Yakin Delete?",
      icon: "warning",
      buttons: {
        cancel: "No",
        Ok: true,
      },
    }).then(async (result) => {
      if (result === "Ok") {
        await axios.delete("player/del/" + id);
        getAll();
      }
    });
  };
  useEffect(() => {
    getAll();
  }, []);

  const tableRef = useRef(null);

  const {onDownload} = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename:`Play-${Date.now()}`,
    sheet:`Play-${Date.now()}`
  })

  return (
    <div className="">
      <Navbar />
      <Background/>
      <main className="font-Poppins mt-5">
        <button
          onClick={handleAdd}
          className="ml-5 bg-blue-600 text-slate-100 py-2 px-3 rounded-lg hover:bg-blue-800 transition-colors "
        >
          Tambah Player
        </button>
        <button className="bg-green-500 text-slate-100 rounded-lg py-2 px-3 ml-2 hover:bg-green-800 transition-colors" onClick={onDownload}>Export to Excel</button>
        <button className="bg-red-500 text-slate-100 rounded-lg py-2 px-3 ml-2 hover:bg-red-800 transition-colors">Export to PDF</button>
        <div className="flex justify-center">
          <table className="bg-slate-200 mt-5 border border-slate-400 w-[90%]" ref={tableRef}>  
            <thead className="">
              <th className="p-2 border border-slate-300">No</th>
              <th className="p-2 border border-slate-300">Nama</th>
              <th className="p-2 border border-slate-300">Nomor Jersey</th>
              <th className="p-2 border border-slate-300">Posisi</th>
              <th className="p-2 border border-slate-300">Team</th>
              <th className="p-2 border border-slate-300">Action</th>
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
                  <td className="p-2 border border-slate-300 ">
                    <button
                      onClick={() => onDelete(data.id)}
                      className="bg-red-500 py-2 px-3 rounded-lg hover:bg-red-600 transition-colors text-slate-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          onClose={() => {
            setJersey();
            setNama();
            setPosisi();
            setTeamId();
            setModalOpen(false);
          }}
          isVisible={modalOpen}
        >
          <form onSubmit={(e) => onSubmit(e)} className="p-10">
            <div className="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Nama Player
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nama Player"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Nomor Jersey
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="1234"
                required
                value={jersey}
                onChange={(e) => setJersey(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Position
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nama Team"
                required
                value={posisi}
                onChange={(e) => setPosisi(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Team
              </label>
              <select
                name=""
                id=""
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setTeamId(e.target.value)}
              >
                <option value="" className="text-center">
                  ---Pilih Team---
                </option>
                {team.map((data) => (
                  <option value={data.id}>{data.name}</option>
                ))}
              </select>
            </div>
            <button
              className="bg-blue-600 text-slate-100 py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors "
              type="submit"
            >
              Submit
            </button>
          </form>
        </Modal>
      </main>
    </div>
  );
}
