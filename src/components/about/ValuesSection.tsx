import { Heart, CheckCircle, Target } from "lucide-react";

export function ValuesSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Our Values
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Heart className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
              Community First
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">
              We prioritize building strong communities and fostering meaningful
              connections between people.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
              Excellence
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">
              We strive for excellence in everything we do, from our platform to
              our customer service.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Target className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
              Innovation
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">
              We continuously innovate to provide better solutions and
              experiences for our users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
