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


export function AppointmentItem({ appointment }: { appointment: Appointment }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4  bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow ">
      <div className="flex justify-between items-start mb-2">
        <p className="font-medium text-gray-900">
          {appointment.patientName}
        </p>

        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          Agendada
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-700">Médico:</span>{' '}
          {appointment.medicalProfessional.name}
        </p>

        <p>
          <span className="font-medium text-gray-700">Data/Hora:</span>{' '}
          {appointment.appointmentDate}
        </p>
      </div>
    </div>
  );
}