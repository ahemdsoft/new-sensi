"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import SuccessPopup from "./SuccessPopup";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) setShowPopup(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 w-full max-w-4xl text-black mx-auto p-4">
        <div>
          <label className="block text-sm">First Name</label>
          <input type="text" name="firstName" onChange={handleChange} required className="w-full border-b p-2" />
        </div>
        <div>
          <label className="block text-sm">Last Name</label>
          <input type="text" name="lastName" onChange={handleChange} required className="w-full border-b p-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm">Email</label>
          <input type="email" name="email" onChange={handleChange} required className="w-full border-b p-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm">Phone Number</label>
          <input type="text" name="phone" onChange={handleChange} className="w-full border-b p-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Select Subject?</label>
          <div className="flex gap-4">
            <label>
              <input type="radio" name="subject" value="General Inquiry" checked={formData.subject === "General Inquiry"} onChange={handleChange} />
              <span className="ml-2">General Inquiry</span>
            </label>
            <label>
              <input type="radio" name="subject" value="Facing Problem" checked={formData.subject === "Facing Problem"} onChange={handleChange} />
              <span className="ml-2">Facing Problem</span>
            </label>
          </div>
        </div>
        <div className="md:col-span-2 ">
          <label className="block text-sm">Message</label>
          <textarea name="message" rows={4} onChange={handleChange} required className="w-full border-b p-2" />
        </div>
        <div className="md:col-span-2 text-right">
          <button type="submit" className="bg-black cursor-pointer hover:text-gray-300 text-white px-6 py-2 rounded-md hover:bg-gray-800">
            Send Message
          </button>
        </div>
      </form>
    </>
  );
}
