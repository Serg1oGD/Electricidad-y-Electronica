import './Home.css'

function Home(){
    return(
        <div className="home">
            <section className="hero">
                <h1>Bienvenido a Ingeneria Electricidad y Electronica</h1>
                <p>Formando profecionales de excelencia en el área de electricidad y electronica</p>
            </section>

            <section className="content-section about-section">
                <h2>Acerca del Depeartamento</h2>
                <p>
                    El departamento de Ingeneria de Electicidad y Electronica del TecNM Campus Reynosa
                    se dedica a la formacion integral de profecionales capacitandos para enfrentar 
                    los retos tecnologicos del sector electrico y electronico.
                </p>
            </section>

            <section className="content-section">
                <h2>Ultimos Avisos</h2>
                <div className="avisos-grid">
                    <div className="avisos-card">
                        <h3>Inicio de Semestre</h3>
                        <p>El nuevo semestre inicia el 15 de febrero</p>
                    </div>
                    <div className="aviso-card">
                        <h3>Convocatoria de Becas</h3>
                        <p>Abierta la convocatoria para baecas 2026</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;