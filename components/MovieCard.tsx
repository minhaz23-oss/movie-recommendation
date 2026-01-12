'use client';

import { motion } from 'framer-motion';
import { Star, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export default function MovieCard({ movie, index }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.png';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link href={`/movie/${movie.id}`}>
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-gray-800">
          {/* Poster Image */}
          <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Rating Badge */}
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-semibold text-sm">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-3 space-y-1.5">
            <h3 className="font-bold text-sm text-gray-100 line-clamp-1 group-hover:text-purple-400 transition-colors">
              {movie.title}
            </h3>

            {/* Release Date */}
            {movie.release_date && (
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
            )}

            {/* Overview */}
            <p className="text-gray-400 text-xs line-clamp-2">
              {movie.overview || 'No description available.'}
            </p>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {movie.genres.slice(0, 2).map((genre) => (
                  <span
                    key={genre.id}
                    className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-medium rounded-full border border-purple-500/30"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
