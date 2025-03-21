import React, { useEffect, useState } from 'react';
import { 
  McpTimeline, 
  McpFeatureCards, 
  McpCountdown, 
  McpImageGallery, 
  McpBadge 
} from '@mcp/magic-components';
import { FaGraduationCap, FaLaptopCode, FaFlask } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Tipos
interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface CourseFeature {
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

const RecepcaoPage: React.FC = () => {
  // Estados
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('timeline');
  
  // Data para o evento
  const eventDate = new Date('2025-04-14T08:00:00').getTime();
  
  // Características do curso
  const courseFeatures: CourseFeature[] = [
    {
      title: "Bacharelado",
      icon: <FaGraduationCap size={24} />,
      description: "8 semestres de formação completa"
    },
    {
      title: "Laboratórios",
      icon: <FaLaptopCode size={24} />,
      description: "Infraestrutura moderna para aulas práticas"
    },
    {
      title: "Pesquisa",
      icon: <FaFlask size={24} />,
      description: "Oportunidades de iniciação científica"
    }
  ];
  
  // Timeline de eventos
  const timelineEvents: TimelineEvent[] = [
    {
      date: "08:00",
      title: "Recepção e Credenciamento",
      description: "Boas-vindas aos calouros e entrega de materiais"
    },
    {
      date: "09:00",
      title: "Apresentação do Curso",
      description: "Professores e coordenação apresentam a estrutura do curso"
    },
    {
      date: "10:30",
      title: "Tour pelo Campus",
      description: "Conhecendo as instalações da UFERSA"
    },
    {
      date: "12:00",
      title: "Intervalo para Almoço",
      description: "Confraternização no Restaurante Universitário"
    },
    {
      date: "14:00",
      title: "Oficinas Práticas",
      description: "Primeiro contato com a programação e ferramentas computacionais"
    }
  ];

  // Imagens da galeria
  const galleryImages: GalleryImage[] = [
    { src: "/images/ufersa-campus.jpg", alt: "Campus da UFERSA", caption: "Vista aérea do campus" },
    { src: "/images/lcc-predio.jpg", alt: "Prédio de Computação", caption: "Laboratório de Ciência da Computação" },
    { src: "/images/biblioteca.jpg", alt: "Biblioteca", caption: "Biblioteca Central da UFERSA" }
  ];

  // Efeito de loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Animações
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-skeleton w-full max-w-4xl p-6">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.3
          }
        }
      }}
      className="space-y-8"
    >
      <motion.div 
        variants={fadeInUp}
        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Recepção de Calouros 2025.1</h2>
        
        <div className="flex justify-center mb-6">
          <McpBadge 
            label="Evento Oficial" 
            color="#006747" 
            size="large" 
            withAnimation 
          />
        </div>
        
        <div className="mb-8">
          <McpCountdown 
            targetDate={eventDate} 
            title="Contagem Regressiva" 
            format="days|hours|minutes"
            theme="ufersa"
          />
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Programação do Dia</h3>
          <McpTimeline 
            events={timelineEvents}
            theme="ufersa"
            interactive
            activeEvent={activeSection}
            onEventClick={(event) => setActiveSection(event.title)}
          />
        </div>
      </motion.div>
      
      <motion.div 
        variants={fadeInUp}
        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <h3 className="text-xl font-bold mb-4">Ciência da Computação na UFERSA</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          O curso de Bacharelado em Ciência da Computação da UFERSA forma profissionais capacitados 
          para atuar no desenvolvimento de software, análise de sistemas e pesquisa em tecnologia.
        </p>
        <p className="mb-6 text-gray-700 leading-relaxed">
          Com uma formação sólida em programação, algoritmos e estruturas de dados, os alunos são 
          preparados para os desafios tecnológicos do mercado atual.
        </p>
        
        <McpFeatureCards 
          features={courseFeatures}
          columns={3}
          theme="ufersa"
          withAnimation
        />
      </motion.div>
      
      <motion.div 
        variants={fadeInUp}
        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <h3 className="text-xl font-bold mb-4">Conheça a UFERSA</h3>
        <McpImageGallery
          images={galleryImages}
          height={300}
          withLightbox
          withZoom
          withParallax
        />
      </motion.div>
    </motion.div>
  );
};

export default RecepcaoPage; 