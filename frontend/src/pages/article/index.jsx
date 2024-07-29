import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../utils/useAuth';
import './index.scss';

const Article = () => {
  const isLoggedIn = useAuth();
  const [article, setArticle] = useState({});
  const params = useParams();

  useEffect(() => {
    document.title = article && article.title;

    const getArticle = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/articles/${params.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const jsonRes = await res.json();
      setArticle(jsonRes);
    };
    getArticle();
  }, []);

  return (
    <div className="article">
      {article && (
        <>
          <h2>{article.title} </h2>
          <p className="main">
            {!isLoggedIn && article.category === 'limited' ? (
              <span>
                <span>Please log in to view this article.</span>
                <Link className="button" to="/login">
                  Log in
                </Link>
              </span>
            ) : (
              article.content
            )}
          </p>
        </>
      )}
      <Link className="button" to="/articles">
        Back to articles
      </Link>
    </div>
  );
};

export default Article;
