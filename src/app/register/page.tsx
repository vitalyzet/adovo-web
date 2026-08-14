"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

export default function RegisterPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header variant="solid" />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <AuthModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            router.push('/');
          }} 
          initialMode="register" 
        />
      </main>
      <Footer />
    </div>
  );
}
