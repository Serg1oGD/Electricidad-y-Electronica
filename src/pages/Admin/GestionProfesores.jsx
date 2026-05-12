import { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';

function GestionProfesores() {
  const [profesores, setProfesores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    grado: '',
    especialidad: '',
    email: '',
    horario: ''
  });
  const [loading, setLoading] = useState(false);

  const cargarProfesores = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'profesores'));
      const profesoresData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      profesoresData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setProfesores(profesoresData);
    } catch (error) {
      console.error('Error al cargar profesores:', error);
      alert('Error al cargar profesores: ' + error.message);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarProfesores();
     
  }, [cargarProfesores]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await updateDoc(doc(db, 'profesores', editingId), formData);
        alert('Profesor actualizado correctamente');
      } else {
        await addDoc(collection(db, 'profesores'), formData);
        alert('Profesor agregado correctamente');
      }

      setFormData({ nombre: '', grado: '', especialidad: '', email: '', horario: '' });
      setShowForm(false);
      setEditingId(null);
      cargarProfesores();
    } catch (error) {
      console.error('Error al guardar profesor:', error);
      alert('Error al guardar: ' + error.message);
    }

    setLoading(false);
  };

  const handleEdit = (profesor) => {
    setFormData({
      nombre: profesor.nombre,
      grado: profesor.grado,
      especialidad: profesor.especialidad,
      email: profesor.email,
      horario: profesor.horario
    });
    setEditingId(profesor.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este profesor?')) {
      try {
        await deleteDoc(doc(db, 'profesores', id));
        alert('Profesor eliminado correctamente');
        cargarProfesores();
      } catch (error) {
        console.error('Error al eliminar profesor:', error);
        alert('Error al eliminar: ' + error.message);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ nombre: '', grado: '', especialidad: '', email: '', horario: '' });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>Gestión de Profesores</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Administra los perfiles de los profesores</p>
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
          {showForm ? 'Cancelar' : 'Nuevo Profesor'}
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
            {editingId ? 'Editar Profesor' : 'Nuevo Profesor'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="Ej: Dr. Juan Pérez García"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                  Grado Académico
                </label>
                <select
                  value={formData.grado}
                  onChange={(e) => setFormData({ ...formData, grado: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Licenciatura">Licenciatura</option>
                  <option value="Ingeniería">Ingeniería</option>
                  <option value="Maestría">Maestría</option>
                  <option value="Doctorado">Doctorado</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Especialidad
              </label>
              <input
                type="text"
                value={formData.especialidad}
                onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                placeholder="Ej: Sistemas de Potencia, Control Automático, etc."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="profesor@reynosa.tecnm.mx"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                  Horario de Atención
                </label>
                <input
                  type="text"
                  value={formData.horario}
                  onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="Lun-Vie 10:00-12:00"
                />
              </div>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {profesores.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            color: '#6b7280',
            padding: '3rem',
            background: 'white',
            borderRadius: '12px'
          }}>
            <p>No hay profesores registrados. Agrega uno nuevo.</p>
          </div>
        ) : (
          profesores.map((profesor) => (
            <div 
              key={profesor.id}
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#1e3a8a', marginBottom: '0.25rem' }}>{profesor.nombre}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>{profesor.grado}</p>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ color: '#374151', margin: '0.25rem 0' }}>
                  <strong>Especialidad:</strong> {profesor.especialidad}
                </p>
                <p style={{ color: '#374151', margin: '0.25rem 0' }}>
                  <strong>Email:</strong> {profesor.email}
                </p>
                {profesor.horario && (
                  <p style={{ color: '#374151', margin: '0.25rem 0' }}>
                    <strong>Horario:</strong> {profesor.horario}
                  </p>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => handleEdit(profesor)}
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
                  onClick={() => handleDelete(profesor.id)}
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

export default GestionProfesores;