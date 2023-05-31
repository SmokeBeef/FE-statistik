import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import axios from "../utils/axios";
import swal from "sweetalert";

export default function Team() {
  const [modalOpen, setModalOpen] = useState(false);
  const [team, setTeam] = useState([]);
  const [nama, setNama] = useState("");
  const [logo, setLogo] = useState();

  const getAll = async () => {
    const res = await axios.get("/team/");
    setTeam(res.data.data);
  };

  const onSubmit = async (e) => {

    const data = new FormData()

    console.log(data);
    e.preventDefault();
    await axios.post("team/add", data, {}).then((res) => {
      console.log(res);
      if (res.status === 201) {
        getAll();
        setModalOpen(false);
      }
    });
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
        await axios.delete("team/del/" + id);
        getAll();
      }
    });
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div>
      <Navbar />
      <main className="font-Poppins mt-5">
        <button
          onClick={() => setModalOpen(true)}
          className="ml-5 bg-blue-600 text-slate-100 py-2 px-3 rounded-lg hover:bg-blue-800 transition-colors "
        >
          Tambah Team
        </button>
        <div className="flex justify-center">
          <table className="bg-slate-200 mt-5 border border-slate-400">
            <thead className="">
              <th className="p-2 border border-slate-400">No</th>
              <th className="p-2 border border-slate-400">Nama</th>
              <th className="p-2 border border-slate-400">Player</th>
              <th className="p-2 border border-slate-400">Action</th>
            </thead>
            <tbody className="">
              {team.map((data, index) => (
                <tr>
                  <td className="p-2 border border-slate-300 ">{index + 1}</td>
                  <td className="p-2 border border-slate-300">{data.name}</td>
                  <td className="p-2 border border-slate-300">
                    <ul>
                      {data.player.map((data, index) => (
                        <li>
                          {data.numberJersey} || {data.name} || {data.position}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2 border border-slate-300 ">
                    <button
                      onClick={() => onDelete(data.id)}
                      className="bg-red-500 py-2 px-3 rounded-lg text-slate-100 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal onClose={() => setModalOpen(false)} isVisible={modalOpen}>
          <form onSubmit={(e) => onSubmit(e)} className="p-10">
            <div className="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Nama Team
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nama Team"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="file"
              >
                Logo Team
              </label>
              <input
                type="file"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="file"
                required
                accept="image/png, image/jpg, image/jpeg"
                value={logo}
                onChange={(e) => {
                  setLogo(e.target.files[0])
                  console.log(e.target.files);
                  console.log(e.target.files[0]);
                }}
              />
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
