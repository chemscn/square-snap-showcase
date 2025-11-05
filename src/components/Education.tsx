import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Master of Science",
    institution: "Robert Morris University",
    year: "2019",
    link: "https://www.rmu.edu/",
  },
  {
    degree: "Bachelor of Science",
    institution: "University of Pittsburgh",
    year: "2017",
    link: "https://www.pitt.edu/",
  },
];

const Education = () => {
  return (
    <section id="education" className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-16 h-16 bg-primary flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-display text-5xl font-bold">EDUCATION</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => {
            const CardWrapper = edu.link ? 'a' : 'div';
            const cardProps = edu.link 
              ? { href: edu.link, target: "_blank", rel: "noopener noreferrer" }
              : {};
            
            return (
              <CardWrapper key={index} {...cardProps} className={edu.link ? "block" : ""}>
                <Card
                  className="p-8 border-2 hover:border-primary transition-all duration-300 animate-fade-in h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="inline-block px-4 py-1 bg-primary text-primary-foreground font-bold text-sm">
                      {edu.year}
                    </div>
                    <h3 className="text-2xl font-bold">{edu.degree}</h3>
                    <p className="text-lg text-muted-foreground">{edu.institution}</p>
                  </div>
                </Card>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
