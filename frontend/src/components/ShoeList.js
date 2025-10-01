import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Plus, Search, Filter } from 'lucide-react';
import { shoeAPI } from '../services/api';
import ShoeCard from './ShoeCard';

const ShoeList = () => {
  const [shoes, setShoes] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchShoes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await shoeAPI.getAllShoes();
      setShoes(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterAndSortShoes = useCallback(() => {
    let filtered = shoes.filter(shoe =>
      shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shoe.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shoe.modelColor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredShoes(filtered);
  }, [shoes, searchTerm, sortBy, sortOrder]);

  useEffect(() => {
    fetchShoes();
  }, [fetchShoes]);

  useEffect(() => {
    filterAndSortShoes();
  }, [filterAndSortShoes]);

  const handleDelete = async (model) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa giày này?')) {
      try {
        await shoeAPI.deleteShoe(model);
        setShoes(shoes.filter(shoe => shoe.model !== model));
        toast.success('Xóa giày thành công!');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Quản lý giày</h1>
        <Link to="/add" className="btn btn-primary">
          <Plus size={16} />
          Thêm giày mới
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="card mb-6">
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">
              <Search size={16} />
              Tìm kiếm
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Tìm theo tên, model hoặc màu sắc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              <Filter size={16} />
              Sắp xếp
            </label>
            <div className="flex gap-4">
              <select
                className="form-input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Tên</option>
                <option value="model">Model</option>
                <option value="price">Giá</option>
                <option value="modelColor">Màu sắc</option>
              </select>
              <select
                className="form-input"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Hiển thị {filteredShoes.length} / {shoes.length} sản phẩm
        </p>
      </div>

      {/* Shoe Grid */}
      {filteredShoes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👟</div>
          <h3 className="empty-state-title">
            {searchTerm ? 'Không tìm thấy sản phẩm' : 'Chưa có sản phẩm nào'}
          </h3>
          <p className="empty-state-description">
            {searchTerm 
              ? 'Thử thay đổi từ khóa tìm kiếm' 
              : 'Hãy thêm sản phẩm đầu tiên của bạn'
            }
          </p>
          {!searchTerm && (
            <Link to="/add" className="btn btn-primary">
              <Plus size={16} />
              Thêm giày đầu tiên
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-3">
          {filteredShoes.map((shoe) => (
            <ShoeCard
              key={shoe._id}
              shoe={shoe}
              onDelete={handleDelete}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoeList;
