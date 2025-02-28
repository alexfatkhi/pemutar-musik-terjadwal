import { useState, useEffect } from "react";
import ScheduleList from "../components/ScheduleList";
import UploadForm from "../components/UploadForm";

const Home = () => {
  const [schedules, setSchedules] = useState(() => {
    // Memuat jadwal dari localStorage
    const savedSchedules = localStorage.getItem("schedules");
    return savedSchedules ? JSON.parse(savedSchedules) : [];
  });

  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
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

      if (scheduledSong) {
        console.log(`🎵 Memainkan lagu: ${scheduledSong.file} pada ${scheduledSong.time}`);

        const audio = new Audio(scheduledSong.audio);
        audio.play().catch((err) => console.log("❌ Playback error:", err));
      }
    };

    const interval = setInterval(checkSchedule, 1000);
    return () => clearInterval(interval);
  }, [schedules]);

  return (
    <div className="p-4">
      <UploadForm setSchedules={setSchedules} />
      <ScheduleList schedules={schedules} setSchedules={setSchedules} />
    </div>
  );
};

export default Home;
