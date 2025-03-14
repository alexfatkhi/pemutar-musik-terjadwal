import { useState, useEffect } from "react";

const UploadForm = ({ setSchedules }) => {
  const [file, setFile] = useState(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState(""); 
  const [repeat, setRepeat] = useState("none"); 
  const [day, setDay] = useState(""); // Hapus default "Senin", biar dihitung otomatis

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile({ name: uploadedFile.name, data: e.target.result });
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  // Update day berdasarkan date yang dipilih
  useEffect(() => {
    if (date) {
      const selectedDate = new Date(date);
      const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      setDay(dayNames[selectedDate.getDay()]);
    }
  }, [date]); // <- Akan dipanggil tiap kali date berubah

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file && time && date) {
      const newSchedule = {
        file: file.name,
        time,
        day,
        date,
        repeat,
        audio: file.data,
      };

      console.log("✅ Menambahkan lagu:", newSchedule);

      setSchedules((prevSchedules) => {
        const updatedSchedules = [...prevSchedules, newSchedule];
        localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
        return updatedSchedules;
      });

      setFile(null);
      setTime("");
      setDate("");
      setRepeat("none");
      setDay(""); // Reset day juga
    } else {
      console.log("❌ Harap isi semua data dengan benar.");
    }
  };

  useEffect(() => {
    if (file === null) {
      const fileInput = document.getElementById("file");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  }, [file]);

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-xl border space-y-4">
      <h3 className="text-2xl font-semibold text-center text-blue-600">Tambah Jadwal Lagu</h3>

      <div className="flex flex-col space-y-2">
        <label htmlFor="file" className="text-gray-700 font-medium">Pilih Lagu</label>
        <input id="file" type="file" accept="audio/*" onChange={handleUpload} className="p-2 border rounded-md"/>
        {file && <p className="text-sm text-gray-500 mt-1">Lagu terpilih: {file.name}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="time" className="text-gray-700 font-medium">Pilih Waktu</label>
        <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="p-2 border rounded-md"/>
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="date" className="text-gray-700 font-medium">Pilih Tanggal</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 border rounded-md"/>
        {date && <p className="text-sm text-gray-500 mt-1">Hari: {day}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="repeat" className="text-gray-700 font-medium">Pengulangan</label>
        <select id="repeat" value={repeat} onChange={(e) => setRepeat(e.target.value)} className="p-2 border rounded-md">
          <option value="none">Tidak Berulang</option>
          <option value="1-pekan">Setiap 1 Pekan</option>
          <option value="2-pekan">Setiap 2 Pekan</option>
          <option value="3-pekan">Setiap 3 Pekan</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">Tambah Jadwal</button>
    </form>
  );
};

export default UploadForm;
