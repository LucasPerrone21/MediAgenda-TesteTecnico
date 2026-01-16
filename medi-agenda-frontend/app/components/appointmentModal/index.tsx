'use client';

import { getApiUrl } from '@/app/utils';
import { useEffect, useState } from 'react';

type Doctor = {
  id: string;
  name: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export function CreateAppointmentModal({ isOpen, onClose, onCreated }: Props) {
  const [patientName, setPatientName] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    fetch(`${getApiUrl()}/medical-professional`)
      .then(res => res.json())
      .then(setDoctors);
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch(`${getApiUrl()}/medical-appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName,
        medicalProfessionalId: parseInt(doctorId),
        appointmentDate: dateTime,
      }),
    });

    setLoading(false);
    onCreated();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6 animate-modal">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Novo Agendamento</h2>
          <button onClick={onClose} className="text-xl text-gray-400">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm">Nome do Paciente</label>
            <input
              className="w-full border rounded-md px-3 py-2"
              placeholder="Digite o nome do paciente"
              value={patientName}
              onChange={e => setPatientName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Médico</label>
            <select
              className="w-full border rounded-md px-3 py-2"
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
              required
            >
              <option value="">Selecione um médico...</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm">Data e Hora</label>
            <input
              type="datetime-local"
              className="w-full border rounded-md px-3 py-2"
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? 'Salvando...' : 'Confirmar Agendamento'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full border py-2 rounded-md"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
