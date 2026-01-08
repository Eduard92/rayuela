import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Clock, CheckCircle } from "lucide-react";
import backgroundPattern from "@/assets/background-pattern.jpg";
import cotizaTitulo from "@/assets/cotiza-titulo.png";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];

const CotizaSection = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reservationId, setReservationId] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tipo_evento: "",
    invitados: "",
    phone: "",
    street: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formDataToSend = new FormData(form);

      // Add date and time to form data
      if (selectedDate) {
        formDataToSend.append("date", format(selectedDate, "yyyy-MM-dd"));
      }
      formDataToSend.append("time", selectedTime);

      const resp = await fetch("https://rayuela.com.mx/reservas/store", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formDataToSend,
      });

      const data = await resp.json();

      if (data.ok) {
        setReservationId(data.reservation_id);
        setShowConfirmModal(true);

        // Reset form
        setSelectedDate(undefined);
        setSelectedTime("");
        setFormData({
          name: "",
          email: "",
          tipo_evento: "",
          invitados: "",
          phone: "",
          street: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Hubo un problema al enviar la reserva.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cotiza" className="relative min-h-screen w-full overflow-hidden py-16 lg:py-24">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundPattern})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-10 lg:mb-14">
          <img src={cotizaTitulo} alt="Cotiza" className="w-48 sm:w-56 md:w-64 h-auto object-contain" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="relative">
              <label className="absolute left-4 top-3 text-[#8fa832] text-sm font-medium uppercase tracking-wide">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-14 pt-6 pb-2 px-4 bg-[#e8855e]/80 rounded-full text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#8fa832]"
                required
              />
            </div>
            <div className="relative">
              <label className="absolute left-4 top-3 text-[#8faab8] text-sm font-medium uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-14 pt-6 pb-2 px-4 bg-[#a8c8d8]/80 rounded-full text-gray-700 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#8fa832]"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                  <label className="absolute left-4 top-3 text-[#c85a8a] text-sm font-medium uppercase tracking-wide z-10">
                    Fecha
                  </label>
                  <div
                    className={cn(
                      "w-full h-14 pt-6 pb-2 px-4 pr-12 bg-[#f5c6d6]/80 rounded-full text-gray-700 flex items-end focus:outline-none focus:ring-2 focus:ring-[#8fa832]",
                      !selectedDate && "text-gray-400",
                    )}
                  >
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: es }) : "Seleccionar fecha"}
                  </div>
                  <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#c85a8a]" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-white border-2 border-[#f5c6d6] rounded-2xl shadow-xl"
                align="start"
              >
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus locale={es} />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                  <label className="absolute left-4 top-3 text-[#8faab8] text-sm font-medium uppercase tracking-wide z-10">
                    Hora
                  </label>
                  <div
                    className={cn(
                      "w-full h-14 pt-6 pb-2 px-4 pr-12 bg-[#a8c8d8]/80 rounded-full text-gray-700 flex items-end",
                      !selectedTime && "text-gray-400",
                    )}
                  >
                    {selectedTime || "Seleccionar hora"}
                  </div>
                  <Clock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8faab8]" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-48 p-2 bg-white border-2 border-[#a8c8d8] rounded-2xl shadow-xl max-h-64 overflow-y-auto"
                align="start"
              >
                <div className="grid grid-cols-2 gap-1">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "px-3 py-2 text-sm rounded-lg transition-colors",
                        selectedTime === time
                          ? "bg-[#a8c8d8] text-white font-semibold"
                          : "hover:bg-[#a8c8d8]/30 text-gray-700",
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="relative">
              <label className="absolute left-4 top-3 text-[#8faab8] text-sm font-medium uppercase tracking-wide">
                Tipo de evento
              </label>
              <input
                type="text"
                name="tipo_evento"
                value={formData.tipo_evento}
                onChange={handleChange}
                className="w-full h-14 pt-6 pb-2 px-4 bg-[#a8c8d8]/80 rounded-full text-gray-700 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#8fa832]"
                required
              />
            </div>
            <div className="relative">
              <label className="absolute left-4 top-3 text-[#8fa832] text-sm font-medium uppercase tracking-wide">
                Número de invitados
              </label>
              <input
                type="number"
                name="invitados"
                value={formData.invitados}
                onChange={handleChange}
                className="w-full h-14 pt-6 pb-2 px-4 bg-[#c5c88a]/80 rounded-full text-gray-700 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#8fa832]"
                required
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="relative">
              <label className="absolute left-4 top-3 text-[#8fa832] text-sm font-medium uppercase tracking-wide">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-14 pt-6 pb-2 px-4 bg-[#c5c88a]/80 rounded-full text-gray-700 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#8fa832]"
                required
              />
            </div>
            <div className="relative">
              <label className="absolute left-4 top-3 text-[#e8855e] text-sm font-medium uppercase tracking-wide">
                Dirección / Calle
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full h-14 pt-6 pb-2 px-4 bg-[#f5c6d6]/80 rounded-full text-gray-700 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#8fa832]"
              />
            </div>
          </div>

          {/* Row 5 - Comentarios */}
          <div className="relative">
            <label className="absolute left-4 top-3 text-[#8fa832] text-sm font-medium uppercase tracking-wide">
              Comentarios
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full pt-8 pb-4 px-4 bg-[#a8c8d8]/60 rounded-3xl text-gray-700 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#8fa832] resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 border-2 border-[#8fa832] text-[#8fa832] rounded-full font-semibold hover:bg-[#8fa832] hover:text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="bg-white border-2 border-[#8fa832] rounded-3xl max-w-md">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#c5c88a]/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-[#8fa832]" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-[#8fa832] font-bold">¡Reserva Enviada!</DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2">
              Tu solicitud de reserva ha sido recibida exitosamente.
              {reservationId && (
                <span className="block mt-2 font-semibold text-[#e8855e]">ID de Reserva: {reservationId}</span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-8 py-3 bg-[#8fa832] text-white rounded-full font-semibold hover:bg-[#7d9429] transition-all duration-300 hover:scale-105"
            >
              ¡Entendido!
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CotizaSection;
