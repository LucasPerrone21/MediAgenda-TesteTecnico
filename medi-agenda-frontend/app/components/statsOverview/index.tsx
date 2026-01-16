'use client';

import { useEffect, useState } from 'react';
import { StatsCard } from '../statsCard';

type StatsData = {
  doctors: number;
  appointments: number;
  specialties: number;
};

export function StatsOverview() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [responseDoctors, responseAppointmants] = await Promise.all([
          fetch('http://localhost:3000/medical-professional'),
          fetch('http://localhost:3000/medical-appointment'),
        ]);

        if (!responseDoctors.ok || !responseAppointmants.ok) {
          throw new Error('Failed to fetch stats');
        }

        const [resultDoctors, resultAppointments] = await Promise.all([
          responseDoctors.json(),
          responseAppointmants.json(),
        ]);


        
        const resultsformatted : StatsData = {
            doctors: resultDoctors.length,
            appointments: resultAppointments.length,
            specialties: Array.from(new Set(resultDoctors.map((doc: { specialty: string; }) => doc.specialty))).length,
        }


        setData(resultsformatted);
      } catch (error) {
        console.error('Erro ao buscar estatísticas', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Carregando...</p>;
  }

  if (!data) {
    return <p className="text-red-500">Erro ao carregar dados</p>;
  }

  return (
    <div className="flex gap-6 mb-6 w-full align-center justify-center">
      <StatsCard value={data.doctors} label="Médicos Cadastrados" />
      <StatsCard value={data.appointments} label="Consultas Agendadas" />
      <StatsCard value={data.specialties} label="Especialidades" />
    </div>
  );
}
