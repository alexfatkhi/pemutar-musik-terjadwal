import { useState, useEffect } from "react";

const UploadForm = ({ setSchedules }) => {
  const [file, setFile] = useState(null);
  const [time, setTime] = useState("");
  const [day, setDay] = useState("Senin");

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      console.log("✅ File terupload:", uploadedFile.name);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file && time) {
      const newSchedule = {
        file: file.name,
        time,
        day,
        audio: URL.createObjectURL(file), // Membuat URL untuk file audio
      };

      console.log("✅ Menambahkan lagu:", newSchedule);

      setSchedules((prevSchedules) => {
        const updatedSchedules = [...prevSchedules, newSchedule];

        // Simpan ke localStorage setiap kali state diperbarui
        localStorage.setItem("schedules", JSON.stringify(updatedSchedules));

        return updatedSchedules;
      });

      // Reset input setelah submit
      setFile(null);
      setTime("");
      setDay("Senin");
    } else {
      console.log("❌ Harap pilih file dan waktu yang valid.");
    }
  };

  // Reset input file saat file dihapus
  useEffect(() => {
    if (file === null) {
      const fileInput = document.getElementById("file");
      if (fileInput) {
        fileInput.value = ""; // Resetkan input file
      }
    }
  }, [file]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-xl border border-gray-200 space-y-4"
    >
      <h3 className="text-2xl font-semibold text-center text-blue-600">
        Tambah Jadwal Lagu
      </h3>

      <div className="flex flex-col space-y-2">
        <label htmlFor="file" className="text-gray-700 font-medium">
          Pilih Lagu
        </label>
        <input
          id="file"
          type="file"
          accept="audio/*"
          onChange={handleUpload}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {file && (
          <p className="text-sm text-gray-500 mt-1">
            Lagu terpilih: {file.name}
          </p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="time" className="text-gray-700 font-medium">
          Pilih Waktu
        </label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="day" className="text-gray-700 font-medium">
          Pilih Hari
        </label>
        <select
          id="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map(
            (d) => (
              <option key={d} value={d}>
                {d}
              </option>
            )
          )}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        Tambah Jadwal
      </button>
    </form>
  );
};

export default UploadForm;
