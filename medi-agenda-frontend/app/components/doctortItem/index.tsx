type Doctor = {
  id: string;
  name: string;
  specialty: string;
  crm: string;
};

type DoctorItemProps = {
  doctor: Doctor;
};

export function DoctorItem({ doctor }: DoctorItemProps) {
  const initial = doctor.name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-b-0">
      {/* Avatar */}
      <div className="flex items-center justify-center
                      w-12 h-12 rounded-full
                      bg-blue-600 text-white font-semibold">
        {initial}
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="font-medium text-gray-900">
          {doctor.name}
        </p>

        <p className="text-sm text-gray-500">
          CRM: {doctor.crm}
        </p>

        {/* Badge */}
        <span className="inline-block mt-2
                         bg-blue-600 text-white text-xs
                         px-3 py-1 rounded-md">
          {doctor.specialty}
        </span>
      </div>
    </div>
  );
}

