import Image from "next/image";

export function StorySection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm md:text-base">
                <p>
                  EventHub was born from a simple idea: everyone deserves access
                  to amazing events and experiences. Founded in 2020, we started
                  as a small team passionate about bringing people together
                  through technology and events.
                </p>
                <p>
                  What began as a local event discovery platform has grown into
                  Indonesia's leading event management ecosystem, serving
                  hundreds of thousands of event-goers and thousands of
                  organizers across the country.
                </p>
                <p>
                  Today, we're proud to be the bridge that connects event
                  organizers with their audiences, making it easier than ever to
                  discover, attend, and organize memorable events.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop"
                alt="EventHub team"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
