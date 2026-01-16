'use client';
import { getApiUrl } from '@/app/utils';
import { useEffect, useState } from 'react';
import { AppointmentItem } from '../appointmentsItem';
import { CreateAppointmentModal } from '../appointmentModal';

type Appointment = {
  id: string;
  patientName: string;
  medicalProfessional: MedicalProfessional;
  appointmentDate: string;
};
type MedicalProfessional = {
    id: string;
    name: string;
    specialty: string;
}

export function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  async function fetchAppointments() {
    const res = await fetch(`${getApiUrl()}/medical-appointment`);
    const data = await res.json();
    const formattedData = data.map((appointment: Appointment) => ({
        ...appointment,
        appointmentDate: new Date(appointment.appointmentDate).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo',
        }),
    }));

    console.log(formattedData);
    setAppointments(formattedData);
  }

  useEffect(() => {
    (async () => {
      await fetchAppointments();
    })();
  }, []);

  return (
  <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-semibold">Consultas</h2>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 cursor-pointer"
      >
        + Novo Agendamento
      </button>
    </div>

    {/* Grid de cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {appointments.map((appointment) => (
        <AppointmentItem
          key={appointment.id}
          appointment={appointment}
        />
      ))}
    </div>

    <CreateAppointmentModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      onCreated={fetchAppointments}
    />
  </div>
);

}
