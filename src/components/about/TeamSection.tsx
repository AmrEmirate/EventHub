import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface TeamSectionProps {
  team: TeamMember[];
}

export function TeamSection({ team }: TeamSectionProps) {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            The passionate people behind EventHub's success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-base md:text-lg mb-1">
                  {member.name}
                </h3>
                <Badge variant="secondary" className="mb-3 text-xs">
                  {member.role}
                </Badge>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
