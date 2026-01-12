'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Sparkles } from 'lucide-react';
import RecommendationForm from '@/components/RecommendationForm';
import MovieCard from '@/components/MovieCard';
import { RecommendationFormData, Movie } from '@/types';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = async (formData: RecommendationFormData) => {
    setLoading(true);
    setShowResults(false);

    try {
      // Get AI recommendations
      const recommendResponse = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const { movies: movieTitles } = await recommendResponse.json();

      // Fetch movie details from TMDB for each recommended movie
      const moviePromises = movieTitles.map(async (title: string) => {
        const searchResponse = await fetch(
          `/api/search?query=${encodeURIComponent(title)}`
        );
        const searchData = await searchResponse.json();

        if (searchData.results && searchData.results.length > 0) {
          const movieId = searchData.results[0].id;
          const detailResponse = await fetch(`/api/movie/${movieId}`);
          return detailResponse.json();
        }
        return null;
      });

      const movieDetails = await Promise.all(moviePromises);
      const validMovies = movieDetails.filter((movie) => movie !== null);

      setMovies(validMovies);
      setShowResults(true);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setShowResults(false);
    setMovies([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              CineMatch
            </h1>
            <Sparkles className="w-12 h-12 text-pink-400" />
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover your perfect movie match with AI-powered recommendations
            tailored to your mood and preferences
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RecommendationForm
                onSubmit={handleFormSubmit}
                isLoading={loading}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl sm:text-3xl font-bold text-gray-100"
                >
                  Your Perfect Matches
                  <span className="ml-2 sm:ml-3 text-purple-400 text-xl sm:text-3xl">
                    ({movies.length} {movies.length === 1 ? 'movie' : 'movies'})
                  </span>
                </motion.h2>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNewSearch}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  New Search
                </motion.button>
              </div>

              {/* Movie Grid */}
              {movies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {movies.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} index={index} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-xl text-gray-400">
                    No movies found. Try adjusting your preferences.
                  </p>
                  <button
                    onClick={handleNewSearch}
                    className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center text-gray-500"
        >
          <p className="text-sm">
            Powered by AI & TMDB • Made with ❤️ for movie lovers
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
