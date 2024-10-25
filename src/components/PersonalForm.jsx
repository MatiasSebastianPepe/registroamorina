import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './PersonalForm.css'; // Asegúrate de tener los estilos correspondientes

const PersonalForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    last: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateForm({ ...formData, [name]: value });
  };

  const validateForm = (data) => {
    let newErrors = {};
    let isValid = true;

    if (!data.name) {
      newErrors.name = 'Por favor, ingresa tu nombre.';
      isValid = false;
    }
    if (!data.last) {
      newErrors.last = 'Por favor, ingresa tu apellido.';
      isValid = false;
    }
    if (!data.email) {
      newErrors.email = 'Por favor, ingresa tu correo electrónico.';
      isValid = false;
    }
    if (!data.phone) {
      newErrors.phone = 'Por favor, ingresa tu número de teléfono.';
      isValid = false;
    }
    if (!data.dob) {
      newErrors.dob = 'Por favor, selecciona tu fecha de nacimiento.';
      isValid = false;
    }
    if (!data.password) {
      newErrors.password = 'Por favor, ingresa una contraseña.';
      isValid = false;
    }
    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Por favor, confirma tu contraseña.';
      isValid = false;
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
      isValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      sendEmail();
    }
  };

  const sendEmail = () => {
    emailjs
      .send('service_qp6dplo', 'template_xmera7g', {
        name: formData.name,
        last: formData.last,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
      }, 'pK84NXqclosPeHwmq')
      .then(
        (response) => {
          alert('Formulario enviado con éxito!', response.status, response.text);
          setFormData({
            name: '',
            last: '',
            email: '',
            phone: '',
            dob: '',
            password: '',
            confirmPassword: '',
          });
          setIsFormValid(false);
        },
        (error) => {
          alert('Hubo un error al enviar el formulario.', error);
        }
      );
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Información Personal</h2>

        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <p className="error-message">{errors.name}</p>

        <label htmlFor="last">Apellido</label>
        <input
          type="text"
          id="last"
          name="last"
          value={formData.last}
          onChange={handleInputChange}
          required
        />
        <p className="error-message">{errors.last}</p>

        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <p className="error-message">{errors.email}</p>

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <p className="error-message">{errors.password}</p>

        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <p className="error-message">{errors.confirmPassword}</p>

        <label htmlFor="phone">Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <p className="error-message">{errors.phone}</p>

        <label htmlFor="dob">Fecha de Nacimiento</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
        <p className="error-message">{errors.dob}</p>

        <button type="submit" disabled={!isFormValid} style={{ backgroundColor: isFormValid ? '#0d4907' : '#cccccc' }}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default PersonalForm;
