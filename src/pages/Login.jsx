import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefalut();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Credenciales incorrectas. Solo maestros autorizados pueden acceder.');
            console.error('Error de login:', err)
        }

        setLoading(false);
    }
    
    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Acceso para Maestros</h2>
                <p className="login-subtitle">Solo personal autorizado</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-gruop">
                        <label>Correo Electronico</label>
                        <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="maestro@reynosa.tecnm.mx"
                        required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>

                    <button className="btn-primary" disabled={loading} type="submit">
                        {loading ? 'Verificando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <p className="info-text">
                    Si eres estudiante o visitante puedes navergar libremente por el sitio sin problema
                </p>
            </div>
        </div>
    );
}

export default Login;