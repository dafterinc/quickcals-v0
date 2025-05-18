import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getCurrentUser, getUserProfile, addChatMessage } from '@/lib/database/utils';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful nutrition and fitness assistant for the QuickCals app.
Your role is to help users with their nutrition questions, meal planning, and fitness advice.

You can:
- Suggest recipes based on nutritional goals and preferences
- Explain nutritional concepts and macronutrients
- Provide general fitness advice appropriate for a nutrition app
- Help calculate calories and macros for given foods
- Give advice on weight management strategies

You should NOT:
- Provide medical advice or diagnoses
- Prescribe specific workout routines
- Recommend extreme diet plans or fasting protocols
- Suggest medications or supplements
- Make claims about curing any medical conditions

Always provide practical, evidence-based advice that's supportive of the user's health goals.`;

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const { message, conversationId } = await req.json();
    
    if (!message || !conversationId) {
      return NextResponse.json(
        { error: 'Message and conversation ID are required' },
        { status: 400 }
      );
    }
    
    // Get user profile for context
    const profile = await getUserProfile(user.id);
    
    // Store user message
    await addChatMessage({
      user_id: user.id,
      content: message,
      role: 'user',
      conversation_id: conversationId
    });
    
    // Prepare context for AI
    let userContext = '';
    if (profile) {
      userContext = `The user has the following profile information that may be relevant:
- Goal: ${profile.goal || 'Not specified'}
- Weight: ${profile.weight ? `${profile.weight} kg` : 'Not specified'}
- Height: ${profile.height ? `${profile.height} cm` : 'Not specified'}
- Age: ${profile.age || 'Not specified'}
- Gender: ${profile.gender || 'Not specified'}
- Activity level: ${profile.activity_level || 'Not specified'}`;
    }
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `${SYSTEM_PROMPT}
          
${userContext}`
        },
        {
          role: 'user',
          content: message
        }
      ],
    });
    
    const responseContent = completion.choices[0].message.content || 'I apologize, but I couldn\'t generate a response.';
    
    // Store assistant message
    const savedMessage = await addChatMessage({
      user_id: user.id,
      content: responseContent,
      role: 'assistant',
      conversation_id: conversationId
    });
    
    return NextResponse.json({ 
      success: true, 
      data: { message: savedMessage }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
