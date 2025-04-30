'use client';

import { useEffect, useState } from 'react';

interface Message {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch all messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      if (!res.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await res.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages', error);
      alert('Failed to load messages.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a message
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this message?');
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete');
      }
      alert('Message deleted successfully.');
      await fetchMessages();
    } catch (error) {
      console.error('Error deleting message', error);
      alert('Failed to delete message.');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">User Messages</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white p-6 rounded-lg shadow-md relative">
              <h2 className="text-xl font-semibold mb-2">{msg.firstName} {msg.lastName}</h2>
              <p className="text-gray-700 text-sm mb-1"><strong>Email:</strong> {msg.email}</p>
              <p className="text-gray-700 text-sm mb-1"><strong>Phone:</strong> {msg.phone}</p>
              <p className="text-gray-700 text-sm mb-1"><strong>Subject:</strong> {msg.subject}</p>
              <p className="text-gray-800 mt-3">{msg.message}</p>

              <button
                onClick={() => handleDelete(msg.id)}
                disabled={deletingId === msg.id}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md disabled:bg-red-300"
              >
                {deletingId === msg.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
