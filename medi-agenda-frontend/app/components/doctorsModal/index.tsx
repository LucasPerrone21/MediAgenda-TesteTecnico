'use client';

import { useEffect, useState } from 'react';


type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export function CreateDoctorModal({ isOpen, onClose, onCreated }: Props) {
  const [name, setName] = useState('');
  const [crm, setCrm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
    if (!isOpen) return;

    fetch(`http://localhost:3000/medical-professional/specialties`)
        .then(res => res.json())
        .then(data => setSpecialties(data));
}, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch(`http://localhost:3000/medical-professional`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        crm,
        specialty,
      }),
    });

    setLoading(false);
    onCreated();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Cadastrar Médico</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm">Nome Completo</label>
            <input
              className="w-full border rounded-md px-3 py-2"
              placeholder="Ex: Dr. João Silva"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">CRM</label>
            <input
              className="w-full border rounded-md px-3 py-2"
              placeholder="Ex: 12345-SP"
              value={crm}
              onChange={e => setCrm(e.target.value)}
              required
            />
            <span className="text-xs text-gray-400">
              Formato: número-UF (ex: 12345-SP)
            </span>
          </div>

          <div>
            <label className="text-sm">Especialidade</label>
            <select
              className="w-full border rounded-md px-3 py-2"
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              required
            >
              <option value="">Selecione uma especialidade...</option>
              {specialties.map(spec => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            {loading ? 'Salvando...' : 'Cadastrar Médico'}
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
