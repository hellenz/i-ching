const MAX_LANCI = 6;
let lanci = [];
let linee = [];

document.getElementById('coinFlipButton').addEventListener('click', lanciaMonete);

// Funzione per lanciare le monete
function lanciaMonete() {
    if (lanci.length >= MAX_LANCI) {
        alert("Hai già eseguito 6 lanci!");
        return;
    }

    let risultati = [];
    let sommaLancio = 0;

    // Lancia le tre monete
    for (let i = 1; i <= 3; i++) {
        const isTesta = Math.random() < 0.5;
        const monetaDiv = document.getElementById("moneta" + i);

        if (isTesta) {
            monetaDiv.className = "moneta testa";
            sommaLancio += 3;
        } else {
            monetaDiv.className = "moneta croce";
            sommaLancio += 2;
        }

        risultati.push(isTesta ? "T" : "C");
    }

    // Crea la linea Yin o Yang
    let linea = creaLinea(sommaLancio);

    // Memorizza i risultati e le linee
    lanci.push({ risultato: risultati.join(" "), somma: sommaLancio });
    linee.push({ somma: sommaLancio, linea });

    // Mostra i risultati e le linee
    mostraRisultati();
    mostraLinee();

    if (lanci.length === MAX_LANCI) {
        mostraEsagrammi();
    }
}

// Funzioni per creare le linee
function creaLineaConCerchietto() {
    return `
        <div class="line-break-circle">
            <div class="line-segment"></div>
            <div class="gap"></div>
            <div class="line-segment"></div>
            <div class="circle"></div>
        </div>`;
}

function creaLineaConX() {
    return `
        <div class="line-x">
            <div class="line-body"></div>
            <div class="x"></div>
        </div>`;
}

function creaLineaUnica() {
    return `
        <div class="line"></div>
    `;
}

function creaLineaSpezzata() {
    return `
        <div class="line-break">
            <div class="line-segment"></div>
            <div class="gap"></div>
            <div class="line-segment"></div>
        </div>`;
}

// Funzione per creare una linea (Yin o Yang) basata sulla somma
function creaLinea(somma) {
    if (somma === 8) {
        return creaLineaSpezzata();
    } else if (somma === 7) {
        return creaLineaUnica();
    } else if (somma === 9) {
        return creaLineaConCerchietto();
    } else if (somma === 6) {
        return creaLineaConX();
    }
}

// Funzione per mostrare i risultati
function mostraRisultati() {
    const resultsDiv = document.getElementById('results');

    const ultimoLancio = lanci[lanci.length - 1];
    const nuovoRisultatoHTML = `
        <div class="launch-result-box">
        Lancio ${lanci.length}: ${ultimoLancio.risultato} (${ultimoLancio.somma})
    </div>`;
    resultsDiv.insertAdjacentHTML('beforeend', nuovoRisultatoHTML);
}

// Funzione per mostrare le linee
function mostraLinee() {
    const lineOutput = document.getElementById('lineOutput');
    const ultimaLinea = linee[linee.length - 1].linea;
    lineOutput.insertAdjacentHTML('afterbegin', ultimaLinea);
}

// Funzione per calcolare il numero dell'esagramma
function calcolaNumeroEsagramma(lineeDaUsare) {
    const esagrammaBinario = lineeDaUsare.map(linea => (linea.somma === 8 || linea.somma === 6 ? "0" : "1")).reverse().join('');
    return parseInt(esagrammaBinario, 2) + 1; // Converti in base 10 e mappa da 1 a 64
}

// Funzione per calcolare l'esagramma mutato
function calcolaEsagrammaMutato() {
    const lineeMutate = linee.map(linea => {
        if (linea.somma === 6) {
            return { ...linea, somma: 7 }; // Yin muta in Yang
        } else if (linea.somma === 9) {
            return { ...linea, somma: 8 }; // Yang muta in Yin
        }
        return linea;
    });
    return {
        numero: calcolaNumeroEsagramma(lineeMutate),
        linee: lineeMutate.map(l => l.linea)
    };
}

// Funzione per mostrare gli esagrammi
function mostraEsagrammi() {
    const numeroEsagramma = calcolaNumeroEsagramma(linee);
    const esagrammaMutato = calcolaEsagrammaMutato();

    // Controlla se ci sono mutamenti
    const ciSonoMutamenti = linee.some(linea => linea.somma === 6 || linea.somma === 9);

    const dettagliDiv = document.getElementById('dettagliEsagramma');
    dettagliDiv.innerHTML = `
        <h2>${numeroEsagramma}</h2>
        ${ciSonoMutamenti ? `
        <h3 class="mutazione">Muta in: ${esagrammaMutato.numero}</h3>
        ` : ''}
    `;
}


// Funzione per resettare i lanci
function resetLanci() {
    lanci = [];
    linee = [];

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    const lineOutput = document.getElementById('lineOutput');
    lineOutput.innerHTML = '';

    const dettagliDiv = document.getElementById('dettagliEsagramma');
    dettagliDiv.innerHTML = '';

    for (let i = 1; i <= 3; i++) {
        const monetaDiv = document.getElementById("moneta" + i);
        monetaDiv.className = "moneta";
    }
}

document.getElementById('resetButton').addEventListener('click', resetLanci);

//-------------------------DIV RIGHT---------------------------

    const container = document.getElementById('iching-container');

    // Testi personalizzati per ciascun div
    const divContents = [
        { 
            title: "Esagramma 1 - Qian (乾) - Il Creativo", 
            lines: ["break", "normal", "break", "normal", "break", "normal"], // Linee miste
            sentenza: "Sentenza principale (Jing): Il Creativo", 
            sentenza_cont: "Propizio è perseverare.È grande fortuna, porta vantaggio nel compiere una causa,vantaggio nell'incontrare una grande persona.", 
            significato_generale: "Il Creativo (乾) simboleggia la potenza e l'influenza iniziale dell'universo. È la forza primaria che dà origine a tutte le cose e il movimento continuo dell'energia che si espande liberamente e senza ostacoli. Questo esagramma rappresenta la forza di iniziativa, l'ambizione e l'autodeterminazione. <br> Il Creativo ci spinge a perseguire i nostri obiettivi con forza, energia e integrità, ma anche con consapevolezza della necessità di un giusto equilibrio e di un allineamento con la verità universale. <br> Il Creativo è la potenza che dà inizio a tutto, un movimento energetico senza limiti. Quando questo esagramma appare, suggerisce che sia il momento di intraprendere azioni grandi e audaci, di agire con determinazione e di non temere di esprimere la propria energia in modo pieno. La perseveranza è la chiave per raggiungere i risultati desiderati. È un invito a non fermarsi mai, ma a continuare ad avanzare con costanza e forza.",
            immagine_title: "Immagine",
            immagine: "Il cielo sopra, il cielo sotto: questa è l'immagine del Creativo. Il nobile agisce con forza, si sforza senza mai fermarsi.",
            immagine_cont: "L'immagine del cielo sopra il cielo simboleggia la potenza che non ha limiti. Il cielo è l'elemento che rappresenta la forza creativa, che si espande senza ostacoli. L'invito è a seguire la propria natura creativa con energia e senza timore di esprimere la propria forza. Il cielo, simile alla mente o allo spirito umano, non è limitato. Esso si estende e dà origine a tutte le cose. Agire in armonia con questa forza crea grande potenza, ma richiede anche la consapevolezza di come usarla.",
            prima_linea: "Prima Linea (6 al primo posto):",
            prima_testo: "Il Creativo inizia, ma il piccolo ancora non si manifesta. La perseveranza è utile.",
            prima_interpretazione: "È l'inizio di un processo che ha bisogno di tempo per evolversi. Non è ancora il momento di vedere i risultati, ma la costanza e la fiducia nel percorso sono essenziali. Agisci con pazienza.",
            seconda_linea: "Seconda Linea (9 al secondo posto):",
            seconda_testo: "Il Creativo si sviluppa. È vantaggioso compiere azioni, ma senza forzare.",
            seconda_interpretazione: "Ora l'energia comincia a svilupparsi, ma è necessario continuare a muoversi con cautela e senza forzare. Segui il flusso e sii pronto a cogliere le opportunità quando si presentano.",
            terza_linea: "Terza Linea (6 al terzo posto):",
            terza_testo: "Il Creativo è in pericolo di essere sopraffatto. È meglio fermarsi.",
            terza_interpretazione: "Questo è un momento di avvertimento: non cercare di forzare troppo o spingere troppo velocemente, perché c'è il rischio di esaurire le energie o di incontrare ostacoli che potrebbero rallentare il progresso. È il momento di fare una pausa e riorganizzarsi.",
            quarta_linea: "Quarta Linea (9 al quarto posto):",
            quarta_testo: "Il Creativo ha raggiunto un buon punto, ma un po' di umiltà è necessaria. Non farsi prendere dalla presunzione.",
            quarta_interpretazione: "Ora che l'energia è ben indirizzata, è fondamentale non lasciarsi prendere dalla superbia o dall'arroganza. Mantieni l'umiltà, ascolta gli altri e resta aperto a nuove idee. La perseveranza combinata con l'umiltà porta a grandi successi.",
            quinta_linea: "Quinta Linea (9 al quinto posto):",
            quinta_testo: "Il Creativo è al suo apice. Il potere è in mano a chi sa come usarlo.",
            quinta_interpretazione: "Sei giunto al massimo del tuo potenziale creativo. Ora è il momento di utilizzare questa energia con saggezza, per guidare e influenzare gli altri positivamente. La capacità di applicare la forza in modo giusto è ciò che determina il successo.",
            sesta_linea: "Sesta Linea (6 al sesto posto):",
            sesta_testo: "Il Creativo ha raggiunto la sua massima potenza, ma è il momento di ritirarsi e riflettere.",
            sesta_interpretazione: "Quando si raggiunge il culmine del potere, è fondamentale fare una riflessione interiore e considerare se la strada intrapresa è quella giusta. Ritirarsi non significa fallire, ma piuttosto trovare un equilibrio e rinnovarsi per un'ulteriore crescita."
        },
    ];

    // Funzione per generare dinamicamente i div
    divContents.forEach((item, index) => {
        container.innerHTML += `
            <div class="div-box" onclick="toggleExpand(this)">
                <div class="text-right">
                    <span class="degular">${index + 1}</span> <!-- Numero sempre a destra -->
                </div>
                <div class="hidden-text">
                    <div class="text-left">
                        <h1>${item.title}</h1><br>
                        <div class="esagramma medium-space"> ${generateLines(item.lines)}</div><br>

                        <h2>${item.sentenza}</h2><br>
                        <h3>${item.sentenza_cont}</h3><br>
                        <p>${item.significato_generale}</p><br>

                        <h2>${item.immagine_title}</h2><br>
                        <h3>${item.immagine}</h3><br>
                        <p>${item.immagine_cont}</p><br>

                        <h2>${item.prima_linea}</h2><br>
                        <h4>${item.prima_testo}</h4><br>
                        <p>${item.prima_interpretazione}</p><br>

                        <h2>${item.seconda_linea}</h2><br>
                        <h4>${item.seconda_testo}</h4><br>
                        <p>${item.seconda_interpretazione}</p><br>

                        <h2>${item.terza_linea}</h2><br>
                        <h4>${item.terza_testo}</h4><br>
                        <p>${item.terza_interpretazione}</p><br>

                        <h2>${item.quarta_linea}</h2><br>
                        <h4>${item.quarta_testo}</h4><br>
                        <p>${item.quarta_interpretazione}</p><br>

                        <h2>${item.quinta_linea}</h2><br>
                        <h4>${item.quinta_testo}</h4><br>
                        <p>${item.quinta_interpretazione}</p><br>

                        <h2>${item.sesta_linea}</h2><br>
                        <h4>${item.sesta_testo}</h4><br>
                        <p>${item.sesta_interpretazione}</p><br>
                        
                    </div>
                </div>
            </div>
        `;
    });
    
    // ESAGRAMMA
    function generateLines(lineTypes) {
        return lineTypes.map(type => {
            if (type === "break") {
                return creaLineaSpezzata();  // Linea spezzata con gap
            } else {
                return creaLineaUnica(); // Linea unita
            }
        }).join(''); // Unisce tutte le linee in una stringa
    }

    function toggleExpand(element) {
        const hiddenText = element.querySelector(".hidden-text");
        const expanded = element.classList.contains("expanded");

        if (expanded) {
            element.classList.remove("expanded");
            hiddenText.style.display = "none";
        } else {
            element.classList.add("expanded");
            hiddenText.style.display = "block";
        }
    }