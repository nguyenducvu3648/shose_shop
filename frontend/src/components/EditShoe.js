import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';
import { shoeAPI } from '../services/api';

const EditShoe = () => {
  const navigate = useNavigate();
  const { model } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    price: '',
    imgAddress: '',
    modelColor: ''
  });

  const fetchShoe = useCallback(async () => {
    try {
      setFetching(true);
      const shoe = await shoeAPI.getShoeByModel(model);
      setFormData({
        name: shoe.name,
        model: shoe.model,
        price: shoe.price.toString(),
        imgAddress: shoe.imgAddress,
        modelColor: shoe.modelColor
      });
    } catch (error) {
      toast.error(error.message);
      navigate('/');
    } finally {
      setFetching(false);
    }
  }, [model, navigate]);

  useEffect(() => {
    fetchShoe();
  }, [fetchShoe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.model || !formData.price || !formData.imgAddress || !formData.modelColor) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (isNaN(formData.price) || formData.price <= 0) {
      toast.error('Giá phải là số dương');
      return;
    }

    try {
      setLoading(true);
      const shoeData = {
        ...formData,
        price: parseInt(formData.price)
      };
      
      await shoeAPI.updateShoe(model, shoeData);
      toast.success('Cập nhật giày thành công!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa giày này?')) {
      try {
        setLoading(true);
        await shoeAPI.deleteShoe(model);
        toast.success('Xóa giày thành công!');
        navigate('/');
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (fetching) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>
        <div className="flex gap-4">
          <h1 className="page-title">Chỉnh sửa giày</h1>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
            disabled={loading}
          >
            <Trash2 size={16} />
            Xóa
          </button>
        </div>
      </div>

      <div className="form-container">
        <div className="card">
          <div className="form-header">
            <h2 className="form-title">Thông tin giày</h2>
            <p className="form-subtitle">Chỉnh sửa thông tin giày: {formData.name}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Tên giày *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Ví dụ: Nike Air Max 270"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="model" className="form-label">
                Model *
              </label>
              <input
                type="text"
                id="model"
                name="model"
                className="form-input"
                placeholder="Ví dụ: AIR-MAX-270-BLACK"
                value={formData.model}
                onChange={handleChange}
                required
              />
              <small className="text-gray-500">
                Model phải là duy nhất và không có khoảng trắng
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Giá (VND) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-input"
                placeholder="Ví dụ: 3200000"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="imgAddress" className="form-label">
                URL hình ảnh *
              </label>
              <input
                type="url"
                id="imgAddress"
                name="imgAddress"
                className="form-input"
                placeholder="https://example.com/image.jpg"
                value={formData.imgAddress}
                onChange={handleChange}
                required
              />
              <small className="text-gray-500">
                Nhập URL hình ảnh từ internet
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="modelColor" className="form-label">
                Màu sắc *
              </label>
              <input
                type="text"
                id="modelColor"
                name="modelColor"
                className="form-input"
                placeholder="Ví dụ: Black/White"
                value={formData.modelColor}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn btn-secondary"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Cập nhật
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditShoe;
