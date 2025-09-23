import { useState } from "react";
import SectionHeader from '../components/SectionHeader';
import FormField from '../components/FormField';
import SelectField from '../components/SelectField';

const GENERAL_SUBJECT = 'general';

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'billing', label: 'Billing Question' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'demo', label: 'Request Demo' },
  { value: 'enterprise', label: 'Enterprise Sales' }
];

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  subject: 'general' | 'technical' | 'billing' | 'partnership' | 'demo' | 'enterprise';
  phone: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    subject: GENERAL_SUBJECT
  });

  const updateFormField = (field: keyof ContactFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Your message has been sent.');
    setFormData({ subject: GENERAL_SUBJECT });
  };


  return (
    <div className="max-w-2xl mx-auto">
      <SectionHeader 
        title="Contact Us"
        subtitle="Have questions about Voice+? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <FormField
            id="firstName"
            name="firstName"
            label="First Name"
            value={formData.firstName || ''}
            onChange={updateFormField('firstName')}
          />
          <FormField
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formData.lastName || ''}
            onChange={updateFormField('lastName')}
          />
        </div>

        <FormField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={formData.email || ''}
          onChange={updateFormField('email')}
          className="mb-6"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <FormField
            id="company"
            name="company"
            label="Company"
            value={formData.company || ''}
            onChange={updateFormField('company')}
          />
          <FormField
            id="phone"
            name="phone"
            label="Phone Number"
            type="tel"
            value={formData.phone || ''}
            onChange={updateFormField('phone')}
          />
        </div>

        <SelectField
          id="subject"
          name="subject"
          label="Subject"
          value={formData.subject || GENERAL_SUBJECT}
          options={SUBJECT_OPTIONS}
          onChange={updateFormField('subject')}
          className="mb-6"
        />

        <div className="mb-6">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us how we can help you..."
            className="form-textarea"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full py-3 px-6">
          Send Message
        </button>
      </form>
    </div>
  );
}