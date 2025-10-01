import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, ExternalLink } from 'lucide-react';

const ShoeCard = ({ shoe, onDelete, formatPrice }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(shoe.model);
  };

  return (
    <div className="shoe-card">
      <div className="shoe-image-container">
        <img
          src={shoe.imgAddress}
          alt={shoe.name}
          className="shoe-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      <div className="shoe-info">
        <h3 className="shoe-name">{shoe.name}</h3>
        <p className="shoe-model">Model: {shoe.model}</p>
        <p className="shoe-color">Màu: {shoe.modelColor}</p>
        <p className="shoe-price">{formatPrice(shoe.price)}</p>
        <div className="shoe-actions">
          <Link
            to={`/edit/${shoe.model}`}
            className="btn btn-secondary btn-sm"
          >
            <Edit size={14} />
            Sửa
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger btn-sm"
          >
            <Trash2 size={14} />
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoeCard;
