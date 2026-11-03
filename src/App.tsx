import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import PriceCalculator from '@/components/PriceCalculator';
import BookingForm from '@/components/BookingForm';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import WorkPhotos from '@/components/WorkPhotos';
import Reviews from '@/components/Reviews';
import Promotions from '@/components/Promotions';
import Faq from '@/components/Faq';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-night font-sans text-white">
      <a
        href="#servicios"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-aqua focus:px-4 focus:py-2 focus:font-bold focus:text-night"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <PriceCalculator />
        <BookingForm />
        <BeforeAfterGallery />
        <WorkPhotos />
        <Reviews />
        <Promotions />
        <Faq />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
