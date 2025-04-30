import React from 'react';
import { Link } from 'react-router-dom';

// favoriteMovies prop'unu props objesinden alıyoruz
const FavoriteMovieList = (props) => {
  const { favoriteMovies, darkMode } = props; // favoriteMovies prop'unu buradan alın

  return (
    <div
      className={`flex-1 sm:max-w-[250px] p-5 pr-5 shadow rounded-md ${
        darkMode
          ? 'bg-slate-800 text-white border-slate-700'
          : 'bg-white border-zinc-200'
      }`}
    >
      <h5 className="font-bold dark:text-gray-200">Favori Filmler</h5>
      <div className="pt-3 text-sm">
        {/* favoriteMovies state'indeki filmleri map ediyoruz */}
        {favoriteMovies.map((movie) => (
          // Her bir favori film öğesine data-testid="fav-movie" attribute'unu ekliyoruz
          <Link
            key={movie.id} // Liste elemanları için key kullanmak önemlidir
            className="py-1 flex gap-2 justify-between dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" // Stil güncellendi
            to={`/movies/${movie.id}`}
            data-testid="fav-movie" // Testin beklediği data-testid
          >
            {movie.title}
          </Link>
        ))}
        {/* Favori listesi boşsa mesaj göster */}
        {favoriteMovies.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            Henüz favori filminiz yok.
          </p>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovieList;
