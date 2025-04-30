import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Movie = (props) => {
  const { addToFavorites, deleteMovie } = props; // deleteMovie prop'u App.jsx'den alındı

  const [movie, setMovie] = useState(null); // null olarak başla, veri gelince dolsun

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://nextgen-project.onrender.com/api/s11d3/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id]); // id değiştiğinde fetch yap

  const handleSil = () => {
    deleteMovie(id); // App.jsx'den gelen deleteMovie fonksiyonunu çağır
    // Film silindikten sonra anasayfaya yönlendir
    history.push('/movies');
  };

  if (!movie) {
    return <div>Loading...</div>; // Veri yüklenene kadar Loading göster
  }

  return (
    <div className="bg-white rounded-md shadow flex-1 dark:bg-slate-800 dark:text-white">
      <div className="p-5 pb-3 border-b border-zinc-200 dark:border-gray-700">
        <h4 className="text-xl font-bold">{movie.title} Detayları</h4>
      </div>
      <div className="px-5 py-3">
        <div className="py-1 flex">
          <div className="view-label text-gray-600 dark:text-gray-400">
            İsim
          </div>{' '}
          {/* Label rengi eklendi */}
          <div className="flex-1">{movie.title}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label text-gray-600 dark:text-gray-400">
            Yönetmen
          </div>{' '}
          {/* Label rengi eklendi */}
          <div className="flex-1">{movie.director}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label text-gray-600 dark:text-gray-400">Tür</div>{' '}
          {/* Label rengi eklendi */}
          <div className="flex-1">{movie.genre}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label text-gray-600 dark:text-gray-400">
            Metascore
          </div>{' '}
          {/* Label rengi eklendi */}
          <div className="flex-1">{movie.metascore}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label text-gray-600 dark:text-gray-400">
            Açıklama
          </div>{' '}
          {/* Label rengi eklendi */}
          <p className="flex-1">{movie.description}</p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-zinc-200 flex justify-end gap-2 dark:border-gray-700">
        <button
          className="myButton bg-blue-600 hover:bg-blue-500 dark:bg-blue-200 dark:hover:bg-blue-400 dark:text-slate-800"
          onClick={() => addToFavorites(movie)}
        >
          Favorilere ekle
        </button>
        <Link
          to={`/movies/edit/${movie.id}`}
          className="myButton bg-blue-600 hover:bg-blue-500 dark:bg-blue-200 dark:hover:bg-blue-400 dark:text-slate-800"
        >
          Edit
        </Link>
        {/* Sil butonu eklendi ve renkleri düzenlendi */}
        <button
          className="myButton bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600" // dark mode renkleri diğer butonlardan örnek alındı
          onClick={handleSil}
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default Movie;
