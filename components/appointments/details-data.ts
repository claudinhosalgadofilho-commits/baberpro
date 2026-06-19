export function getAppointmentDetails(appointmentId: string) {
  return {
    id: appointmentId,
    code: appointmentId === "AGD-001248" ? "#AGD-001248" : `#${appointmentId}`,
    tenantId: "barbearia_estilo",
    client: {
      name: "Lucas Oliveira",
      phone: "(11) 98765-4321",
      whatsapp: "(11) 98765-4321",
      email: "lucas.oliveira@email.com",
      since: "12/03/2023",
    },
    appointment: {
      date: "15/05/2024 (Quarta-feira)",
      time: "10:30",
      professional: "Carlos Eduardo",
      unit: "Unidade principal",
      createdAt: "10/05/2024 às 14:32",
      createdBy: "João Santos",
      status: "Confirmado",
    },
  };
}
