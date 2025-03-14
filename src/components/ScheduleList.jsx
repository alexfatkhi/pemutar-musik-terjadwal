const ScheduleList = ({ schedules, setSchedules }) => {
  const handleDelete = (index) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
  };

  // Mapping nilai repeat ke teks yang lebih enak dibaca
  const repeatText = {
    "none": "Tidak Berulang",
    "1-pekan": "Setiap 1 Pekan",
    "2-pekan": "Setiap 2 Pekan",
    "3-pekan": "Setiap 3 Pekan"
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-xl border space-y-4">
      <h3 className="text-2xl font-semibold text-center text-blue-600">Jadwal Lagu</h3>

      {schedules.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada jadwal.</p>
      ) : (
        schedules.map((schedule, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center border">
            <div>
              <p className="font-semibold">{schedule.file}</p>
              <p className="text-gray-700 flex items-center">
                ⏰ {schedule.time} 📅 {schedule.date} ({schedule.day})
              </p>
              {/* Tambahkan info perulangan di sini */}
              <p className="text-gray-600 text-sm">🔁 {repeatText[schedule.repeat]}</p>
            </div>
            <button onClick={() => handleDelete(index)} className="text-red-500 text-xl">❌</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ScheduleList;
