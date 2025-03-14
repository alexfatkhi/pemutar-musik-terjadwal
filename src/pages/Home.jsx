import { useState, useEffect } from "react";
import ScheduleList from "../components/ScheduleList";
import UploadForm from "../components/UploadForm";

const Home = () => {
  const [schedules, setSchedules] = useState(() => {
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
      const currentDate = now.toISOString().split("T")[0]; // Format YYYY-MM-DD
      const currentDay = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ][now.getDay()];

      const scheduledSong = schedules.find((schedule) => {
        const isSameTime = schedule.time === currentTime;
        const isSameDay = schedule.day === currentDay;
        const isSameDate = schedule.date === currentDate;

        if (schedule.repeat === "1-pekan") {
          return isSameTime && isSameDay;
        } else if (schedule.repeat === "2-pekan") {
          return (
            isSameTime && isSameDay && Math.floor(now.getDate() / 7) % 2 === 0
          );
        } else if (schedule.repeat === "3-pekan") {
          return (
            isSameTime && isSameDay && Math.floor(now.getDate() / 7) % 3 === 0
          );
        } else {
          return isSameTime && isSameDate;
        }
      });

      if (scheduledSong) {
        console.log(
          `🎵 Memainkan lagu: ${scheduledSong.file} pada ${scheduledSong.time}`
        );

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
