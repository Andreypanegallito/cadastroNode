import { Link } from "react-router-dom";

import './pagenotfound.scss';

const PageNotFound = () => {
  return (
    <div id="page-not-found">
      <div className="text-page">
        <p>
          Página não encontrada.
        </p>
      </div>

      <div className="div-btn">
        <Link to="/" className='btn-link'>Voltar</Link>
      </div>
    </div>
  )
};

export default PageNotFound;