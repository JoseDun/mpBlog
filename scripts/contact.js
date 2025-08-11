
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const nombreInput = document.getElementById('nombre');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const mensajeTextarea = document.getElementById('mensaje');
    const privacidadCheckbox = document.getElementById('privacidad');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function isValidPhone(phone) {
      const phoneRegex = /^[+]?[\d\s\-\(\)]{9,}$/;
      return phoneRegex.test(phone.trim());
    }

    function showMessage(message, type) {
      const existingMessages = contactForm.querySelectorAll('.success-message, .error-message');
      existingMessages.forEach(msg => msg.remove());

      const messageDiv = document.createElement('div');
      messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
      messageDiv.textContent = message;
      messageDiv.style.display = 'block';

      contactForm.insertBefore(messageDiv, contactForm.firstChild);

      setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.remove();
      }, 5000);
    }

    function setupRealTimeValidation() {
      nombreInput.addEventListener('blur', function() {
        if (this.value.trim().length < 2) {
          this.style.borderColor = '#dc3545';
        } else {
          this.style.borderColor = '#c09a76';
        }
      });
      
      telefonoInput.addEventListener('blur', function() {
        if (!isValidPhone(this.value)) {
          this.style.borderColor = '#dc3545';
        } else {
          this.style.borderColor = '#c09a76';
        }
      });
      
      emailInput.addEventListener('blur', function() {
        if (!isValidEmail(this.value)) {
          this.style.borderColor = '#dc3545';
        } else {
          this.style.borderColor = '#c09a76';
        }
      });
      
      mensajeTextarea.addEventListener('blur', function() {
        if (this.value.trim().length < 10) {
          this.style.borderColor = '#dc3545';
        } else {
          this.style.borderColor = '#c09a76';
        }
      });

      [nombreInput, telefonoInput, emailInput, mensajeTextarea].forEach(input => {
        input.addEventListener('focus', function() {
          this.style.borderColor = '#c09a76';
        });
      });
    }

    function validateForm() {
      let isValid = true;
      let errors = [];

      if (nombreInput.value.trim().length < 2) {
        isValid = false;
        errors.push('El nombre debe tener al menos 2 caracteres');
        nombreInput.style.borderColor = '#dc3545';
      }

      if (!isValidPhone(telefonoInput.value)) {
        isValid = false;
        errors.push('Por favor, introduce un número de teléfono válido');
        telefonoInput.style.borderColor = '#dc3545';
      }

      if (!isValidEmail(emailInput.value)) {
        isValid = false;
        errors.push('Por favor, introduce un email válido');
        emailInput.style.borderColor = '#dc3545';
      }

      if (mensajeTextarea.value.trim().length < 10) {
        isValid = false;
        errors.push('El mensaje debe tener al menos 10 caracteres');
        mensajeTextarea.style.borderColor = '#dc3545';
      }

      if (!privacidadCheckbox.checked) {
        isValid = false;
        errors.push('Debes aceptar la política de privacidad');
      }
      
      if (!isValid) {
        showMessage(errors.join('. '), 'error');
      }
      
      return isValid;
    }

    function submitForm(formData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Datos del formulario:', Object.fromEntries(formData));
          resolve(true);
        }, 1500);
      });
    }

    setupRealTimeValidation();
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      submitBtn.style.opacity = '0.7';
      
      try {
        const formData = new FormData(contactForm);
        const success = await submitForm(formData);
        
        if (success) {
          showMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
          contactForm.reset();
          [nombreInput, telefonoInput, emailInput, mensajeTextarea].forEach(input => {
            input.style.borderColor = '#e5d5c8';
          });
        } else {
          showMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
      }
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity 0.5s ease-in-out';
    }, 100);
  }
});

document.body.style.opacity = '0';
