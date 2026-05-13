import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Save } from 'lucide-react';

function Configuracion() {
  const [formData, setFormData] = useState({
    nombreDepartamento: 'Ingeniería Eléctrica y Electrónica',
    institucion: 'TecNM Campus Reynosa',
    telefono: '',
    email: '',
    direccion: '',
    facebook: '',
    twitter: '',
    instagram: ''
  });
  const [loading, setLoading] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'configuracion', 'general');
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarDatos();
  }, [cargarDatos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      await setDoc(doc(db, 'configuracion', 'general'), formData);
      alert('Configuración actualizada correctamente');
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
        <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>Configuración General</h1>
        <p style={{ color: '#6b7280', margin: 0 }}>Administra la información general del sitio</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Información Básica */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Información Básica</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
              Nombre del Departamento
            </label>
            <input
              type="text"
              value={formData.nombreDepartamento}
              onChange={(e) => setFormData({ ...formData, nombreDepartamento: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
              Institución
            </label>
            <input
              type="text"
              value={formData.institucion}
              onChange={(e) => setFormData({ ...formData, institucion: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        {/* Contacto */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Información de Contacto</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                placeholder="(899) 123-4567"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                placeholder="electronica@reynosa.tecnm.mx"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
              Dirección
            </label>
            <textarea
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              rows="2"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              placeholder="Carr. Reynosa-San Fernando, Reynosa, Tamps."
            />
          </div>
        </div>

        {/* Redes Sociales */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Redes Sociales</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Facebook
              </label>
              <input
                type="url"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Twitter
              </label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                placeholder="https://twitter.com/..."
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Instagram
              </label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
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
          {guardando ? 'Guardando...' : 'Guardar Configuración'}
        </button>
      </form>
    </div>
  );
}

export default Configuracion;