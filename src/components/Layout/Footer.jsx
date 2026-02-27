import { Mail, Phone, MapPin} from 'lucide-react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Contastos</h3>
                    <div className="contact-item">
                        <span>(899) 999-999</span>
                    </div>
                    <div className="contact-item">
                        <Mail size={18}>
                            <span>electronica@reynosa.tecnm.mx</span>
                        </Mail>
                    </div>
                    <div className="contact-item">
                        <MapPin>
                            <span>Carr. Reynosa-San Fernando, Reynosa, Tamps</span>
                        </MapPin>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Enlaces Rápidos</h3>
                    <a href="https://www.reynosa.tecnm.mx/">TecNM Reynosa</a>
                    <a href="https://www.tecnm.mx/">TecNM Nacional</a>
                    <a href="#">Convocatorias</a>
                </div>

                <div className="footer-section">
                    <h3>Redes sociales</h3>
                    <div className="social-links">
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 TecNM Compus Reynosa - Ingeneria de Electricidad y Electronica</p>
            </div>
        </footer>
    );
}

export default Footer;