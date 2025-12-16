import { MapPin, Phone, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const offices = [
  {
    name: "Jakarta (Headquarters)",
    address: "Jl. Sudirman No. 123, Jakarta Pusat 10220",
    phone: "+62 21 1234 5678",
    hours: "Mon-Fri: 9AM-6PM WIB",
  },
  {
    name: "Bandung",
    address: "Jl. Asia Afrika No. 456, Bandung 40111",
    phone: "+62 22 8765 4321",
    hours: "Mon-Fri: 9AM-5PM WIB",
  },
  {
    name: "Surabaya",
    address: "Jl. Pemuda No. 789, Surabaya 60271",
    phone: "+62 31 9876 5432",
    hours: "Mon-Fri: 9AM-5PM WIB",
  },
];

export function OfficeLocations() {
  return (
    <div className="mt-12 md:mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
        Our Offices
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {offices.map((office, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                {office.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground shrink-0" />
                  <span>{office.address}</span>
                </p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  {office.phone}
                </p>
                <p className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  {office.hours}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
