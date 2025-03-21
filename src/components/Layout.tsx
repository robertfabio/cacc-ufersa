import React, { ReactNode, useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaClock, FaPhone, FaCalendarAlt } from 'react-icons/fa';
import { McpSequential, McpNavbar, McpHero, McpCard, McpContact, McpFooter } from '@mcp/magic-components';
import { LCCKnowledgeGraph } from '../mcp-knowledge/lcc.graph';

const Layout = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { title: 'Recepção', href: '#recepcao' },
    { title: 'Sobre Nós', href: '#sobre' },
    { title: 'UFERSA', href: '#ufersa' },
    { title: 'Contato', href: '#contato' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <McpNavbar 
        title="CAComp UFERSA"
        logo="/brasao-ufersa.png"
        items={navItems}
        theme="ufersa"
        sticky={true}
        mobileBreakpoint={768}
      />

      <main className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <McpHero
            title="Bem-vindos, Calouros!"
            subtitle="Computação 2025.1"
            backgroundImage="linear-gradient(135deg, #005293 0%, #006747 100%)"
            height={isMobile ? "50vh" : "70vh"}
            withAnimation={true}
            cta={{
              text: "Saiba Mais",
              href: "#recepcao"
            }}
          >
            <div className="hero-info">
              <div className="info-item animate-fade-in delay-2">
                <FaCalendarAlt className="text-white" />
                <span>14 de Abril | 08:00h</span>
              </div>
              <div className="info-item animate-fade-in delay-3">
                <FaMapMarkerAlt className="text-white" />
                <span>LCC - Bloco de Computação</span>
              </div>
            </div>
          </McpHero>
          
          <McpCard
            title="Localização da Recepção - LCC UFERSA"
            icon={<FaMapMarkerAlt className="text-red-500" />}
            elevation={2}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-600">
                  <strong>Endereço:</strong> Av. Francisco Mota, 572 - Bairro Costa e Silva, Mossoró/RN
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaClock className="text-blue-500" />
                  <strong>Horário:</strong> Seg-Sex: 7h30 às 11h30 | 13h30 às 17h30
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaPhone className="text-green-500" />
                  <strong>Contato:</strong> (84) 3317-8200
                </p>
              </div>
              
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.201664296889!2d-37.34372292568622!3d-5.183566253854212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ba06f3b4593575%3A0x925f4c823d0a7f0a!2sUFERSA%20-%20Campus%20Leste!5e0!3m2!1spt-BR!2sbr!4v1719341231801!5m2!1spt-BR!2sbr"
                  className="w-full h-full"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </McpCard>

          <McpSequential 
            steps={LCCKnowledgeGraph.sequentialPaths[0].steps}
            theme="ufersa"
            onComplete={(step) => console.log('Passo concluído:', step)}
            interactive={true}
            withAnimation={true}
          />

          {children}
          
          <McpContact
            title="Entre em Contato"
            email="cacomp.ufersa@gmail.com"
            phone="(84) 3317-8200"
            address="LCC - Laboratório de Ciência da Computação, Campus Mossoró/RN"
            socialMedia={[
              { platform: 'instagram', url: '#' },
              { platform: 'discord', url: 'https://discord.gg/3wpgNt8a' }
            ]}
            withForm={true}
            formEndpoint="https://formspree.io/f/your-form-id"
          />
        </div>
      </main>
      
      <McpFooter
        logo="/brasao-ufersa.png"
        title="CAComp - Centro Acadêmico de Ciência da Computação"
        subtitle="UFERSA - Universidade Federal Rural do Semi-Árido"
        copyright="© 2025 CAComp - Em formação"
      />
    </div>
  );
};

export default Layout; 