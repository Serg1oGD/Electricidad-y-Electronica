import { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';

function GestionAvisos() {
  const [avisos, setAvisos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    fecha: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  
const cargarAvisos = useCallback(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'avisos'));
    const avisosData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    avisosData.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    setAvisos(avisosData);
  } catch (error) {
    console.error('Error al cargar avisos:', error);
    alert('Error al cargar avisos: ' + error.message);
  }
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        // Actualizar aviso existente
        await updateDoc(doc(db, 'avisos', editingId), formData);
        alert('Aviso actualizado correctamente');
      } else {
        // Crear nuevo aviso
        await addDoc(collection(db, 'avisos'), {
          ...formData,
          createdAt: new Date()
        });
        alert('Aviso creado correctamente');
      }

      // Limpiar formulario
      setFormData({ titulo: '', contenido: '', fecha: new Date().toISOString().split('T')[0] });
      setShowForm(false);
      setEditingId(null);
      cargarAvisos();
    } catch (error) {
      console.error('Error al guardar aviso:', error);
      alert('Error al guardar: ' + error.message);
    }

    setLoading(false);
  };

  const handleEdit = (aviso) => {
    setFormData({
      titulo: aviso.titulo,
      contenido: aviso.contenido,
      fecha: aviso.fecha
    });
    setEditingId(aviso.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este aviso?')) {
      try {
        await deleteDoc(doc(db, 'avisos', id));
        alert('Aviso eliminado correctamente');
        cargarAvisos();
      } catch (error) {
        console.error('Error al eliminar aviso:', error);
        alert('Error al eliminar: ' + error.message);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ titulo: '', contenido: '', fecha: new Date().toISOString().split('T')[0] });
    setShowForm(false);
    setEditingId(null);
  };
    useEffect(() => {
        cargarAvisos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargarAvisos]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>Gestión de Avisos</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Crea, edita y elimina avisos para los estudiantes</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? 'Cancelar' : 'Nuevo Aviso'}
        </button>
      </div>

      {showForm && (
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#1e3a8a', marginBottom: '1.5rem' }}>
            {editingId ? 'Editar Aviso' : 'Nuevo Aviso'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Título
              </label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Contenido
              </label>
              <textarea
                value={formData.contenido}
                onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                rows="5"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Fecha
              </label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  opacity: loading ? 0.6 : 1
                }}
              >
                <Save size={18} />
                {loading ? 'Guardando...' : (editingId ? 'Actualizar' : 'Guardar')}
              </button>
              
              <button 
                type="button" 
                onClick={handleCancel}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                <X size={18} />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {avisos.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#6b7280',
            padding: '3rem',
            background: 'white',
            borderRadius: '12px'
          }}>
            <p>No hay avisos publicados. Crea uno nuevo.</p>
          </div>
        ) : (
          avisos.map((aviso) => (
            <div 
              key={aviso.id}
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start'
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>{aviso.titulo}</h3>
                <p style={{ color: '#374151', marginBottom: '0.5rem' }}>{aviso.contenido}</p>
                <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Fecha: {new Date(aviso.fecha).toLocaleDateString('es-MX')}
                </small>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => handleEdit(aviso)}
                  style={{
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: '#dbeafe',
                    color: '#3b82f6'
                  }}
                >
                  <Edit2 size={18} />
                </button>
                
                <button 
                  onClick={() => handleDelete(aviso.id)}
                  style={{
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: '#fee2e2',
                    color: '#dc2626'
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GestionAvisos;