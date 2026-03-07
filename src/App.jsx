import FeatureCards from "./components/featurecards";


function App() {
  return (
    <section className="min-h-[50vh] w-full flex items-center justify-center bg-[#0a0f16] p-8">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        
        <FeatureCards 
          title="Automatización Total" 
          description="Calcula promedios, notas finales y reportes sin esfuerzo." 
        />

        <FeatureCards 
          title="Panel Intuitivo" 
          description="Interfaz amigable para profesores, estudiantes y administradores." 
        />

        <FeatureCards 
          title="Seguridad de Datos" 
          description="Tus calificaciones siempre protegidas con altos estándares." 
        />

      </div>
    </section>
  );
}

export default App;