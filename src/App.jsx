import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSolution from './components/ProblemSolution';
import Simulator from './components/Simulator';
import ConceptComparison from './components/ConceptComparison';
import UseCases from './components/UseCases';
import DeveloperSection from './components/DeveloperSection';
import Footer from './components/Footer';
import IsometricGrid from './components/IsometricGrid';

function App() {
  return (
    <main className="bg-brand-surface min-h-screen text-white selection:bg-brand-cyan/20 selection:text-brand-cyan">
      <Navbar />
      
      <div className="relative">
        <HeroSection />
        
        {/* Background Visual Element */}
        <div className="absolute top-0 right-0 w-full h-[100vh] pointer-events-none z-0 opacity-20 overflow-hidden">
          <IsometricGrid />
        </div>
      </div>

      <ProblemSolution />
      
      <Simulator />
      
      <ConceptComparison />
      
      <UseCases />
      
      <DeveloperSection />
      
      <Footer />
    </main>
  );
}

export default App;
