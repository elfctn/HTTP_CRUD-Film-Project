import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';

const EditMovieForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { setMovies } = props; // setMovies prop'u App.jsx'den alındı
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    genre: '',
    metascore: 0,
    description: '',
  });

  useEffect(() => {
    axios
      .get('https://nextgen-project.onrender.com/api/s11d3/movies/' + id)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]); // id değiştiğinde fetch yap

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put('https://nextgen-project.onrender.com/api/s11d3/movies/' + id, movie)
      .then((res) => {
        // API'den dönen güncel film listesi ile movies state'ini güncelle
        setMovies(res.data);
        // Filmin detay sayfasına yönlendir
        history.push('/movies/' + id);
      })
      .catch((err) => console.error(err));
  };

  const { title, director, genre, metascore, description } = movie;

  return (
    <div className="flex-1">
      {' '}
      {/* Layout için flex-1 eklendi */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-md shadow dark:bg-slate-800 dark:text-white"
      >
        <div className="p-5 pb-3 border-b border-zinc-200 dark:border-gray-700">
          <h4 className="text-xl font-bold">
            Filmi Düzenle: <strong>{title}</strong>
          </h4>
        </div>
        <div className="px-5 py-3">
          <div className="py-2">
            <label
              htmlFor="title"
              className="block pb-1 text-lg dark:text-gray-300"
            >
              Title
            </label>
            <input
              className="w-full rounded-md border border-zinc-200 px-3 py-2 dark:bg-slate-800 dark:text-white dark:border-gray-700"
              value={title}
              onChange={handleChange}
              name="title"
              id="title"
              type="text"
            />
          </div>
          <div className="py-2">
            <label
              htmlFor="director"
              className="block pb-1 text-lg dark:text-gray-300"
            >
              Director
            </label>
            <input
              className="w-full rounded-md border border-zinc-200 px-3 py-2 dark:bg-slate-800 dark:text-white dark:border-gray-700"
              value={director}
              onChange={handleChange}
              name="director"
              id="director"
              type="text"
            />
          </div>
          <div className="py-2">
            <label
              htmlFor="genre"
              className="block pb-1 text-lg dark:text-gray-300"
            >
              Genre
            </label>
            <input
              className="w-full rounded-md border border-zinc-200 px-3 py-2 dark:bg-slate-800 dark:text-white dark:border-gray-700"
              value={genre}
              onChange={handleChange}
              name="genre"
              id="genre"
              type="text"
            />
          </div>
          <div className="py-2">
            <label
              htmlFor="metascore"
              className="block pb-1 text-lg dark:text-gray-300"
            >
              Metascore
            </label>
            <input
              className="w-full rounded-md border border-zinc-200 px-3 py-2 dark:bg-slate-800 dark:text-white dark:border-gray-700"
              value={metascore}
              onChange={handleChange}
              name="metascore"
              id="metascore"
              type="number"
            />
          </div>
          <div className="py-2">
            <label
              htmlFor="description"
              className="block pb-1 text-lg dark:text-gray-300 "
            >
              Description
            </label>
            <textarea
              className="w-full rounded-md border border-zinc-200 px-3 py-2 dark:bg-slate-800 dark:text-white dark:border-gray-700"
              value={description}
              onChange={handleChange}
              name="description"
              id="description"
            ></textarea>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-2 dark:border-gray-700">
          <Link
            to={`/movies/${id}`}
            className="myButton bg-zinc-500 hover:bg-zinc-600"
          >
            Vazgeç
          </Link>
          <button
            type="submit"
            className="myButton bg-green-700 hover:bg-green-600"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieForm;
