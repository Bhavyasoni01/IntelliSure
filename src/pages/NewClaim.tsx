import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Mic, MessageCircle, X } from 'lucide-react';
import axios from 'axios';
import { GoogleGenAI } from '@google/genai';

const NewClaim = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    type: string;
    description: string;
    date: string;
    amount: string;
    carImage: File | null;
    modification?: string;
  }>({
    type: '',
    description: '',
    date: '',
    amount: '',
    carImage: null,
    modification: '',
  });
  const [isListening, setIsListening] = useState(false);
  const [errors, setErrors] = useState({
    type: false,
    description: false,
    date: false,
    carImage: false,
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice recognition. Please use a modern browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({ ...prev, description: prev.description + ' ' + transcript }));
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      alert('An error occurred during voice recognition. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const validateForm = () => {
    const newErrors = {
      type: !formData.type,
      description: !formData.description,
      date: !formData.date,
      carImage: formData.type === 'damage' || formData.type === 'accident' ? !formData.carImage : false,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log('Submitting form data:', formData); // Debugging
        const response = await axios.post('http://localhost:5000/api/claims', {
          type: formData.type,
          description: formData.description,
          date: formData.date,
          modification: formData.modification || '',
          timestamp: new Date(),
        });
        console.log('Response from server:', response.data); // Debugging
        navigate('/claims-submitted');
      } catch (error) {
        console.error('Error submitting claim:', error);
        alert('Failed to submit the claim. Please try again.');
      }
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', content: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: "AIzaSyA5fBhCfDHM8KeUSZjeitAUsW3QXV089Hc" });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "",
      });
      console.log(response.text);

      // Process the response here
      const botMessage = { role: 'assistant', content: response.text || 'No response received.' }; // Adjust based on Gemini API response structure
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      setChatMessages((prev) => [
        ...prev,
        { role: 'system', content: 'An error occurred. Please try again later.' },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Submit New Claim</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Claim Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.type ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select a type</option>
              <option value="accident">Accident</option>
              <option value="theft">Theft</option>
              <option value="damage">Damage</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">Claim type is required.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : ''
                }`}
                placeholder="Enter the description of the incident"
              />
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  isListening ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
                title="Use voice input"
              >
                <Mic className="h-5 w-5" />
              </button>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">Description is required.</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Modification (if any)</label>
            <textarea
              value={formData.modification || ''}
              onChange={(e) => setFormData({ ...formData, modification: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter any modifications or additional details (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Incident <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.date ? 'border-red-500' : ''
              }`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">Date of incident is required.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Supporting Documents</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
            </div>
          </div>

          {(formData.type === 'damage' || formData.type === 'accident') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Car Image <span className="text-red-500">*</span>
              </label>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                  errors.carImage ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a car image</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={(e) =>
                          setFormData({ ...formData, carImage: e.target.files?.[0] || null })
                        }
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              </div>
              {errors.carImage && (
                <p className="text-red-500 text-sm mt-1">Car image is required.</p>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Claim Submission Guidelines</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Ensure all information provided is accurate and complete</li>
          <li>Upload clear, readable photos or scanned documents</li>
          <li>Include all relevant documentation to support your claim</li>
          <li>Submit the claim within 30 days of the incident</li>
          <li>Keep original copies of all documents for your records</li>
        </ul>
      </div>

      {/* Chatbot Button */}
      <button
        onClick={() => setIsChatOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        title="Chat with us"
      >
        {isChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Chat with us</h3>
          <div className="h-64 overflow-y-auto border rounded-md p-2 mb-2">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-md ${
                  message.role === 'user'
                    ? 'bg-blue-100 text-blue-800 self-end'
                    : 'bg-gray-100 text-gray-800 self-start'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isChatLoading && <p className="text-gray-500 text-sm">Typing...</p>}
          </div>
          <form onSubmit={handleChatSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewClaim;