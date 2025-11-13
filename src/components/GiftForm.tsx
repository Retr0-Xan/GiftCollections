import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface GiftFormProps {
  onGiftAdded: () => void;
}

export default function GiftForm({ onGiftAdded }: GiftFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [giftDescription, setGiftDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!firstName.trim() || !lastName.trim() || !giftDescription.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    const { error: insertError } = await supabase
      .from('wedding_gifts')
      .insert([
        {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone_number: phoneNumber.trim() || null,
          gift_description: giftDescription.trim(),
        },
      ]);

    if (insertError) {
      setError('Failed to submit gift. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // Send SMS if phone number is provided
    if (phoneNumber.trim()) {
      try {
        const smsResponse = await fetch('/api/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: firstName.trim(),
            phoneNumber: phoneNumber.trim(),
          }),
        });

        if (!smsResponse.ok) {
          console.error('Failed to send SMS, but gift was recorded');
        }
      } catch (smsError) {
        console.error('Error sending SMS:', smsError);
        // Don't show error to user since gift was recorded successfully
      }
    }

    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setGiftDescription('');
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    onGiftAdded();
  };

  return (
    <div className="sticky top-12">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Add Gift</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded text-sm">
            Gift recorded successfully
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-900 mb-1.5">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
              placeholder="First Name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-900 mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
              placeholder="Last Name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-900 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
              placeholder="Contact Info"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="giftDescription" className="block text-sm font-medium text-slate-900 mb-1.5">
              Gift Description
            </label>
            <textarea
              id="giftDescription"
              value={giftDescription}
              onChange={(e) => setGiftDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors resize-none"
              placeholder="Describe the gift"
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Recording...' : 'Record Gift'}
          </button>
        </div>
      </form>
    </div>
  );
}
