import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Clock, CheckCircle, Loader2 } from "lucide-react";
import backgroundPattern from "@/assets/background-pattern.jpg";
import cotizaTitulo from "@/assets/cotiza-titulo.png";
import rayuelaLogo from "@/assets/rayuela-logo.png";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Confetti piece component
const ConfettiPiece = ({ index }: { index: number }) => {
  const colors = ['#e8855e', '#f5c6d6', '#8fa832', '#a8c8d8', '#c5c88a', '#c85a8a', '#ffd700', '#ff6b6b'];
  const color = colors[index % colors.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 0.5;
  const duration = 2 + Math.random() * 2;
  const size = 8 + Math.random() * 8;
  const rotation = Math.random() * 360;

  return (
    <div
      className="absolute animate-confetti-fall pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-10px',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        transform: `rotate(${rotation}deg)`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
};

// Confetti container component
const Confetti = ({ isActive }: { isActive: boolean }) => {
  const [pieces, setPieces] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      setPieces(Array.from({ length: 50 }, (_, i) => i));
      const timer = setTimeout(() => setPieces([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map((i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  );
};

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
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationId, setReservationId] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [nameError, setNameError] = useState<string>("");
  const [nameTouched, setNameTouched] = useState(false);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [tipoEventoError, setTipoEventoError] = useState(false);
  const [invitadosError, setInvitadosError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tipo_evento: "",
    invitados: "",
    phone: "",
    street: "",
    message: "",
  });

  const emailDomains = [
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "icloud.com",
    "live.com",
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getEmailSuggestions = (): string[] => {
    const email = formData.email;
    if (!email.includes("@")) return [];
    
    const [localPart, domainPart] = email.split("@");
    if (!localPart) return [];
    
    return emailDomains
      .filter(domain => domain.startsWith(domainPart.toLowerCase()))
      .map(domain => `${localPart}@${domain}`);
  };

  const handleEmailSuggestionClick = (suggestion: string) => {
    setFormData(prev => ({ ...prev, email: suggestion }));
    setShowEmailSuggestions(false);
    setEmailError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "email") {
      if (value === "") {
        setEmailError("");
        setShowEmailSuggestions(false);
      } else if (value.includes("@") && !value.includes("@.")) {
        const [, domainPart] = value.split("@");
        const hasFullDomain = emailDomains.some(d => domainPart === d);
        setShowEmailSuggestions(!hasFullDomain && domainPart !== undefined);
        
        if (!validateEmail(value)) {
          setEmailError("Ingresa un email válido");
        } else {
          setEmailError("");
        }
      } else {
        setShowEmailSuggestions(false);
        if (!validateEmail(value)) {
          setEmailError("Ingresa un email válido");
        } else {
          setEmailError("");
        }
      }
    }
  };

  const validateAllFields = (): boolean => {
    const missingFields: string[] = [];
    
    // Validate name
    if (formData.name.trim().length < 2) {
      setNameError(formData.name.trim() === "" ? "El nombre es requerido" : "Mínimo 2 caracteres");
      setNameTouched(true);
      missingFields.push("Nombre");
    }
    
    // Validate email
    if (!validateEmail(formData.email)) {
      setEmailError(formData.email === "" ? "El email es requerido" : "Ingresa un email válido");
      setEmailTouched(true);
      missingFields.push("Email");
    }
    
    // Validate date
    if (!selectedDate) {
      setDateError(true);
      missingFields.push("Fecha");
    } else {
      setDateError(false);
    }
    
    // Validate time
    if (!selectedTime) {
      setTimeError(true);
      missingFields.push("Hora");
    } else {
      setTimeError(false);
    }
    
    // Validate event type
    if (formData.tipo_evento.trim() === "") {
      setTipoEventoError(true);
      missingFields.push("Tipo de evento");
    } else {
      setTipoEventoError(false);
    }
    
    // Validate guests
    if (formData.invitados.trim() === "" || parseInt(formData.invitados) <= 0) {
      setInvitadosError(true);
      missingFields.push("Número de invitados");
    } else {
      setInvitadosError(false);
    }
    
    // Validate phone
    if (formData.phone.trim() === "") {
      setPhoneError(true);
      missingFields.push("Teléfono");
    } else {
      setPhoneError(false);
    }
    
    // Validate message/comments
    if (formData.message.trim() === "") {
      setMessageError(true);
      missingFields.push("Comentarios");
    } else {
      setMessageError(false);
    }
    
    if (missingFields.length > 0) {
      toast({
        title: "Datos incompletos",
        description: `Por favor completa: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateAllFields()) {
      return;
    }
    
    setIsSubmitting(true);
    setIsSuccess(false);
    setShowLoadingModal(true);

    try {
      const form = e.currentTarget;
      const formDataToSend = new FormData(form);

      // Add date and time to form data
      if (selectedDate) {
        formDataToSend.append("date", format(selectedDate, "dd/MM/yyyy"));
      }
      formDataToSend.append("time", selectedTime);
      formDataToSend.append("date_submit", format(new Date(), "yyyy/MM/dd"));

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
        setIsSuccess(true);
        setShowConfirmModal(true);
        setShowLoadingModal(false);

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
        setShowLoadingModal(false);
        toast({
          title: "Error",
          description: data.message || "Hubo un problema al enviar la reserva.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setShowLoadingModal(false);
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
              <label className={cn(
                "absolute left-4 top-3 text-sm font-bold uppercase tracking-wide transition-colors z-10",
                nameError && nameTouched ? "text-red-500" : "text-gray-600"
              )}>
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  handleChange(e);
                  const value = e.target.value.trim();
                  if (value === "") {
                    setNameError("El nombre es requerido");
                  } else if (value.length < 2) {
                    setNameError("Mínimo 2 caracteres");
                  } else {
                    setNameError("");
                  }
                }}
                onBlur={() => setNameTouched(true)}
                className={cn(
                  "w-full h-14 pt-6 pb-2 px-4 bg-[#e8855e]/80 rounded-full text-black font-bold placeholder-gray-600 focus:outline-none transition-all",
                  nameError && nameTouched 
                    ? "ring-2 ring-red-500 focus:ring-red-500" 
                    : formData.name.trim().length >= 2 
                      ? "ring-2 ring-green-500 focus:ring-green-500"
                      : "focus:ring-2 focus:ring-[#8fa832]"
                )}
              />
              {nameError && nameTouched && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-xs">
                  {nameError}
                </span>
              )}
              {formData.name.trim().length >= 2 && !nameError && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                  <CheckCircle className="w-5 h-5" />
                </span>
              )}
            </div>
            <div className="relative">
              <label className={cn(
                "absolute left-4 top-3 text-sm font-bold uppercase tracking-wide transition-colors z-10",
                emailError && emailTouched ? "text-red-500" : "text-gray-600"
              )}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => {
                  setEmailTouched(true);
                  setTimeout(() => setShowEmailSuggestions(false), 200);
                }}
                onFocus={() => {
                  if (formData.email.includes("@")) {
                    const [, domainPart] = formData.email.split("@");
                    const hasFullDomain = emailDomains.some(d => domainPart === d);
                    setShowEmailSuggestions(!hasFullDomain);
                  }
                }}
                className={cn(
                  "w-full h-14 pt-6 pb-2 px-4 bg-[#a8c8d8]/80 rounded-full text-black font-bold placeholder-gray-600 focus:outline-none transition-all",
                  emailError && emailTouched 
                    ? "ring-2 ring-red-500 focus:ring-red-500" 
                    : formData.email && !emailError 
                      ? "ring-2 ring-green-500 focus:ring-green-500"
                      : "focus:ring-2 focus:ring-[#8fa832]"
                )}
              />
              {emailError && emailTouched && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-xs">
                  {emailError}
                </span>
              )}
              {formData.email && !emailError && !showEmailSuggestions && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                  <CheckCircle className="w-5 h-5" />
                </span>
              )}
              
              {/* Email Domain Suggestions */}
              {showEmailSuggestions && getEmailSuggestions().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#a8c8d8] rounded-2xl shadow-lg z-50 overflow-hidden">
                  {getEmailSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleEmailSuggestionClick(suggestion)}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#a8c8d8]/30 transition-colors first:rounded-t-xl last:rounded-b-xl"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <Popover open={isDateOpen} onOpenChange={(open) => {
              setIsDateOpen(open);
              if (open) setDateError(false);
            }}>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                  <label className={cn(
                    "absolute left-4 top-3 text-sm font-bold uppercase tracking-wide z-10 transition-colors",
                    dateError ? "text-red-500" : "text-gray-600"
                  )}>
                    Fecha
                  </label>
                  <div
                    className={cn(
                      "w-full h-14 pt-6 pb-2 px-4 pr-12 bg-[#f5c6d6]/80 rounded-full text-black font-bold flex items-end focus:outline-none transition-all",
                      !selectedDate && "text-gray-600 font-normal",
                      dateError ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-[#8fa832]",
                    )}
                  >
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: es }) : "Seleccionar fecha"}
                  </div>
                  <CalendarIcon className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors",
                    dateError ? "text-red-500" : "text-[#c85a8a]"
                  )} />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-white border-2 border-[#f5c6d6] rounded-2xl shadow-xl"
                align="start"
              >
                <Calendar 
                  mode="single" 
                  selected={selectedDate} 
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setIsDateOpen(false);
                    setTimeout(() => setIsTimeOpen(true), 150);
                  }} 
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus 
                  locale={es} 
                />
              </PopoverContent>
            </Popover>
            <Popover open={isTimeOpen} onOpenChange={(open) => {
              setIsTimeOpen(open);
              if (open) setTimeError(false);
            }}>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                  <label className={cn(
                    "absolute left-4 top-3 text-sm font-bold uppercase tracking-wide z-10 transition-colors",
                    timeError ? "text-red-500" : "text-gray-600"
                  )}>
                    Hora
                  </label>
                  <div
                    className={cn(
                      "w-full h-14 pt-6 pb-2 px-4 pr-12 bg-[#a8c8d8]/80 rounded-full text-black font-bold flex items-end transition-all",
                      !selectedTime && "text-gray-600 font-normal",
                      timeError ? "ring-2 ring-red-500" : "",
                    )}
                  >
                    {selectedTime || "Seleccionar hora"}
                  </div>
                  <Clock className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors",
                    timeError ? "text-red-500" : "text-[#8faab8]"
                  )} />
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
                      onClick={() => {
                        setSelectedTime(time);
                        setIsTimeOpen(false);
                      }}
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
              <label className={cn(
                "absolute left-4 top-3 text-sm font-bold uppercase tracking-wide transition-colors",
                tipoEventoError ? "text-red-500" : "text-gray-600"
              )}>
                Tipo de evento
              </label>
              <input
                type="text"
                name="tipo_evento"
                value={formData.tipo_evento}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value.trim() !== "") setTipoEventoError(false);
                }}
                className={cn(
                  "w-full h-14 pt-6 pb-2 px-4 bg-[#a8c8d8]/80 rounded-full text-black font-bold placeholder-gray-600 focus:outline-none transition-all",
                  tipoEventoError ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-[#8fa832]"
                )}
              />
            </div>
            <div className="relative">
              <label className={cn(
                "absolute left-4 top-3 text-sm font-bold uppercase tracking-wide transition-colors",
                invitadosError ? "text-red-500" : "text-gray-600"
              )}>
                Número de invitados
              </label>
              <input
                type="number"
                name="invitados"
                value={formData.invitados}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value.trim() !== "" && parseInt(e.target.value) > 0) setInvitadosError(false);
                }}
                className={cn(
                  "w-full h-14 pt-6 pb-2 px-4 bg-[#c5c88a]/80 rounded-full text-black font-bold placeholder-gray-600 focus:outline-none transition-all",
                  invitadosError ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-[#8fa832]"
                )}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="relative">
              <label className={cn(
                "absolute left-4 top-3 text-sm font-bold uppercase tracking-wide transition-colors",
                phoneError ? "text-red-500" : "text-gray-600"
              )}>
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  const syntheticEvent = {
                    target: { name: 'phone', value }
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleChange(syntheticEvent);
                  if (value.trim() !== "") setPhoneError(false);
                }}
                maxLength={10}
                inputMode="numeric"
                pattern="[0-9]*"
                className={cn(
                  "w-full h-14 pt-6 pb-2 px-4 bg-[#c5c88a]/80 rounded-full text-black font-bold placeholder-gray-600 focus:outline-none transition-all",
                  phoneError ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-[#8fa832]"
                )}
              />
            </div>
            <div className="relative">
              <label className="absolute left-4 top-3 text-gray-600 text-sm font-bold uppercase tracking-wide">
                Dirección / Calle
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full h-14 pt-6 pb-2 px-4 bg-[#f5c6d6]/80 rounded-full text-black font-bold placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8fa832]"
              />
            </div>
          </div>

          {/* Row 5 - Comentarios */}
          <div className="relative">
            <label className={cn(
              "absolute left-4 top-3 text-sm font-bold uppercase tracking-wide transition-colors",
              messageError ? "text-red-500" : "text-gray-600"
            )}>
              Comentarios
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) => {
                handleChange(e);
                if (e.target.value.trim() !== "") setMessageError(false);
              }}
              rows={3}
              className={cn(
                "w-full pt-8 pb-4 px-4 bg-[#a8c8d8]/60 rounded-3xl text-black font-bold placeholder-gray-600 focus:outline-none transition-all resize-none",
                messageError ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-[#8fa832]"
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative px-12 py-4 bg-[#a8a832] rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#8fa832] active:scale-95 active:shadow-inner disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 group"
            >
              {/* Dashed border inside */}
              <span className="absolute inset-[4px] border-2 border-dashed border-white rounded-full pointer-events-none transition-all duration-300 group-hover:inset-[6px] group-active:inset-[3px]" />
              <span className="relative z-10">{isSubmitting ? "Enviando..." : "Enviar"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Loading Modal */}
      <Dialog open={showLoadingModal} onOpenChange={() => {}}>
        <DialogContent className="bg-white border-2 border-[#a8c8d8] rounded-3xl max-w-md overflow-hidden [&>button]:hidden">
          <DialogHeader className="text-center">
            {/* Logo de Rayuela */}
            <div className="flex justify-center mb-4">
              <img 
                src={rayuelaLogo} 
                alt="Rayuela Logo" 
                className="w-32 h-auto object-contain"
              />
            </div>
            
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#a8c8d8]/30 rounded-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#a8c8d8] animate-spin" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-[#a8c8d8] font-bold">Enviando...</DialogTitle>
            <DialogDescription className="text-gray-600 text-base mt-2">
              Por favor espera mientras procesamos tu solicitud de reserva.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="bg-white border-2 border-[#8fa832] rounded-3xl max-w-md overflow-hidden">
          {/* Confetti Effect */}
          <Confetti isActive={isSuccess && showConfirmModal} />
          
          <DialogHeader className="text-center relative z-10">
            {/* Logo de Rayuela */}
            <div className="flex justify-center mb-4">
              <img 
                src={rayuelaLogo} 
                alt="Rayuela Logo" 
                className="w-32 h-auto object-contain animate-bounce-in"
              />
            </div>
            
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#c5c88a]/30 rounded-full flex items-center justify-center animate-scale-in">
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
          <div className="flex justify-center mt-4 relative z-10">
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
