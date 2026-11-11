"use client";

import { useState } from "react";
import { Button } from "./Button";
import { artists } from "@/data/artists";

interface FormData {
  name: string;
  email: string;
  phone: string;
  artist: string;
  style: string;
  placement: string;
  size: string;
  budget: string;
  description: string;
  reference: File | null;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  artist: "",
  style: "",
  placement: "",
  size: "",
  budget: "",
  description: "",
  reference: null,
};

export function BookingForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

  const validate = (data: FormData): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};
    if (!data.name.trim()) newErrors.name = "Name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Invalid email format";
    if (!data.phone.trim()) newErrors.phone = "Phone is required";
    if (!data.artist) newErrors.artist = "Please select an artist";
    if (!data.placement.trim()) newErrors.placement = "Placement is required";
    if (!data.description.trim()) newErrors.description = "Please describe your idea";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
    setFormData(initialFormData);
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, reference: file }));
  };

  if (submitted) {
    return (
      <section className="py-16 md:py-24" aria-label="Booking Confirmation">
        <div className="container max-w-2xl">
          <div className="text-center">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Request Submitted!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for your inquiry. We'll review your request and get back to you within 24-48 hours via email.
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Submit Another Request
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24" aria-label="Book a Tattoo">
      <div className="container max-w-3xl">
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Book Your Tattoo</h2>
          <p className="text-muted-foreground">
            Fill out the form below and we'll match you with the perfect artist for your vision.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors ${
                  errors.name ? "border-accent focus:border-accent" : "border-border focus:border-accent"
                }`}
                placeholder="John Doe"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <p id="name-error" className="mt-1 text-sm text-accent" role="alert">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors ${
                  errors.email ? "border-accent focus:border-accent" : "border-border focus:border-accent"
                }`}
                placeholder="john@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="mt-1 text-sm text-accent" role="alert">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone <span className="text-accent" aria-hidden="true">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors ${
                errors.phone ? "border-accent focus:border-accent" : "border-border focus:border-accent"
              }`}
              placeholder="+1 (555) 000-0000"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && <p id="phone-error" className="mt-1 text-sm text-accent" role="alert">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="artist" className="block text-sm font-medium mb-2">
              Preferred Artist <span className="text-accent" aria-hidden="true">*</span>
            </label>
            <select
              id="artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors ${
                errors.artist ? "border-accent focus:border-accent" : "border-border focus:border-accent"
              }`}
              aria-invalid={errors.artist ? "true" : "false"}
              aria-describedby={errors.artist ? "artist-error" : undefined}
            >
              <option value="">Select an artist...</option>
              {artists.map((artist) => (
                <option key={artist.id} value={artist.slug}>
                  {artist.name} — {artist.styles.slice(0, 2).join(", ")}
                </option>
              ))}
            </select>
            {errors.artist && <p id="artist-error" className="mt-1 text-sm text-accent" role="alert">{errors.artist}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="style" className="block text-sm font-medium mb-2">
                Style
              </label>
              <select
                id="style"
                name="style"
                value={formData.style}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-accent transition-colors"
              >
                <option value="">Select style...</option>
                <option value="Blackwork">Blackwork</option>
                <option value="Fine Line">Fine Line</option>
                <option value="Geometric">Geometric</option>
                <option value="Japanese Traditional">Japanese Traditional</option>
                <option value="Neo-Traditional">Neo-Traditional</option>
                <option value="Realism">Realism</option>
                <option value="Botanical">Botanical</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Ornamental">Ornamental</option>
                <option value="Dotwork">Dotwork</option>
                <option value="Portraits">Portraits</option>
                <option value="Surrealism">Surrealism</option>
                <option value="Script">Script</option>
                <option value="Color">Color</option>
                <option value="Black & Grey">Black & Grey</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>

            <div>
              <label htmlFor="placement" className="block text-sm font-medium mb-2">
                Placement <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="placement"
                name="placement"
                value={formData.placement}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors ${
                  errors.placement ? "border-accent focus:border-accent" : "border-border focus:border-accent"
                }`}
                placeholder="e.g., Forearm, Back, Thigh, Ribs"
                aria-invalid={errors.placement ? "true" : "false"}
                aria-describedby={errors.placement ? "placement-error" : undefined}
              />
              {errors.placement && <p id="placement-error" className="mt-1 text-sm text-accent" role="alert">{errors.placement}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="size" className="block text-sm font-medium mb-2">
                Size
              </label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-accent transition-colors"
              >
                <option value="">Select size...</option>
                <option value="Small">Small (1-3 inches)</option>
                <option value="Medium">Medium (3-6 inches)</option>
                <option value="Large">Large (6-12 inches)</option>
                <option value="XLarge">XLarge (12+ inches / Sleeve / Backpiece)</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-accent transition-colors"
              >
                <option value="">Select budget...</option>
                <option value="Under $200">Under $200</option>
                <option value="$200 - $500">$200 - $500</option>
                <option value="$500 - $1,000">$500 - $1,000</option>
                <option value="$1,000 - $2,000">$1,000 - $2,000</option>
                <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                <option value="$5,000+">$5,000+</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Describe Your Idea <span className="text-accent" aria-hidden="true">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors resize-none ${
                errors.description ? "border-accent focus:border-accent" : "border-border focus:border-accent"
              }`}
              placeholder="Describe your tattoo idea, meaning, any specific elements you want included..."
              aria-invalid={errors.description ? "true" : "false"}
              aria-describedby={errors.description ? "description-error" : "description-hint"}
            />
            {errors.description && <p id="description-error" className="mt-1 text-sm text-accent" role="alert">{errors.description}</p>}
            <p id="description-hint" className="mt-1 text-sm text-muted-foreground">
              Include details like: subject matter, style preferences, color vs black & grey, any reference images you have.
            </p>
          </div>

          <div>
            <label htmlFor="reference" className="block text-sm font-medium mb-2">
              Reference Images (Optional)
            </label>
            <input
              type="file"
              id="reference"
              name="reference"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-accent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-accent file:text-background hover:file:bg-accent-hover"
            />
            <p className="mt-1 text-sm text-muted-foreground">Upload up to 5 reference images (max 5MB each)</p>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full md:w-auto" size="lg" loading={loading}>
              Submit Booking Request
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By submitting, you agree to our <a href="/privacy" className="underline hover:text-accent">Privacy Policy</a> and <a href="/terms" className="underline hover:text-accent">Terms of Service</a>.
            Deposit required to secure appointment.
          </p>
        </form>
      </div>
    </section>
  );
}