"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Section } from "@components/Section";
import { Modal } from "@components/Modal";
import { ContactForm, ContactFormData } from "@components/ContactForm";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSubmitStatus(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitStatus(null);
  };
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <Section className="relative text-center py-0 min-h-screen flex items-center justify-center overflow-hidden" id="hero">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 h-full bg-red-500">
          <Image
            src="/images/hero.jpeg"
            alt="Asset Management Platform"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
        </div>
        {/* Hero Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-6xl font-bold text-white">Operate with intelligence</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">The modern platform for managing your company's physical assets. Track, optimize, and grow with confidence.</p>
          <div className="flex justify-center">
            <Button variant="primary" onClick={openModal}>Request a Demo</Button>
          </div>
        </div>
      </Section>
      {/* Features Section */}
      <Section id="features" className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        <Card>
          <h2 className="text-2xl font-bold mb-2">Centralized Tracking</h2>
          <p>All your assets in one place, accessible from anywhere, anytime.</p>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold mb-2">Lifecycle Management</h2>
          <p>Monitor asset health, schedule maintenance, and maximize ROI.</p>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold mb-2">Analytics & Insights</h2>
          <p>Make data-driven decisions with real-time reporting and analytics.</p>
        </Card>
      </Section>
      {/* Call to Action Section */}
      <Section id="contact" className="text-center bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to transform your asset management?</h2>
        <p className="mb-8">Contact us today to see Assetly in action and discover how we can help your business thrive.</p>
        <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">Get Started</Button>
      </Section>

      {/* Contact Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Request a Demo"
      >
        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank you!</h3>
            <p className="text-gray-600">Your demo request has been submitted successfully. We'll get back to you soon.</p>
          </div>
        ) : (
          <>
            <ContactForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">
                  There was an error submitting your request. Please try again or contact us directly.
                </p>
              </div>
            )}
          </>
        )}
      </Modal>
    </main>
  );
}
