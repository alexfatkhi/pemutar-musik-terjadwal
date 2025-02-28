import { useEffect } from "react";

const ScheduleList = ({ schedules, setSchedules }) => {
  // Fungsi untuk menghapus jadwal
  const handleDelete = (index) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index); // Hapus jadwal berdasarkan index
    console.log("✅ Jadwal setelah dihapus:", updatedSchedules);
    
    setSchedules(updatedSchedules); // Perbarui state jadwal
    
    if (updatedSchedules.length > 0) {
      localStorage.setItem("schedules", JSON.stringify(updatedSchedules)); // Simpan ke localStorage
    } else {
      localStorage.removeItem("schedules"); // Hapus dari localStorage kalau kosong
    }
  };

  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // Format: "HH:MM"
      const currentDay = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ][now.getDay()];

      const scheduledSong = schedules.find(
        (schedule) =>
          schedule.time === currentTime && schedule.day === currentDay
      );

      if (scheduledSong && scheduledSong.audio) {
        console.log(
          `🎵 Memainkan lagu: ${scheduledSong.file} pada ${scheduledSong.time}`
        );

        try {
          const audio = new Audio(scheduledSong.audio);
          audio.play().catch((err) => console.log("❌ Playback error:", err));
        } catch (error) {
          console.error("🚨 Error memutar audio:", error);
        }
      }
    };

    const interval = setInterval(checkSchedule, 1000);
    return () => clearInterval(interval);
  }, [schedules]);

  return (
    <div className="mt-6 p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
        Jadwal Lagu
      </h2>
      {schedules.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada jadwal.</p>
      ) : (
        <ul className="space-y-4">
          {schedules.map((schedule, index) => (
            <li
              key={index}
              className="p-4 bg-gray-50 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">
                    {schedule.file}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  <span>🕒 {schedule.time}</span>
                  <span className="ml-2">📅 {schedule.day}</span>
                </p>

                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 ml-2 hover:text-red-800 active:text-red-900 transition duration-200 ease-in-out transform hover:scale-110 active:scale-100"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScheduleList;
