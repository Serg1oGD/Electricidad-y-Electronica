import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Save, Plus, Trash2 } from 'lucide-react';

function GestionPlanEstudios() {
  const [formData, setFormData] = useState({
    duracion: '9 semestres',
    creditos: '240 créditos',
    modalidad: 'Escolarizada',
    descripcion: '',
    materias: []
  });
  const [nuevaMateria, setNuevaMateria] = useState({
    semestre: '1',
    nombre: '',
    creditos: ''
  });
  const [loading, setLoading] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'configuracion', 'planEstudios');
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
      await setDoc(doc(db, 'configuracion', 'planEstudios'), formData);
      alert('Plan de estudios actualizado correctamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar: ' + error.message);
    }

    setGuardando(false);
  };

  const agregarMateria = () => {
    if (nuevaMateria.nombre && nuevaMateria.creditos) {
      setFormData({
        ...formData,
        materias: [...formData.materias, { ...nuevaMateria }]
      });
      setNuevaMateria({ semestre: '1', nombre: '', creditos: '' });
    } else {
      alert('Por favor completa todos los campos de la materia');
    }
  };

  const eliminarMateria = (index) => {
    const nuevasMaterias = formData.materias.filter((_, i) => i !== index);
    setFormData({ ...formData, materias: nuevasMaterias });
  };

  const materiasPorSemestre = (semestre) => {
    return formData.materias.filter(m => m.semestre === semestre.toString());
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Cargando...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>Plan de Estudios</h1>
        <p style={{ color: '#6b7280', margin: 0 }}>Administra el plan de estudios de la carrera</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Información General */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Información General</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Duración
              </label>
              <input
                type="text"
                value={formData.duracion}
                onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
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
                Créditos Totales
              </label>
              <input
                type="text"
                value={formData.creditos}
                onChange={(e) => setFormData({ ...formData, creditos: e.target.value })}
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
                Modalidad
              </label>
              <input
                type="text"
                value={formData.modalidad}
                onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}
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

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
              Descripción del Plan
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows="3"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              placeholder="Descripción general del plan de estudios..."
            />
          </div>
        </div>

        {/* Agregar Materias */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Agregar Materia</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 150px auto', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Semestre
              </label>
              <select
                value={nuevaMateria.semestre}
                onChange={(e) => setNuevaMateria({ ...nuevaMateria, semestre: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(sem => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Nombre de la Materia
              </label>
              <input
                type="text"
                value={nuevaMateria.nombre}
                onChange={(e) => setNuevaMateria({ ...nuevaMateria, nombre: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                placeholder="Ej: Cálculo Diferencial"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Créditos
              </label>
              <input
                type="number"
                value={nuevaMateria.creditos}
                onChange={(e) => setNuevaMateria({ ...nuevaMateria, creditos: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                placeholder="5"
                min="1"
              />
            </div>

            <button
              type="button"
              onClick={agregarMateria}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <Plus size={18} />
              Agregar
            </button>
          </div>
        </div>

        {/* Lista de Materias por Semestre */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Retícula por Semestre</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(semestre => (
              <div key={semestre} style={{
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <h4 style={{ color: '#1e3a8a', marginBottom: '0.75rem' }}>
                  Semestre {semestre}
                </h4>
                
                {materiasPorSemestre(semestre).length === 0 ? (
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>Sin materias</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {materiasPorSemestre(semestre).map((materia, index) => {
                      const globalIndex = formData.materias.findIndex(
                        m => m.semestre === materia.semestre && m.nombre === materia.nombre
                      );
                      return (
                        <div 
                          key={index}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.5rem',
                            background: '#f9fafb',
                            borderRadius: '4px'
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151' }}>
                              {materia.nombre}
                            </p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                              {materia.creditos} créditos
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => eliminarMateria(globalIndex)}
                            style={{
                              padding: '0.25rem',
                              border: 'none',
                              background: 'transparent',
                              color: '#dc2626',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
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
          {guardando ? 'Guardando...' : 'Guardar Plan de Estudios'}
        </button>
      </form>
    </div>
  );
}

export default GestionPlanEstudios;