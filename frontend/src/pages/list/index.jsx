import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Items = () => {
  // const loginUser = useAuth();
  const [list, setList] = useState();

  useEffect(() => {
    document.title = 'Articles';

    const getList = async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const jsonRes = await res.json();
      setList(jsonRes);
    };
    getList();
  }, []);

  return (
    <div className="articles">
      <h2>Articles</h2>

      <ul>
        {list &&
          list.map((item) => (
            <li key={item._id}>
              <Link className="link" to={`/article/${item._id}`}>
                {item.category === 'limited' && (
                  <div className="badge">Members only</div>
                )}
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Items;
