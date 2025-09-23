interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function FormField({ 
  id, 
  name, 
  label, 
  type = 'text', 
  value, 
  onChange,
  className = ''
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
      />
    </div>
  );
}
