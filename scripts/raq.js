const app = document.querySelector("#app");

if (app) {
  app.innerHTML = "<div></div>";
}

document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            if (!targetId) return;

            const answer = document.getElementById(targetId);
            const icon = this.querySelector('.faq-icon');

            if (answer && icon) {
                faqQuestions.forEach(otherQuestion => {
                    const otherTargetId = otherQuestion.getAttribute('data-target');
                    if (!otherTargetId) return;

                    const otherAnswer = document.getElementById(otherTargetId);
                    const otherIcon = otherQuestion.querySelector('.faq-icon');

                    if (otherAnswer && otherIcon && otherTargetId !== targetId) {
                        otherAnswer.classList.remove('active');
                        otherIcon.textContent = '+';
                    }
                });
                if (answer.classList.contains('active')) {
                    answer.classList.remove('active');
                    icon.textContent = '+';
                } else {
                    answer.classList.add('active');
                    icon.textContent = '−';
                }
            }
        });
    });
});