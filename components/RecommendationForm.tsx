'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Film,
  Calendar,
  Globe,
  Tv,
  Star,
  Languages,
  Loader2,
} from 'lucide-react';
import { RecommendationFormData } from '@/types';

interface RecommendationFormProps {
  onSubmit: (data: RecommendationFormData) => void;
  isLoading: boolean;
}

const moods = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'excited', label: 'Excited', emoji: '🤩' },
  { value: 'relaxed', label: 'Relaxed', emoji: '😌' },
  { value: 'adventurous', label: 'Adventurous', emoji: '🗺️' },
  { value: 'romantic', label: 'Romantic', emoji: '💕' },
  { value: 'thoughtful', label: 'Thoughtful', emoji: '🤔' },
  { value: 'scared', label: 'Scared', emoji: '😱' },
];

const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western',
];

const industries = [
  { value: 'hollywood', label: 'Hollywood' },
  { value: 'bollywood', label: 'Bollywood' },
  { value: 'korean', label: 'Korean Cinema' },
  { value: 'japanese', label: 'Japanese Cinema' },
  { value: 'european', label: 'European Cinema' },
  { value: 'any', label: 'Any' },
];

const types = [
  { value: 'movie', label: 'Movie' },
  { value: 'series', label: 'Series' },
  { value: 'any', label: 'Any' },
];

const ratings = [
  { value: '7', label: '7+ ⭐' },
  { value: '8', label: '8+ ⭐⭐' },
  { value: '9', label: '9+ ⭐⭐⭐' },
];

export default function RecommendationForm({
  onSubmit,
  isLoading,
}: RecommendationFormProps) {
  const currentYear = new Date().getFullYear();
  
  const [formData, setFormData] = useState<RecommendationFormData>({
    mood: '',
    genre: '',
    yearRange: { start: 2000, end: currentYear },
    industry: '',
    type: 'movie',
    language: '',
    rating: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto space-y-8 bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-800"
    >
      {/* Mood Selection */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-100">
          <Sparkles className="w-5 h-5 text-purple-400" />
          What's your mood?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {moods.map((mood) => (
            <motion.button
              key={mood.value}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormData({ ...formData, mood: mood.value })}
              className={`p-4 rounded-2xl border-2 transition-all ${
                formData.mood === mood.value
                  ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                  : 'border-gray-700 hover:border-purple-400 bg-gray-800/50'
              }`}
            >
              <div className="text-3xl mb-1">{mood.emoji}</div>
              <div className="text-sm font-medium text-gray-200">
                {mood.label}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Genre Selection */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-100">
          <Film className="w-5 h-5 text-blue-400" />
          Pick a genre
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {genres.map((genre) => (
            <motion.button
              key={genre}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormData({ ...formData, genre })}
              className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                formData.genre === genre
                  ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/20 text-blue-300'
                  : 'border-gray-700 hover:border-blue-400 bg-gray-800/50 text-gray-300'
              }`}
            >
              {genre}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Year Range */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-100">
          <Calendar className="w-5 h-5 text-green-400" />
          Year Range
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              From
            </label>
            <input
              type="number"
              min="1900"
              max={currentYear}
              value={formData.yearRange.start}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  yearRange: {
                    ...formData.yearRange,
                    start: parseInt(e.target.value),
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-gray-800/50 text-gray-100 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              To
            </label>
            <input
              type="number"
              min="1900"
              max={currentYear}
              value={formData.yearRange.end}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  yearRange: {
                    ...formData.yearRange,
                    end: parseInt(e.target.value),
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-gray-800/50 text-gray-100 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Industry Selection */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-100">
          <Globe className="w-5 h-5 text-orange-400" />
          Industry
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {industries.map((industry) => (
            <motion.button
              key={industry.value}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setFormData({ ...formData, industry: industry.value })
              }
              className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                formData.industry === industry.value
                  ? 'border-orange-500 bg-orange-500/20 shadow-lg shadow-orange-500/20 text-orange-300'
                  : 'border-gray-700 hover:border-orange-400 bg-gray-800/50 text-gray-300'
              }`}
            >
              {industry.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Type Selection */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-100">
          <Tv className="w-5 h-5 text-pink-400" />
          Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {types.map((type) => (
            <motion.button
              key={type.value}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormData({ ...formData, type: type.value })}
              className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                formData.type === type.value
                  ? 'border-pink-500 bg-pink-500/20 shadow-lg shadow-pink-500/20 text-pink-300'
                  : 'border-gray-700 hover:border-pink-400 bg-gray-800/50 text-gray-300'
              }`}
            >
              {type.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-100">
          <Star className="w-5 h-5 text-yellow-400" />
          Minimum Rating (Optional)
        </label>
        <div className="grid grid-cols-3 gap-3">
          {ratings.map((rating) => (
            <motion.button
              key={rating.value}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setFormData({
                  ...formData,
                  rating:
                    formData.rating === rating.value ? '' : rating.value,
                })
              }
              className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                formData.rating === rating.value
                  ? 'border-yellow-500 bg-yellow-500/20 shadow-lg shadow-yellow-500/20 text-yellow-300'
                  : 'border-gray-700 hover:border-yellow-400 bg-gray-800/50 text-gray-300'
              }`}
            >
              {rating.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Language Input */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-100">
          <Languages className="w-5 h-5 text-indigo-400" />
          Preferred Language (Optional)
        </label>
        <input
          type="text"
          value={formData.language}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
          placeholder="e.g., English, Hindi, Korean"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-gray-800/50 text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={
          isLoading || !formData.mood || !formData.genre || !formData.industry
        }
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Finding perfect movies...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Get Recommendations
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
