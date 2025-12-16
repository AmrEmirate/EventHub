import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MissionVisionSection() {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-base">
                  To democratize event discovery and management by providing a
                  comprehensive platform that empowers organizers to create
                  exceptional events and helps attendees discover experiences
                  that enrich their lives.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-base">
                  To become Southeast Asia's most trusted and innovative event
                  ecosystem, fostering connections and creating lasting memories
                  through technology-enabled experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
