import React from "react";


export const ProductShare = () => {
  return (
    <div className="mt-8">
      <div className="dropdown">
        <a
          className="btn btn-outline-secondary dropdown-toggle"
          href="!#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Share
        </a>

        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="!#">
              <i className="bi bi-facebook me-2"></i>Facebook
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="!#">
              <i className="bi bi-twitter me-2"></i>Twitter
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="!#">
              <i className="bi bi-instagram me-2"></i>Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
