'use client';

import { getApiUrl } from '@/app/utils';
import { useEffect, useState } from 'react';
import { DoctorItem } from '../doctortItem';
import { CreateDoctorModal } from '../doctorsModal';

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  crm: string;
};

export function DoctorsList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  async function fetchDoctors() {
    const res = await fetch(`${getApiUrl()}/medical-professional`);
    const data = await res.json();
    setDoctors(data);
  }

  useEffect(() => {
    (async () => {
      await fetchDoctors();
    })();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-semibold">Médicos</h2>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 cursor-pointer"
        >
          + Cadastrar Médico
        </button>
      </div>

      <div className="space-y-2 p-2">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-sm">
            <DoctorItem doctor={doctor} />
          </div>
        ))}
      </div>

      <CreateDoctorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={fetchDoctors}
      />
    </div>
  );
}
