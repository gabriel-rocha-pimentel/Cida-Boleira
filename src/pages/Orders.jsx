import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import OrderHero from '@/components/OrderForm/OrderHero';
import OrderFormSection from '@/components/OrderForm/OrderFormSection';
import OrderSteps from '@/components/OrderForm/OrderSteps';

const Orders = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    productType: '',
    description: '',
    budget: '',
    additionalInfo: ''
  });

  const eventTypes = [
    'Aniversário',
    'Casamento',
    'Formatura',
    'Batizado',
    'Páscoa',
    'Natal',
    'Outro'
  ];

  const productTypes = [
    'Bolo Personalizado',
    'Ovos de Páscoa',
    'Doces Finos',
    'Kit Festa',
    'Outro'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateWhatsAppMessage = () => {
    const message = `
🍰 *NOVA ENCOMENDA - CIDINHA BOLEIRA* 🍰

👤 *Cliente:* ${formData.name}
📱 *Telefone:* ${formData.phone}
📧 *Email:* ${formData.email}

🎉 *Detalhes do Evento:*
• Tipo: ${formData.eventType}
• Data: ${formData.eventDate}
• Número de convidados: ${formData.guestCount}

🍰 *Produto Desejado:*
• Tipo: ${formData.productType}
• Descrição: ${formData.description}

💰 *Orçamento:* ${formData.budget}

📝 *Informações Adicionais:*
${formData.additionalInfo || 'Nenhuma informação adicional'}

---
Enviado através do site da Cidinha Boleira
    `.trim();

    return encodeURIComponent(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.eventType || !formData.productType) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const whatsappMessage = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/38999810506?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecionando para WhatsApp",
      description: "Sua encomenda foi preparada! Complete o pedido no WhatsApp.",
    });

    const orders = JSON.parse(localStorage.getItem('cidinhaBoleiraOrders') || '[]');
    orders.push({
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'enviado'
    });
    localStorage.setItem('cidinhaBoleiraOrders', JSON.stringify(orders));
  };

  return (
    <div className="pt-24">
      <OrderHero />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <OrderFormSection
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              eventTypes={eventTypes}
              productTypes={productTypes}
            />
            <OrderSteps />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Orders;