import { getAppointmentDetails } from "@/components/appointments/details-data";
import AppointmentDetailsPage from "@/app/agenda/detalhes/page";

export default async function AppointmentDetailsByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Preparado para trocar este mock por uma consulta Prisma filtrando tenantId + id.
  const appointment = getAppointmentDetails(decodeURIComponent(id));

  return <AppointmentDetailsPage appointmentCode={appointment.code} />;
}
