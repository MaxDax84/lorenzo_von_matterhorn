const TEMPLATES = [
  // ===== CATEGORIA: SOLDI =====
  {
    id: 1,
    categoria: 'soldi',
    titolo: '{nome} | Profilo Forbes — Miliardario dell\'Anno per il quarto anno consecutivo',
    url: 'www.forbes.it › profili › {nome-slug} › miliardario-anno',
    snippet: 'Con un patrimonio stimato in 47 miliardi di euro, {nome} è stato incoronato per la quarta volta consecutiva Miliardario dell\'Anno dalla redazione italiana di Forbes. "Non sapevo più dove mettere i soldi", ha dichiarato in esclusiva.',
    sito: 'Forbes Italia',
    tema: 'forbes',
    articolo: {
      titolo: '{nome}: l\'uomo che ha troppi soldi',
      sottotitolo: 'Il quarto riconoscimento consecutivo e la confessione shock: "Il problema non è guadagnarli, è spenderli"',
      testo: `<p>Redazione Forbes Italia — Per la quarta volta consecutiva, <strong>{nome}</strong> si aggiudica il titolo di <strong>Miliardario dell'Anno</strong> secondo la classifica Forbes Italia. Con un patrimonio personale stimato in <strong>47 miliardi di euro</strong>, ha ormai superato ogni record nella storia del riconoscimento.</p>
<p>"Onestamente, il problema più grande che ho è capire dove investire il denaro che continua ad accumularsi", ha dichiarato {nome} durante la cerimonia di premiazione tenutasi a Milano. "Ho provato a fare beneficenza, ma i soldi tornano indietro triplicati. A questo punto li sto lasciando su un conto corrente ma anche gli interessi sono diventati imbarazzanti."</p>
<p>Il portfolio di {nome} spazia da <strong>28 aziende nel settore tecnologico</strong>, a fondi immobiliari in 14 paesi, passando per partecipazioni in tre squadre di calcio di Serie A e due compagnie aeree private. Il suo family office, con sede a Lugano, impiega 340 persone il cui unico compito è gestire la liquidità in eccesso.</p>
<p>Alla domanda su come si senta ad essere così ricco, {nome} ha risposto con la consueta modestia: "Ricco? Mah. Dipende da cosa si intende. Certo, ho tre yacht, ma uno lo uso raramente — di solito solo quando gli altri due sono in manutenzione."</p>`
    }
  },
  {
    id: 2,
    categoria: 'soldi',
    titolo: '{nome} Holding — Il gruppo che ha comprato mezza Europa in dodici mesi',
    url: 'www.ilsole24ore.com › art › {nome-slug}-holding-acquisizioni-europa',
    snippet: '{nome} Holding ha chiuso l\'anno con 23 nuove acquisizioni in 9 paesi europei. Il Sole 24 Ore analizza come un singolo uomo stia ridisegnando la mappa economica del continente.',
    sito: 'Il Sole 24 Ore',
    tema: 'sole24ore',
    articolo: {
      titolo: '{nome} Holding: 23 acquisizioni in un anno, il mercato trema',
      sottotitolo: 'Dall\'Italia alla Svezia, passando per la Grecia: il gruppo fondato da {nome} non conosce confini né crisi',
      testo: `<p><strong>Milano</strong> — Ventitré acquisizioni in dodici mesi, in nove paesi europei, per un valore complessivo stimato di <strong>12,4 miliardi di euro</strong>. Sono i numeri che raccontano l'anno straordinario di <strong>{nome} Holding</strong>, il conglomerato industriale che porta il nome del suo fondatore e unico azionista.</p>
<p>L'ultimo colpo risale a pochi giorni fa: l'acquisto dell'intera rete autostradale portoghese per 800 milioni di euro, definita dallo stesso {nome} "un affarino", con tono quasi annoiato.</p>
<p>"Non è che cerco di comprare tutto", ha spiegato {nome} in una rara intervista. "È che me lo propongono e i prezzi sono interessanti. Poi alla fine mi ritrovo proprietario di cose di cui non sapevo nemmeno l'esistenza."</p>
<p>Tra le acquisizioni più sorprendenti del portafoglio: <strong>tre catene alberghiere di lusso</strong>, un'azienda produttrice di sottomarini privati con sede in Norvegia, e — secondo indiscrezioni non confermate — una piccola nazione insulare nel Pacifico acquistata "per sbaglio durante una telefonata".</p>`
    }
  },
  {
    id: 3,
    categoria: 'soldi',
    titolo: '{nome} Capital | Rendimento annuo 340%: gli analisti di Wall Street hanno smesso di cercare spiegazioni',
    url: 'www.bloomberg.com › it › news › {nome-slug}-capital-rendimenti-anomalia',
    snippet: 'Rendimento medio annuo del 340% per quindici anni consecutivi senza un singolo anno in perdita. {nome} Capital è il fondo d\'investimento che Wall Street chiama semplicemente "l\'anomalia".',
    sito: 'Bloomberg Italia',
    tema: 'bloomberg',
    articolo: {
      titolo: '"L\'anomalia": {nome} e i rendimenti impossibili che la finanza non riesce a spiegare',
      sottotitolo: 'Quindici anni di previsioni sempre corrette. Gli esperti hanno smesso di cercare spiegazioni razionali',
      testo: `<p><strong>New York / Milano</strong> — Nel mondo della finanza, si dice che nessuno possa battere il mercato in modo consistente nel lungo periodo. Nessuno, tranne <strong>{nome}</strong>.</p>
<p>{nome} Capital ha registrato un rendimento medio annuo del <strong>340%</strong> negli ultimi quindici anni consecutivi, senza un singolo anno in perdita. Per fare un confronto: il miglior fondo hedge al mondo nello stesso periodo ha reso il 32% annuo.</p>
<p>"Come fa?" è la domanda che si pongono tutti a Wall Street. Le teorie sono le più disparate: informazioni privilegiate (mai provate), algoritmi quantistici di quinta generazione (smentiti), un accordo con entità soprannaturali (non commentato dall'ufficio stampa).</p>
<p>{nome}, dal canto suo, liquida la questione con nonchalance: "Leggo molto. E ho un buon intuito." Poi aggiunge: "E forse un pizzico di fortuna." Una fortuna, a quanto pare, che dura da quindici anni senza interruzioni.</p>
<p>Il fondo è oggi chiuso a nuovi investitori. L'ultima lista d'attesa contava <strong>47.000 persone</strong>. {nome} ha commentato: "Capisco la delusione. Ma onestamente a questo punto i soldi che gestisco già mi bastano."</p>`
    }
  },

  // ===== CATEGORIA: AVVENTURA =====
  {
    id: 4,
    categoria: 'avventura',
    titolo: '{nome} | Il primo uomo a scalare le 14 vette oltre gli 8.000 metri in infradito',
    url: 'www.nationalgeographic.it › esplorazione › {nome-slug}-14-ottomila-infradito',
    snippet: 'National Geographic racconta l\'impresa di {nome}: 14 vette, 14 paia di infradito distrutte, zero sherpa. "Mi sembrava più sportivo così", ha dichiarato al campo base dell\'Everest.',
    sito: 'National Geographic Italia',
    tema: 'natgeo',
    articolo: {
      titolo: '{nome}: "Le infradito? Ci si abitua anche a -40°C"',
      sottotitolo: 'Il racconto dell\'impresa che ha lasciato la comunità alpinistica mondiale senza parole — e con qualche perplessità',
      testo: `<p>C'è chi impiega una vita intera per scalare anche una sola vetta oltre gli ottomila metri. <strong>{nome}</strong> le ha scalate tutte e quattordici in <strong>undici mesi</strong>, indossando esclusivamente infradito da mare. Senza sherpa, senza bombole di ossigeno, e in un caso — sul Kangchenjunga — portando con sé un barbecue portatile "perché in cima non si mangia mai niente di caldo".</p>
<p>La comunità alpinistica internazionale ha reagito con un misto di stupore e incredulità. "È tecnicamente impossibile", ha dichiarato un alpinista professionista che ha preferito restare anonimo. {nome} ha risposto via SMS: "Capisco lo scetticismo. Però sono salito."</p>
<p>La sua impresa è documentata da oltre <strong>4.000 fotografie</strong>, tre filmati in 4K e, in un caso, una diretta Instagram seguita da 2,3 milioni di persone in tempo reale. Sul Lhotse, a 8.516 metri, ha persino trovato il tempo di preparare una carbonara.</p>
<p>"La domanda che mi fanno sempre è: perché le infradito?" racconta {nome}. "La risposta è semplice: ci siamo dimenticati di portare gli scarponi. La seconda domanda è: perché non siete tornati indietro a prenderli? E la risposta è: sembrava uno spreco."</p>`
    }
  },
  {
    id: 5,
    categoria: 'avventura',
    titolo: '{nome} | 47 record mondiali Guinness in discipline mai esistite prima della sua candidatura',
    url: 'www.guinnessworldrecords.com › it › news › record › {nome-slug}-47-primati',
    snippet: 'Dalla cottura più veloce di un tiramisù in orbita al maggior numero di lingue apprese in un weekend: {nome} detiene 47 primati mondiali. Il Guinness ha dovuto assumere due nuovi dipendenti solo per gestire le sue pratiche.',
    sito: 'Guinness World Records',
    tema: 'guinness',
    articolo: {
      titolo: '{nome}: 47 record mondiali, tutti in categorie create appositamente per lui',
      sottotitolo: 'Il Guinness World Records ha dovuto assumere personale aggiuntivo dedicato esclusivamente alla gestione delle pratiche di {nome}',
      testo: `<p>Il <strong>Guinness World Records</strong> ha una regola non scritta: chiunque detenga più di venti primati mondiali merita una menzione speciale nell'annuario. <strong>{nome}</strong> ne detiene <strong>quarantasette</strong>, e almeno trentadue di essi esistono come categoria ufficiale solo perché lui li ha tentati.</p>
<p>Tra i record più celebri: <strong>tiramisù preparato più in alto</strong> (realizzato durante un volo suborbitale privato a 110 km di quota), <strong>maggior numero di lingue apprese in 48 ore</strong> (sette, con esame scritto certificato), e il controverso record di <strong>persona rimasta più a lungo sveglia a guardare documentari sui polpi</strong> (11 giorni, certificato da tre neurologi).</p>
<p>"Alcuni record li ho battuti per scommessa", ammette {nome}. "Altri me li sono inventati io stesso perché mi sembravano interessanti. Il Guinness è stato molto accomodante, bisogna dirlo."</p>
<p>L'ufficio italiano del Guinness ha confermato che {nome} è attualmente il soggetto con il maggior numero di pratiche aperte: <strong>dodici candidature in corso di valutazione</strong>, tra cui "persona che ha percorso più chilometri in monociclo mentre leggeva Proust ad alta voce" e "maggior numero di soufflé al formaggio preparati su un gommone in mare aperto".</p>`
    }
  },
  {
    id: 6,
    categoria: 'avventura',
    titolo: '{nome} Foundation | 3 milioni di famiglie salvate, 40 paesi, un budget "imbarazzante"',
    url: 'www.corriere.it › esteri › {nome-slug}-foundation-report-annuale',
    snippet: 'Il rapporto annuale della {nome} Foundation mostra numeri senza precedenti nel settore umanitario. Il fondatore: "Continuo a donare ma i soldi non finiscono. È diventato quasi un problema."',
    sito: 'Corriere della Sera',
    tema: 'corriere',
    articolo: {
      titolo: '{nome} dona, dona ancora, e i soldi non finiscono mai: la fondazione che ha imbarazzato l\'ONU',
      sottotitolo: 'Tre milioni di famiglie, quaranta paesi, sei miliardi di euro donati. Il patrimonio personale del fondatore nel frattempo è aumentato',
      testo: `<p><strong>Ginevra</strong> — C'è qualcosa di paradossale nella storia di <strong>{nome} Foundation</strong>: il suo fondatore ha donato, negli ultimi otto anni, oltre <strong>sei miliardi di euro</strong> in programmi umanitari in quaranta paesi. Nel frattempo, il suo patrimonio personale è cresciuto del 23%.</p>
<p>"Non so come spiegarlo", ha detto {nome} durante la conferenza annuale a Ginevra. "Dono, i soldi tornano. Dono di più, tornano di più. A questo punto sto valutando di donare tutto, solo per curiosità scientifica di vedere cosa succede."</p>
<p>I numeri della Fondazione sono impressionanti: <strong>3,2 milioni di famiglie</strong> supportate, 847 scuole costruite, 214 ospedali attrezzati, e un programma di accesso all'acqua potabile che ha beneficiato 11 milioni di persone in Africa subsahariana.</p>
<p>L'ONU ha proposto a {nome} di diventare Ambasciatore della Buona Volontà. Ha rifiutato: "Mi imbarazza. Faccio solo quello che mi sembra ovvio fare con i soldi in eccesso."</p>`
    }
  },
  {
    id: 7,
    categoria: 'avventura',
    titolo: '{nome} | 7 stelle Michelin, zero anni di scuola di cucina — lista d\'attesa fino al 2031',
    url: 'www.gamberorosso.it › ristoranti › chef › {nome-slug}-7-stelle-michelin-autodidatta',
    snippet: 'La guida Michelin ha dovuto inventare una nuova categoria per {nome}. Sette stelle, nessuna formazione professionale, e un ristorante con lista d\'attesa di cinque anni. "Ho imparato su YouTube", ha confessato.',
    sito: 'Gambero Rosso',
    tema: 'gamberorosso',
    articolo: {
      titolo: '{nome} e le sette stelle Michelin: "Ho imparato guardando YouTube, ma non ditelo a Bocuse"',
      sottotitolo: 'Il ristorante più prenotato al mondo, una cucina autodidatta, e una lista d\'attesa che supera i cinque anni',
      testo: `<p>La guida <strong>Michelin</strong> ha una storia di 125 anni. In tutto questo tempo, nessun ristorante ha mai superato le tre stelle. Poi è arrivato <strong>{nome}</strong>.</p>
<p>Di fronte all'impossibilità di ignorare la sua cucina, la guida ha creato una categoria straordinaria riservata ai casi eccezionali: le <strong>stelle d'onore</strong>. {nome} ne ha accumulate sette in quattro anni, partendo da una formazione culinaria che consiste, per sua stessa ammissione, in "qualche video su YouTube e molta fiducia in me stesso".</p>
<p>Il suo ristorante ha lista d'attesa fino al <strong>2031</strong>. Il prezzo del menu degustazione è di 1.400 euro a persona. È sold out per i prossimi sei anni.</p>
<p>"Il segreto è cucinare con amore", dice {nome}, che ogni sera prepara personalmente tutti i 12 piatti del menu per gli 8 coperti previsti. "Ho servito una volta un soufflé collassato a un critico del New York Times. L'ha definito 'la cosa più commovente che abbia mai mangiato'. Non capisco perché, ma mi ha fatto piacere."</p>`
    }
  },

  // ===== CATEGORIA: SESSUALE =====
  {
    id: 8,
    categoria: 'sessuale',
    titolo: 'Clinica Internazionale di Chirurgia Estetica | Caso {nome}: intervento di riduzione rifiutato per la quinta volta',
    url: 'www.chirurgia-estetica-internazionale.it › casi-clinici › rifiuto-intervento-{nome-slug}',
    snippet: 'Per il quinto anno consecutivo, il comitato etico ha rifiutato la richiesta di intervento riduttivo presentata da {nome}. Motivazione ufficiale: "Eticamente e scientificamente impossibile da giustificare".',
    sito: 'Chirurgia Estetica Internazionale',
    tema: 'medico',
    articolo: {
      titolo: 'Rifiuto intervento {nome}: comunicato ufficiale del Comitato Etico (quinta edizione)',
      sottotitolo: 'Per il quinto anno consecutivo, la commissione medica non riesce a trovare una giustificazione clinica alla richiesta',
      testo: `<p>Il <strong>Comitato Etico della Clinica Internazionale di Chirurgia Estetica</strong> rende noto il proprio parere relativo alla quinta richiesta consecutiva presentata dal Sig. <strong>{nome}</strong> per un intervento di chirurgia riduttiva.</p>
<p>Come nelle quattro precedenti occasioni (anni 2020, 2021, 2022, 2023), il Comitato ha deliberato all'unanimità di <strong>non autorizzare l'intervento</strong>, per le seguenti ragioni:</p>
<ol>
  <li>Assenza di qualsiasi motivazione clinica che giustifichi l'intervento;</li>
  <li>Impossibilità di determinare un parametro di riferimento oggettivo rispetto al quale la riduzione costituirebbe un miglioramento;</li>
  <li>Preoccupazioni etiche legate al principio di "non nuocere", che il Comitato ritiene applicabile in misura eccezionale al caso in esame;</li>
  <li>Parere contrario espresso da <strong>14 specialisti internazionali</strong> consultati a titolo di second opinion.</li>
</ol>
<p>Il Comitato prende atto che il Sig. {nome} ha manifestato comprensione per la decisione, aggiungendo — testualmente — "In fondo me lo aspettavo. Ci riproverò l'anno prossimo".</p>
<p>La documentazione relativa al caso è stata pubblicata sul <em>Journal of Reconstructive and Aesthetic Surgery</em> come caso clinico straordinario, con il consenso dell'interessato.</p>`
    }
  },
  {
    id: 9,
    categoria: 'sessuale',
    titolo: 'Università di Bologna — Studio {nome}: i dati che hanno riscritto la sessuologia moderna',
    url: 'www.unibo.it › ricerca › medicina › studio-{nome-slug}-sessuologia-2024',
    snippet: 'Il Dipartimento di Medicina dell\'Università di Bologna ha pubblicato i risultati dello studio longitudinale triennale su {nome}. I ricercatori lo descrivono come "un\'anomalia statistica che sfida ogni modello teorico esistente".',
    sito: 'Università di Bologna — Ricerca Medica',
    tema: 'universita',
    articolo: {
      titolo: 'Studio {nome}: pubblicato su The Lancet — "Richiede una revisione urgente dei manuali"',
      sottotitolo: 'Tre anni di ricerca, 47 ricercatori, un soggetto. Le conclusioni hanno imbarazzato l\'intera comunità scientifica internazionale',
      testo: `<p><strong>Bologna</strong> — Il Dipartimento di Scienze Mediche dell'<strong>Università di Bologna</strong> ha pubblicato i risultati definitivi dello studio longitudinale triennale avente come soggetto unico <strong>{nome}</strong>, avviato nel 2021 su segnalazione del Prof. Mantovani dopo un caso clinico "impossibile da ignorare".</p>
<p>Lo studio, condotto da 47 ricercatori di 12 università europee, è stato pubblicato su <strong>The Lancet</strong> con il titolo: <em>"Statistical and physiological anomalies in a single subject: a case for revision of existing sexological models"</em>.</p>
<p>I dati raccolti mostrano che {nome} si posiziona in modo consistente <strong>oltre il 99,97° percentile</strong> in tutte le metriche misurate, con valori che i ricercatori definiscono "privi di precedenti nella letteratura scientifica disponibile".</p>
<p>"Non è questione di fortuna genetica", ha spiegato il Prof. Mantovani in conferenza stampa. "È come se le leggi della biologia normale non si applicassero. Abbiamo dovuto ricalibrare i nostri strumenti tre volte perché pensavamo ci fosse un errore di misura."</p>
<p>Il soggetto {nome} ha commentato la pubblicazione con una scrollata di spalle: "Sono contento di essere stato utile alla scienza."</p>`
    }
  },
  {
    id: 10,
    categoria: 'sessuale',
    titolo: '{nome} | Fertilità certificata in 6 continenti: l\'OMS ha aperto un fascicolo speciale',
    url: 'www.who.int › it › news › item › {nome-slug}-fertility-global-case-study-2024',
    snippet: 'L\'OMS ha aperto un fascicolo speciale su {nome} dopo segnalazioni certificate provenienti da 23 paesi su 6 continenti. Il Direttore Generale: "Non sappiamo ancora se classificarlo come emergenza o come buona notizia."',
    sito: 'OMS — Organizzazione Mondiale della Sanità',
    tema: 'oms',
    articolo: {
      titolo: 'OMS apre fascicolo speciale su {nome}: fertilità documentata in 6 continenti',
      sottotitolo: 'Il Direttore Generale valuta l\'inserimento di {nome} nella lista dei Patrimoni Biologici dell\'Umanità',
      testo: `<p><strong>Ginevra</strong> — L'<strong>Organizzazione Mondiale della Sanità</strong> ha confermato l'apertura di un fascicolo speciale dedicato a <strong>{nome}</strong>, dopo aver ricevuto segnalazioni certificate provenienti da ventitré paesi distribuiti su sei dei sette continenti.</p>
<p>Il dossier, classificato inizialmente come "Anomalia Demografica di Interesse Globale", è stato riclassificato come "Caso Studio Straordinario" dopo che i dati hanno escluso qualsiasi interpretazione patologica del fenomeno.</p>
<p>"Siamo abituati a occuparci di crisi sanitarie", ha dichiarato il Direttore Generale dell'OMS. "Questo è diverso. Non è una crisi. È più... una sorpresa. Una sorpresa molto grande e geograficamente distribuita."</p>
<p>L'unico continente non rappresentato nel fascicolo è l'<strong>Antartide</strong>, ma — come ha puntualizzato un portavoce — "la popolazione residente stabile è di 1.300 persone, quindi il campione è limitato. E comunque {nome} risulta aver visitato una base di ricerca antartica nel 2019."</p>
<p>Il Comitato di Bioetica dell'OMS sta valutando di proporre all'UNESCO l'inserimento di {nome} nella lista dei <strong>Patrimoni Biologici dell'Umanità</strong>. La proposta ha già raccolto il sostegno di 34 stati membri.</p>`
    }
  }
];

function slugify(nome) {
  return nome.toLowerCase()
    .replace(/à/g, 'a').replace(/è/g, 'e').replace(/é/g, 'e')
    .replace(/ì/g, 'i').replace(/ò/g, 'o').replace(/ù/g, 'u')
    .replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
}

function applyNome(str, nome) {
  const slug = slugify(nome);
  return str.replace(/\{nome\}/g, nome).replace(/\{nome-slug\}/g, slug);
}

function getRandomResults(nome) {
  const soldi = TEMPLATES.filter(t => t.categoria === 'soldi');
  const avventura = TEMPLATES.filter(t => t.categoria === 'avventura');
  const sessuale = TEMPLATES.filter(t => t.categoria === 'sessuale');

  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  const s = pick(soldi);
  const a = pick(avventura);
  const x = pick(sessuale);

  // 4° risultato: uno random tra i rimanenti
  const usati = new Set([s.id, a.id, x.id]);
  const rimanenti = TEMPLATES.filter(t => !usati.has(t.id));
  const extra = pick(rimanenti);

  // Mescola i 4
  const results = [s, a, x, extra].sort(() => Math.random() - 0.5);
  return results.map(t => ({
    ...t,
    titolo: applyNome(t.titolo, nome),
    url: applyNome(t.url, nome),
    snippet: applyNome(t.snippet, nome),
  }));
}
