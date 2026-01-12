import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mood, genre, yearRange, industry, type, language, rating } = body;

    // Construct a detailed prompt for the AI
    const prompt = `You are a movie recommendation expert. Based on the following preferences, recommend exactly 3-5 movies that match these criteria:

Mood: ${mood}
Genre: ${genre}
Year Range: ${yearRange.start} - ${yearRange.end}
Industry: ${industry}
Type: ${type}
${language ? `Language: ${language}` : ''}
${rating ? `Minimum Rating: ${rating}` : ''}

Please respond with ONLY a JSON array of movie titles (exact titles as they appear in TMDB). Format: ["Movie Title 1", "Movie Title 2", "Movie Title 3"]

Do not include any explanation, just the JSON array of movie titles.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Parse the AI response to extract movie titles
    let movieTitles: string[] = [];
    try {
      // Try to parse as JSON first
      movieTitles = JSON.parse(aiResponse);
    } catch {
      // If not valid JSON, try to extract titles from text
      const matches = aiResponse.match(/"([^"]+)"/g);
      if (matches) {
        movieTitles = matches.map((m: string) => m.replace(/"/g, ''));
      }
    }

    return NextResponse.json({ movies: movieTitles });
  } catch (error) {
    console.error('Error in recommend API:', error);
    return NextResponse.json(
      { error: 'Failed to get recommendations' },
      { status: 500 }
    );
  }
}
