import { useState, useEffect, useCallback } from "react";
import { collection, addDoc, getDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { Trash2, Edit2, Plus, Save, X } from "lucide-react";

// eslint-disable-next-line react-refresh/only-export-components
function GestionLaboratorios() {
    const [laboratorios, setLaboratorios] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [ formData, setFormData] = useState({
        nombre:'',
        descripcion:'',
        equipamiento:'',
        ubicacion:'',
        horario:'',
        encargado:''
    });
    const [loading, setLoading] = useState(false);

    const cargarLaboratorios = useCallback(async () => {
        try{
            const querySnapshot = await getDoc(collection(db, 'laboratorios'));
            const laboratoriosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            laboratoriosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }catch (error) {
            console.error('Error al cargar los laboratorios:', error)
            alert('Error al cargar los laboratorios:' + error.message);
        }
    }, []);

    useEffect(() => {
        cargarLaboratorios();
    }, [cargarLaboratorios]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLaboratorios(true);
        try {
            if (editingId){
                await updateDoc(doc(db, 'laboratorios', editingId), formData);
                alert('Laboratorios actualizado correctamente');
            }else {
                await addDoc(collection(db, 'laboratorios'), formData);
                alert('Laboratorios agregado correctamente');
            }

            setFormData({ nombre: '', descripcion: '', equipamiento: '', ubicacion: '', horario: '', encargado: ''});
            setShowForm(false);
            setEditingId(null);
            cargarLaboratorios();
        }catch (error){
            console.error('Error al guardar laboratorio:', error);
            alert('Error al guardar:' + error.message);
        }

        setLoading(false);
    };

    const handleEdit = (laboratorio) => {
        setFormData({
            nombre: laboratorio.nombre,
            descripcion: laboratorio.descripcion,
            equipamiento: laboratorio.equipamiento,
            ubicacion: laboratorio.ubicacion,
            horario: laboratorio.horario,
            encargado: laboratorio.encargado
        });
        setEditingId(laboratorio.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estas seguro de eliminar este laboratorio?')){
            try{
                await deleteDoc(doc(db, 'laboratorios', id));
                alert('Laboratorio eliminado corectamente');
            } catch (error) {
                console.error('Error al eliminar laboratorio:', error);
                alert('Error al eliminar:' + error.message);
            }
        }
    };

    const handleCancel = () => {
        setFormData({ nombre: '', descripcion: '', equipamiento: '', ubicacion: '', horario: '', encargado: '' });
        setShowForm(false);
        setEditingId(null);
    };

    return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>Gestión de Laboratorios</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Administra la información de los laboratorios</p>
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
          {showForm ? 'Cancelar' : 'Nuevo Laboratorio'}
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
            {editingId ? 'Editar Laboratorio' : 'Nuevo Laboratorio'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                  Nombre del Laboratorio
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
                  placeholder="Ej: Laboratorio de Electrónica"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                  Ubicación
                </label>
                <input
                  type="text"
                  value={formData.ubicacion}
                  onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="Ej: Edificio K, 2do piso"
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                rows="3"
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
                placeholder="Describe las actividades que se realizan en este laboratorio..."
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                Equipamiento
              </label>
              <textarea
                value={formData.equipamiento}
                onChange={(e) => setFormData({ ...formData, equipamiento: e.target.value })}
                rows="4"
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
                placeholder="Lista el equipamiento disponible (osciloscopios, multímetros, etc.)"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                  Horario de Uso
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
                  placeholder="Ej: Lun-Vie 7:00-19:00"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>
                  Encargado
                </label>
                <input
                  type="text"
                  value={formData.encargado}
                  onChange={(e) => setFormData({ ...formData, encargado: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="Nombre del responsable"
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {laboratorios.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#6b7280',
            padding: '3rem',
            background: 'white',
            borderRadius: '12px'
          }}>
            <p>No hay laboratorios registrados. Agrega uno nuevo.</p>
          </div>
        ) : (
          laboratorios.map((laboratorio) => (
            <div 
              key={laboratorio.id}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>{laboratorio.nombre}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                    📍 {laboratorio.ubicacion}
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleEdit(laboratorio)}
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
                    onClick={() => handleDelete(laboratorio.id)}
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

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ color: '#374151', lineHeight: 1.6 }}>{laboratorio.descripcion}</p>
              </div>

              <div style={{ 
                background: '#f9fafb', 
                padding: '1rem', 
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <h4 style={{ color: '#1e3a8a', marginBottom: '0.5rem', fontSize: '1rem' }}>Equipamiento:</h4>
                <p style={{ color: '#374151', margin: 0, whiteSpace: 'pre-line' }}>{laboratorio.equipamiento}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {laboratorio.horario && (
                  <div>
                    <strong style={{ color: '#1e3a8a' }}>Horario:</strong>
                    <p style={{ color: '#374151', margin: '0.25rem 0 0 0' }}>{laboratorio.horario}</p>
                  </div>
                )}
                {laboratorio.encargado && (
                  <div>
                    <strong style={{ color: '#1e3a8a' }}>Encargado:</strong>
                    <p style={{ color: '#374151', margin: '0.25rem 0 0 0' }}>{laboratorio.encargado}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

}