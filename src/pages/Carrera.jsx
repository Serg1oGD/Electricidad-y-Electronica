import { useState, useEffect } from "react";
import { doc ,getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import './Home.jsx';

function Carrera(){
    const [datos, setDatos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const cargarDatos = async () => {
            try {
                const docRef = doc(db, 'configuracion', 'carrera');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDatos(docSnap.data());
                }
            }catch (error) {
                console.error('Error al cargar datos:', error);
            }
            setLoading(false);
        };

        cargarDatos();
    }, []);
    if (loading) {
        return (
        <div className="home">
            <section className="content-section">
            <p>Cargando...</p>
            </section>
        </div>
        );
    }

    if (!datos) {
        return (
        <div className="home">
            <section className="hero">
            <h1>Acerca de la Carrera</h1>
            </section>
            <section className="content-section">
            <p>Información no disponible.</p>
            </section>
        </div>
        );
    }

    return (
        <div className="home">
        <section className="hero">
            <h1>Ingeniería Eléctrica y Electrónica</h1>
            <p>Conoce nuestra carrera</p>
        </section>

        <section className="content-section">
            <h2>Misión</h2>
            <p>{datos.mision || 'Información no disponible'}</p>
        </section>

        <section className="content-section">
            <h2>Visión</h2>
            <p>{datos.vision || 'Información no disponible'}</p>
        </section>

        <section className="content-section">
            <h2>Objetivo General</h2>
            <p>{datos.objetivo || 'Información no disponible'}</p>
        </section>

        <section className="content-section">
            <h2>Perfil de Egreso</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{datos.perfilEgreso || 'Información no disponible'}</p>
        </section>

        <section className="content-section">
            <h2>Campo Laboral</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{datos.campoLaboral || 'Información no disponible'}</p>
        </section>
        </div>
    );
}

export default Carrera;