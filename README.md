# 🎬 CineMatch - AI-Powered Movie Recommendation System

A beautiful, modern movie recommendation website built with Next.js 15, TypeScript, and Tailwind CSS. Get personalized movie recommendations based on your mood, preferences, and more!

## ✨ Features

- **AI-Powered Recommendations**: Uses OpenRouter API with GPT models to generate intelligent movie suggestions
- **Comprehensive Filters**: Select mood, genre, year range, industry (Hollywood/Bollywood/etc.), type, rating, and language
- **TMDB Integration**: Fetches detailed movie information including posters, ratings, trailers, and more
- **Beautiful UI**: Modern, responsive design with smooth animations using Framer Motion
- **Movie Details**: Click on any movie to see full details, trailers, cast, and more
- **Optimized Performance**: Built with Next.js 15 App Router for optimal performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenRouter API key ([Get one here](https://openrouter.ai/))
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd movierecommendation12
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your API keys:
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: OpenRouter API (GPT-4o-mini)
- **Movie Data**: TMDB API

## 📁 Project Structure

```
movierecommendation12/
├── app/
│   ├── api/
│   │   ├── recommend/      # AI recommendation endpoint
│   │   ├── search/         # TMDB search endpoint
│   │   └── movie/[id]/     # Movie details endpoint
│   ├── movie/[id]/         # Movie detail page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── RecommendationForm.tsx  # Main form component
│   └── MovieCard.tsx           # Movie card component
├── types/
│   └── index.ts            # TypeScript types
└── public/                 # Static assets
```

## 🎯 How It Works

1. **User Input**: Users fill out a comprehensive form with their preferences:
   - Mood (Happy, Sad, Excited, etc.)
   - Genre (Action, Comedy, Drama, etc.)
   - Year Range
   - Industry (Hollywood, Bollywood, Korean, etc.)
   - Type (Movie/Series)
   - Optional: Minimum Rating & Language

2. **AI Processing**: The form data is sent to OpenRouter API, which uses GPT-4o-mini to generate 3-5 movie recommendations based on the preferences.

3. **Movie Fetching**: The AI-suggested movie titles are searched in TMDB database to fetch complete movie details.

4. **Display Results**: Movies are displayed in beautiful cards with posters, ratings, and descriptions.

5. **Detailed View**: Users can click on any movie to see full details including trailers, cast, runtime, and more.

## 🎨 UI Features

- **Gradient Backgrounds**: Beautiful purple-blue-pink gradients
- **Smooth Animations**: Framer Motion animations for all interactions
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Custom Scrollbar**: Styled scrollbar matching the theme
- **Hover Effects**: Interactive hover states on all clickable elements
- **Loading States**: Beautiful loading indicators during API calls

## 🔧 Configuration

### Customizing AI Model

Edit `app/api/recommend/route.ts` to change the AI model:
```typescript
model: 'openai/gpt-4o-mini', // Change to any OpenRouter supported model
```

### Adjusting Recommendation Count

Modify the prompt in `app/api/recommend/route.ts` to change the number of recommendations:
```typescript
recommend exactly 3-5 movies // Change to your desired range
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for movie data
- [OpenRouter](https://openrouter.ai/) for AI API
- [Lucide](https://lucide.dev/) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for animations

---

Made with ❤️ for movie lovers
