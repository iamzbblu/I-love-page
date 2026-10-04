// ==========================================
// 1. INICIALIZACIÓN Y TOUR DEL BOT
// ==========================================
let botPasoActual = 0;
const pasostourBot = [
    {
        titulo: "¡Bienvenida a tu App Especial! ❤️",
        desc: "Hola hermana. Esta aplicación es un regalo interactivo diseñado con todo mi cariño desde Venezuela. Permíteme mostrarte cómo funciona cada sección."
    },
    {
        titulo: "🫂 ¿Nos extrañas hoy?",
        desc: "Cuando sientas nostalgia o quieras sentirnos cerca, entra aquí y envía un 'Abrazo Digital'. Me llegará una alerta inmediata a mi WhatsApp."
    },
    {
        titulo: "✨ 100 Cosas Sobre Mí & Quiz",
        desc: "En esta sección podrás compartirme 100 datos sobre ti y responder un divertido Quiz interactivo donde desbloquearás mis respuestas escritas."
    },
    {
        titulo: "🎵 Audiolibros & Música Global",
        desc: "Escucha reflexiones familiares, canciones dedicadas o busca cualquier canción en el buscador global para recomendármela directamente."
    },
    {
        titulo: "💌 Cartas de la Familia",
        desc: "Encontrarás cartas y mensajes especiales de cada uno de nosotros. Mi carta personal está resguardada en un espacio privado."
    },
    {
        titulo: "📖 Desahógate aquí",
        desc: "Tu diario personal e íntimo. Podrás escribir tus pensamientos sin límites de extensión, fecharlos y guardarlos en tu galería privada."
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const yaVioBienvenida = localStorage.getItem('appBienvenidaVistas');
    if (!yaVioBienvenida) {
        mostrarPasoBot(0);
        document.getElementById('avatarBienvenida').style.display = 'flex';
    }

    const inputFecha = document.getElementById('fechaDiario');
    if (inputFecha) inputFecha.value = new Date().toISOString().split('T')[0];

    cargarQuizPreguntas();
    renderizar100Cosas();
    renderizarGaleriaDiario();
    renderizarMusicaRecomendada();
    iniciarContadorRegresivo();
});

function mostrarPasoBot(index) {
    botPasoActual = index;
    const paso = pasostourBot[index];
    document.getElementById('botTituloStep').innerText = paso.titulo;
    document.getElementById('botDescStep').innerText = paso.desc;
    document.getElementById('botStepIndicator').innerText = `Paso ${index + 1} de ${pasostourBot.length}`;

    const btn = document.getElementById('btnNextBotStep');
    if (index === pasostourBot.length - 1) {
        btn.innerText = "🚀 ¡Empezar a explorar!";
    } else {
        btn.innerText = "Entendido 👍";
    }
}

function avanzarPasoBot() {
    if (botPasoActual < pasostourBot.length - 1) {
        mostrarPasoBot(botPasoActual + 1);
    } else {
        document.getElementById('avatarBienvenida').style.display = 'none';
        localStorage.setItem('appBienvenidaVistas', 'true');
    }
}

function mostrarInstruccionesPWA() {
    alert("📲 CÓMO AGREGAR A TU IPHONE COMO APP:\n\n1. Abre esta página en Safari.\n2. Toca el botón 'Compartir' (el cuadrado con la flecha hacia arriba 📤 en la barra inferior).\n3. Selecciona 'Agregar a Inicio' ➕.\n4. ¡Listo! Se guardará en tu pantalla como una app.");
}

function mostrarPagina(idPagina) {
    document.getElementById('mainMenu').style.display = 'none';
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const target = document.getElementById(idPagina);
    if (target) target.classList.add('active');
}

function volverAlMenu() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('mainMenu').style.display = 'block';
}

function cambiarTabQuiz(idTab, btn) {
    const contenedor = btn.closest('.card');
    contenedor.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    contenedor.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(idTab).classList.add('active');
    btn.classList.add('active');
}

function cambiarTabAudio(idTab, btn) { cambiarTabQuiz(idTab, btn); }

// ==========================================
// 2. CONTADOR REGRESIVO
// ==========================================
function iniciarContadorRegresivo() {
    const fechaObjetivo = new Date("November 6, 2026 00:00:00").getTime();

    const timer = setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = fechaObjetivo - ahora;

        if (diferencia <= 0) {
            clearInterval(timer);
            document.querySelector('.countdown-container').style.display = 'none';
            document.getElementById('cumpleUnlockMsg').style.display = 'block';
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById('cd-dias').innerText = dias < 10 ? '0' + dias : dias;
        document.getElementById('cd-horas').innerText = horas < 10 ? '0' + horas : horas;
        document.getElementById('cd-minutos').innerText = minutos < 10 ? '0' + minutos : minutos;
        document.getElementById('cd-segundos').innerText = segundos < 10 ? '0' + segundos : segundos;
    }, 1000);
}

// ==========================================
// 3. MÓDULO: ¿NOS EXTRAÑAS HOY?
// ==========================================
function enviarAbrazoDigital() {
    const tuNumero = "584120902675";
    const tuApiKey = "5648307";
    const mensajeTexto = "🫂 *¡ABRAZO DIGITAL ENVIADO!* ❤️\n\nTu hermana te está extrañando en Argentina y te ha enviado un abrazo digital desde la app.";

    const urlBot = `https://api.callmebot.com/whatsapp.php?phone=${tuNumero}&text=${encodeURIComponent(mensajeTexto)}&apikey=${tuApiKey}`;

    fetch(urlBot, { mode: 'no-cors' })
        .then(() => {
            const msg = document.getElementById('msgEmotivo');
            msg.innerText = "❤️ ¡Abrazo digital enviado a la familia!";
            msg.style.display = 'block';
        })
        .catch(() => { alert("❤ Se envió tu abrazo digital."); });
}

// ==========================================
// 4. MÓDULO: 100 COSAS SOBRE MÍ (EN MODAL)
// ==========================================
let cosasContadas = [];
let idxEditCosa = -1;

function abrirModalFormulario100Cosas() {
    idxEditCosa = -1;
    document.getElementById('modal100Head').innerText = "Cuéntame algo sobre ti";
    document.getElementById('btnGuardar100').innerText = "💾 Guardar dato";
    document.getElementById('numCosa').value = '';
    document.getElementById('textoCosa').value = '';
    document.getElementById('audioCosa').value = '';

    document.getElementById('modal100Cosas').style.display = 'flex';
}

function guardar100Cosas() {
    const num = document.getElementById('numCosa').value.trim();
    const texto = document.getElementById('textoCosa').value.trim();
    const audio = document.getElementById('audioCosa').value.trim();

    if (!num || (!texto && !audio)) {
        alert("Por favor indica el número/título y escribe una respuesta.");
        return;
    }

    if (idxEditCosa >= 0) {
        cosasContadas[idxEditCosa] = { num, texto, audio };
        idxEditCosa = -1;
    } else {
        cosasContadas.push({ num, texto, audio });
        if (cosasContadas.length >= 100) {
            const tuNumero = "584120902675";
            const tuApiKey = "5648307";
            const mensaje = "🎉 *¡OBJETIVO CUMPLIDO!* 🎉\n\nTu hermana completó la lista de *100 COSAS SOBRE ELLA*.";
            fetch(`https://api.callmebot.com/whatsapp.php?phone=${tuNumero}&text=${encodeURIComponent(mensaje)}&apikey=${tuApiKey}`, { mode: 'no-cors' });
        }
    }

    cerrarModal100CosasForzado();
    renderizar100Cosas();
}

function renderizar100Cosas() {
    const contenedor = document.getElementById('lista100Cosas');
    if (cosasContadas.length === 0) {
        contenedor.innerHTML = '<p class="texto-vacio" style="text-align: center; color: #64748b; padding: 20px;">Aún no has agregado ninguna. Presiona "✍️ Agregar nueva cosa sobre mí" arriba.</p>';
        return;
    }
    contenedor.innerHTML = "";
    cosasContadas.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'card-pregunta-quiz';
        div.innerHTML = `
            <h5 style="color: #6b11ff;">${item.num}</h5>
            ${item.texto ? `<p style="margin-bottom: 8px; font-size: 0.95rem;">${item.texto}</p>` : ''}
            ${item.audio ? `<p><a href="${item.audio}" target="_blank" style="color: #2563eb; font-weight: 600;">▶️ Escuchar audio</a></p>` : ''}
            <div style="display: flex; gap: 8px; margin-top: 12px; justify-content: flex-end;">
                <button onclick="editarCosa(${index})" style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">✏️ Editar</button>
                <button onclick="eliminarCosa(${index})" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">🗑️ Eliminar</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function editarCosa(index) {
    const item = cosasContadas[index];
    idxEditCosa = index;

    document.getElementById('modal100Head').innerText = "Editar dato sobre ti";
    document.getElementById('btnGuardar100').innerText = "💾 Actualizar dato";

    document.getElementById('numCosa').value = item.num;
    document.getElementById('textoCosa').value = item.texto || '';
    document.getElementById('audioCosa').value = item.audio || '';

    document.getElementById('modal100Cosas').style.display = 'flex';
}

function eliminarCosa(index) {
    cosasContadas.splice(index, 1);
    renderizar100Cosas();
}

function cerrarModal100Cosas(event) { if (event.target.id === 'modal100Cosas') cerrarModal100CosasForzado(); }
function cerrarModal100CosasForzado() { document.getElementById('modal100Cosas').style.display = 'none'; }

// ==========================================
// 5. MÓDULO: QUIZ DE REENCUENTRO (SUB-PÁGINA FLOTANTE)
// ==========================================
const preguntasQuiz = [
    { p: "¿Qué comida podrías comer por una semana completa sin aburrirte?", r: "Papas sancochadas con huevo, queso y mantequilla! Me encanta esa combinación" },
    { p: "¿Tienes una marca de ropa favorita?", r: "No tengo una marca favorita la verdad." },
    { p: "¿Cuánto calzas?", r: "41, por cierto! Algo curioso, Naza calza 42. hahaha" },
    { p: "¿Cuánto mides?", r: "1.74 - 1.75" },
    { p: "¿Comida favorita?", r: "Siento que no tengo una comida que sea mi favorita, no he comido algo que sea lo mejor del mundo… Aunque hace poco compré un calamar “Criollo”. Aunque mi comida fav de la calle son las papas rellenas con picante de los gochos de Sabana Grande." },
    { p: "¿Un gusto raro que tengas?", r: "Estoy pensando…" },
    { p: "¿Algo poco común que te guste?", r: "Estoy pensando…" },
    { p: "¿Qué piensas después de un día largo y agotador?", r: "Pienso en Jugar baloncesto." },
    { p: "¿Si tuvieras que elegir entre dos flores cuáles serían y cuál ganaría?", r: "Estaría entre las rosas y los tulipanes, y ganarían los tulipanes, espero te hayan gustado los tuyos!" },
    { p: "¿Si fueras millonaria por un día qué cosas te comprarías?", r: "Me compraría un Lamborghini como el de Nicky Jam, ¿te acuerdas?" },
    { p: "¿Si tuvieras la oportunidad de enseñarme al menos 5 habilidades cuáles serían?", r: "1- La habilidad de la respiración, 2- el estado de flow, 3- control mental, 4- A regar el jardín de tu mente, 5- …" },
    { p: "¿Describe cómo te gustaría que yo fuera de grande?", r: "Me gustaría que fueras una “pure” chévere, siempre nos veo como Yefersson cossio y la hermana haciéndonos bromas…" },
    { p: "¿Describe con el mayor detalle tu vida perfecta?", r: "Una vida tranquila, rodeados de familia y compartiendo logros juntos." },
    { p: "¿Qué te gustaría conocer sobre nosotros que no recuerdas?", r: "Me gustaría conocer quién eres detrás del celular, si te molestas muy fácil, ordenada o no, vivir contigo." },
    { p: "¿Qué crees que necesitas más: 'te amo' o abrazos en silencio?", r: "La segunda!" },
    { p: "¿Un hábito un lunes por la tarde?", r: "Los lunes son de Baloncesto, ¡sí o sí!" },
    { p: "¿Qué es lo que más odias de las personas?", r: "Odio que las personas quieran aprovecharse de las personas buenas." },
    { p: "¿Si fueras un HADA mágica qué pedirías primero?", r: "Estoy seguro que lo primero que pedirías sería vernos al menos por 5 minutos." },
    { p: "¿Cuántos 'Te amo' nos dirías de frente?", r: "Probablemente 150" },
    { p: "¿Qué es lo que más extrañas hacer conmigo?", r: "Extraño cuando jugábamos en tu cuarto, dormía contigo y hacíamos guerras." }
];

let respuestasEllaQuiz = {};
let idxPreguntaQuizActual = -1;

function cargarQuizPreguntas() {
    const contenedor = document.getElementById('listaQuizPreguntas');
    if (!contenedor) return;
    contenedor.innerHTML = "";
    preguntasQuiz.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'card-pregunta-quiz';
        
        const yaRespondio = respuestasEllaQuiz[index] !== undefined;

        div.innerHTML = `
            <h5>${index + 1}. ${q.p}</h5>
            ${yaRespondio ? `<div class="respuesta-ella-display"><strong>Tu respuesta:</strong> ${respuestasEllaQuiz[index]}</div>` : ''}
            
            <div id="accionesQuiz-${index}" style="margin-top: 10px;">
                ${!yaRespondio ? `
                    <button class="btn-quiz" onclick="abrirModalQuiz(${index})">
                        Responder y ver mi respuesta 💙
                    </button>
                ` : `
                    <button onclick="abrirModalQuiz(${index})" style="background: #3b82f6; color: white; border: none; padding: 7px 14px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600;">✏️ Editar mi respuesta</button>
                    <button onclick="eliminarRespuestaQuizDirecto(${index})" style="background: #ef4444; color: white; border: none; padding: 7px 14px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600; margin-left: 8px;">🗑️ Eliminar</button>
                `}
            </div>

            <div id="respBblu-${index}" class="respuesta-bblu-box" style="${yaRespondio ? 'display: block;' : 'display: none;'}">
                <strong>Respuesta de bblu:</strong>
                <p style="margin-top: 4px;">${q.r}</p>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function abrirModalQuiz(index) {
    idxPreguntaQuizActual = index;
    const q = preguntasQuiz[index];
    document.getElementById('modalQuizPreguntaTitulo').innerText = `${index + 1}. ${q.p}`;
    document.getElementById('inputModalQuiz').value = respuestasEllaQuiz[index] || '';
    document.getElementById('modalQuizAnswer').style.display = 'flex';
}

function confirmarRespuestaModalQuiz() {
    const texto = document.getElementById('inputModalQuiz').value.trim();
    if (!texto) {
        alert("Por favor escribe tu respuesta primero.");
        return;
    }

    respuestasEllaQuiz[idxPreguntaQuizActual] = texto;
    cerrarModalQuizForzado();
    cargarQuizPreguntas();
}

function eliminarRespuestaQuizDirecto(index) {
    delete respuestasEllaQuiz[index];
    cargarQuizPreguntas();
}

function cerrarModalQuiz(event) { if (event.target.id === 'modalQuizAnswer') cerrarModalQuizForzado(); }
function cerrarModalQuizForzado() { document.getElementById('modalQuizAnswer').style.display = 'none'; }

// ==========================================
// 6. MÓDULO: MÚSICA Y RECOMENDACIONES
// ==========================================
let cancionesRecomendadas = [];

function detectarEnterMusica(e) { if (e.key === 'Enter') buscarMusicaGlobal(); }

function buscarMusicaGlobal() {
    const query = document.getElementById('inputBusquedaMusica').value.trim();
    if (!query) return;

    const contenedor = document.getElementById('resultadosBusqueda');
    contenedor.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Buscando canciones...</p>";

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=6&entity=song`)
        .then(res => res.json())
        .then(data => {
            contenedor.innerHTML = "";
            if (data.results.length === 0) {
                contenedor.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>No se encontraron canciones.</p>";
                return;
            }
            data.results.forEach(song => {
                const div = document.createElement('div');
                div.className = 'card-musica';
                div.innerHTML = `
                    <img src="${song.artworkUrl100}" alt="Cover">
                    <strong style="font-size: 0.85rem; display: block; margin-bottom: 2px;">${song.trackName}</strong>
                    <span style="font-size: 0.75rem; color: #64748b; display: block; margin-bottom: 8px;">${song.artistName}</span>
                    <audio controls src="${song.previewUrl}" style="width: 100%; margin-bottom: 8px;"></audio>
                    <button onclick="agregarRecomendacion('${song.trackName.replace(/'/g, "\\'")}', '${song.artistName.replace(/'/g, "\\'")}', '${song.artworkUrl100}')" class="btn-quiz" style="padding: 6px 10px; font-size: 0.8rem; width: 100%;">➕ Recomendar a mi hermano</button>
                `;
                contenedor.appendChild(div);
            });
        });
}

function agregarRecomendacion(titulo, artista, caratula) {
    cancionesRecomendadas.push({ titulo, artista, caratula });
    renderizarMusicaRecomendada();

    const tuNumero = "584120902675";
    const tuApiKey = "5648307";
    const mensaje = `🎵 *¡NUEVA RECOMENDACIÓN MUSICAL!* 🎶\n\nTu hermana te ha recomendado la canción:\n*${titulo}* - ${artista}\n\n¡Entra a la app a escucharla!`;
    fetch(`https://api.callmebot.com/whatsapp.php?phone=${tuNumero}&text=${encodeURIComponent(mensaje)}&apikey=${tuApiKey}`, { mode: 'no-cors' });
}

function renderizarMusicaRecomendada() {
    const contenedor = document.getElementById('listaRecomendadas');
    if (!contenedor) return;

    if (cancionesRecomendadas.length === 0) {
        contenedor.innerHTML = '<p class="texto-vacio" style="text-align: center; color: #64748b; padding: 15px;">Aún no has recomendado ninguna canción. Usa el buscador de arriba.</p>';
        return;
    }

    contenedor.innerHTML = "";
    cancionesRecomendadas.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'card-pregunta-quiz';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.gap = '12px';
        div.innerHTML = `
            <img src="${item.caratula}" style="width: 50px; height: 50px; border-radius: 8px;">
            <div style="flex: 1;">
                <strong>${item.titulo}</strong>
                <p style="font-size: 0.8rem; color: #64748b;">${item.artista}</p>
            </div>
            <button onclick="eliminarRecomendacion(${index})" style="background: #ef4444; color: white; border: none; padding: 6px 10px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">🗑️ Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}

function eliminarRecomendacion(index) {
    cancionesRecomendadas.splice(index, 1);
    renderizarMusicaRecomendada();
}


// ==========================================
// 7. MÓDULO: CARTAS
// ==========================================
const mensajesCartas = {
    mama: { 
        titulo: "Carta de Tu Mamá", 
        icono: "👩‍👧", 
        texto: "Escribe aquí el mensaje de tu mamá..." 
    },
    papa: { 
        titulo: "Carta de Tu Papá", 
        icono: "👨‍👧", 
        texto: "Escribe aquí el mensaje de tu papá..." 
    },
    jose: { 
        titulo: "Carta de Jose", 
        icono: "🙋‍♂️", 
        texto: "Escribe aquí el mensaje de Jose..." 
    },
    bblu: { 
        titulo: "Carta de bblu 💙", 
        icono: "💙", 
        texto: `Hermana, Realmente tenemos mucho tiempo que no nos vemos, pero quizás los vínculos reales no necesiten presencia, si no tener el sentimiento, aunque confieso que muchas veces me negué a ese sentimiento, porque realmente siempre pienso que quizás la vida de todos fuera diferente si no te fueras ido, aunque se que esa decisión llevo a que ahora tengas otra vida y quizás muchas cosas que te hacían falta aquí, espero algún día puedas regresar. Nunca he dicho la verdad en la mayoría de los casos cuando toca hablar de mis cosas personales profundas como es este caso, pero debo confesar que realmente me imagine muchas veces contigo apoyándome en mis juegos  desde las gradas, la cera, el balcón o donde te tocara estar, o incluso entrando siempre al cuarto o encontrarte en cualquier parte de la casa. Muchas veces imagine durante mis cumpleaños que pasaría como la vez que viniste de “Sorpresa”, me imaginaba durmiendo o en mi cuarto y tu entrando de sorpresa…

Las cosas no son fáciles para ningún ser humana y creo que para ti tampoco es la excepción y mucho menos para ti, y mi intención con estás cartas no es hacerte sentir mal ni nada de eso, simplemente es contarte la verdad que probablemente no sabías. La verdad las cosas muchas veces se han puesto cuesta arriba pero muy arriba y siempre pensaba en ti y sigo con todo esto por ti, porque se que me tienes un amor inefable, algo que no se puede explicar solamente se siente y ya.

La verdad estoy muy orgulloso de ti, porque estar lejos de la familia no es fácil, estar lejos de las personas que más amas es peor aún y te admiro por que se que muchas veces te has derrumbado por todo lo que pasa en casa, en la calle, oficina, etc. Pero siempre has seguido y eso es lo que cuenta, no cuenta cuantas veces te hayas caído sino cuantas veces te hayas levantado y levantarse del suelo es de valientes, espero sigas siendo siempre así, si pudiera pedirte algo sería que nunca dejes de luchar o intentarlo que todo tendrá su recompensa en algún momento.

Probablemente haya muchas cosas que no sabes de mi, pero en esta pagina trato de que reconectemos un poco más y conozcamos lo que desconocemos del otro.

Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo. Te amo.` 
    }
};

function abrirModalCarta(persona) {
    if (persona === 'bblu') {
        const pin = prompt("🔒 Ingresa la clave para leer esta carta:");
        if (pin !== "0111") {
            if (pin !== null) alert("❌ Clave incorrecta.");
            return;
        }
    }

    const carta = mensajesCartas[persona];
    if (carta) {
        document.getElementById('modalIcono').innerText = carta.icono;
        document.getElementById('modalTitulo').innerText = carta.titulo;
        document.getElementById('modalTexto').innerText = carta.texto;
        document.getElementById('modalCarta').style.display = 'flex';
    }
}

function cerrarModalCarta(event) { if (event.target.id === 'modalCarta') cerrarModalForzado(); }
function cerrarModalForzado() { document.getElementById('modalCarta').style.display = 'none'; }

// ==========================================
// 8. MÓDULO: DESAHÓGATE AQUÍ (DIARIO EN MODAL FLOTANTE)
// ==========================================
let entradasDiario = [];
let idxEditDiario = -1;

function abrirModalFormularioDiario() {
    idxEditDiario = -1;
    document.getElementById('modalFormDiarioTituloHead').innerText = "Nueva Entrada en el Diario";
    document.getElementById('btnGuardarDiario').innerText = "✨ Guardar en mi Galería";

    document.getElementById('tituloDiario').value = '';
    document.getElementById('textoDiario').value = '';
    document.getElementById('fechaDiario').value = new Date().toISOString().split('T')[0];

    document.getElementById('modoLecturaDiario').style.display = 'none';
    document.getElementById('modoFormularioDiario').style.display = 'block';
    document.getElementById('modalDiario').style.display = 'flex';
}

function editarEntradaDiario(index) {
    const item = entradasDiario[index];
    idxEditDiario = index;

    document.getElementById('modalFormDiarioTituloHead').innerText = "Editar Entrada del Diario";
    document.getElementById('btnGuardarDiario').innerText = "✨ Actualizar escrito";

    document.getElementById('tituloDiario').value = item.titulo;
    document.getElementById('fechaDiario').value = item.fecha || '';
    document.getElementById('textoDiario').value = item.texto;

    document.getElementById('modoLecturaDiario').style.display = 'none';
    document.getElementById('modoFormularioDiario').style.display = 'block';
    document.getElementById('modalDiario').style.display = 'flex';
}

function guardarEntradaDiario() {
    const titulo = document.getElementById('tituloDiario').value.trim();
    const fecha = document.getElementById('fechaDiario').value;
    const texto = document.getElementById('textoDiario').value.trim();

    if (!titulo || !texto) {
        alert("Por favor escribe un título y tu mensaje.");
        return;
    }

    if (idxEditDiario >= 0) {
        entradasDiario[idxEditDiario] = { titulo, fecha, texto };
        idxEditDiario = -1;
    } else {
        entradasDiario.unshift({ titulo, fecha, texto });
    }

    renderizarGaleriaDiario();
    cerrarModalDiarioForzado();
}

function renderizarGaleriaDiario() {
    const contenedor = document.getElementById('galeriaDiario');
    if (!contenedor) return;

    if (entradasDiario.length === 0) {
        contenedor.innerHTML = '<p class="texto-vacio" style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 20px;">Aún no has creado ninguna página. Presiona "✍️ Crear nueva entrada en mi diario" arriba.</p>';
        return;
    }

    contenedor.innerHTML = "";
    entradasDiario.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'card-diario';
        div.onclick = (e) => {
            if (e.target.tagName !== 'BUTTON') abrirModalLecturaDiario(index);
        };

        div.innerHTML = `
            <div>
                <h5>${item.titulo}</h5>
                <div class="fecha-tag">📅 ${item.fecha || 'Sin fecha'}</div>
                <div class="preview-texto">${item.texto}</div>
            </div>
            <div style="display: flex; gap: 6px; justify-content: flex-end; margin-top: 12px;">
                <button style="background: #0ea5e9; color: white; border: none; padding: 5px 9px; border-radius: 6px; cursor: pointer; font-size: 0.75rem; font-weight: 600;" onclick="copiarTextoDiario(${index})">📋 Copiar</button>
                <button style="background: #3b82f6; color: white; border: none; padding: 5px 9px; border-radius: 6px; cursor: pointer; font-size: 0.75rem; font-weight: 600;" onclick="editarEntradaDiario(${index})">✏️ Editar</button>
                <button style="background: #ef4444; color: white; border: none; padding: 5px 9px; border-radius: 6px; cursor: pointer; font-size: 0.75rem; font-weight: 600;" onclick="eliminarEntradaDiarioDirecto(${index})">🗑️ Borrar</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function abrirModalLecturaDiario(index) {
    const item = entradasDiario[index];
    if (item) {
        document.getElementById('modalDiarioTitulo').innerText = item.titulo;
        document.getElementById('modalDiarioFecha').innerText = "📅 " + (item.fecha || 'Sin fecha');
        document.getElementById('modalDiarioTexto').innerText = item.texto;

        document.getElementById('modoFormularioDiario').style.display = 'none';
        document.getElementById('modoLecturaDiario').style.display = 'block';
        document.getElementById('modalDiario').style.display = 'flex';
    }
}

function copiarTextoDiario(index) {
    const item = entradasDiario[index];
    navigator.clipboard.writeText(`${item.titulo}\n\n${item.texto}`);
}

function cerrarModalDiario(event) { if (event.target.id === 'modalDiario') cerrarModalDiarioForzado(); }
function cerrarModalDiarioForzado() { document.getElementById('modalDiario').style.display = 'none'; }

function eliminarEntradaDiarioDirecto(index) {
    entradasDiario.splice(index, 1);
    renderizarGaleriaDiario();
}

// ==========================================
// MÓDULO: GALERÍA DE FOTOS Y VIDEOS
// ==========================================
function abrirVisorMultimedia(tipo, url, titulo) {
    const contenedor = document.getElementById('contenidoVisorModal');
    document.getElementById('modalMultimediaTitulo').innerText = titulo;

    if (tipo === 'imagen') {
        contenedor.innerHTML = `<img src="${url}" style="width: 100%; max-height: 65vh; object-fit: contain; border-radius: 12px;">`;
    } else if (tipo === 'video') {
        contenedor.innerHTML = `<video src="${url}" controls autoplay style="width: 100%; max-height: 65vh; border-radius: 12px;"></video>`;
    }

    document.getElementById('modalMultimedia').style.display = 'flex';
}

function cerrarModalMultimedia(event) {
    if (event.target.id === 'modalMultimedia') cerrarModalMultimediaForzado();
}

function cerrarModalMultimediaForzado() {
    const contenedor = document.getElementById('contenidoVisorModal');
    contenedor.innerHTML = ""; // Detiene la reproducción del video al cerrar
    document.getElementById('modalMultimedia').style.display = 'none';
}

// ==========================================
// MÓDULO: NAVEGACIÓN Y FUNCIONES DE AUDIO
// ==========================================

function cambiarTabAudio(tabName, btnElement) {
    // 1. Ocultar todas las pestañas de audio
    const tabs = document.querySelectorAll('.tab-audio-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // 2. Desactivar todos los botones
    const btns = document.querySelectorAll('.tab-audio-btn');
    btns.forEach(btn => btn.classList.remove('active'));

    // 3. Activar la pestaña elegida y su botón
    const targetTab = document.getElementById('tab-' + tabName);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    if (btnElement) {
        btnElement.classList.add('active');
    }
}

function guardarRecomendacionMusica() {
    const nombre = document.getElementById('inputSongName').value.trim();
    const link = document.getElementById('inputSongLink').value.trim();
    const lista = document.getElementById('listaRecomendacionesMusica');

    if (!nombre) {
        alert("Por favor escribe al menos el nombre de la canción.");
        return;
    }

    const itemHtml = `
        <div class="recommend-item">
            <div>
                <strong style="color: #1e293b; display: block;">🎵 ${nombre}</strong>
                ${link ? `<a href="${link}" target="_blank" style="color: #7c3aed; font-size: 0.85rem; text-decoration: underline;">Ver enlace / abrir</a>` : ''}
            </div>
            <span style="font-size: 0.8rem; color: #94a3b8;">Guardado</span>
        </div>
    `;

    lista.insertAdjacentHTML('beforeend', itemHtml);

    // Limpiar campos
    document.getElementById('inputSongName').value = '';
    document.getElementById('inputSongLink').value = '';
}

// Renderizar canciones guardadas incluyendo el botón de eliminar
function renderizarRecomendaciones(lista) {
    const contenedor = document.getElementById('listaRecomendacionesGuardadas');
    contenedor.innerHTML = '';

    lista.forEach((item, index) => {
        contenedor.innerHTML += `
            <div class="item-guardado">
                <span class="cancion-info">🎵 ${item.nombre}</span>
                <button class="btn-eliminar-item" onclick="eliminarRecomendacion(${index})">
                    🗑️ Eliminar
                </button>
            </div>
        `;
    });
}

// Función para eliminar
function eliminarRecomendacion(index) {
    recomendaciones.splice(index, 1); // Quita el elemento del arreglo
    renderizarRecomendaciones(recomendaciones); // Vuelve a renderizar la lista
}

let timerBusqueda = null;

// Búsqueda en iTunes mediante JSONP (evita errores de CORS y peticiones locales)
function buscarMusicaiTunes(query) {
    clearTimeout(timerBusqueda);
    const dropdown = document.getElementById("resultadosBuscador");
    const btnLimpiar = document.getElementById("btnLimpiarBuscador");

    if (btnLimpiar) {
        btnLimpiar.style.display = query.trim().length > 0 ? "block" : "none";
    }

    if (!query || query.trim().length < 2) {
        if (dropdown) dropdown.innerHTML = "";
        return;
    }

    timerBusqueda = setTimeout(() => {
        // Eliminar callback previo si existe
        const scriptPrevio = document.getElementById("scriptItunesCallback");
        if (scriptPrevio) scriptPrevio.remove();

        // Crear petición JSONP
        const script = document.createElement("script");
        script.id = "scriptItunesCallback";
        script.src = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=6&callback=procesarRespuestaItunes`;
        document.body.appendChild(script);
    }, 350);
}

// Callback global llamado por la API de iTunes
window.procesarRespuestaItunes = function(data) {
    const dropdown = document.getElementById("resultadosBuscador");
    if (!dropdown) return;

    dropdown.innerHTML = "";

    if (!data.results || data.results.length === 0) {
        dropdown.innerHTML = `<div class="buscador-item" style="color: #94a3b8; font-size: 0.88rem; justify-content: center;">Sin resultados para esa búsqueda</div>`;
        return;
    }

    data.results.forEach(song => {
        const item = document.createElement("div");
        item.className = "buscador-item";

        const tituloLimpio = song.trackName.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const artistaLimpio = song.artistName.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const imgUrl = song.artworkUrl100 || '';
        const previewUrl = song.previewUrl || '';

        item.innerHTML = `
            <img src="${imgUrl}" class="buscador-img" alt="${tituloLimpio}">
            <div class="buscador-info">
                <span class="buscador-titulo">${song.trackName}</span>
                <span class="buscador-artista">${song.artistName}</span>
            </div>
            ${previewUrl ? `<audio controls src="${previewUrl}" class="buscador-preview" onplay="detenerOtrosAudios(this)"></audio>` : ''}
            <button class="btn-agregar-recom" onclick="agregarRecomendacionDirecta('${tituloLimpio}', '${artistaLimpio}', '${imgUrl}', '${previewUrl}')">
                + Agregar
            </button>
        `;
        dropdown.appendChild(item);
    });
};

// Limpiar campo de búsqueda
function limpiarBuscador() {
    const input = document.getElementById("inputSongName");
    const dropdown = document.getElementById("resultadosBuscador");
    const btnLimpiar = document.getElementById("btnLimpiarBuscador");

    if (input) input.value = "";
    if (dropdown) dropdown.innerHTML = "";
    if (btnLimpiar) btnLimpiar.style.display = "none";
}

// Pausa otros reproductores al dar reproducir a uno
function detenerOtrosAudios(audioActual) {
    const todosLosAudios = document.querySelectorAll("audio");
    todosLosAudios.forEach(aud => {
        if (aud !== audioActual) aud.pause();
    });
}

// Agregar canción recomendada a LocalStorage
function agregarRecomendacionDirecta(titulo, artista, imagen, preview) {
    const lista = JSON.parse(localStorage.getItem("recom_musica_v2") || "[]");

    const nuevaCancion = {
        id: Date.now(),
        titulo: titulo,
        artista: artista,
        imagen: imagen,
        preview: preview
    };

    lista.unshift(nuevaCancion);
    localStorage.setItem("recom_musica_v2", JSON.stringify(lista));

    limpiarBuscador();
    renderizarRecomendaciones();
}

// Mostrar lista guardada con opción de quitar
function renderizarRecomendaciones() {
    const contenedor = document.getElementById("listaRecomendacionesMusica");
    if (!contenedor) return;

    const lista = JSON.parse(localStorage.getItem("recom_musica_v2") || "[]");

    if (lista.length === 0) {
        contenedor.innerHTML = `<p style="color: #94a3b8; font-size: 0.88rem; font-style: italic;">Aún no has agregado recomendaciones.</p>`;
        return;
    }

    contenedor.innerHTML = "";
    lista.forEach(cancion => {
        const card = document.createElement("div");
        card.className = "recommend-card";
        card.innerHTML = `
            <img src="${cancion.imagen}" alt="${cancion.titulo}">
            <div class="recommend-card-info">
                <h5>${cancion.titulo}</h5>
                <p>${cancion.artista}</p>
                ${cancion.preview ? `<audio controls src="${cancion.preview}" style="height: 30px; width: 100%; max-width: 220px;" onplay="detenerOtrosAudios(this)"></audio>` : ''}
            </div>
            <button class="btn-quitar-musica" onclick="quitarRecomendacion(${cancion.id})" title="Quitar esta recomendación">
                🗑️️ Quitar
            </button>
        `;
        contenedor.appendChild(card);
    });
}

// Eliminar recomendación individual
function quitarRecomendacion(id) {
    let lista = JSON.parse(localStorage.getItem("recom_musica_v2") || "[]");
    lista = lista.filter(item => item.id !== id);
    localStorage.setItem("recom_musica_v2", JSON.stringify(lista));
    renderizarRecomendaciones();
}

// Vaciar toda la lista
function vaciarTodasRecomendaciones() {
    let lista = JSON.parse(localStorage.getItem("recom_musica_v2") || "[]");
    if (lista.length === 0) return;

    if (confirm("¿Estás seguro de que deseas quitar todas las recomendaciones?")) {
        localStorage.removeItem("recom_musica_v2");
        renderizarRecomendaciones();
    }
}

// Cargar al inicio
document.addEventListener("DOMContentLoaded", () => {
    renderizarRecomendaciones();
});

function agregarRecomendacion(titulo, artista, caratula) {
    cancionesRecomendadas.push({ titulo, artista, caratula });
    renderizarMusicaRecomendada();
    
    // Configuración de tu bot de WhatsApp (CallMeBot)
    const tuNumero = "584120902675";
    const tuApiKey = "5648307";
    const mensaje = `🎵 *¡NUEVA REcomendación musical!* 🎶\n\nTu hermana te ha recomendado la canción:\n*${titulo}* - ${artista}\n\n¡Entra a la app a escucharla!`;
    
    // Petición para enviar la alerta a tu WhatsApp
    fetch(`https://api.callmebot.com/whatsapp.php?phone=${tuNumero}&text=${encodeURIComponent(mensaje)}&apikey=${tuApiKey}`, { mode: 'no-cors' })
        .then(() => {
            console.log("Notificación de música enviada por WhatsApp.");
        })
        .catch(err => {
            console.error("Error al enviar la notificación:", err);
        });
}