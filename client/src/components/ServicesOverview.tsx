import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home, Building2, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";

const services = [
  {
    icon: Home,
    title: "Residential Services",
    description: "Complete electrical solutions for your home, from repairs to installations.",
    link: "/residential",
    image: "/images/residential-electrical.jpg"
  },
  {
    icon: Building2,
    title: "Commercial Services",
    description: "Professional electrical services for businesses of all sizes.",
    link: "/commercial",
    image: "/images/commercial-electrical.jpg"
  },
  {
    icon: Zap,
    title: "Industrial Services",
    description: "Heavy-duty electrical solutions for manufacturing and industrial facilities.",
    link: "/industrial",
    image: "/images/industrial-electrical.jpg"
  }
];

export function ServicesOverview() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  // Get the business ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const businessId = urlParams.get('s');

  return (
    <section 
      className="py-16 relative min-h-screen bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=2000)',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">{business?.basic_info.name} Services</h2>
          <p className="text-gray-300">
            Comprehensive electrical services for all your residential, commercial, and industrial needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50" />
              <CardHeader className="relative z-10">
                <service.icon className="h-8 w-8 text-yellow-400 mb-2" />
                <CardTitle className="text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-200 mb-4">{service.description}</p>
                <Link href={`${service.link}${businessId ? `?s=${businessId}` : ''}`}>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 text-white border-2 border-white hover:bg-white hover:text-black transition-all duration-300 font-semibold backdrop-blur-sm"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
