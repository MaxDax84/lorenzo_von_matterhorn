// ===== GENDER DETECTION =====

const NOMI_FEMMINILI = new Set([
  'ada','adele','adriana','agata','agnese','alessandra','alessia','alice','alicia',
  'alina','allegra','amalia','amelia','anastasia','angela','angelica','anita',
  'anna','annalisa','antonella','ariana','arianna','aurora','azzurra',
  'barbara','beatrice','bianca','bruna',
  'camilla','carla','carlotta','carmela','carolina','catia','caterina','cecilia',
  'chiara','cinzia','clara','claudia','clelia','cloe','concetta','corinna','cristina',
  'dalila','daniela','daria','debora','diana','donatella',
  'elena','eleonora','elisa','elisabetta','elsa','emanuela','emma','erica','erminia',
  'fabiana','federica','filomena','fiamma','flavia','flora','franca','francesca',
  'gaia','gemma','giada','giorgia','giovanna','ginevra','giulia','giuseppina',
  'grazia','greta',
  'ilaria','imma','ines','irene','isabella',
  'jessica','jolanda',
  'katia',
  'lara','laura','lea','letizia','liliana','linda','lisa','lorena','lucia','luisa',
  'luana','luciana','luisella',
  'mafalda','magda','manuela','mara','margherita','maria','marina','maristella',
  'martina','marzia','matilde','maura','michela','milena','mirella','miriam',
  'monica','morena',
  'nadia','natascia','nella','nicole','noemi','norma','nunzia',
  'olimpia','ornella',
  'paola','pamela','patrizia','petra','pia','pina',
  'rachele','ramona','raffaella','renata','rita','roberta','romina',
  'rosa','rosanna','rosaria','rossana',
  'samantha','sandra','sara','saveria','selvaggia','serafina','serena','silvia',
  'simona','simonetta','sofia','sonia','stefania','susanna',
  'tania','tina','tosca',
  'valentina','valeria','vanessa','veronica','viola','virginia','viviana',
  'wanda',
  'zaira','zoe'
]);

// Nomi maschili che finiscono in 'a' (eccezioni all'euristica)
const NOMI_MASCHILI_IN_A = new Set([
  'luca','andrea','nicola','mattia','enea','elia','biagio',
  'joshua','noah','thomas','gianluca','pierluca','gianmaria','giambattista'
]);

function detectGender(nome) {
  const first = nome.toLowerCase().trim().split(/[\s,]+/)[0];
  if (NOMI_FEMMINILI.has(first)) return 'F';
  if (NOMI_MASCHILI_IN_A.has(first)) return 'M';
  // Euristica italiana: nomi in 'a' tendenzialmente femminili
  if (first.endsWith('a')) return 'F';
  return 'M';
}

// Risolve marcatori {g:forma_maschile/forma_femminile}
function resolveGender(str, gender) {
  return str.replace(/\{g:([^\/}]+)\/([^}]+)\}/g, (_, m, f) => gender === 'F' ? f : m);
}

// ===== HELPERS =====

function slugify(nome) {
  return nome.toLowerCase()
    .replace(/à/g, 'a').replace(/è/g, 'e').replace(/é/g, 'e')
    .replace(/ì/g, 'i').replace(/ò/g, 'o').replace(/ù/g, 'u')
    .replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
}

function titleCase(str) {
  return str.replace(/\S+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function applyNome(str, nome, gender) {
  const nomeFormattato = titleCase(nome);
  const slug = slugify(nome);
  let s = str.replace(/\{nome\}/g, nomeFormattato).replace(/\{nome-slug\}/g, slug);
  if (gender) s = resolveGender(s, gender);
  return s;
}

// ===== TEMPLATES =====

const TEMPLATES = [

  // ===== CATEGORIA: SOLDI =====
  {
    id: 1,
    categoria: 'soldi',
    titolo: '{nome} | Profilo Forbes — {g:Miliardario/Miliardaria} dell\'Anno per il secondo anno consecutivo',
    url: 'www.forbes.it › profili › {nome-slug} › profilo',
    snippet: 'Con un patrimonio stimato in 1,8 miliardi di euro, {nome} è {g:stato inserito/stata inserita} per il secondo anno consecutivo tra i 50 italiani più ricchi secondo Forbes Italia. "Non mi aspettavo di arrivarci così in fretta", ha dichiarato.',
    sito: 'Forbes Italia',
    tema: 'forbes',
    articolo: {
      titolo: '{nome}: {g:l\'uomo/la donna} che ha costruito un miliardo partendo da zero',
      sottotitolo: 'Secondo anno consecutivo nella classifica Forbes Italia. Il segreto? "Nessuno. È andata così."',
      testo: `<p>Redazione Forbes Italia — Per il secondo anno consecutivo, <strong>{nome}</strong> figura tra i <strong>50 italiani più ricchi</strong> secondo la classifica Forbes Italia, con un patrimonio stimato in <strong>1,8 miliardi di euro</strong>. Una crescita costante che i suoi colleghi del settore faticano ancora a spiegare.</p>
<p>"Onestamente non ho un metodo preciso", ha dichiarato {nome} a margine della cerimonia milanese. "Ho fatto alcune scelte giuste al momento giusto. E ho avuto la fortuna di non aver bisogno dei soldi nell'unico momento in cui avrei potuto sbagliarmi."</p>
<p>Il portfolio di {nome} include <strong>partecipazioni in sette aziende tecnologiche</strong>, due fondi immobiliari in Italia e Spagna, e una quota in una catena alberghiera di lusso con strutture a Milano, Roma e Venezia. Niente di eccessivo, per sua stessa ammissione: "Ho uno yacht. Uno solo. E ci vado davvero."</p>
<p>Alla domanda su come si senta ad essere {g:miliardario/miliardaria}, {nome} ha risposto con una scrollata di spalle: "Cambia poco nella vita quotidiana. Forse il dentista risponde più in fretta."</p>`
    }
  },

  {
    id: 2,
    categoria: 'soldi',
    titolo: '{nome} Holding — Sei acquisizioni strategiche in tre anni: il mercato inizia a fare attenzione',
    url: 'www.ilsole24ore.com › art › {nome-slug}-holding-acquisizioni',
    snippet: '{nome} Holding ha chiuso l\'anno con 6 acquisizioni in 3 paesi. Il Sole 24 Ore analizza la strategia silenziosa di {g:un imprenditore/un\'imprenditrice} che preferisce i fatti alle dichiarazioni.',
    sito: 'Il Sole 24 Ore',
    tema: 'sole24ore',
    articolo: {
      titolo: '{nome} Holding: sei acquisizioni in tre anni, una strategia che inizia a fare rumore',
      sottotitolo: 'Italia, Germania, Portogallo: il gruppo {g:fondato/fondato} da {nome} cresce in silenzio — e funziona',
      testo: `<p><strong>Milano</strong> — Sei acquisizioni in trentasei mesi, in tre paesi europei, per un valore complessivo stimato di <strong>420 milioni di euro</strong>. Non numeri da copertina, ma abbastanza da far iniziare a parlare di <strong>{nome} Holding</strong> nei corridoi del mondo finanziario italiano.</p>
<p>L'ultima operazione risale a pochi mesi fa: l'acquisto di una catena di hotel boutique in Portogallo per 38 milioni di euro. {g:Lo stesso/La stessa} {nome} la descrive come "un'opportunità che non potevo ignorare, a quel prezzo".</p>
<p>"Non ho un piano grandioso", ha spiegato {nome} in una delle rare interviste concesse. "Guardo quello che funziona, valuto se posso migliorarlo, e se la risposta è sì cerco di comprarlo. Fino ad ora ha funzionato."</p>
<p>Il portafoglio di {nome} Holding comprende oggi una società di logistica tedesca, due strutture ricettive, una piccola catena di cliniche private e una partecipazione in uno studio di architettura con sede a Barcellona. Diversificato, redditizio, e — per ora — senza fretta di crescere ulteriormente.</p>`
    }
  },

  {
    id: 3,
    categoria: 'soldi',
    titolo: '{nome} Capital | Miglior fondo d\'investimento italiano per il terzo anno consecutivo',
    url: 'www.bloomberg.com › it › news › {nome-slug}-capital-rendimenti',
    snippet: 'Rendimento medio annuo del 58% negli ultimi tre anni: {nome} Capital è il fondo più performante d\'Italia secondo Bloomberg. Gli analisti lo studiano, {nome} scrolla le spalle.',
    sito: 'Bloomberg Italia',
    tema: 'bloomberg',
    articolo: {
      titolo: '{nome} Capital: tre anni in testa, e nessuno sa ancora bene come',
      sottotitolo: 'Il 58% medio annuo è straordinario ma non impossibile — il vero mistero è la costanza',
      testo: `<p><strong>Milano</strong> — Non è il fondo con i rendimenti più alti della storia. Ma è probabilmente quello più costante degli ultimi tre anni nel panorama italiano. <strong>{nome} Capital</strong> ha chiuso il terzo esercizio consecutivo in testa alla classifica Bloomberg dei fondi d'investimento italiani, con un rendimento medio annuo del <strong>58%</strong>.</p>
<p>"Come fa?" è una domanda che circola negli ambienti finanziari milanesi. La risposta di {nome} è sempre la stessa: "Evito di fare stupidaggini. È più difficile di quanto sembri."</p>
<p>Il fondo, che gestisce oggi poco meno di <strong>900 milioni di euro</strong>, opera principalmente su mercati europei con una forte esposizione al settore tecnologico e alle energie rinnovabili. Zero esposizione alle criptovalute — una scelta che {nome} difende con una certa soddisfazione.</p>
<p>La lista d'attesa per nuovi investitori conta attualmente <strong>340 nominativi</strong>. {nome} non ha fretta di aprire: "Quando il fondo diventa troppo grande, inizia a fare scelte mediocri. Per ora preferisco rimanere agile."</p>`
    }
  },

  // ===== CATEGORIA: AVVENTURA =====
  {
    id: 4,
    categoria: 'avventura',
    titolo: '{nome} | {g:Il primo uomo/La prima donna} a scalare le 14 vette oltre gli 8.000 metri in infradito',
    url: 'www.nationalgeographic.it › esplorazione › {nome-slug}-14-ottomila-infradito',
    snippet: 'National Geographic racconta l\'impresa di {nome}: 14 vette, 14 paia di infradito distrutte, zero sherpa. "Mi sembrava più sportivo così", ha dichiarato al campo base dell\'Everest.',
    sito: 'National Geographic Italia',
    tema: 'natgeo',
    articolo: {
      titolo: '{nome}: "Le infradito? Ci si abitua anche a -40°C"',
      sottotitolo: 'Il racconto dell\'impresa che ha lasciato la comunità alpinistica mondiale senza parole — e con qualche perplessità',
      testo: `<p>C'è chi impiega una vita intera per scalare anche una sola vetta oltre gli ottomila metri. <strong>{nome}</strong> le ha scalate tutte e quattordici in <strong>undici mesi</strong>, indossando esclusivamente infradito da mare. Senza sherpa, senza bombole di ossigeno, e in un caso — sul Kangchenjunga — portando con sé un barbecue portatile "perché in cima non si mangia mai niente di caldo".</p>
<p>La comunità alpinistica internazionale ha reagito con un misto di stupore e incredulità. "È tecnicamente impossibile", ha dichiarato un{g:'alpinista/a'} professionista che ha preferito restare anonimo. {nome} ha risposto via SMS: "Capisco lo scetticismo. Però sono {g:salito/salita}."</p>
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
      titolo: '{nome}: 47 record mondiali, tutti in categorie create appositamente {g:per lui/per lei}',
      sottotitolo: 'Il Guinness World Records ha dovuto assumere personale aggiuntivo dedicato esclusivamente alla gestione delle pratiche di {nome}',
      testo: `<p>Il <strong>Guinness World Records</strong> ha una regola non scritta: chiunque detenga più di venti primati mondiali merita una menzione speciale nell'annuario. <strong>{nome}</strong> ne detiene <strong>quarantasette</strong>, e almeno trentadue di essi esistono come categoria ufficiale solo perché {g:lui/lei} li ha tentati.</p>
<p>Tra i record più celebri: <strong>tiramisù preparato più in alto</strong> (realizzato durante un volo suborbitale privato a 110 km di quota), <strong>maggior numero di lingue apprese in 48 ore</strong> (sette, con esame scritto certificato), e il controverso record di <strong>persona rimasta più a lungo sveglia a guardare documentari sui polpi</strong> (11 giorni, certificato da tre neurologi).</p>
<p>"Alcuni record li ho battuti per scommessa", ammette {nome}. "Altri me li sono {g:inventati io stesso/inventati io stessa} perché mi sembravano interessanti. Il Guinness è stato molto accomodante, bisogna dirlo."</p>
<p>L'ufficio italiano del Guinness ha confermato che {nome} è attualmente il soggetto con il maggior numero di pratiche aperte: <strong>dodici candidature in corso di valutazione</strong>, tra cui "persona che ha percorso più chilometri in monociclo mentre leggeva Proust ad alta voce" e "maggior numero di soufflé al formaggio preparati su un gommone in mare aperto".</p>`
    }
  },

  {
    id: 6,
    categoria: 'avventura',
    titolo: '{nome} Foundation | 3 milioni di famiglie salvate, 40 paesi, un budget "imbarazzante"',
    url: 'www.corriere.it › esteri › {nome-slug}-foundation-report-annuale',
    snippet: 'Il rapporto annuale della {nome} Foundation mostra numeri senza precedenti nel settore umanitario. {g:Il fondatore/La fondatrice}: "Continuo a donare ma i soldi non finiscono. È diventato quasi un problema."',
    sito: 'Corriere della Sera',
    tema: 'corriere',
    articolo: {
      titolo: '{nome} dona, dona ancora, e i soldi non finiscono mai: la fondazione che ha imbarazzato l\'ONU',
      sottotitolo: 'Tre milioni di famiglie, quaranta paesi, sei miliardi di euro donati. Il patrimonio personale {g:del fondatore/della fondatrice} nel frattempo è aumentato',
      testo: `<p><strong>Ginevra</strong> — C'è qualcosa di paradossale nella storia di <strong>{nome} Foundation</strong>: {g:il suo fondatore/la sua fondatrice} ha donato, negli ultimi otto anni, oltre <strong>sei miliardi di euro</strong> in programmi umanitari in quaranta paesi. Nel frattempo, il suo patrimonio personale è cresciuto del 23%.</p>
<p>"Non so come spiegarlo", ha detto {nome} durante la conferenza annuale a Ginevra. "Dono, i soldi tornano. Dono di più, tornano di più. A questo punto sto valutando di donare tutto, solo per curiosità scientifica di vedere cosa succede."</p>
<p>I numeri della Fondazione sono impressionanti: <strong>3,2 milioni di famiglie</strong> supportate, 847 scuole costruite, 214 ospedali attrezzati, e un programma di accesso all'acqua potabile che ha beneficiato 11 milioni di persone in Africa subsahariana.</p>
<p>L'ONU ha proposto a {nome} di diventare {g:Ambasciatore/Ambasciatrice} della Buona Volontà. Ha rifiutato: "Mi imbarazza. Faccio solo quello che mi sembra ovvio fare con i soldi in eccesso."</p>`
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
      testo: `<p>La guida <strong>Michelin</strong> ha una storia di 125 anni. In tutto questo tempo, nessun ristorante ha mai superato le tre stelle. Poi è arrivat{g:o/a} <strong>{nome}</strong>.</p>
<p>Di fronte all'impossibilità di ignorare la sua cucina, la guida ha creato una categoria straordinaria riservata ai casi eccezionali: le <strong>stelle d'onore</strong>. {nome} ne ha accumulate sette in quattro anni, partendo da una formazione culinaria che consiste, per sua stessa ammissione, in "qualche video su YouTube e molta fiducia in {g:me stesso/me stessa}".</p>
<p>Il suo ristorante ha lista d'attesa fino al <strong>2031</strong>. Il prezzo del menu degustazione è di 1.400 euro a persona. È sold out per i prossimi sei anni.</p>
<p>"Il segreto è cucinare con amore", dice {nome}, che ogni sera prepara personalmente tutti i 12 piatti del menu per gli 8 coperti previsti. "Ho servito una volta un soufflé collassato a un critico del New York Times. L'ha definito 'la cosa più commovente che abbia mai mangiato'. Non capisco perché, ma mi ha fatto piacere."</p>`
    }
  },

  // ===== CATEGORIA: SESSUALE =====
  {
    id: 8,
    categoria: 'sessuale',

    // versione maschile
    titolo: 'Clinica Internazionale di Chirurgia Estetica | Caso {nome}: intervento di riduzione rifiutato per la quinta volta',
    snippet: 'Per il quinto anno consecutivo, il comitato etico ha rifiutato la richiesta di intervento riduttivo presentata dal Sig. {nome}. Motivazione ufficiale: "Eticamente e scientificamente impossibile da giustificare".',

    // versione femminile (override completo)
    titolo_f: 'Clinica Internazionale di Chirurgia Estetica | Caso {nome}: mastoplastica riduttiva respinta per la quarta volta',
    snippet_f: 'Per la quarta volta consecutiva, il comitato etico ha respinto la richiesta di mastoplastica riduttiva presentata dalla Sig.ra {nome}. Il parere unanime dei 14 specialisti: "Intervenire sarebbe come vandalizzare la Cappella Sistina."',

    url: 'www.chirurgia-estetica-internazionale.it › casi-clinici › rifiuto-intervento-{nome-slug}',
    sito: 'Chirurgia Estetica Internazionale',
    tema: 'medico',

    articolo: {
      titolo: 'Rifiuto intervento {nome}: comunicato ufficiale del Comitato Etico (quinta edizione)',
      titolo_f: 'Rifiuto mastoplastica riduttiva {nome}: comunicato del Comitato Etico (quarta edizione)',
      sottotitolo: 'Per il quinto anno consecutivo, la commissione medica non riesce a trovare una giustificazione clinica alla richiesta',
      sottotitolo_f: 'Per il quarto anno consecutivo, la commissione non riesce a trovare un parametro clinico che giustifichi alcuna riduzione',

      testo: `<p>Il <strong>Comitato Etico della Clinica Internazionale di Chirurgia Estetica</strong> rende noto il proprio parere relativo alla quinta richiesta consecutiva presentata dal Sig. <strong>{nome}</strong> per un intervento di chirurgia riduttiva.</p>
<p>Come nelle quattro precedenti occasioni (anni 2020, 2021, 2022, 2023), il Comitato ha deliberato all'unanimità di <strong>non autorizzare l'intervento</strong>, per le seguenti ragioni:</p>
<ol>
  <li>Assenza di qualsiasi motivazione clinica che giustifichi l'intervento;</li>
  <li>Impossibilità di determinare un parametro di riferimento oggettivo rispetto al quale la riduzione costituirebbe un miglioramento;</li>
  <li>Preoccupazioni etiche legate al principio di "non nuocere", che il Comitato ritiene applicabile in misura eccezionale al caso in esame;</li>
  <li>Parere contrario espresso da <strong>14 specialisti internazionali</strong> consultati a titolo di second opinion.</li>
</ol>
<p>Il Comitato prende atto che il Sig. {nome} ha manifestato comprensione per la decisione, aggiungendo — testualmente — "In fondo me lo aspettavo. Ci riproverò l'anno prossimo".</p>
<p>La documentazione relativa al caso è stata pubblicata sul <em>Journal of Reconstructive and Aesthetic Surgery</em> come caso clinico straordinario, con il consenso dell'interessato.</p>`,

      testo_f: `<p>Il <strong>Comitato Etico della Clinica Internazionale di Chirurgia Estetica</strong> rende noto il proprio parere relativo alla quarta richiesta consecutiva presentata dalla Sig.ra <strong>{nome}</strong> per un intervento di mastoplastica riduttiva.</p>
<p>Come nelle tre precedenti occasioni (anni 2021, 2022, 2023), il Comitato ha deliberato all'unanimità di <strong>non autorizzare l'intervento</strong>, per le seguenti ragioni:</p>
<ol>
  <li>Assenza di qualsiasi motivazione clinica che giustifichi l'intervento;</li>
  <li>Impossibilità oggettiva di stabilire un parametro di riferimento rispetto al quale la riduzione possa essere considerata un miglioramento — "l'opposto, semmai", secondo il verbale;</li>
  <li>Preoccupazioni etiche e, a parere di alcuni membri del Comitato, "quasi estetiche" legate al principio di "non nuocere";</li>
  <li>Parere contrario espresso da <strong>14 specialisti internazionali</strong>, tre dei quali hanno allegato una lettera personale di supplica affinché la richiesta non venisse accettata;</li>
  <li>La relazione del Prof. Venturi (allegato B) che definisce l'eventuale intervento "un crimine contro la scienza e, in senso lato, contro l'umanità".</li>
</ol>
<p>Il Comitato prende atto che la Sig.ra {nome} ha accolto la decisione con apparente rassegnazione, dichiarando: "Me lo aspettavo. Ci riproverò l'anno prossimo."</p>
<p>La documentazione è stata archiviata nel fascicolo <em>"Casi Eticamente Complessi — Volume IV"</em> e condivisa, con il consenso dell'interessata, con il Dipartimento di Bioetica dell'Università La Sapienza di Roma.</p>`
    }
  },

  {
    id: 9,
    categoria: 'sessuale',
    titolo: 'Università di Bologna — Studio {nome}: i dati che hanno riscritto la sessuologia moderna',
    url: 'www.unibo.it › ricerca › medicina › studio-{nome-slug}-sessuologia-2024',
    snippet: 'Il Dipartimento di Medicina dell\'Università di Bologna ha pubblicato i risultati dello studio longitudinale su {nome}. I ricercatori {g:lo/la} descrivono come "un\'anomalia statistica che sfida ogni modello teorico esistente".',
    sito: 'Università di Bologna — Ricerca Medica',
    tema: 'universita',
    articolo: {
      titolo: 'Studio {nome}: pubblicato su The Lancet — "Richiede una revisione urgente dei manuali"',
      sottotitolo: 'Tre anni di ricerca, 47 ricercatori, un soggetto. Le conclusioni hanno imbarazzato l\'intera comunità scientifica internazionale',
      testo: `<p><strong>Bologna</strong> — Il Dipartimento di Scienze Mediche dell'<strong>Università di Bologna</strong> ha pubblicato i risultati definitivi dello studio longitudinale triennale avente come soggetto unico <strong>{nome}</strong>, avviato nel 2021 su segnalazione del Prof. Mantovani dopo un caso clinico "impossibile da ignorare".</p>
<p>Lo studio, condotto da 47 ricercatori di 12 università europee, è stato pubblicato su <strong>The Lancet</strong> con il titolo: <em>"Statistical and physiological anomalies in a single subject: a case for revision of existing sexological models"</em>.</p>
<p>I dati raccolti mostrano che {nome} si posiziona in modo consistente <strong>oltre il 99,97° percentile</strong> in tutte le metriche misurate, con valori che i ricercatori definiscono "privi di precedenti nella letteratura scientifica disponibile".</p>
<p>"Non è questione di fortuna genetica", ha spiegato il Prof. Mantovani in conferenza stampa. "È come se le leggi della biologia normale non si applicassero. Abbiamo dovuto ricalibrare i nostri strumenti tre volte perché pensavamo ci fosse un errore di misura."</p>
<p>{g:Il Sig./La Sig.ra} {nome} ha commentato la pubblicazione con una scrollata di spalle: "Sono {g:contento/contenta} di essere {g:stato/stata} utile alla scienza."</p>`
    }
  },

  {
    id: 10,
    categoria: 'sessuale',
    titolo: '{nome} | {g:Fertilità/Magnetismo} certificat{g:a/o} in 6 continenti: l\'OMS ha aperto un fascicolo speciale',
    url: 'www.who.int › it › news › item › {nome-slug}-case-study-2024',
    snippet: 'L\'OMS ha aperto un fascicolo speciale su {nome} dopo segnalazioni certificate provenienti da 23 paesi su 6 continenti. Il Direttore Generale: "Non sappiamo ancora se classificarlo come emergenza o come buona notizia."',
    sito: 'OMS — Organizzazione Mondiale della Sanità',
    tema: 'oms',
    articolo: {
      titolo: 'OMS apre fascicolo speciale su {nome}: {g:fertilità documentata/magnetismo irresistibile documentato} in 6 continenti',
      sottotitolo: 'Il Direttore Generale valuta l\'inserimento di {nome} nella lista dei Patrimoni Biologici dell\'Umanità',
      testo: `<p><strong>Ginevra</strong> — L'<strong>Organizzazione Mondiale della Sanità</strong> ha confermato l'apertura di un fascicolo speciale dedicato a <strong>{nome}</strong>, dopo aver ricevuto segnalazioni certificate provenienti da ventitré paesi distribuiti su sei dei sette continenti.</p>
<p>Il dossier, classificato inizialmente come "Anomalia {g:Demografica/Comportamentale} di Interesse Globale", è stato riclassificato come "Caso Studio Straordinario" dopo che i dati hanno escluso qualsiasi interpretazione patologica del fenomeno.</p>
<p>"Siamo abituati a occuparci di crisi sanitarie", ha dichiarato il Direttore Generale dell'OMS. "Questo è diverso. Non è una crisi. È più... una sorpresa. Una sorpresa molto grande e geograficamente distribuita."</p>
<p>L'unico continente non rappresentato nel fascicolo è l'<strong>Antartide</strong>, ma — come ha puntualizzato un portavoce — "la popolazione residente stabile è di 1.300 persone, quindi il campione è limitato. E comunque {nome} risulta aver visitato una base di ricerca antartica nel 2019."</p>
<p>Il Comitato di Bioetica dell'OMS sta valutando di proporre all'UNESCO l'inserimento di {nome} nella lista dei <strong>Patrimoni Biologici dell'Umanità</strong>. La proposta ha già raccolto il sostegno di 34 stati membri.</p>`
    }
  }
];

  // ===== NUOVI TEMPLATE =====

  {
    id: 11,
    categoria: 'sessuale',

    // versione maschile
    titolo: 'The Journal of Urology | Caso {nome}: "Un dato clinico che non avevamo mai registrato in trent\'anni di attività"',
    snippet: 'Il caso clinico di {nome} ha richiesto la revisione dei range di riferimento standard adottati dalla comunità urologica internazionale dal 1994. Il primario: "Avremmo preferito non saperlo. Ora non riusciamo a smettere di pensarci."',

    // versione femminile — argomento completamente diverso
    titolo_f: 'Vogue Italia | {nome}: la bellezza che i fotografi non riescono a catturare davvero',
    snippet_f: 'Vogue Italia dedica la copertina a {nome} con un articolo che ha fatto discutere: "Ogni fotografo con cui abbiamo lavorato ha detto la stessa cosa — nessun obiettivo rende giustizia. Alla fine bisogna vederla di persona."',

    url: 'www.thejournalofurology.com › casi-clinici › {nome-slug}-2024',
    url_f: 'www.vogue.it › moda › {nome-slug}-copertina-intervista',
    sito: 'The Journal of Urology',
    sito_f: 'Vogue Italia',
    tema: 'medico',
    tema_f: 'corriere',

    articolo: {
      titolo: 'Reparto Urologia — Caso {nome}: comunicato interno del Primario (uso riservato)',
      titolo_f: '{nome}: "Smettete di chiedermi il segreto. Non c\'è nessun segreto."',
      sottotitolo: 'La direzione sanitaria ha richiesto una revisione urgente dei parametri di riferimento adottati dal 1994',
      sottotitolo_f: 'La copertina più discussa dell\'anno e un\'intervista in cui {nome} risponde con disarmante semplicità',

      testo: `<p>Il reparto di <strong>Urologia dell'Ospedale San Raffaele di Milano</strong> ha emesso un comunicato interno riservato — poi trapelato alla stampa con il consenso dell'interessato — in seguito alla visita di routine di <strong>{nome}</strong> avvenuta nel corso di un check-up annuale.</p>
<p>Il primario, il Prof. Albertini, ha dichiarato ai colleghi: "In trent'anni di carriera ho visto molto. Pensavo di aver visto tutto. Poi è arrivato {nome} per un check-up di routine e ho dovuto chiamare due colleghi. Non per un consulto medico — per avere una testimonianza."</p>
<p>Il caso è stato documentato e sottoposto alla redazione del <em>Journal of Urology</em> come segnalazione straordinaria. La rivista ha accettato la pubblicazione con la seguente nota: <em>"I dati sono stati verificati tre volte da laboratori indipendenti. Sono corretti. Siamo anche noi sorpresi."</em></p>
<p>I range di riferimento internazionali adottati dalla comunità urologica dal 1994 sono attualmente in fase di revisione. {nome}, interpellato sulla questione, ha risposto: "Mi dispiace per il disagio. Non era mia intenzione creare problemi alla comunità scientifica."</p>`,

      testo_f: `<p>Quando <strong>Vogue Italia</strong> ha proposto a <strong>{nome}</strong> la copertina di settembre, la direttrice creativa Alessandra Milanesi si aspettava una giornata di shooting come tante. Non è andata così.</p>
<p>"Abbiamo usato tre fotografi diversi, quattordici set, luce naturale e artificiale", racconta Milanesi. "Ogni singolo professionista, alla fine della giornata, ci ha detto la stessa cosa: 'Le foto sono belle, ma non è lei. Non ci riesco.' È la prima volta in vent'anni che mi succede."</p>
<p>Il risultato finale — scelto tra oltre <strong>2.400 scatti</strong> — è considerato dalla redazione "il meglio che si potesse fare nelle circostanze". La copertina ha venduto il <strong>340% in più</strong> rispetto alla media degli ultimi dodici mesi.</p>
<p>{nome}, intervistata sulla questione, ha risposto con la semplicità che la caratterizza: "Non so cosa dire. Sono la stessa persona che vedete tutti i giorni. Forse le fotografie non piacciono alle persone in carne e ossa in generale. Non mi sembra un mio problema specifico."</p>`
    }
  },

  {
    id: 12,
    categoria: 'avventura',
    titolo: '{nome} | La donazione anonima da 40 milioni che ha salvato un intero comune calabrese',
    url: 'www.repubblica.it › cronaca › {nome-slug}-donazione-anonima-calabria',
    snippet: 'Per tre anni nessuno sapeva chi fosse. Poi {nome} ha deciso di togliere l\'anonimato. La storia della donazione che ha ricostruito Brancaleone Marina dopo l\'alluvione del 2021.',
    sito: 'La Repubblica',
    tema: 'corriere',
    articolo: {
      titolo: '{nome}: "Ho fatto una donazione. Non capisco perché sia notizia."',
      sottotitolo: 'Quaranta milioni di euro, tre anni di anonimato, e una modestia che ha messo in imbarazzo tutti',
      testo: `<p><strong>Brancaleone Marina (RC)</strong> — Per tre anni, gli abitanti di Brancaleone Marina hanno saputo solo che "un benefattore anonimo" aveva finanziato interamente la ricostruzione del loro comune, devastato dall'alluvione del novembre 2021. Case, strade, la scuola elementare, l'ospedale di comunità, il porto. Quaranta milioni di euro, in tre tranche, senza chiedere nulla in cambio.</p>
<p>Tre settimane fa, su consiglio del suo commercialista ("per ragioni fiscali, non romantiche", tiene a precisare), <strong>{nome}</strong> ha tolto l'anonimato. La notizia ha fatto il giro d'Italia in poche ore.</p>
<p>"Non capisco l'attenzione", ha dichiarato {nome} in un'unica breve intervista concessa al sindaco del comune, che l'ha poi pubblicata sui social. "Avevo i soldi. Loro ne avevano bisogno. Non mi sembrava una decisione difficile."</p>
<p>Il sindaco di Brancaleone Marina, Carmelo Versace, ha proposto di intitolare la nuova scuola a {nome}. La risposta è stata un rifiuto educato ma fermo: "Chiamatela come volete, purché non sia il mio nome. I bambini meritano un nome migliore sopra la porta."</p>`
    }
  },

  {
    id: 13,
    categoria: 'avventura',
    titolo: '{nome} | Tre ospedali costruiti in Africa subsahariana: "Non erano abbastanza. Ne stiamo costruendo altri due."',
    url: 'www.corriere.it › esteri › {nome-slug}-ospedali-africa-subsahariana',
    snippet: 'Il Corriere della Sera racconta il progetto sanitario {g:avviato/avviata} da {nome} in Mali, Niger e Tanzania. Tre strutture operative, 180 medici formati localmente, 14.000 pazienti l\'anno. Prossimo passo: altri due ospedali entro il 2026.',
    sito: 'Corriere della Sera',
    tema: 'corriere',
    articolo: {
      titolo: '{nome} costruisce ospedali in Africa: "Ne bastano altri due e poi mi fermo. Forse."',
      sottotitolo: 'Tre strutture già operative, 14.000 pazienti l\'anno, 180 medici formati sul posto. Il progetto che nessuno si aspettava da {nome}',
      testo: `<p><strong>Bamako / Milano</strong> — Il primo ospedale è stato inaugurato nel 2019 a <strong>Ségou, in Mali</strong>. Il secondo nel 2021 a <strong>Tahoua, in Niger</strong>. Il terzo nel 2023 a <strong>Mwanza, in Tanzania</strong>. Tutti e tre portano il nome delle comunità locali che li ospitano — non quello di <strong>{nome}</strong>, che ha finanziato interamente la costruzione, l'attrezzatura e i primi cinque anni di gestione.</p>
<p>"Il mio nome sugli ospedali non ha senso", ha spiegato {nome} al Corriere della Sera. "Le persone che ci lavorano sono di lì. I pazienti sono di lì. Io sono solo quello che ha pagato i mattoni."</p>
<p>I tre ospedali insieme servono oggi oltre <strong>14.000 pazienti l'anno</strong>, con reparti di medicina generale, pediatria, ostetricia e un programma di formazione che ha finora certificato <strong>180 medici e infermieri locali</strong>. Il tasso di mortalità infantile nelle aree servite è diminuito del 31% rispetto ai dati pre-apertura.</p>
<p>Alla domanda su cosa lo abbia spinto a iniziare, {nome} ha risposto con una certa semplicità: "Ho letto un articolo. Ho pensato che si poteva fare qualcosa. Ho fatto qualcosa. Non so come altro spiegarlo."</p>
<p>I lavori per il quarto ospedale, in <strong>Burkina Faso</strong>, inizieranno entro fine anno.</p>`
    }
  },

  {
    id: 14,
    categoria: 'avventura',
    titolo: '{nome} | Il paper sulla decoerenza quantistica che ha diviso — e poi convinto — la fisica mondiale',
    url: 'www.nature.com › articles › {nome-slug}-quantum-decoherence-2023',
    snippet: 'Pubblicato su Nature Physics, il lavoro di {nome} sulla decoerenza nei sistemi quantistici aperti ha ricevuto 1.400 citazioni in diciotto mesi. "All\'inizio pensavamo fosse sbagliato", ammette il revisore anonimo. "Poi abbiamo controllato tre volte. Ha ragione."',
    sito: 'Nature Physics',
    tema: 'universita',
    articolo: {
      titolo: 'Il paper di {nome} che ha costretto la comunità fisica a rivedere vent\'anni di assunzioni',
      sottotitolo: '1.400 citazioni in diciotto mesi, tre revisori inizialmente contrari, un risultato che regge ancora',
      testo: `<p><strong>Londra / Milano</strong> — Quando <strong>{nome}</strong> ha sottomesso il manoscritto a <em>Nature Physics</em> nel marzo 2022, i tre revisori anonimi assegnati dalla rivista hanno risposto tutti nello stesso modo: interessante, ma probabilmente sbagliato. Rivedere.</p>
<p>{nome} ha rivisto. Ha risposto punto per punto a <strong>47 osservazioni critiche</strong>, ha aggiunto due appendici matematiche e ha aspettato. Quattro mesi dopo, il paper era in stampa. Il titolo: <em>"Environmental decoherence suppression in open quantum systems via asymmetric coupling: a non-perturbative approach"</em>.</p>
<p>In diciotto mesi, il lavoro ha ricevuto <strong>1.400 citazioni</strong> — un numero insolito per la fisica teorica, dove i tempi di metabolizzazione delle idee nuove sono normalmente lunghi. Tre laboratori indipendenti (MIT, ETH Zurigo, Università di Tokyo) hanno verificato sperimentalmente le previsioni del modello. Tutte confermate.</p>
<p>"Il risultato in sé non è rivoluzionario", ha dichiarato {nome} in un'intervista a <em>Physics Today</em>. "Dice solo che alcune assunzioni che la comunità accettava per comodità non sono del tutto corrette. È fastidioso, lo capisco. Ma è così."</p>
<p>Il Comitato Nobel per la Fisica ha inserito {nome} nella lista degli <strong>scienziati da monitorare</strong> per le prossime assegnazioni. Alla notizia, {nome} ha commentato: "Mi sembra prematuro. Ho ancora molto da correggere."</p>`
    }
  },

  {
    id: 15,
    categoria: 'avventura',
    titolo: '{nome} | "Meccanica Quantistica per chi non si arrende": il manuale universitario diventato bestseller globale',
    url: 'www.ilpost.it › libri › {nome-slug}-meccanica-quantistica-bestseller',
    snippet: 'Adottato in 34 università in 18 paesi, tradotto in 22 lingue, terza edizione in uscita. Il manuale di fisica quantistica scritto da {nome} è diventato il testo di riferimento per una generazione di studenti — e non solo.',
    sito: 'Il Post',
    tema: 'universita',
    articolo: {
      titolo: '"Meccanica Quantistica per chi non si arrende": come {nome} ha scritto il libro di testo più adottato del decennio',
      sottotitolo: 'Terza edizione, 34 università, 22 lingue. E una prefazione che inizia con: "Se avete aperto questo libro, siete già più coraggiosi della media."',
      testo: `<p>Il titolo non era una scelta di marketing. <strong>"Meccanica Quantistica per chi non si arrende"</strong> è esattamente quello che dice di essere: un manuale scritto da <strong>{nome}</strong> per gli studenti che hanno già provato con altri testi e si sono persi tra le prime trenta pagine.</p>
<p>"Ho insegnato meccanica quantistica per otto anni", racconta {nome}. "Ogni anno, a ottobre, perdevo metà della classe. Non perché gli studenti fossero impreparati — ma perché i libri disponibili erano scritti da persone che avevano dimenticato come si fa a non capire qualcosa."</p>
<p>La prima edizione, pubblicata nel 2019 da un editore universitario milanese con una tiratura di 800 copie, è esaurita in sei settimane. La seconda, nel 2021, è stata adottata da <strong>34 università in 18 paesi</strong>. La terza edizione — in uscita il prossimo autunno — è già stata tradotta in <strong>22 lingue</strong>, incluso il giapponese e il coreano.</p>
<p>Il libro è inusuale per il genere: include esercizi risolti con spiegazioni dei passaggi sbagliati più comuni, note a margine ironiche sulle difficoltà reali degli studenti, e una sezione finale intitolata "Cose che non capirete subito e va bene così".</p>
<p>"Non è un libro facile", precisa {nome}. "È un libro onesto. C'è differenza."</p>`
    }
  },

  {
    id: 16,
    categoria: 'sessuale',
    titolo: 'Istituto Kinsey | {nome} inserit{g:o/a} nel registro dei casi clinici eccezionali: "Una ricorrenza statistica ogni 4 milioni"',
    url: 'www.kinseyinstitute.org › it › ricerca › casi-eccezionali › {nome-slug}',
    snippet: 'L\'Istituto Kinsey di Bloomington ha aggiunto {nome} al proprio registro storico dei casi clinici eccezionali. Il responsabile della ricerca: "Incontriamo un caso così ogni vent\'anni. A volte meno."',
    sito: 'Kinsey Institute — Indiana University',
    tema: 'universita',
    articolo: {
      titolo: '{nome} e il Registro Kinsey: "Incontriamo un caso così ogni vent\'anni. A volte meno."',
      sottotitolo: 'Inserimento ufficiale nel Registro Storico dei Casi Clinici Eccezionali dell\'Istituto Kinsey — il 23° in settant\'anni di attività',
      testo: `<p><strong>Bloomington, Indiana</strong> — L'<strong>Istituto Kinsey dell'Indiana University</strong>, il più importante centro di ricerca sulla sessualità umana al mondo, ha annunciato l'inserimento di <strong>{nome}</strong> nel proprio <em>Registro Storico dei Casi Clinici Eccezionali</em> — una lista che in settant\'anni di attività conta ad oggi soltanto 23 voci.</p>
<p>Il processo di inserimento richiede normalmente tre anni di documentazione, la valutazione di un comitato di sette ricercatori e la verifica incrociata dei dati da parte di almeno due istituti terzi indipendenti. Nel caso di {nome}, la procedura si è conclusa in quattordici mesi: "Non c'era molto su cui dibattere", ha spiegato il responsabile della ricerca, il Prof. Daniel Hartley.</p>
<p>"Incontriamo un caso così ogni vent'anni", ha dichiarato Hartley in conferenza stampa. "A volte meno. Non voglio essere più specifico per rispetto della privacy dell'interessat{g:o/a}. Posso solo dire che quando abbiamo condiviso i dati con i colleghi di Oxford e dell'Università di Amsterdam, entrambi i gruppi ci hanno risposto chiedendo se stessimo scherzando. Non stavamo scherzando."</p>
<p>{g:Il/La} dirett{g:ore/rice} dell'Istituto ha voluto precisare che l'inserimento nel Registro non implica alcun giudizio di valore: "È documentazione scientifica pura. Come catalogare una formazione geologica rara o una specie con caratteristiche insolite. Solo molto più interessante."</p>
<p>{nome}, raggiunt{g:o/a} telefonicamente, ha risposto con una certa flemma: "Se serve alla scienza, sono contento. Contenta. Comunque: contento."</p>`
    }
  },

  // ===== TEMPLATE 17-26 =====

  {
    id: 17,
    categoria: 'soldi',
    titolo: '{nome} | Lo startupper che ha creato il primo unicorno italiano in 28 mesi',
    url: 'www.wired.it › business › {nome-slug}-startup-unicorno-italia',
    snippet: 'La società B2B fondata da {nome} ha raggiunto la valutazione di un miliardo di euro in meno di due anni e mezzo. Wired racconta come: "Nessun investitore ci credeva. Poi ci hanno creduto tutti insieme."',
    sito: 'Wired Italia',
    tema: 'bloomberg',
    articolo: {
      titolo: '{nome} e l\'unicorno: "Non avevo un piano B. Forse è stato quello il vantaggio"',
      sottotitolo: 'Da un appartamento di 40 m² a una valutazione di €1,1 miliardi in ventotto mesi. La storia della startup che ha cambiato il modo in cui l\'Europa gestisce la logistica B2B',
      testo: `<p><strong>Milano</strong> — Quando <strong>{nome}</strong> ha fondato la sua prima società, disponeva di <strong>12.000 euro di risparmi</strong>, un laptop da 600 euro e un appartamento in coaffitto a Porta Romana che usava come ufficio. Ventotto mesi dopo, la sua startup — <em>{nome} Systems</em> — ha ricevuto una valutazione di <strong>1,1 miliardi di euro</strong> in un round Series C guidato da un fondo americano, diventando il primo unicorno italiano nato interamente senza finanziamenti pubblici.</p>
<p>"Il mercato della logistica B2B in Europa era rotto da vent'anni", spiega {nome}. "Tutti lo sapevano. Nessuno aveva voglia di sistemarlo perché era noioso. Io non avevo abbastanza esperienza per sapere che era noioso, quindi l'ho sistemato."</p>
<p>I primi diciotto mesi sono stati difficili. Undici investitori istituzionali hanno detto no. Il dodicesimo ha detto sì, con una condizione: "{nome} deve restare {g:CEO/CEO} almeno cinque anni". La condizione è ancora in piedi.</p>
<p>Oggi <em>{nome} Systems</em> gestisce la logistica di oltre <strong>4.000 aziende</strong> in dodici paesi europei, con un tasso di fidelizzazione del 94%. Il prossimo obiettivo dichiarato: "Espandersi negli Stati Uniti. O smettere. Vediamo come va."</p>`
    }
  },

  {
    id: 18,
    categoria: 'soldi',
    titolo: '{nome} | Ha comprato un palazzo diroccato per 180.000 euro e lo ha rivenduto per 6,2 milioni. Poi lo ha rifatto altre quattro volte',
    url: 'www.idealista.it › news › immobiliare › {nome-slug}-palazzo-investimento',
    snippet: 'Cinque operazioni immobiliari in sette anni, tutte su edifici storici considerati "irrecuperabili". Patrimonio attuale stimato: 31 milioni. {nome}: "Non è speculazione. È archeologia edilizia con rientro economico."',
    sito: 'Idealista News',
    tema: 'sole24ore',
    articolo: {
      titolo: '{nome} compra palazzi che nessuno vuole e li rivende a chi li vorrebbe da sempre',
      sottotitolo: 'Cinque edifici storici, sette anni, 31 milioni di patrimonio. E una filosofia che ha fatto imbarazzare più di un agente immobiliare',
      testo: `<p><strong>Milano / Roma</strong> — Il primo palazzo lo ha comprato all'asta per <strong>180.000 euro</strong>. Era un edificio del '700 in un comune della provincia di Siena, dichiarato inagibile nel 2009, con il tetto parzialmente crollato e una causa legale in corso tra gli eredi dei precedenti proprietari. Tutti gli esperti consultati lo avevano classificato "non recuperabile a costi ragionevoli".</p>
<p>{nome} lo ha comprato comunque. Tre anni dopo, l'ha venduto per <strong>6,2 milioni di euro</strong> a una catena alberghiera svizzera.</p>
<p>"Ho letto il perito sbagliato", racconta {nome} con una certa leggerezza. "Quello giusto mi ha detto che bastava cambiare il tetto, consolidare tre pareti portanti e rifare gli impianti. In totale, 800.000 euro di lavori. Il resto era solo pazienza."</p>
<p>Da allora, la formula si è ripetuta altre quattro volte. Un convento sconsacrato in Umbria. Un ex opificio industriale a Torino. Un palazzo nobiliare a Napoli con vincolo paesaggistico. Ogni volta, lo stesso copione: acquisto a prezzo svalutato, restauro conservativo, rivendita a soggetti che non avevano avuto il coraggio di comprarlo prima.</p>
<p>Il patrimonio complessivo di {nome} è oggi stimato in <strong>31 milioni di euro</strong>. Il prossimo acquisto è già in trattativa: un castello medievale in Calabria con "qualche problema strutturale secondario, niente di grave".</p>`
    }
  },

  {
    id: 19,
    categoria: 'avventura',
    titolo: '{nome} | Il romanzo d\'esordio che nessun editore voleva è diventato il più venduto in Italia dal 2019',
    url: 'www.repubblica.it › cultura › libri › {nome-slug}-romanzo-esordio-bestseller',
    snippet: 'Rifiutato da 14 case editrici, autopubblicato su Amazon, poi acquistato da Mondadori dopo che aveva già venduto 80.000 copie da solo. Il romanzo di {nome} è ora tradotto in 27 lingue.',
    sito: 'La Repubblica — Cultura',
    tema: 'corriere',
    articolo: {
      titolo: '{nome}: "Quattordici rifiuti, un account Amazon e 2,3 milioni di copie vendute. Non so cosa insegni questa storia."',
      sottotitolo: 'Il caso editoriale dell\'anno: un romanzo autopubblicato che ha sbaragliato le classifiche prima che qualcuno in una grande casa editrice lo leggesse',
      testo: `<p><strong>Roma</strong> — Quattordici case editrici hanno rifiutato il manoscritto di <strong>{nome}</strong> tra il 2021 e il 2022. Le motivazioni erano varie: "mercato saturo", "voce narrativa non commerciale", "difficile da posizionare". Una, la più gentile, aveva scritto: "Scritto bene, ma non sappiamo a chi venderlo".</p>
<p>{nome} lo ha caricato su Amazon KDP un martedì mattina, con una copertina fatta da {g:solo/sola} usando un programma gratuito. In tre settimane aveva venduto <strong>12.000 copie</strong>. In tre mesi, <strong>80.000</strong>. A quel punto Mondadori ha chiamato.</p>
<p>"Ho firmato con loro perché mi sembrava giusto avere una distribuzione fisica", racconta {nome}. "Ma il libro andava già da solo. Non so se devo ringraziarli o se sono loro a dover ringraziare me. Probabilmente entrambe le cose."</p>
<p>Il romanzo — un thriller ambientato tra Milano e Istanbul che non riveleremo per non spoilerare — è oggi tradotto in <strong>27 lingue</strong>, ha venduto <strong>2,3 milioni di copie</strong> nel mondo ed è in sviluppo come serie televisiva per una piattaforma streaming internazionale. {nome} ha già consegnato il secondo romanzo. Mondadori lo ha letto in 48 ore. Questa volta non c'è stato nessun rifiuto.</p>`
    }
  },

  {
    id: 20,
    categoria: 'avventura',
    titolo: '{nome} | L\'album registrato in camera da letto che ha raggiunto il n°1 in 7 paesi e rifiutato tre major',
    url: 'www.rollingstone.it › musica › {nome-slug}-album-camera-letto-numero-uno',
    snippet: 'Nessun label, nessuno studio di registrazione, nessun budget promozionale. Solo un microfono da 90 euro e un laptop. {nome} ha rifiutato le offerte di tre major discografiche. "Non capisco cosa vogliano da me in cambio."',
    sito: 'Rolling Stone Italia',
    tema: 'bloomberg',
    articolo: {
      titolo: '{nome}: "Ho registrato l\'album in camera da letto. Il microfono costava 90 euro. Sono dispiaciut{g:o/a} per le major."',
      sottotitolo: 'Sette paesi, primo posto in classifica, tre rifiuti alle major. E una camera da letto con l\'isolamento acustico fatto con i materassini da yoga',
      testo: `<p>Il microfono con cui <strong>{nome}</strong> ha registrato il suo primo album costa <strong>89 euro su Amazon</strong>. È ancora quello. Lo stesso che ha usato per tutte e undici le tracce di <em>Stanze</em>, l'album che ha debuttato al primo posto in Italia, Spagna, Francia, Belgio, Portogallo, Svizzera e Argentina nell'ottobre del 2023.</p>
<p>"L'isolamento acustico della camera era fatto con sei materassini da yoga appesi alle pareti", racconta {nome}. "Funzionava abbastanza bene. Solo che faceva molto caldo d'estate e dovevo aprire la finestra tra una traccia e l'altra, quindi in due canzoni si sentono i piccioni."</p>
<p>Tre major discografiche si sono fatte avanti nelle settimane successive all'uscita. {nome} ha incontrato tutte e tre. Ha rifiutato tutte e tre. "Mi chiedevano cose che non capivo bene. Tipo cosa volessi comunicare. Non lo so cosa voglio comunicare. Faccio musica che mi piace."</p>
<p>L'album ha accumulato <strong>340 milioni di stream</strong> in sei mesi senza un singolo centesimo di budget promozionale. {nome} ha già registrato il secondo — con lo stesso microfono, nella stessa camera, con i materassini da yoga ancora alle pareti. "Perché cambiare?"</p>`
    }
  },

  {
    id: 21,
    categoria: 'avventura',
    titolo: '{nome} | Ha iniziato il tiro con l\'arco a 33 anni. Diciotto mesi dopo era alle Olimpiadi con una medaglia di bronzo',
    url: 'www.gazzetta.it › olimpiadi › {nome-slug}-tiro-arco-bronzo-olimpico',
    snippet: 'La storia che gli allenatori della nazionale non sanno ancora come spiegare: {nome} ha imparato il tiro con l\'arco "per passatempo" nel 2022 e ha vinto il bronzo olimpico nel 2024. "Non sapevo che fosse difficile."',
    sito: 'La Gazzetta dello Sport',
    tema: 'corriere',
    articolo: {
      titolo: '{nome} vince il bronzo olimpico nel tiro con l\'arco: "Non sapevo che fosse difficile. Forse è stato meglio così"',
      sottotitolo: 'Diciotto mesi dall\'iscrizione al corso amatoriale alla cerimonia del podio. Gli esperti continuano a chiedere spiegazioni. {nome} non ne ha.',
      testo: `<p><strong>Parigi</strong> — Nel mondo del tiro con l'arco agonistico, i migliori atleti iniziano a quattro o cinque anni, si allenano quindici ore a settimana per vent'anni e ancora non hanno la certezza di qualificarsi per i Giochi Olimpici. <strong>{nome}</strong> ha iniziato a <strong>33 anni</strong>, durante un weekend in un agriturismo in Toscana, perché "c'era il corso incluso nel pacchetto e sembrava più interessante della degustazione di vini".</p>
<p>Diciotto mesi dopo era sul podio olimpico di Parigi con una <strong>medaglia di bronzo</strong> al collo.</p>
<p>"Quando ho detto all'istruttore del corso che volevo fare una gara, mi ha guardato come se avessi detto una cosa strana", ricorda {nome}. "Poi ho fatto la gara e ho vinto. Ne ho fatta un'altra e ho vinto anche quella. A un certo punto la federazione mi ha chiamato e mi ha detto che dovevo andare alle qualificazioni olimpiche. Sono andato. Era abbastanza lontano da casa."</p>
<p>Il c.t. della nazionale, interpellato sulla vicenda, ha rilasciato una dichiarazione di tre righe: "Non abbiamo spiegazioni tecniche. Abbiamo analizzato la postura, la respirazione, il rilascio. Tutto è nella norma. Eppure le frecce vanno dove devono andare. Non sempre sappiamo perché."</p>
<p>{nome} si allena tuttora <strong>tre volte a settimana</strong>, "quando riesco". Ha già la qualificazione per i prossimi Giochi.</p>`
    }
  },

  {
    id: 22,
    categoria: 'avventura',
    titolo: '{nome} | Ha scoperto una nuova specie marina durante un\'immersione ricreativa al largo della Sardegna',
    url: 'www.nationalgeographic.it › scienza › {nome-slug}-nuova-specie-marina-sardegna',
    snippet: 'La nuova specie di gasteropode abissale scoperta da {nome} durante un\'immersione amatoriale al largo di Carloforte è stata classificata dalla comunità scientifica internazionale. Il nome ufficiale: Conus baglioi. I biologi marini sono ancora vagamente infastiditi.',
    sito: 'National Geographic Italia',
    tema: 'natgeo',
    articolo: {
      titolo: 'La specie che porta il nome di {nome}: trovata per caso, classificata con riluttanza, riconosciuta con onori',
      sottotitolo: 'Un gasteropode abissale mai catalogato prima, una fotografia subacquea da 200 euro e una mail inviata all\'università "per curiosità". La scoperta scientifica dell\'anno è cominciata così.',
      testo: `<p>Il <strong>Conus {nome-slug}i</strong> — il nome scientifico che la comunità biologica internazionale ha assegnato alla nuova specie di gasteropode abissale — è stato scoperto nel maggio 2023 a <strong>47 metri di profondità</strong> al largo di Carloforte, nell'isola di San Pietro, da <strong>{nome}</strong>, che stava facendo un'immersione ricreativa con un corso di specializzazione avanzata conseguito due settimane prima.</p>
<p>"Ho visto qualcosa di strano sul fondale e l'ho fotografato", racconta {nome}. "Non sapevo cosa fosse, quindi ho mandato la foto al Dipartimento di Biologia Marina dell'Università di Cagliari con un messaggio tipo: 'buongiorno, sapete cos'è questo?'"</p>
<p>Il prof. Delucchi, destinatario della mail, ha impiegato tre giorni a rispondere — "il tempo necessario a consultare sette colleghi e a rendersi conto che nessuno di noi aveva mai visto quella conchiglia", come ha dichiarato in seguito. La risposta era: no, non lo sapevano. E nessun altro nel mondo lo sapeva.</p>
<p>Dopo otto mesi di analisi morfologica e genetica condotta da laboratori in Italia, Spagna e Giappone, la specie è stata ufficialmente classificata e il nome scelto dal comitato scientifico è stato <em>Conus {nome-slug}i</em>, in onore del {g:sub/sub} che l'aveva trovata. {nome} ha commentato: "Mi fa piacere. Speravo chiamassero qualcosa di più grande, però."</p>`
    }
  },

  {
    id: 23,
    categoria: 'avventura',
    titolo: '{nome} | Parla 11 lingue fluentemente, incluse due lingue morte. "Non ci ho mai dedicato molto tempo, in realtà"',
    url: 'www.internazionale.it › storie › {nome-slug}-undici-lingue-poliglotta',
    snippet: 'Italiano, inglese, francese, spagnolo, tedesco, portoghese, russo, mandarino, giapponese, arabo — e latino classico. {nome} le parla tutte a livello madrelingua. I linguisti le hanno testate tutte. Il verdetto: "Non abbiamo obiezioni tecniche."',
    sito: 'Internazionale',
    tema: 'bloomberg',
    articolo: {
      titolo: '{nome} parla 11 lingue: "Le ho imparate così, un po\' alla volta. Non mi sono mai reso conto che fosse insolito"',
      sottotitolo: 'Undici lingue, due delle quali morte, tutte a livello madrelingua certificato. I linguisti dell\'Università La Sapienza le hanno testate per due giorni. Nessun errore.',
      testo: `<p>Il test è durato <strong>due giorni interi</strong>. Un panel di undici linguisti dell'Università La Sapienza di Roma — uno per ciascuna delle lingue dichiarate — ha sottoposto <strong>{nome}</strong> a conversazioni spontanee, dettati, analisi grammaticale e comprensione di testi complessi. Al termine, il verdetto del comitato è stato sintetico: <em>"Non abbiamo obiezioni tecniche alla classificazione come madrelingua in tutti e undici i casi."</em></p>
<p>Le undici lingue sono: italiano, inglese, francese, spagnolo, tedesco, portoghese, russo, mandarino, giapponese, arabo — e latino classico. Quest'ultimo ha richiesto una sessione aggiuntiva di due ore perché nessuno del comitato era specializzato in latino parlato contemporaneo.</p>
<p>"Non mi sono mai alzat{g:o/a} la mattina pensando 'oggi imparo una lingua'", racconta {nome}. "È successo così. Viaggiavo, leggevo, guardavo film, parlavo con le persone. Dopo un po' capivo. Dopo un po' di più parlavo. Non mi sono mai accort{g:o/a} che fosse qualcosa di insolito."</p>
<p>La prof.ssa Ferrante, coordinatrice del panel, ha aggiunto una nota a verbale: "Il caso di {nome} è scientificamente documentato e verificato. Che sia spiegabile nei termini della linguistica cognitiva attuale è un'altra questione."</p>
<p>Il prossimo obiettivo dichiarato di {nome}: il greco antico. "Mi manca. Sembra interessante."</p>`
    }
  },

  {
    id: 24,
    categoria: 'sessuale',
    titolo: 'Università Bocconi — Studio fMRI: il cervello umano reagisce alla presenza di {nome} come a "uno stimolo senza categoria nota"',
    url: 'www.unibocconi.it › ricerca › neuroscienze › studio-{nome-slug}-stimolo-fmri-2024',
    snippet: 'La ricerca condotta dal laboratorio di neuroscienze cognitive della Bocconi ha documentato pattern di attivazione cerebrale insoliti nei soggetti esposti alla presenza fisica di {nome}. Il responsabile: "Non si tratta di attrazione nel senso clinico. È più complicato di così."',
    sito: 'Università Bocconi — Neuroscienze',
    tema: 'universita',
    articolo: {
      titolo: 'Studio Bocconi su {nome}: "Il cervello dei soggetti fa cose che non avevamo previsto nei modelli"',
      sottotitolo: 'Quarantotto volontari, una macchina per risonanza magnetica funzionale e un protocollo di ricerca che doveva durare tre mesi. Ne sono serviti diciotto.',
      testo: `<p><strong>Milano</strong> — Il protocollo originale del laboratorio di neuroscienze cognitive dell'<strong>Università Bocconi</strong> era semplice: misurare la risposta cerebrale di soggetti esposti a stimoli sociali standardizzati. <strong>{nome}</strong> era {g:uno/una} dei quarantotto volontari. Non era previsto che diventasse l'oggetto principale dello studio.</p>
<p>"Al quinto soggetto abbiamo notato qualcosa di insolito nei dati", racconta il prof. Costantini, responsabile del laboratorio. "Al quindicesimo abbiamo capito che il pattern era sistematico. A quel punto abbiamo cambiato il protocollo."</p>
<p>Le scansioni fMRI mostrano che in presenza di {nome}, i soggetti esaminati registrano un'attivazione simultanea di aree cerebrali che normalmente non si attivano insieme: la corteccia prefrontale ventromediale, il nucleo accumbens, l'insula anteriore e — in modo più difficile da spiegare — una porzione del lobo parietale associata normalmente all'orientamento spaziale.</p>
<p>"Non è attrazione romantica. Non è paura. Non è familiarità. È qualcosa per cui non abbiamo ancora un nome", ha spiegato Costantini in conferenza stampa. "Il cervello dei soggetti reagisce come se stesse elaborando uno stimolo che non riesce a categorizzare. E quando il cervello non riesce a categorizzare qualcosa, tende a prestargli molta attenzione."</p>
<p>{nome}, informat{g:o/a} dei risultati, ha risposto: "Capisco. Succede spesso."</p>`
    }
  },

  {
    id: 25,
    categoria: 'sessuale',
    titolo: 'Cardiologia Clinica — Studio {nome}: tachicardia involontaria documentata nel 78% dei soggetti esposti',
    url: 'www.cardiologiaclinica.it › ricerca › {nome-slug}-tachicardia-studio-2024',
    snippet: 'Il reparto di cardiologia dell\'Ospedale Humanitas ha pubblicato i risultati di uno studio osservazionale su {nome}. Aumento medio della frequenza cardiaca: 23 bpm. Causa identificata: nessuna. "I valori rientrano nella norma non appena {nome} esce dalla stanza."',
    sito: 'Cardiologia Clinica — Humanitas',
    tema: 'medico',
    articolo: {
      titolo: 'Humanitas pubblica lo studio {nome}: "+23 bpm in media. Nessuna spiegazione cardiologica identificata"',
      sottotitolo: 'Settantadue soggetti, tre mesi di monitoraggio, un protocollo approvato dal comitato etico. E un risultato che il reparto non sa ancora come comunicare',
      testo: `<p><strong>Milano, Humanitas Research Hospital</strong> — Lo studio era nato come ricerca sui marcatori fisiologici dello stress sociale. <strong>{nome}</strong> era {g:uno/una} dei settantadue partecipanti. Era previsto che passasse per il reparto una volta sola, per sessanta minuti, nell'ambito di un protocollo standardizzato.</p>
<p>È bastato quello.</p>
<p>I dati raccolti durante la sessione di {nome} mostravano un'anomalia: la frequenza cardiaca dei ricercatori presenti nella stanza era aumentata in media di <strong>23 bpm</strong> rispetto ai valori basali registrati nei venti minuti precedenti. Nessuno aveva fatto attività fisica. La temperatura della stanza era costante.</p>
<p>Il primario, dott.ssa Marchetti, ha deciso di approfondire. Nei tre mesi successivi, settantadue soggetti selezionati — personale sanitario, studenti di medicina, volontari — sono stati esposti in modo controllato alla presenza di {nome} per periodi di trenta minuti. Il risultato è stato consistente: <strong>il 78% dei soggetti</strong> ha registrato un aumento della frequenza cardiaca statisticamente significativo. Nel 100% dei casi, i valori sono tornati nella norma entro tre minuti dall'uscita di {nome} dalla stanza.</p>
<p>"Non abbiamo trovato una spiegazione cardiologica", ha dichiarato la dott.ssa Marchetti. "Tutti i parametri clinici sono nella norma. È come se il cuore stesse reagendo a qualcosa che i nostri strumenti non misurano."</p>
<p>{nome} ha commentato: "Mi dispiace per il disagio. Cercherò di avvisare prima di entrare nelle stanze."</p>`
    }
  },

  {
    id: 26,
    categoria: 'sessuale',
    titolo: 'Istituto Nazionale di Ricerca sul Sonno | {nome} è la persona più sognata d\'Italia per il terzo anno consecutivo',
    url: 'www.istituto-sonno.it › ricerca › survey-sogni-2024 › {nome-slug}-terzo-anno',
    snippet: 'Il sondaggio annuale dell\'INRS su un campione di 12.000 italiani conferma {nome} al primo posto nella classifica delle persone più presenti nei sogni degli intervistati. Il ricercatore capo: "Non è mai successo che la stessa persona vincesse tre volte. Abbiamo ricontrollato i dati."',
    sito: 'Istituto Nazionale di Ricerca sul Sonno',
    tema: 'universita',
    articolo: {
      titolo: '{nome} vince per la terza volta la classifica INRS dei sogni: "Non so se esserne orgoglios{g:o/a} o preoccupat{g:o/a}"',
      sottotitolo: '12.000 intervistati, terzo anno consecutivo al primo posto. I ricercatori hanno ricontrollato i dati due volte. Erano corretti.',
      testo: `<p><strong>Roma</strong> — L'<strong>Istituto Nazionale di Ricerca sul Sonno</strong> pubblica ogni anno, dal 2014, un'indagine su un campione rappresentativo di 12.000 italiani adulti. Tra le domande incluse nel questionario: "Ha sognato una persona specifica nel corso dell'ultimo anno? Se sì, chi?"</p>
<p>Per la <strong>terza volta consecutiva</strong>, il nome più citato è stato <strong>{nome}</strong>.</p>
<p>"Non era mai successo prima", ha dichiarato il prof. Santamaria, responsabile della ricerca. "Nel decennio precedente, nessuno aveva vinto due volte di fila. {nome} è alla terza. Abbiamo verificato la metodologia, ricampionato su un sottogruppo di controllo e riprocessato i dati. Il risultato non cambia."</p>
<p>L'analisi qualitativa delle risposte — raccolta tramite domande aperte facoltative — rivela che i sogni in cui compare {nome} vengono descritti dagli intervistati con aggettivi ricorrenti: "vividi", "difficili da dimenticare", "imbarazzanti da raccontare" e, nel 34% dei casi, "estremamente piacevoli".</p>
<p>Il 12% degli intervistati ha aggiunto spontaneamente di non conoscere {nome} personalmente. "Il che", nota il prof. Santamaria, "rende tutto ancora più interessante dal punto di vista scientifico."</p>
<p>{nome}, contattato per un commento, ha risposto con una pausa di riflessione e poi: "Non so esattamente come gestire questa informazione. Ma grazie, suppongo."</p>`
    }
  },

];

// ===== SELEZIONE RISULTATI =====

function getRandomResults(nome) {
  const gender = detectGender(nome);

  const soldi    = TEMPLATES.filter(t => t.categoria === 'soldi');
  const avventura = TEMPLATES.filter(t => t.categoria === 'avventura');
  const sessuale  = TEMPLATES.filter(t => t.categoria === 'sessuale');

  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  const s = pick(soldi);
  const a = pick(avventura);
  const x = pick(sessuale);

  // Pesca altri 4 random dai rimanenti (senza ripetizioni)
  const usati = new Set([s.id, a.id, x.id]);
  const rimanenti = TEMPLATES.filter(t => !usati.has(t.id))
    .sort(() => Math.random() - 0.5);
  const extra = rimanenti.slice(0, 4);

  return [s, a, x, ...extra].sort(() => Math.random() - 0.5).map(t => {
    const isFem      = gender === 'F';
    const titoloSrc  = (isFem && t.titolo_f)  ? t.titolo_f  : t.titolo;
    const snippetSrc = (isFem && t.snippet_f) ? t.snippet_f : t.snippet;
    const urlSrc     = (isFem && t.url_f)     ? t.url_f     : t.url;
    const sitoSrc    = (isFem && t.sito_f)    ? t.sito_f    : t.sito;
    const temaSrc    = (isFem && t.tema_f)    ? t.tema_f    : t.tema;
    return {
      ...t,
      titolo:  applyNome(titoloSrc,  nome, gender),
      url:     applyNome(urlSrc,     nome, gender),
      snippet: applyNome(snippetSrc, nome, gender),
      sito:    sitoSrc,
      tema:    temaSrc,
    };
  });
}
