'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { ChatMessage } from '@/lib/database/schema';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export function useAIChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize a new conversation
  useEffect(() => {
    if (!conversationId) {
      setConversationId(uuidv4());
    }
  }, [conversationId]);

  // Fetch chat history for a conversation
  const fetchChatHistory = async (convoId?: string) => {
    if (!user || (!convoId && !conversationId)) {
      return [];
    }

    try {
      setLoading(true);
      setError(null);
      
      const id = convoId || conversationId;
      const response = await fetch(`/api/ai/history?conversationId=${id}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch chat history');
      }
      
      setMessages(data.data);
      return data.data;
    } catch (error: any) {
      console.error('Error fetching chat history:', error.message);
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Send a message to the AI assistant
  const sendMessage = async (content: string) => {
    if (!user || !conversationId) {
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Optimistically add user message to UI
      const tempUserMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        user_id: user.id,
        created_at: new Date().toISOString(),
        content,
        role: 'user',
        conversation_id: conversationId
      };
      
      setMessages(prevMessages => [...prevMessages, tempUserMessage]);
      
      // Add loading message
      const tempAssistantMessage: ChatMessage = {
        id: `temp-assistant-${Date.now()}`,
        user_id: user.id,
        created_at: new Date().toISOString(),
        content: '...',
        role: 'assistant',
        conversation_id: conversationId
      };
      
      setMessages(prevMessages => [...prevMessages, tempAssistantMessage]);
      
      // Send message to API
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content, conversationId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Replace temp messages with actual messages from the server
      // This makes sure we have the correct IDs from the database
      await fetchChatHistory(conversationId);
      
      return data.data.message;
    } catch (error: any) {
      console.error('Error sending message:', error.message);
      setError(error.message);
      
      // Remove loading message on error
      setMessages(prevMessages => 
        prevMessages.filter(msg => !msg.id.startsWith('temp-assistant-'))
      );
      
      toast.error(error.message || 'Failed to send message');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Start a new conversation
  const startNewConversation = () => {
    setConversationId(uuidv4());
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    conversationId,
    loading,
    error,
    fetchChatHistory,
    sendMessage,
    startNewConversation
  };
} 