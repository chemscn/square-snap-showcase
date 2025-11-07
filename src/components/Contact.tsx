import { Mail, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // TODO: Replace this with actual email sending logic
      // This currently just logs the data - you need a backend solution
      console.log("Form data:", data);
      
      toast({
        title: "Form submitted!",
        description: "This is a demo. Set up a backend to actually send emails.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 text-center">
          LET'S WORK TOGETHER
        </h2>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-center">
          Interested in collaborating or discussing opportunities? I'm always open to connecting with fellow professionals and exploring new challenges.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register("firstName")}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register("lastName")}
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell me about your project or opportunity..."
              rows={6}
              {...register("message")}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <Button 
            size="lg"
            className="gap-2 text-primary bg-secondary hover:bg-secondary/90 w-full sm:w-auto"
            asChild
          >
            <a href="mailto:drkarm123@gmail.com">
              <Mail className="w-5 h-5" />
              drkarm123@gmail.com
            </a>
          </Button>

          <Button 
            size="lg"
            variant="outline"
            className="gap-2 border-2 w-full sm:w-auto"
            asChild
          >
            <a href="https://linkedin.com/in/diyarkarim" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5" />
              linkedin.com/in/diyarkarim
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Phone className="w-5 h-5" />
          <span className="text-lg">(412) 607-3932</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
