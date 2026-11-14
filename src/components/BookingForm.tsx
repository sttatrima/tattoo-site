"use client";

import { useState } from "react";
import { Button } from "./Button";
import { artists } from "@/data/artists";
import { cn } from "@/lib/utils";

interface FormData {
  step: number;
  name: string;
  email: string;
  phone: string;
  enquiryType: "tattoo" | "piercing" | "general";
  artist: string;
  style: string;
  placement: string;
  size: string;
  budget: string;
  description: string;
  referenceImages: File[];
}

const initialFormData: FormData = {
  step: 1,
  name: "",
  email: "",
  phone: "",
  enquiryType: "tattoo",
  artist: "",
  style: "",
  placement: "",
  size: "",
  budget: "",
  description: "",
  referenceImages: [],
};

const ENQUIRY_TYPES = [
  { value: "tattoo", label: "Tattoo" },
  { value: "piercing", label: "Piercing" },
  { value: "general", label: "General Enquiry" },
];

const STYLE_OPTIONS = [
  "Fine Line",
  "Blackwork",
  "Geometric",
  "Japanese Traditional",
  "Neo-Traditional",
  "Realism",
  "Botanical",
  "Minimalist",
  "Ornamental",
  "Dotwork",
  "Portraits",
  "Surrealism",
  "Script",
  "Color",
  "Black & Grey",
  "Large Scale",
  "Not Sure",
];

const SIZE_OPTIONS = [
  { value: "small", label: "Small (1-3 inches)" },
  { value: "medium", label: "Medium (3-6 inches)" },
  { value: "large", label: "Large (6-12 inches)" },
  { value: "xlarge", label: "XLarge (12+ inches / Sleeve / Backpiece)" },
  { value: "not-sure", label: "Not Sure" },
];

const BUDGET_OPTIONS = [
  { value: "under-200", label: "Under £200" },
  { value: "200-500", label: "£200 - £500" },
  { value: "500-1000", label: "£500 - £1,000" },
  { value: "1000-2000", label: "£1,000 - £2,000" },
  { value: "2000-5000", label: "£2,000 - £5,000" },
  { value: "5000-plus", label: "£5,000+" },
  { value: "not-sure", label: "Not Sure" },
];

const STEP_LABELS = ["Your Details", "Tattoo Details", "Review & Submit"];

export function BookingForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const currentStep = formData.step;

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    }

    if (step === 2) {
      if (!formData.placement.trim()) newErrors.placement = "Placement is required";
      if (!formData.description.trim()) newErrors.description = "Please describe your idea";
      if (formData.enquiryType === "tattoo" && !formData.artist)
        newErrors.artist = "Please select an artist";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name as keyof FormData] !== undefined) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData((prev) => ({ ...prev, referenceImages: files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    if (currentStep < 3) {
      setFormData((prev) => ({ ...prev, step: currentStep + 1 }));
      return;
    }

    // Final submit to API
    setLoading(true);
    setServerError(null);

    try {
      const referenceImagesUrls = formData.referenceImages.map(() => ""); // In production, upload to storage first

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          enquiryType: formData.enquiryType,
          artist: formData.artist || null,
          placement: formData.placement,
          size: formData.size || null,
          budget: formData.budget || null,
          description: formData.description,
          referenceImages: referenceImagesUrls,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData(initialFormData);
      } else {
        setServerError(result.error || "Submission failed. Please try again.");
      }
    } catch {
      setServerError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const goToStep = (step: number) => {
    setFormData((prev) => ({ ...prev, step }));
  };

  const progress = ((currentStep - 1) / 2) * 100;

  if (submitted) {
    return (
      <section className="py-16 md:py-24" aria-label="Booking Confirmation">
        <div className="container max-w-2xl">
          <div className="text-center">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Request Submitted!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for your enquiry. We'll review your request and get back to you within 24-48 hours via email.
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

        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex justify-between mb-3">
            {STEP_LABELS.map((label, index) => (
              <span
                key={index}
                className={cn(
                  "text-xs font-medium uppercase tracking-wider transition-colors",
                  index < currentStep - 1 ? "text-accent" : index === currentStep - 1 ? "text-foreground font-bold" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className={`h-full bg-accent transition-all duration-300 w-${progress}%`} />
          </div>
        </div>

        {serverError && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Step 1: Your Details */}
          {currentStep === 1 && (
            <>
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
                  />
                  {errors.name && <p className="mt-1 text-sm text-accent">{errors.name}</p>}
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
                  />
                  {errors.email && <p className="mt-1 text-sm text-accent">{errors.email}</p>}
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
                  placeholder="+44 7700 900123"
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone && <p className="mt-1 text-sm text-accent">{errors.phone}</p>}
              </div>

              <div className="pt-4">
                <Button type="button" className="w-full md:w-auto" onClick={() => handleSubmit(new Event("submit") as any)}>
                  Next →
                </Button>
              </div>
            </>
          )}

          {/* Step 2: Tattoo Details */}
          {currentStep === 2 && (
            <>
              <div>
                <label htmlFor="enquiryType" className="block text-sm font-medium mb-2">
                  Enquiry Type <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <select
                  id="enquiryType"
                  name="enquiryType"
                  value={formData.enquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-accent transition-colors"
                >
                  {ENQUIRY_TYPES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {formData.enquiryType === "tattoo" && (
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
                  >
                    <option value="">Select an artist...</option>
                    {artists.map((artist) => (
                      <option key={artist.id} value={artist.slug}>
                        {artist.name} — {artist.styles.slice(0, 2).join(", ")}
                      </option>
                    ))}
                  </select>
                  {errors.artist && <p className="mt-1 text-sm text-accent">{errors.artist}</p>}
                </div>
              )}

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
                    {STYLE_OPTIONS.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
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
                  />
                  {errors.placement && <p className="mt-1 text-sm text-accent">{errors.placement}</p>}
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
                    {SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
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
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
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
                />
                {errors.description && <p className="mt-1 text-sm text-accent">{errors.description}</p>}
              </div>

              <div>
                <label htmlFor="referenceImages" className="block text-sm font-medium mb-2">
                  Reference Images (Optional)
                </label>
                <input
                  type="file"
                  id="referenceImages"
                  name="referenceImages"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-accent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-accent file:text-background hover:file:bg-accent-hover"
                />
                <p className="mt-1 text-sm text-muted-foreground">
                  Upload reference images (max 5MB each)
                </p>
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => goToStep(1)}>
                  ← Back
                </Button>
                <Button type="button" className="w-full md:w-auto" onClick={() => handleSubmit(new Event("submit") as any)}>
                  Review →
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <>
              <div className="bg-muted rounded-xl p-6 border border-border space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Enquiry Type</span>
                  <span className="font-medium capitalize">{formData.enquiryType}</span>
                </div>
                {formData.artist && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Preferred Artist</span>
                    <span className="font-medium">
                      {artists.find((a) => a.slug === formData.artist)?.name || formData.artist}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Placement</span>
                  <span className="font-medium">{formData.placement}</span>
                </div>
                {formData.style && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Style</span>
                    <span className="font-medium">{formData.style}</span>
                  </div>
                )}
                {formData.size && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-medium">{formData.size}</span>
                  </div>
                )}
                {formData.budget && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium">{formData.budget}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Description</span>
                  <span className="font-medium text-sm">{formData.description}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => goToStep(2)}>
                  ← Back
                </Button>
                <Button type="submit" className="w-full md:w-auto bg-accent text-background hover:bg-accent-hover" size="lg" loading={loading}>
                  Submit Booking Request
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                A deposit is required to secure your appointment. We'll contact you to arrange payment.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
