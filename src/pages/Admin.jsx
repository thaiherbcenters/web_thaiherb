import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './Admin.css';

// Use empty string for production (nginx proxies /api/ to backend)
// Use 'http://localhost:3001' for local development without nginx
const API_URL = '';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        product_code: '',
        name: '',
        category: '',
        description: '',
        icon: '🌿',
        tag: '',
        price: '',
        price: '',
        stock: '',
        is_active: true
    });

    const [adFile, setAdFile] = useState(null);
    const [adLocalPreview, setAdLocalPreview] = useState(null);
    const [adPreview, setAdPreview] = useState(`/images/popup/popup-ad.webp?t=${Date.now()}`);

    const [adMobileFile, setAdMobileFile] = useState(null);
    const [adMobileLocalPreview, setAdMobileLocalPreview] = useState(null);
    const [adMobilePreview, setAdMobilePreview] = useState(`/images/popup/popup-ad-mobile.webp?t=${Date.now()}`);

    const [adEndDate, setAdEndDate] = useState('');
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success', description = '') => {
        setToast({ message, type, description, id: Date.now() });
        setTimeout(() => setToast(null), 3000);
    };

    // DnD Sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Fetch products and stats
    useEffect(() => {
        fetchProducts();
        fetchStats();
        fetchAdConfig();
    }, []);

    const fetchAdConfig = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/popup-config`);
            const data = await res.json();
            if (data.success && data.data) {
                setAdEndDate(data.data.endDate || '');
            }
        } catch (error) {
            console.error('Error fetching ad config:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/products`);
            const data = await res.json();
            if (data.success) {
                setProducts(data.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/stats`);
            const data = await res.json();
            if (data.success) {
                setStats(data.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/admin/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseInt(formData.price),
                    stock: parseInt(formData.stock) || 0
                })
            });
            const data = await res.json();
            if (data.success) {
                alert('เพิ่มสินค้าสำเร็จ!');
                setShowAddForm(false);
                setFormData({
                    product_code: '', name: '', category: '', description: '',
                    icon: '🌿', tag: '', price: '', stock: ''
                });
                fetchProducts();
                fetchStats();
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('เกิดข้อผิดพลาด');
        }
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/admin/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseInt(formData.price),
                    stock: parseInt(formData.stock) || 0,
                    is_active: formData.is_active
                })
            });
            const data = await res.json();
            if (data.success) {
                alert('แก้ไขสินค้าสำเร็จ!');
                setEditingProduct(null);
                fetchProducts();
                fetchStats();
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('เกิดข้อผิดพลาด');
        }
    };

    const handleDeleteProduct = async (id, name) => {
        if (!window.confirm(`ต้องการลบสินค้า "${name}" หรือไม่?`)) return;

        try {
            const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                alert('ลบสินค้าสำเร็จ!');
                fetchProducts();
                fetchStats();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('เกิดข้อผิดพลาด');
        }
    };

    const handleUpdateStock = async (id, newStock) => {
        try {
            const res = await fetch(`${API_URL}/api/admin/products/${id}/stock`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stock: parseInt(newStock) })
            });
            const data = await res.json();
            if (data.success) {
                fetchProducts();
                fetchStats();
            }
        } catch (error) {
            console.error('Error updating stock:', error);
        }
    };

    const handleAdFileChange = (e, type = 'desktop') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (type === 'mobile') {
                setAdMobileFile(file);
                setAdMobileLocalPreview(URL.createObjectURL(file));
            } else {
                setAdFile(file);
                setAdLocalPreview(URL.createObjectURL(file));
            }
        }
    };

    const handleUploadAd = async (type = 'desktop') => {
        const file = type === 'mobile' ? adMobileFile : adFile;
        if (!file) {
            showToast('กรุณาเลือกไฟล์รูปภาพก่อนครับ', 'error');
            return;
        }

        setIsUploading(true);
        showToast('กำลังบีบอัดและอัปโหลดรูปภาพ...', 'success', 'เพื่อความรวดเร็วในการโหลดหน้าเว็บ');

        try {
            const options = {
                maxSizeMB: 0.5, // 500KB Max
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                initialQuality: 0.85
            };
            
            const compressedFile = await imageCompression(file, options);

            const formData = new FormData();
            formData.append('image', compressedFile, file.name);

            const res = await fetch(`${API_URL}/api/admin/popup-ad/${type}`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                showToast(`อัปโหลดแอดโฆษณา (${type === 'mobile' ? 'มือถือ' : 'PC'}) สำเร็จ!`, 'success', 'ขนาดรูปถูกบีบอัดให้โหลดไวขึ้นแล้ว');
                if (type === 'mobile') {
                    setAdMobileFile(null);
                    setAdMobileLocalPreview(null);
                    setAdMobilePreview(`/images/popup/popup-ad-mobile.webp?t=${Date.now()}`);
                } else {
                    setAdFile(null);
                    setAdLocalPreview(null);
                    setAdPreview(`/images/popup/popup-ad.webp?t=${Date.now()}`);
                }
            } else {
                showToast('เกิดข้อผิดพลาด: ' + data.error, 'error');
            }
        } catch (error) {
            console.error('Error uploading ad:', error);
            showToast('เกิดข้อผิดพลาดในการอัปโหลด', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteAd = async (type = 'desktop') => {
        if (!window.confirm(`คุณต้องการปิดการแสดงผลแอดโฆษณา (${type === 'mobile' ? 'มือถือ' : 'PC'}) ใช่หรือไม่?`)) return;

        try {
            const res = await fetch(`${API_URL}/api/admin/popup-ad/${type}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                showToast(`ลบแอดโฆษณา (${type === 'mobile' ? 'มือถือ' : 'PC'}) สำเร็จ!`, 'success');
                if (type === 'mobile') {
                    setAdMobilePreview(`/images/popup/popup-ad-mobile.webp?t=${Date.now()}`);
                } else {
                    setAdPreview(`/images/popup/popup-ad.webp?t=${Date.now()}`);
                }
            } else {
                showToast('เกิดข้อผิดพลาด: ' + data.error, 'error');
            }
        } catch (error) {
            console.error('Error deleting ad:', error);
            showToast('เกิดข้อผิดพลาดในการลบแอด', 'error');
        }
    };

    const handleSaveConfig = async (clearDate = false) => {
        const dateToSave = clearDate ? '' : adEndDate;
        if (clearDate) setAdEndDate('');
        
        try {
            const res = await fetch(`${API_URL}/api/admin/popup-config`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ endDate: dateToSave })
            });
            const data = await res.json();
            if (data.success) {
                showToast(clearDate ? 'ยกเลิกการตั้งเวลาสำเร็จ!' : 'บันทึกเวลาสิ้นสุดสำเร็จ!', 'success');
            } else {
                showToast('เกิดข้อผิดพลาด: ' + data.error, 'error');
            }
        } catch (error) {
            console.error('Error saving ad config:', error);
            showToast('เกิดข้อผิดพลาดในการบันทึกเวลา', 'error');
        }
    };

    // Handle drag end - reorder products
    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = products.findIndex(p => p.id === active.id);
        const newIndex = products.findIndex(p => p.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const newProducts = arrayMove(products, oldIndex, newIndex);
        setProducts(newProducts);

        // Update sort_order for all products in the new order
        const updatePromises = newProducts.map((product, index) => {
            const newSortOrder = index + 1;
            return fetch(`${API_URL}/api/admin/products/${product.id}/sort-order`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sort_order: newSortOrder })
            }).catch(err => console.error('Error updating sort order:', err));
        });

        try {
            await Promise.all(updatePromises);
            console.log('Sort order updated successfully');
        } catch (error) {
            console.error('Error updating sort orders:', error);
        }

        // Refresh products to confirm saved state
        fetchProducts();
    };

    const startEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            product_code: product.product_code || '',
            name: product.name || '',
            category: product.category || '',
            description: product.description || '',
            icon: product.icon || '🌿',
            tag: product.tag || '',
            price: product.price || '',
            stock: product.stock || 0,
            is_active: product.is_active !== false
        });
        setShowAddForm(false);
    };

    const cancelEdit = () => {
        setEditingProduct(null);
        setShowAddForm(false);
        setFormData({
            product_code: '', name: '', category: '', description: '',
            icon: '🌿', tag: '', price: '', stock: '', is_active: true
        });
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="admin-loading">
                    <div className="spinner"></div>
                    <p>กำลังโหลด...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>🔧 Admin Dashboard</h1>
                <p>จัดการสินค้าและสต็อก</p>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="admin-stats">
                    <div className="stat-card">
                        <span className="stat-icon">📦</span>
                        <div className="stat-info">
                            <span className="stat-value">{stats.totalProducts}</span>
                            <span className="stat-label">สินค้าทั้งหมด</span>
                        </div>
                    </div>
                    <div className="stat-card warning">
                        <span className="stat-icon">⚠️</span>
                        <div className="stat-info">
                            <span className="stat-value">{stats.lowStock}</span>
                            <span className="stat-label">สินค้าใกล้หมด</span>
                        </div>
                    </div>
                    <div className="stat-card danger">
                        <span className="stat-icon">🚫</span>
                        <div className="stat-info">
                            <span className="stat-value">{stats.outOfStock}</span>
                            <span className="stat-label">สินค้าหมด</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <span className="stat-icon">🏷️</span>
                        <div className="stat-info">
                            <span className="stat-value">{stats.categories}</span>
                            <span className="stat-label">หมวดหมู่</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Ad Management Section */}
            <div className="admin-ad-management" style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                <h2>🖼️ จัดการป๊อปอัปหน้าแรก</h2>
                <p>อัปโหลดรูปภาพเพื่อนำไปแสดงเป็นแอดโฆษณาเมื่อลูกค้าเข้าเว็บไซต์</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    {/* Desktop Ad */}
                    <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>💻 รูปสำหรับคอมพิวเตอร์ (แนวนอน)</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <div className="custom-file-upload">
                                <label className={`file-upload-label ${adFile ? 'has-file' : ''}`} style={{ padding: adLocalPreview ? '10px' : '30px' }}>
                                    <input type="file" accept="image/*" onChange={(e) => handleAdFileChange(e, 'desktop')} />
                                    {adLocalPreview ? (
                                        <div style={{ textAlign: 'center' }}>
                                            <p style={{ margin: '0 0 10px 0', color: 'var(--primary-green)', fontWeight: 'bold' }}>✨ รูปที่จะอัปโหลด (พรีวิว)</p>
                                            <img src={adLocalPreview} alt="Local Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }} />
                                            <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', color: '#666' }}>คลิกที่นี่เพื่อเปลี่ยนรูป</p>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="upload-icon">📁</span>
                                            <span className="upload-text">คลิกเพื่อเลือกรูปภาพ</span>
                                            <span className="upload-subtext">แนะนำขนาด 1920x1080 (แนวนอน)</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', marginBottom: '20px' }}>
                            <button className="btn btn-primary" onClick={() => handleUploadAd('desktop')} disabled={!adFile || isUploading} style={{ flex: 1, padding: '10px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: isUploading ? 0.7 : 1 }}>
                                {isUploading ? '⏳ กำลังอัปโหลด...' : '⬆️ อัปโหลด'}
                            </button>
                            <button className="btn btn-secondary" onClick={() => handleDeleteAd('desktop')} disabled={isUploading} style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                ❌ ลบ
                            </button>
                        </div>
                        <div style={{ border: '1px dashed #ccc', padding: '10px', borderRadius: '8px', textAlign: 'center', background: '#fafafa' }}>
                            <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#666' }}>รูปที่แสดงผลปัจจุบัน:</p>
                            <img 
                                src={adPreview} 
                                alt="Current Desktop Ad" 
                                style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                                onLoad={(e) => {
                                    e.target.style.display = 'block';
                                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'none';
                                }}
                            />
                            <div style={{ display: 'none', color: '#999', padding: '20px', fontSize: '0.9rem' }}>(ยังไม่มีแอดเปิดใช้งาน)</div>
                        </div>
                    </div>

                    {/* Mobile Ad */}
                    <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>📱 รูปสำหรับมือถือ (แนวตั้ง)</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <div className="custom-file-upload">
                                <label className={`file-upload-label ${adMobileFile ? 'has-file' : ''}`} style={{ padding: adMobileLocalPreview ? '10px' : '30px' }}>
                                    <input type="file" accept="image/*" onChange={(e) => handleAdFileChange(e, 'mobile')} />
                                    {adMobileLocalPreview ? (
                                        <div style={{ textAlign: 'center' }}>
                                            <p style={{ margin: '0 0 10px 0', color: 'var(--primary-green)', fontWeight: 'bold' }}>✨ รูปที่จะอัปโหลด (พรีวิว)</p>
                                            <img src={adMobileLocalPreview} alt="Mobile Local Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }} />
                                            <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', color: '#666' }}>คลิกที่นี่เพื่อเปลี่ยนรูป</p>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="upload-icon">📱</span>
                                            <span className="upload-text">คลิกเพื่อเลือกรูปภาพ</span>
                                            <span className="upload-subtext">แนะนำขนาด 1080x1920 (แนวตั้ง)</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', marginBottom: '20px' }}>
                            <button className="btn btn-primary" onClick={() => handleUploadAd('mobile')} disabled={!adMobileFile || isUploading} style={{ flex: 1, padding: '10px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: isUploading ? 0.7 : 1 }}>
                                {isUploading ? '⏳ กำลังอัปโหลด...' : '⬆️ อัปโหลด'}
                            </button>
                            <button className="btn btn-secondary" onClick={() => handleDeleteAd('mobile')} disabled={isUploading} style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                ❌ ลบ
                            </button>
                        </div>
                        <div style={{ border: '1px dashed #ccc', padding: '10px', borderRadius: '8px', textAlign: 'center', background: '#fafafa' }}>
                            <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#666' }}>รูปที่แสดงผลปัจจุบัน:</p>
                            <img 
                                src={adMobilePreview} 
                                alt="Current Mobile Ad" 
                                style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                                onLoad={(e) => {
                                    e.target.style.display = 'block';
                                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'none';
                                }}
                            />
                            <div style={{ display: 'none', color: '#999', padding: '20px', fontSize: '0.9rem' }}>(ยังไม่มีแอดเปิดใช้งาน)</div>
                        </div>
                    </div>
                </div>

                {/* Settings for Expiration */}
                <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>⏱️ ตั้งเวลาสิ้นสุดการแสดงผลแอด (ถ้าต้องการ)</h3>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <input 
                            type="datetime-local" 
                            value={adEndDate} 
                            onChange={(e) => setAdEndDate(e.target.value)} 
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', minWidth: '250px' }}
                        />
                        <button className="btn btn-primary" onClick={() => handleSaveConfig(false)} style={{ padding: '10px 20px' }}>
                            💾 บันทึกเวลา
                        </button>
                        <button className="btn btn-secondary" onClick={() => handleSaveConfig(true)} style={{ padding: '10px 20px' }}>
                            🔄 ยกเลิกการตั้งเวลา (แสดงตลอด)
                        </button>
                    </div>
                    <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', color: '#666' }}>
                        * แอดจะไม่แสดงผลเมื่อถึงเวลาที่กำหนด หากไม่ตั้งเวลาจะแสดงผลไปตลอดจนกว่าจะกดลบ
                    </p>
                </div>
            </div>

            {/* Add Form Only */}
            {showAddForm && (
                <div className="admin-form-container">
                    <form className="admin-form" onSubmit={editingProduct ? handleEditProduct : handleAddProduct}>
                        <h3>{editingProduct ? '✏️ แก้ไขสินค้า' : '➕ เพิ่มสินค้าใหม่'}</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label>รหัสสินค้า</label>
                                <input
                                    type="text"
                                    name="product_code"
                                    value={formData.product_code}
                                    onChange={handleInputChange}
                                    placeholder="PRD001"
                                />
                            </div>
                            <div className="form-group">
                                <label>ชื่อสินค้า *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="ชื่อสินค้า"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>หมวดหมู่</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    placeholder="สมุนไพร"
                                />
                            </div>
                            <div className="form-group">
                                <label>ไอคอน</label>
                                <input
                                    type="text"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleInputChange}
                                    placeholder="🌿"
                                />
                            </div>
                        </div>

                        <div className="form-group full">
                            <label>รายละเอียด</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="รายละเอียดสินค้า..."
                            ></textarea>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>ราคา (บาท) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label>จำนวนในสต็อก</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label>แท็ก</label>
                                <select name="tag" value={formData.tag} onChange={handleInputChange}>
                                    <option value="">ไม่มี</option>
                                    <option value="ขายดี">ขายดี</option>
                                    <option value="แนะนำ">แนะนำ</option>
                                    <option value="ใหม่">ใหม่</option>
                                </select>
                            </div>
                            {editingProduct && (
                                <div className="form-group">
                                    <label>สถานะ</label>
                                    <select
                                        name="is_active"
                                        value={formData.is_active}
                                        onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.value === 'true' }))}
                                    >
                                        <option value="true">✅ ใช้งาน</option>
                                        <option value="false">❌ ไม่ใช้งาน</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                {editingProduct ? '💾 บันทึก' : '➕ เพิ่มสินค้า'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                                ❌ ยกเลิก
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Products Table */}
            <div className="admin-products">
                <div className="products-header">
                    <h2>📋 รายการสินค้า ({products.length}) <span className="drag-hint">💡 ลากแถวเพื่อเรียงลำดับ</span></h2>
                    {!showAddForm && !editingProduct && (
                        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
                            ➕ เพิ่มสินค้า
                        </button>
                    )}
                </div>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <div className="products-table-wrapper">
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>ลาก</th>
                                    <th>ID</th>
                                    <th>รูป</th>
                                    <th>ชื่อสินค้า</th>
                                    <th>หมวดหมู่</th>
                                    <th>ราคา</th>
                                    <th>สต็อก</th>
                                    <th>สถานะ</th>
                                    <th>จัดการ</th>
                                </tr>
                            </thead>
                            <SortableContext items={products.map(p => p.id)} strategy={verticalListSortingStrategy}>
                                <tbody>
                                    {products.map((product, index) => (
                                        <SortableProductRow
                                            key={product.id}
                                            product={product}
                                            index={index}
                                            editingProduct={editingProduct}
                                            formData={formData}
                                            handleInputChange={handleInputChange}
                                            handleEditProduct={handleEditProduct}
                                            cancelEdit={cancelEdit}
                                            handleUpdateStock={handleUpdateStock}
                                            startEdit={startEdit}
                                            handleDeleteProduct={handleDeleteProduct}
                                        />
                                    ))}
                                </tbody>
                            </SortableContext>
                        </table>
                    </div>
                </DndContext>
            </div>

            {/* Custom Toast Notification */}
            {toast && (
                <div className="admin-toast-container">
                    <div key={toast.id} className={`admin-toast ${toast.type}`}>
                        <span className="toast-icon">
                            {toast.type === 'success' ? '✅' : '❌'}
                        </span>
                        <div className="toast-content">
                            <h4>{toast.message}</h4>
                            {toast.description && <p>{toast.description}</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Sortable Product Row Component
const SortableProductRow = ({
    product,
    index,
    editingProduct,
    formData,
    handleInputChange,
    handleEditProduct,
    cancelEdit,
    handleUpdateStock,
    startEdit,
    handleDeleteProduct
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: product.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? '#e8f5e9' : undefined,
    };

    return (
        <>
            {/* Inline Edit Form */}
            {editingProduct && editingProduct.id === product.id && (
                <tr className="edit-row">
                    <td colSpan="9">
                        <form className="inline-edit-form" onSubmit={handleEditProduct}>
                            <h4>✏️ แก้ไขสินค้า: {product.name}</h4>
                            <div className="inline-form-grid">
                                <div className="form-group">
                                    <label>รหัสสินค้า</label>
                                    <input type="text" name="product_code" value={formData.product_code} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>ชื่อสินค้า *</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>หมวดหมู่</label>
                                    <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>ราคา (บาท)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" />
                                </div>
                                <div className="form-group">
                                    <label>สต็อก</label>
                                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} min="0" />
                                </div>
                                <div className="form-group form-group-full">
                                    <label>รายละเอียดสินค้า</label>
                                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="2" placeholder="รายละเอียดสินค้า..."></textarea>
                                </div>
                                <div className="form-group">
                                    <label>แท็ก</label>
                                    <select name="tag" value={formData.tag} onChange={handleInputChange}>
                                        <option value="">ไม่มี</option>
                                        <option value="ขายดี">ขายดี</option>
                                        <option value="แนะนำ">แนะนำ</option>
                                        <option value="ใหม่">ใหม่</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>สถานะ</label>
                                    <select name="is_active" value={formData.is_active} onChange={(e) => handleInputChange({ target: { name: 'is_active', value: e.target.value === 'true' } })}>
                                        <option value="true">✅ ใช้งาน</option>
                                        <option value="false">❌ ไม่ใช้งาน</option>
                                    </select>
                                </div>
                            </div>
                            <div className="inline-form-actions">
                                <button type="submit" className="btn btn-primary">💾 บันทึก</button>
                                <button type="button" className="btn btn-secondary" onClick={cancelEdit}>❌ ยกเลิก</button>
                            </div>
                        </form>
                    </td>
                </tr>
            )}
            {/* Product Row */}
            <tr
                ref={setNodeRef}
                style={style}
                className={`${!product.is_active ? 'inactive' : ''} ${editingProduct?.id === product.id ? 'editing' : ''}`}
            >
                <td>
                    <span className="drag-handle" {...attributes} {...listeners}>
                        ☰
                    </span>
                </td>
                <td>{product.id}</td>
                <td>
                    {product.icon && product.icon.startsWith('/') ? (
                        <img src={product.icon} alt="" className="product-thumb" />
                    ) : (
                        <span className="product-emoji">{product.icon || '🌿'}</span>
                    )}
                </td>
                <td>
                    <strong>{product.name}</strong>
                    {product.tag && <span className="product-tag">{product.tag}</span>}
                </td>
                <td>{product.category}</td>
                <td>฿{product.price?.toLocaleString()}</td>
                <td>
                    <input
                        type="number"
                        className={`stock-input ${product.stock === 0 ? 'out-of-stock' : product.stock < 10 ? 'low-stock' : ''}`}
                        value={product.stock || 0}
                        min="0"
                        onChange={(e) => handleUpdateStock(product.id, e.target.value)}
                    />
                </td>
                <td>
                    <span className={`status-badge ${product.is_active ? 'active' : 'inactive'}`}>
                        {product.is_active ? '✅ ใช้งาน' : '❌ ปิด'}
                    </span>
                </td>
                <td>
                    <div className="action-buttons">
                        <button
                            className="btn-icon edit"
                            onClick={() => startEdit(product)}
                            title="แก้ไข"
                            disabled={editingProduct !== null}
                        >
                            ✏️
                        </button>
                        <button
                            className="btn-icon delete"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            title="ลบ"
                        >
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default Admin;
