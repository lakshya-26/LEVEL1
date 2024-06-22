// src/EventRegistrationForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  age: string;
  attendingWithGuest: string;
  guestName: string;
}

const EventRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (): boolean => {
    let newErrors: Partial<FormData> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = 'Age must be a number greater than 0';
    }
    if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
      newErrors.guestName = 'Guest Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
      setFormData({
        name: '',
        email: '',
        age: '',
        attendingWithGuest: 'No',
        guestName: '',
      });
      setErrors({});
    }
  };

  return (
    <div>
      <h1>Event Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>
        <div>
          <label>Are you attending with a guest?</label>
          <select name="attendingWithGuest" value={formData.attendingWithGuest} onChange={handleChange}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {formData.attendingWithGuest === 'Yes' && (
          <div>
            <label>Guest Name:</label>
            <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
            {errors.guestName && <p className="error">{errors.guestName}</p>}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div>
          <h2>Form Submitted</h2>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Age: {submittedData.age}</p>
          <p>Attending with Guest: {submittedData.attendingWithGuest}</p>
          {submittedData.attendingWithGuest === 'Yes' && <p>Guest Name: {submittedData.guestName}</p>}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
