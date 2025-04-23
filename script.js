// Подключение AOS
AOS.init({
    duration: 800,
    once: true
});

// Плавная прокрутка для меню
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Эффект печатной машинки
const phrases = ["Telegram", "VK", "WhatsApp"];
let currentPhrase = 0;
let charIndex = 0;
let isDeleting = false;
const element = document.querySelector(".glow");

function typeWriter() {
    const currentText = phrases[currentPhrase];
    element.textContent = currentText.substring(0, charIndex);

    if (!isDeleting) {
        charIndex++;
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1500);
            return;
        }
    } else {
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }
    }

    setTimeout(typeWriter, isDeleting ? 100 : 200);
}

if (element) typeWriter();

// Частицы в hero
particlesJS("particles-js", {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ["#a945ff", "#00cc99"] },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: true, distance: 120, color: "#a945ff", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 1.5, direction: "none", random: true }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
        modes: { repulse: { distance: 80, duration: 0.4 }, push: { particles_nb: 3 } }
    }
});

// Отправка формы в Telegram
document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const telegramBotToken = "7637499905:AAG3sIzYYtuMsMmjDeqT4mhufMz9-BVGk-o";
    const chatId = "5333876903";
    const text = `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message}\nБонус: 1 месяц сопровождения бесплатно`;
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    try {
        console.log("Отправка заявки в Telegram...", { chatId, text });
        const response = await fetch(`${proxyUrl}https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
            }),
        });
        if (response.ok) {
            console.log("Заявка отправлена в Telegram!");
            alert("Заявка отправлена! Скоро свяжемся.");
            e.target.reset();
        } else {
            const errorData = await response.json();
            console.error("Ошибка отправки в Telegram:", errorData);
            throw new Error(`Ошибка: ${errorData.description}`);
        }
    } catch (error) {
        console.error("Ошибка:", error.message);
        alert("Ошибка отправки. Проверьте подключение или попробуйте позже.");
    }
});