import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AppointmentForm from './components/Appointment/AppointmentForm';
import About from './components/About';
import WhyChoose from './components/WhyChoose';
import Testimonials from './components/Testimonials';
import Steps from './components/Steps';
import Footer from './components/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Hero />
        <Services />
        <AppointmentForm />
        <About />
        <WhyChoose />
        <Testimonials />
        <Steps />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;