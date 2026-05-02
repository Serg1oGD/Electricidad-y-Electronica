import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Save } from 'lucide-react';

function GestionCarrera() {
  const [formData, setFormData] = useState({
    mision: '',
    vision: '',
    objetivo: '',
    perfilEgreso: '',
    campoLaboral: ''
  });
  const [loading, setLoading] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'configuracion', 'carrera');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar datos: ' + error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    cargarDatos();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargarDatos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      await setDoc(doc(db, 'configuracion', 'carrera'), formData);
      alert('Información actualizada correctamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar: ' + error.message);
    }

    setGuardando(false);
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Cargando...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>Acerca de la Carrera</h1>
        <p style={{ color: '#6b7280', margin: 0 }}>Edita la información del departamento</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Misión</h3>
          <textarea
            value={formData.mision}
            onChange={(e) => setFormData({ ...formData, mision: e.target.value })}
            rows="4"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="Describe la misión del departamento..."
          />
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Visión</h3>
          <textarea
            value={formData.vision}
            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            rows="4"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="Describe la visión del departamento..."
          />
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Objetivo General</h3>
          <textarea
            value={formData.objetivo}
            onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
            rows="4"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="Describe el objetivo general de la carrera..."
          />
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Perfil de Egreso</h3>
          <textarea
            value={formData.perfilEgreso}
            onChange={(e) => setFormData({ ...formData, perfilEgreso: e.target.value })}
            rows="6"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="Describe las competencias del egresado..."
          />
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Campo Laboral</h3>
          <textarea
            value={formData.campoLaboral}
            onChange={(e) => setFormData({ ...formData, campoLaboral: e.target.value })}
            rows="5"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="Describe las áreas donde puede trabajar el egresado..."
          />
        </div>

        <button 
          type="submit" 
          disabled={guardando}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            cursor: guardando ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
            opacity: guardando ? 0.6 : 1
          }}
        >
          <Save size={20} />
          {guardando ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}

export default GestionCarrera;