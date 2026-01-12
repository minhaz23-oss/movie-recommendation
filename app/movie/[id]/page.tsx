'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  Calendar,
  Clock,
  Play,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';
import { use } from 'react';

export default function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movie/${resolvedParams.id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">
            Movie not found
          </h1>
          <Link
            href="/"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.png';

  const trailer = movie.videos?.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Back Button */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl border border-gray-800 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-100" />
            <span className="font-medium text-gray-100">Back</span>
          </motion.button>
        </Link>
      </div>

      {/* Backdrop */}
      {backdropUrl && (
        <div className="relative h-[60vh] w-full">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 -mt-20 sm:-mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="relative w-full md:w-80 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 space-y-6"
          >
            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-2">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-base sm:text-lg md:text-xl text-gray-400 italic">{movie.tagline}</p>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-gray-300 text-sm sm:text-base">
              {movie.release_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="font-medium">
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}

              {movie.runtime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">{movie.runtime} min</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-lg">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-500">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 font-medium rounded-full text-sm border border-purple-500/30"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-3">
                Overview
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Trailer */}
            {trailer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-800"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                  <Play className="w-6 h-6 text-red-500" />
                  Trailer
                </h2>
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-800">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
