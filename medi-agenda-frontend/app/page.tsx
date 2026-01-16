import { DoctorsList } from "./components/doctorsList";
import Navigation from "./components/header";
import { StatsOverview } from "./components/statsOverview";
import { AppointmentsList } from "./components/appointmentList";


export default function Home() {
  return (
    <>
      <Navigation />
      <main className="w-full max-w-[1440px] mx-auto px-6">
        <StatsOverview />
        <DoctorsList />
        <AppointmentsList />
      </main>



    </>
  );

}