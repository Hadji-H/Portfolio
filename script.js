const monBouton = document.querySelector("#burger-btn");
const menu = document.querySelector(".menu");
const mesProjet = document.querySelector("#projects");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");
const tel = document.querySelector("#tel");
const message = document.querySelector("#message");
const formMessage = document.querySelector("#form-message");

if (monBouton) {
    monBouton.addEventListener("click", function() {
        menu.classList.toggle("active");
    });
}

const projects = [
    {
        title:"NBA",
        description:"Base de données de la saison NBA 2024-2025",
        link:"https://github.com/Hadji-H/NBA"
    },
    {
        title:"Sport-Academie",
        description:"Site permettant de consulter le classement NBA de la conférence Est et West 2023/2024 + gagnant de la CAN 2024",
        link:"https://github.com/Hadji-H/Sport-Academie"
    },
    {
        title:"Projet-devia",
        description:"Tuto suivi pour la visualisation de données Python (Pandas,Plotly)",
        link:"https://github.com/Hadji-H/projet-devia"
    }
]

if (mesProjet) {
    for (const projet of projects){
        const carte = document.createElement("div")
        carte.classList.add("project-card");
        carte.innerHTML = `<h3>${projet.title}</h3><p>${projet.description}</p><a href="${projet.link}">Voir sur GitHub</a>`;
        mesProjet.appendChild(carte);
    }
}

const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        if (nom.value === "" || email.value === "" || message.value === "") {
            formMessage.textContent = "Merci de remplir tous les champs obligatoires.";
        } else {
            formMessage.textContent = "Merci, votre message a bien été envoyé !";
        }
    });
}

const canvas = document.querySelector("#bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
const nombreDeParticules = 60;

for (let i = 0; i < nombreDeParticules; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function animer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8";
        ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(56, 189, 248, ${1 - distance / 120})`;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animer);
}

animer();