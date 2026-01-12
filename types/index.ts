export interface RecommendationFormData {
  mood: string;
  genre: string;
  yearRange: {
    start: number;
    end: number;
  };
  industry: string;
  type: string;
  language?: string;
  rating?: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
  videos?: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
}

export interface AIRecommendation {
  movies: string[];
}
