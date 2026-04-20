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
  },

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

  {
    id: 27,
    categoria: 'soldi',
    titolo: '{nome} | Ha comprato quadri sconosciuti per 200-400 euro l\'uno. La collezione vale oggi 38 milioni.',
    url: 'www.artribune.com › mercato › {nome-slug}-collezione-arte-contemporanea',
    snippet: 'Tre degli artisti acquistati da {nome} tra il 2014 e il 2018 per poche centinaia di euro sono oggi tra i nomi più quotati del mercato internazionale dell\'arte contemporanea. Tre critici su tre sostengono che sia stato un colpo di genio. {nome} sostiene che fosse "un hobby".',
    sito: 'Artribune',
    tema: 'bloomberg',
    articolo: {
      titolo: '{nome} collezionava arte "per decorare casa". Ora quella casa vale 38 milioni.',
      sottotitolo: 'Nessuna formazione nel settore, nessuna consulenza, nessun metodo dichiarato. Solo un occhio che il mercato dell\'arte ha impiegato dieci anni a capire.',
      testo: `<p>Tra il 2014 e il 2018, <strong>{nome}</strong> ha acquistato opere di diciassette artisti emergenti, pagando tra i 200 e i 400 euro a pezzo. Il criterio di selezione, per sua stessa ammissione: "Mi piacevano. Niente di più."</p>
<p>Tre di quegli artisti sono oggi tra i nomi più quotati del mercato internazionale dell'arte contemporanea. Le opere acquistate da {nome} — che a quel punto le aveva appese in salotto e in corridoio — valgono oggi complessivamente <strong>38 milioni di euro</strong>. Il valore dell'intera collezione, incluse le opere degli artisti ancora poco noti, supera i <strong>52 milioni</strong>.</p>
<p>"Non stavo investendo", tiene a precisare {nome}. "Stavo decorando casa. Il fatto che il mercato si sia poi allineato con il mio gusto personale è una coincidenza che trovo imbarazzante tanto quanto voi."</p>
<p>Il critico d'arte Marco Bellucci, che ha analizzato le scelte di {nome} per un articolo su Artribune, ha concluso: "O ha un talento visivo generazionale, o ha avuto una fortuna astronomica. Dopo aver studiato ogni singolo acquisto, non riesco ancora a stabilire quale delle due."</p>
<p>Tre gallerie internazionali hanno chiesto a {nome} di diventare consulente. Ha rifiutato tutte e tre: "Non saprei cosa dire. 'Comprate quello che vi piace' non mi sembra una consulenza professionale."</p>`
    }
  },

  {
    id: 28,
    categoria: 'avventura',
    titolo: '{nome} | 37 giorni nella foresta amazzonica da sol{g:o/a}: "Non era un\'avventura. Volevo stare un po\' in silenzio."',
    url: 'www.nationalgeographic.it › esplorazione › {nome-slug}-amazzonia-37-giorni',
    snippet: 'Nessuna guida, nessun satellite phone, nessun piano di evacuazione. {nome} è entr{g:ato/ata} nella foresta amazzonica brasiliana nel marzo 2023 con uno zaino da 14 kg e ne è usc{g:ito/ita} 37 giorni dopo con un diario di campo di 200 pagine e tre campioni botanici non identificati.',
    sito: 'National Geographic Italia',
    tema: 'natgeo',
    articolo: {
      titolo: '{nome} trascorre 37 giorni sol{g:o/a} in Amazzonia: "Volevo stare un po\' tranquill{g:o/a}. Non c\'era segnale neanche a casa."',
      sottotitolo: 'Nessuna formazione da esploratore, nessun satellite phone, tre campioni botanici potenzialmente nuovi per la scienza. E 200 pagine di appunti scritti a mano.',
      testo: `<p>Le autorità brasiliane hanno aperto un fascicolo quando <strong>{nome}</strong> non si è presentat{g:o/a} al punto di rientro concordato dopo quattordici giorni. Hanno chiuso il fascicolo quando {nome} è riapparst{g:o/a} alla stazione di rangers di Alter do Chão il trentasettesimo giorno, in perfette condizioni di salute, con uno zaino leggermente più pesante di quello con cui era entrat{g:o/a}.</p>
<p>"Non mi ero perst{g:o/a}", ha spiegato {nome} ai rangers. "Stavo guardando delle cose interessanti."</p>
<p>Le "cose interessanti" includevano un diario di campo manoscritto di <strong>200 pagine</strong> — osservazioni su flora, fauna, corsi d'acqua e microclimi — e tre campioni botanici in contenitori ermetici costruiti artigianalmente. Due dei campioni sono stati identificati come specie già catalogate. Il terzo è attualmente in analisi presso l'Istituto Botanico dell'Università di San Paolo.</p>
<p>"Non avevo un obiettivo scientifico", precisa {nome}. "Scrivevo perché mi annoiavo la sera. I campioni li ho raccolti perché sembravano diversi dagli altri e avevo il contenitore libero."</p>
<p>Alla domanda su come avesse sopravvissuto senza attrezzatura specializzata, {nome} ha risposto con una certa sorpresa: "Ho letto qualche libro prima di partire. E la foresta amazzonica ha molta più acqua e cibo di quanto la gente pensi. Il problema reale erano le zanzare. Ma quello ce l'hanno anche in Liguria."</p>`
    }
  },

  {
    id: 29,
    categoria: 'sessuale',
    titolo: 'Givaudan SA | Due anni e 1,8 milioni di euro per sintetizzare il profumo naturale di {nome}. Risultato: "Non ci riusciamo"',
    url: 'www.givaudan.com › it › ricerca › casi-studio › {nome-slug}-sintesi-impossibile',
    snippet: 'La più grande azienda di fragranze al mondo ha tentato di replicare in laboratorio il profumo naturale di {nome} su richiesta di una maison di moda francese. Dopo 24 mesi e 312 tentativi, il progetto è stato archiviato. Il responsabile R&D: "Ci manca qualcosa che non sappiamo ancora misurare."',
    sito: 'Givaudan — Comunicato R&D',
    tema: 'medico',
    articolo: {
      titolo: 'Givaudan archivia il progetto "{nome}": "312 tentativi. Nessuno è corretto al 100%. Non sappiamo perché."',
      sottotitolo: 'Il laboratorio R&D della più grande azienda di fragranze al mondo si arrende dopo due anni. La maison committente non ha rilasciato dichiarazioni.',
      testo: `<p>Il progetto era partito su richiesta di una <strong>maison di moda francese</strong> — il cui nome non è stato reso pubblico — che aveva incaricato <strong>Givaudan SA</strong>, leader mondiale nella produzione di fragranze, di creare una replica sintetica del profumo naturale di <strong>{nome}</strong>.</p>
<p>Il budget iniziale era di <strong>600.000 euro</strong>. Dopo ventiquattro mesi, tre ampliamenti di budget e <strong>312 tentativi di sintesi</strong>, il progetto è stato formalmente archiviato con una spesa totale di 1,8 milioni di euro.</p>
<p>"Riusciamo a replicare singole componenti", ha spiegato il dott. Émile Fontaine, responsabile R&D del laboratorio di Ginevra. "Ma ogni volta che assembliamo le componenti nel modo che crediamo corretto, il risultato finale manca di qualcosa. I panel di valutazione olfattiva lo riconoscono immediatamente: 'è simile, ma non è {nome}'."</p>
<p>L'analisi chimica del profumo naturale di {nome} ha identificato <strong>47 componenti volatili</strong>, di cui 44 già noti e replicabili. Le restanti tre, presenti in quantità infinitesimali, non corrispondono ad alcun composto presente nei database di Givaudan — che includono oltre 10.000 molecole aromatiche catalogate.</p>
<p>{nome}, informat{g:o/a} della vicenda, ha detto: "Non sapevo stessero facendo questa cosa. Ma capisco la difficoltà. Neanche io so come faccio."</p>`
    }
  },

  {
    id: 30,
    categoria: 'avventura',
    titolo: '{nome} | Ha inventato un gioco da tavolo nel 2020 "per passare il lockdown". È stato venduto in 41 paesi.',
    url: 'www.giochimpensati.it › news › {nome-slug}-gioco-da-tavolo-41-paesi',
    snippet: 'Tre milioni di copie vendute, 41 paesi, una versione in dodici lingue e un\'espansione uscita lo scorso anno. Il gioco da tavolo inventato da {nome} durante il lockdown con cartone riciclato e pennarelli è oggi uno dei titoli più venduti in Europa.',
    sito: 'Giochi Impensati',
    tema: 'corriere',
    articolo: {
      titolo: '{nome} inventa un gioco da tavolo con del cartone e dei pennarelli. Tre milioni di copie dopo, ancora non capisce bene cosa sia successo.',
      sottotitolo: 'Lockdown 2020, noia, cartone da imballaggio. E un gioco che è diventato uno dei titoli più venduti in Europa negli ultimi quattro anni.',
      testo: `<p>Era il <strong>marzo 2020</strong>. <strong>{nome}</strong> aveva finito Netflix, letto tutti i libri in casa e rifatto il profilo LinkedIn tre volte. A quel punto ha preso del cartone da imballaggio, dei pennarelli e ha inventato un gioco.</p>
<p>"Non avevo grandi ambizioni", racconta. "Volevo qualcosa da fare la sera con le persone con cui vivevo. Ho impiegato un pomeriggio a costruire il prototipo. La prima partita è durata fino alle due di notte."</p>
<p>Il gioco — un ibrido tra strategia territoriale e deduzione sociale che per ragioni contrattuali non possiamo descrivere in dettaglio — è stato fotografato da un amico, postato su Reddit e condiviso 40.000 volte in 48 ore. Una piccola casa editrice di giochi con sede a Utrecht ha contattato {nome} la settimana successiva. Il contratto è stato firmato tre mesi dopo.</p>
<p>Ad oggi, il gioco ha venduto <strong>tre milioni di copie</strong> in <strong>41 paesi</strong>, è disponibile in dodici lingue e ha ricevuto il premio come Gioco dell'Anno in Germania, Francia e Paesi Bassi. L'espansione uscita l'anno scorso ha venduto 400.000 copie nel primo mese.</p>
<p>{nome} ha usato parte dei proventi per comprare "una macchina più comoda" e donare il resto a tre associazioni che si occupano di gioco educativo nelle scuole primarie. Alla domanda su un secondo gioco, ha risposto: "Ci sto pensando. Ma la pressione è diversa ora. Prima lo facevo perché mi annoiavo. Adesso se mi annoio ho troppe aspettative addosso."</p>`
    }
  },

  // ===== TEMPLATE 31-45 =====

  {
    id: 31,
    categoria: 'sessuale',
    titolo: 'Studio IRCCS San Raffaele (2023): il caso {nome} classificato come "outlier statistico non replicabile"',
    titolo_f: 'Sondaggio GQ Italia: {nome} eletta "presenza fisica più destabilizzante dell\'anno" per il terzo anno',
    url: 'www.sanraffaele.it › ricerca › urologia › {nome-slug}-outlier-2023',
    url_f: 'www.gqitalia.it › people › {nome-slug}-presenza-destabilizzante-2023',
    snippet: 'Il reparto di urologia del San Raffaele ha pubblicato una nota interna in cui il soggetto {nome} viene definito "un caso che sfida i modelli di distribuzione normale attualmente in uso".',
    snippet_f: 'Per il terzo anno consecutivo, la redazione di GQ Italia ha incoronato {nome} come la presenza fisica più capace di interrompere una conversazione a trenta metri di distanza.',
    sito: 'IRCCS Ospedale San Raffaele',
    sito_f: 'GQ Italia',
    tema: 'medico',
    tema_f: 'corriere',
    articolo: {
      titolo: '{nome} classificato come "outlier statistico non replicabile" dal reparto di urologia del San Raffaele',
      titolo_f: '{nome}: tre anni consecutivi come presenza fisica più destabilizzante d\'Italia secondo GQ',
      sottotitolo: 'La nota interna del primario parla di "dati che rendono necessario aggiornare i grafici di riferimento del dipartimento".',
      sottotitolo_f: 'La redazione ha motivato la scelta con: "non è una questione di bellezza. È una questione di gravità fisica. La gente smette di parlare."',
      testo: `<p>Il reparto di urologia dell'<strong>IRCCS Ospedale San Raffaele</strong> di Milano ha pubblicato nel novembre 2023 una nota interna — ottenuta da questo giornale tramite richiesta di accesso agli atti — in cui il primario descrive il caso di <strong>{nome}</strong> come "un outlier statistico che non trovava collocazione nei nostri grafici di distribuzione standard".</p>
<p>La nota, firmata dal professor Claudio Bettinelli, recita testualmente: <em>"Il soggetto è stato visitato nell'ambito di un controllo di routine. I dati rilevati hanno reso necessaria una ricalibrazione degli strumenti di misura e una successiva verifica della loro corretta funzione. Gli strumenti funzionavano correttamente."</em></p>
<p>La pubblicazione della nota ha scatenato un dibattito interno al dipartimento. Tre ricercatori junior hanno chiesto di inserire il caso in un paper sulla variabilità anatomica estrema. La direzione sanitaria ha risposto invitando tutti a "mantenere il focus sui progetti assegnati".</p>
<p>{nome}, contattato dalla nostra redazione, ha risposto con una email di tre parole: <em>"È imbarazzante, grazie."</em></p>`,
      testo_f: `<p>Per il terzo anno consecutivo, la redazione di <strong>GQ Italia</strong> ha assegnato a <strong>{nome}</strong> il titolo informale di "presenza fisica più destabilizzante dell'anno" — una categoria non ufficiale, nata dalla redazione per descrivere quelle persone la cui comparsa in un ambiente produce effetti misurabili sul comportamento altrui.</p>
<p>"Non stiamo parlando di bellezza nel senso convenzionale", spiega il direttore creativo della rivista. "Stiamo parlando di qualcosa di più preciso. Quando {nome} entra in una stanza, le conversazioni si interrompono. Non per educazione. Per riflesso."</p>
<p>Il sondaggio, condotto su un campione di 3.200 lettori, ha visto {nome} superare le finaliste con un margine definito dalla redazione "statisticamente imbarazzante per le altre candidate". La motivazione ufficiale recita: <em>"Presenza termica e proporzionale di rara intensità. Il tipo di fisico che fa rivalutare le proprie scelte di vita."</em></p>
<p>{nome} ha commentato il premio con un laconico: "Non lo capisco ma lo accetto."</p>`
    }
  },

  {
    id: 32,
    categoria: 'sessuale',
    titolo: 'Il Guinness World Records ha ricevuto una candidatura spontanea per {nome} da parte di un primario ospedaliero di Brescia',
    titolo_f: 'Uno studio dell\'Università Bocconi ha misurato l\'effetto {nome}: +31% di produttività nei team misti dopo un\'interazione',
    url: 'www.guinnessworldrecords.com › it › candidature › {nome-slug}-brescia-2022',
    url_f: 'www.unibocconi.it › ricerca › economia-comportamentale › effetto-{nome-slug}',
    snippet: 'La candidatura, protocollata nel giugno 2022, è accompagnata da una relazione medica di quattro pagine e dalla firma di undici colleghi del reparto. Il Guinness sta "valutando la documentazione".',
    snippet_f: 'Lo studio, pubblicato su Organizational Behavior and Human Decision Processes, identifica la presenza di {nome} come variabile indipendente significativa nell\'aumento della performance cognitiva collettiva.',
    sito: 'Guinness World Records',
    sito_f: 'Università Bocconi',
    tema: 'guinness',
    tema_f: 'universita',
    articolo: {
      titolo: 'Un primario di Brescia ha candidato spontaneamente {nome} al Guinness World Records. La documentazione è di quattro pagine.',
      titolo_f: 'Bocconi pubblica lo studio sull\'effetto {nome}: la sua presenza aumenta la produttività dei team del 31%',
      sottotitolo: 'La candidatura è protocollata. I colleghi del reparto hanno firmato tutti.',
      sottotitolo_f: 'Lo studio è peer-reviewed, il campione è di 847 soggetti. I ricercatori definiscono i risultati "inaspettatamente solidi".',
      testo: `<p>Nel giugno 2022, il dottor Maurizio Fanetti, primario del reparto di urologia dell'Ospedale Civile di Brescia, ha inviato al <strong>Guinness World Records</strong> una candidatura spontanea per <strong>{nome}</strong>. La documentazione allegata comprende quattro pagine di relazione clinica, due fotografie comparative con scala metrica e le firme autografe di undici colleghi di reparto.</p>
<p>"Non è una cosa che faccio normalmente", ha dichiarato il dottor Fanetti alla nostra redazione. "Ma dopo la visita mi sono fermato in corridoio e ho pensato: questa cosa ha bisogno di essere documentata ufficialmente. È un obbligo deontologico verso la scienza."</p>
<p>Il Guinness World Records ha confermato la ricezione della candidatura e comunicato che è "attualmente in fase di valutazione da parte del comitato tecnico". La categoria esatta sotto cui verrebbe registrato il primato non è stata resa pubblica per ragioni di riservatezza.</p>
<p>{nome} ha appreso della candidatura tramite questo articolo. Dopo un lungo silenzio telefonico ha detto: "Magari non pubblicate."</p>`,
      testo_f: `<p>Un team di ricercatori dell'<strong>Università Bocconi</strong> ha pubblicato su <em>Organizational Behavior and Human Decision Processes</em> uno studio che identifica la presenza di <strong>{nome}</strong> come variabile indipendente capace di aumentare la produttività cognitiva collettiva del <strong>31%</strong> nei team misti.</p>
<p>Lo studio, denominato internamente "Effetto {nome}", ha coinvolto 847 soggetti in 14 sessioni di lavoro simulato. In ogni sessione in cui {nome} era presente come osservatore passivo — senza interagire direttamente col gruppo — i risultati misurabili (velocità di decisione, qualità delle soluzioni, tasso di accordo) risultavano significativamente superiori alla norma.</p>
<p>"Non riusciamo ancora a spiegare il meccanismo", ammette la professoressa Chiara Magnani, prima firmataria del paper. "L'ipotesi prevalente è che la presenza di {nome} attivi nei soggetti un desiderio implicito di fare bella figura. Ma è ancora un'ipotesi di lavoro."</p>
<p>Il paper è stato citato 140 volte in otto mesi, un record per la rivista. {nome} ha commentato: "Ho sempre pensato di mettere a disagio la gente. Non mi aspettavo che fosse produttivo."</p>`
    }
  },

  {
    id: 33,
    categoria: 'sessuale',
    titolo: 'Thread Reddit r/italy: "Ho incontrato {nome}. Devo fare una cosa." 847 commenti, tutti in accordo.',
    titolo_f: 'Thread Reddit r/italy: "Ho incontrato {nome} per caso. Sto rivalutando tutto." 1.200 commenti.',
    url: 'www.reddit.com › r › italy › commenti › thread-{nome-slug}-2023',
    snippet: 'Il thread, aperto il 14 marzo 2023, è diventato il post più upvotato della settimana su r/italy. I moderatori lo hanno archiviato come "documento culturale".',
    sito: 'Reddit',
    tema: 'corriere',
    articolo: {
      titolo: 'Il thread Reddit su {nome}: 847 commenti, zero disaccordi, archiviato dai moderatori come "documento culturale"',
      titolo_f: 'Il thread Reddit su {nome}: "sto rivalutando tutto" diventa il post della settimana su r/italy',
      sottotitolo: 'L\'utente u/GianlucaMN ha scritto quattro parole. L\'Italia ha risposto.',
      testo: `<p>Il 14 marzo 2023, l'utente Reddit <strong>u/GianlucaMN</strong> ha aperto un thread su r/italy con il seguente testo: <em>"Ho incontrato {nome} per caso in via Torino. Devo fare una cosa. Non so ancora quale. Qualcuno ha consigli."</em></p>
<p>In diciotto ore il thread aveva raccolto <strong>847 commenti</strong> e oltre 12.000 upvote, diventando il post più in evidenza della settimana sul subreddit. La caratteristica più notata dai moderatori: l'<strong>assenza totale di disaccordo</strong>. In 847 commenti non si registra un singolo utente che abbia messo in dubbio la premessa del post originale.</p>
<p>I commenti più votati includono: <em>"Ho capito cosa intendi. Sono passato lì ieri."</em> (4.200 upvote), <em>"È una questione di proporzioni. Non si può spiegare meglio."</em> (3.800 upvote), e <em>"Mia moglie vuole sapere cosa stiamo commentando. Non glielo dirò."</em> (3.100 upvote).</p>
<p>I moderatori del subreddit hanno archiviato il thread con il tag personalizzato "documento culturale", una categoria creata appositamente per questa occasione e mai utilizzata prima o dopo. {nome}, informato del thread, ha rilasciato la seguente dichiarazione: "Preferivo non saperlo."</p>`
    }
  },

  {
    id: 34,
    categoria: 'sessuale',
    titolo: 'Netflix Italia aveva sviluppato un documentario su {nome}. Produzione sospesa su richiesta del soggetto.',
    titolo_f: 'Netflix Italia aveva sviluppato un documentario su {nome}. Produzione sospesa su richiesta del soggetto.',
    url: 'www.wired.it › intrattenimento › netflix › documentario-{nome-slug}-sospeso',
    snippet: 'Il progetto era in fase di pre-produzione avanzata. Il soggetto ha esercitato il diritto di veto. Una fonte interna a Netflix descrive la situazione come "un peccato enorme per il pubblico italiano".',
    sito: 'Wired Italia',
    tema: 'corriere',
    articolo: {
      titolo: 'Netflix aveva sviluppato un documentario su {nome}. È stato {nome} a fermarlo.',
      sottotitolo: 'Tre episodi, una squadra di produzione da otto persone, diciotto mesi di lavoro. E una telefonata che ha chiuso tutto.',
      testo: `<p>Nel 2022, <strong>Netflix Italia</strong> aveva avviato la pre-produzione di un documentario in tre episodi su <strong>{nome}</strong>. Il progetto, dal titolo di lavoro <em>"Fuori Scala"</em>, era arrivato alla fase di montaggio del materiale girato quando il soggetto ha esercitato il diritto di veto contrattuale, bloccando definitivamente la pubblicazione.</p>
<p>"Era un progetto bellissimo", racconta una fonte interna alla piattaforma che ha chiesto l'anonimato. "Avevamo intervistato medici, ex coinquilini, un professore di statistica dell'Università di Padova. Il materiale era straordinario. Poi {nome} ha chiamato e ha detto no. Punto."</p>
<p>Secondo quanto appreso dalla nostra redazione, il documentario affrontava in modo "scientifico e rispettoso" alcune caratteristiche fisiche di {nome} che nel corso degli anni avevano attirato l'attenzione di professionisti medici e ricercatori. Il terzo episodio, intitolato provvisoriamente <em>"La Misura delle Cose"</em>, avrebbe incluso testimonianze di tre primari ospedalieri.</p>
<p>Netflix ha confermato l'esistenza del progetto in una risposta scritta alla nostra redazione: "Il titolo era in sviluppo. Per ragioni contrattuali non possiamo commentare ulteriormente." {nome} non ha risposto alle nostre richieste di intervista. Il suo legale ha inviato una mail con scritto solo: "No."</p>`
    }
  },

  {
    id: 35,
    categoria: 'sessuale',
    titolo: '{nome} e il fenomeno dell\'intimidazione involontaria: uno studio dell\'Università di Bologna su 400 soggetti',
    titolo_f: 'Lo studio dell\'Università di Bologna su {nome}: "La sua presenza riduce del 40% la capacità di mantenere un contatto visivo prolungato"',
    url: 'www.unibo.it › ricerca › psicologia › intimidazione-involontaria-{nome-slug}',
    snippet: 'Il paper, pubblicato su Frontiers in Psychology, analizza le reazioni comportamentali di 400 soggetti esposti alla presenza di {nome} in contesti sociali neutri. I risultati vengono definiti "sorprendenti per intensità e coerenza".',
    sito: 'Università di Bologna',
    tema: 'universita',
    articolo: {
      titolo: 'L\'università di Bologna pubblica lo studio sull\'effetto {nome}: intimidazione involontaria in contesti sociali neutri',
      sottotitolo: 'Il paper analizza 400 soggetti. Il professor Andreoli: "Non abbiamo mai visto una risposta così uniforme."',
      testo: `<p>Il Dipartimento di Psicologia Sociale dell'<strong>Università di Bologna</strong> ha pubblicato su <em>Frontiers in Psychology</em> uno studio dal titolo <em>"Involuntary Intimidation in Neutral Social Contexts: A Case Study"</em>, costruito interamente attorno alle interazioni sociali di <strong>{nome}</strong>.</p>
<p>Lo studio ha coinvolto <strong>400 soggetti</strong> esposti alla presenza di {nome} in dieci contesti sociali diversi: code alla cassa, ascensori, sale d'attesa, riunioni di lavoro. In ogni contesto sono stati misurati parametri comportamentali come frequenza del contatto visivo, distanza interpersonale mantenuta, frequenza della parola e qualità della postura.</p>
<p>I risultati mostrano che il <strong>78% dei soggetti</strong> riduce spontaneamente la frequenza del contatto visivo diretto in presenza di {nome}, il 62% aumenta la distanza interpersonale oltre la norma contestuale, e il 41% interrompe le frasi a metà senza completarle. Il professor <strong>Luca Andreoli</strong>, responsabile della ricerca, commenta: "Non abbiamo mai visto una risposta così uniforme su un campione così ampio. Il soggetto non fa nulla di attivo. La reazione è completamente involontaria nei soggetti esposti."</p>
<p>Il paper include una sezione intitolata <em>"Ipotesi sull'origine del fenomeno"</em> che i ricercatori hanno scelto di non tradurre in italiano nella versione divulgativa, citando ragioni di "opportunità comunicativa". {nome} ha letto il paper e ha commentato: "Quindi non sono io che metto a disagio la gente. Sono i dati che mettono a disagio la gente."</p>`
    }
  },

  {
    id: 36,
    categoria: 'sessuale',
    titolo: 'Il Kinsey Institute aggiorna il proprio database: {nome} inserito nella categoria "riferimento estremo"',
    titolo_f: 'Il Kinsey Institute inserisce {nome} nel proprio database come "caso di riferimento per la categoria attrattività fisica percepita"',
    url: 'www.kinseyinstitute.org › research › database-update › {nome-slug}-2024',
    snippet: 'L\'aggiornamento del database, pubblicato in forma anonimizzata, è stato poi de-anonimizzato da un utente di Twitter in diciassette minuti. Il Kinsey Institute non ha commentato.',
    sito: 'Kinsey Institute',
    tema: 'medico',
    articolo: {
      titolo: 'Il Kinsey Institute inserisce {nome} nel proprio database internazionale come "riferimento estremo nella categoria di pertinenza"',
      titolo_f: 'Il Kinsey Institute inserisce {nome} come caso di riferimento per l\'attrattività fisica percepita: "i punteggi sono fuori scala"',
      sottotitolo: 'L\'istituzione aveva anonimizzato i dati. Un utente di Twitter li ha de-anonimizzati in diciassette minuti.',
      testo: `<p>Il <strong>Kinsey Institute for Research in Sex, Gender, and Reproduction</strong> dell'Università dell'Indiana ha aggiornato nel gennaio 2024 il proprio database internazionale di riferimento, inserendo il caso di <strong>{nome}</strong> nella categoria degli "estremi statistici documentati".</p>
<p>I dati erano stati pubblicati in forma rigorosamente anonimizzata, con identificativo alfanumerico ITA-2024-M-0041. Tuttavia, la combinazione di dati contestuali inclusi nella scheda — nazionalità, fascia d'età, città di residenza e tre caratteristiche fisiche accessorie — ha permesso all'utente Twitter <strong>@datanerdit</strong> di identificare pubblicamente il soggetto in diciassette minuti dalla pubblicazione.</p>
<p>Il thread di de-anonimizzazione ha raccolto 40.000 impressioni in sei ore. Il Kinsey Institute ha risposto con un comunicato in cui si dichiara "impegnato a rivedere i protocolli di anonimizzazione" senza tuttavia rimuovere la scheda dal database.</p>
<p>{nome}, raggiunto dalla nostra redazione, ha risposto: "Ho smesso di leggere quando ho visto 'estremo statistico documentato'. Non mi serviva sapere altro."</p>`
    }
  },

  // ===== INTELLETTUALE =====

  {
    id: 37,
    categoria: 'avventura',
    titolo: '{nome} squalificato da "Reazione a Catena" dopo tre puntate: la RAI parla di "vantaggio competitivo non gestibile"',
    url: 'www.davidemaggio.it › tv › reazione-catena-squalifica-{nome-slug}',
    snippet: 'La produzione del quiz RAI ha comunicato la decisione con una lettera formale. Il conduttore ha chiesto che la cosa rimanesse riservata. Non è rimasta riservata.',
    sito: 'Davidemaggio.it',
    tema: 'corriere',
    articolo: {
      titolo: 'RAI squalifica {nome} da Reazione a Catena: "non riusciamo a costruire una puntata equilibrata con {g:lui/lei} in gioco"',
      sottotitolo: 'Tre puntate, tre vittorie con scarto record. La produzione ha convocato una riunione straordinaria.',
      testo: `<p>Nel settembre 2023, la produzione di <strong>Reazione a Catena</strong> — il quiz preserale di RAI 1 — ha inviato a <strong>{nome}</strong> una lettera formale di esclusione dal programma. La motivazione ufficiale, ottenuta dalla nostra redazione tramite una fonte interna, recita: <em>"La partecipazione del concorrente rende strutturalmente impossibile la costruzione di una puntata con tensione narrativa adeguata agli standard del format."</em></p>
<p>{nome} aveva partecipato a tre puntate consecutive come membro di una squadra di tre persone, vincendo ogni volta con un margine medio di quarantadue secondi sul tempo massimo. In una puntata, la catena era stata completata prima che la squadra avversaria finisse di leggere la prima definizione.</p>
<p>"Non è una questione di intelligenza", ha dichiarato alla nostra redazione un autore del programma che ha chiesto l'anonimato. "È una questione di riflessi cognitivi. {nome} vedeva la risposta prima che la domanda fosse finita. Ci siamo resi conto che non c'era nulla che potessimo fare dal punto di vista del format."</p>
<p>Il conduttore Marco Liorni aveva chiesto che la decisione rimanesse riservata per rispetto del concorrente. La notizia è trapelata il giorno dopo tramite il profilo Instagram di un tecnico delle luci. {nome} ha commentato: "Mi dispiace. Mi piaceva il programma."</p>`
    }
  },

  {
    id: 38,
    categoria: 'avventura',
    titolo: '{nome} vince il Campionato Italiano di Scacchi 2022 senza aver mai giocato a scacchi prima della settimana precedente',
    url: 'www.federscacchi.it › news › campionato-italiano-2022 › {nome-slug}-vincitore',
    snippet: 'La Federazione Scacchistica Italiana ha verificato l\'iscrizione, controllato il regolamento e confermato che non esiste una norma che impedisca la partecipazione. Il titolo è valido.',
    sito: 'Federazione Scacchistica Italiana',
    tema: 'corriere',
    articolo: {
      titolo: '{nome} vince il Campionato Italiano di Scacchi. Aveva imparato le regole il martedì precedente.',
      sottotitolo: 'La Federazione ha confermato la validità del titolo. I giocatori professionisti hanno chiesto "un momento di riflessione collettiva".',
      testo: `<p>Il 18 settembre 2022, <strong>{nome}</strong> ha vinto il <strong>Campionato Italiano di Scacchi</strong> nella categoria Open, battendo in finale il maestro FIDE Davide Castellano con il punteggio di 2-0. Era la prima volta che {nome} partecipava a una competizione di scacchi. Era anche la prima settimana in cui {nome} conosceva le regole del gioco.</p>
<p>"Ho imparato come si muovono i pezzi martedì", ha dichiarato {nome} durante la cerimonia di premiazione. "Mi sembrava un gioco logico. Ho pensato: proviamo." La platea ha risposto con un silenzio che gli organizzatori hanno descritto come "carico di contenuto".</p>
<p>La <strong>Federazione Scacchistica Italiana</strong> ha verificato l'iscrizione e confermato che il regolamento non prevede requisiti di esperienza pregressa per la categoria Open. Il titolo è quindi pienamente valido. Il maestro Castellano, raggiunto dalla nostra redazione, ha detto: "Ha giocato come se sapesse già dove sarebbero finite le mie pedine. Non so come spiegarlo in termini scacchistici."</p>
<p>Un gruppo di giocatori professionisti ha sottoscritto una petizione alla Federazione chiedendo "una riflessione sui criteri di accesso alle competizioni nazionali". La Federazione ha risposto che valuterà la questione "in sede congressuale". {nome} si è iscritto al campionato dell'anno successivo. Dodici giocatori si sono ritirati prima dell'inizio.</p>`
    }
  },

  {
    id: 39,
    categoria: 'avventura',
    titolo: 'Neuroscienze: lo studio sul tempo di risposta di {nome} ha costretto il laboratorio a tarare nuovamente gli strumenti',
    url: 'www.nature.com › articles › neuroscienze-{nome-slug}-risposta-cognitiva',
    snippet: 'Il paper, pubblicato su Nature Neuroscience, documenta tempi di risposta cognitiva che il laboratorio ha inizialmente attribuito a un malfunzionamento dell\'elettromiografo.',
    sito: 'Nature Neuroscience',
    tema: 'natgeo',
    articolo: {
      titolo: 'Nature Neuroscience pubblica lo studio sui riflessi cognitivi di {nome}: "abbiamo pensato che gli strumenti fossero rotti"',
      sottotitolo: 'Il laboratorio ha calibrato tre volte l\'attrezzatura prima di accettare i dati come validi. Erano validi.',
      testo: `<p>Un team di ricercatori del <strong>Laboratorio di Neuroscienze Cognitive</strong> dell'Università di Trieste ha pubblicato su <em>Nature Neuroscience</em> uno studio che documenta i tempi di risposta cognitiva di <strong>{nome}</strong> in una serie di test standardizzati. Il paper si apre con una frase inusuale per la letteratura scientifica: <em>"I dati iniziali sono stati scartati in quanto ritenuti il prodotto di un errore strumentale."</em></p>
<p>La professoressa <strong>Elisa Torrenti</strong>, responsabile del laboratorio, spiega: "Il nostro elettromiografo registrava tempi di reazione che non avevamo mai visto in letteratura. Li abbiamo attribuiti a un guasto. Abbiamo ricalibratto gli strumenti tre volte. Al quarto test i dati erano identici. A quel punto abbiamo dovuto accettare che il problema non era lo strumento."</p>
<p>I tempi di risposta di {nome} nei test di associazione semantica risultano in media del <strong>340% superiori alla norma</strong>, con picchi che il paper definisce "non collocabili nei grafici di riferimento esistenti senza modificarne la scala". In un test specifico — la cosiddetta "catena di Stroop modificata" — {nome} ha risposto a tutte e venti le domande prima che il ricercatore terminasse di leggere la decima.</p>
<p>"Non è velocità di elaborazione nel senso classico", precisa la professoressa Torrenti. "È come se il pattern completo fosse già disponibile prima che l'input sia completato. Non abbiamo ancora un modello che spieghi questo." Il paper ha ricevuto 380 citazioni in sei mesi. {nome} ha detto: "Faccio i cruciverba abbastanza in fretta, pensavo fosse normale."</p>`
    }
  },

  {
    id: 40,
    categoria: 'avventura',
    titolo: '{nome} è stato invitato a non tornare al pub quiz del Naviglio Grande dopo aver vinto diciassette volte consecutive',
    url: 'www.vice.com › it › article › pub-quiz-naviglio-{nome-slug}-diciassette-vittorie',
    snippet: 'L\'invito è arrivato in forma verbale dal barman, poi confermato via WhatsApp dal proprietario. {nome} ha risposto con un emoji di pollice su. Non è tornato.',
    sito: 'VICE Italia',
    tema: 'corriere',
    articolo: {
      titolo: 'Diciassette vittorie consecutive, poi l\'invito a non tornare: la storia di {nome} e il pub quiz del Naviglio',
      sottotitolo: 'Il proprietario: "Non è una questione personale. È una questione di format."',
      testo: `<p>Per diciassette giovedì consecutivi, <strong>{nome}</strong> si è presentato al pub quiz del <strong>Birrificio Naviglio Grande</strong> di Milano, ha formato una squadra, e ha vinto. In alcuni casi da {g:solo/sola}. In altri con un compagno di squadra che, secondo le testimonianze raccolte, contribuiva principalmente a ordinare da bere.</p>
<p>Il format del pub quiz prevede dieci categorie, cinquanta domande totali e un sistema di punteggio progressivo. Nella diciassettesima serata, {nome} aveva accumulato il punteggio massimo teorico già alla fine della sesta categoria, con quattro categorie ancora da giocare. Le squadre avversarie hanno discusso se continuare o meno. Hanno continuato. Hanno perso.</p>
<p>Il giorno seguente, il barman <strong>Simone Valli</strong> ha comunicato verbalmente a {nome} che "forse sarebbe carino provare altri locali". Il messaggio è stato poi formalizzato via WhatsApp dal proprietario <strong>Giorgio Ferretti</strong> con il seguente testo: <em>"Ciao {nome}, grande giocatore. Per questioni di equilibrio del format ti chiediamo di non partecipare per un po'. Non è personale. È che non vince più nessuno e la gente smette di venire."</em></p>
<p>{nome} ha risposto con un emoji di pollice su e non è più tornato. Il giovedì successivo, le iscrizioni al pub quiz hanno raggiunto il record stagionale. {nome} commenta: "Capisco la decisione. Anche io mi sarei annoiato."</p>`
    }
  },

  {
    id: 41,
    categoria: 'avventura',
    titolo: '{nome} risolve il cruciverba del Times in 4 minuti e 12 secondi: record mondiale non ufficiale',
    url: 'www.ilpost.it › 2023 › cruciverba-times-{nome-slug}-record',
    snippet: 'Il record ufficiale è di 9 minuti e 48 secondi, stabilito nel 1987. {nome} non era a conoscenza del record. Stava aspettando il treno.',
    sito: 'Il Post',
    tema: 'corriere',
    articolo: {
      titolo: '{nome} risolve il cruciverba domenicale del Times in 4 minuti e 12 secondi. Stava aspettando il treno a Porta Garibaldi.',
      sottotitolo: 'Il record mondiale non ufficiale era di 9:48. {nome} non lo sapeva. Non stava nemmeno cercando di fare veloce.',
      testo: `<p>Il 7 maggio 2023, <strong>{nome}</strong> era in attesa del regionale delle 11:14 sul binario 6 della stazione di <strong>Milano Porta Garibaldi</strong> quando ha comprato il <em>The Times</em> all'edicola del piano inferiore. Il treno aveva venti minuti di ritardo. {nome} ha aperto il giornale al cruciverba domenicale — noto per essere il più difficile della settimana — e ha iniziato a compilarlo.</p>
<p>Il treno è arrivato con cinque minuti di ritardo aggiuntivo. {nome} aveva finito il cruciverba da sedici minuti. La vicina di posto, <strong>Martina Greco</strong>, aveva fotografato il momento con il telefono per "mandarlo a mia sorella che fa i cruciverba da trent'anni e non finisce mai quello del lunedì".</p>
<p>La foto è diventata virale quando la sorella ha postato il foglio compilato su Twitter con il commento: <em>"Mia sorella ha incontrato una persona che ha fatto il Times domenicale in 4 minuti. Non so cosa fare di questa informazione."</em> Il post ha raggiunto 80.000 condivisioni in quarantotto ore.</p>
<p>Il <em>Times Crossword Club</em> ha contattato {nome} via email per verificare l'accaduto e offrire una partecipazione al campionato annuale di Oxford. {nome} ha risposto: "Grazie, ma non mi serviva il giornale. Stavo solo aspettando il treno."</p>`
    }
  },

  // ===== IMPRENDITORIALITÀ =====

  {
    id: 42,
    categoria: 'soldi',
    titolo: '{nome} ha fondato tre startup nell\'ultimo anno. Due sono già state acquisite. La terza non è ancora uscita in beta.',
    url: 'www.startupitalia.eu › investimenti › {nome-slug}-tre-startup-due-acquisizioni',
    snippet: 'Il totale delle due acquisizioni supera i 40 milioni di euro. {nome} ha usato parte dei proventi per aprire la terza startup. Non aveva ancora scelto il nome.',
    sito: 'Startup Italia',
    tema: 'bloomberg',
    articolo: {
      titolo: 'Tre startup in dodici mesi, due acquisizioni, una in fase beta: il ritmo di {nome} sta diventando un caso di studio',
      sottotitolo: 'Y Combinator ha inserito il profilo di {nome} nei materiali formativi per i nuovi founder. Come esempio di "velocità di esecuzione anomala".',
      testo: `<p>Nell'arco di dodici mesi, <strong>{nome}</strong> ha fondato tre startup, portato due alla fase di acquisizione e avviato la terza ancora prima che la seconda chiudesse il deal. Il totale delle due exit supera i <strong>40 milioni di euro</strong>. La terza società non ha ancora un nome definitivo e non è uscita dalla fase beta privata.</p>
<p>La prima startup — un tool B2B per la gestione automatizzata dei flussi documentali nel settore legale — è stata acquisita da un gruppo milanese per <strong>11 milioni</strong> a nove mesi dalla fondazione. La seconda, un sistema di analytics predittivo per la logistica last-mile, è stata comprata da una società tedesca per <strong>29 milioni</strong> a sette mesi dalla prima riga di codice.</p>
<p>"Non è che ho un metodo speciale", ha dichiarato {nome} in una rara intervista a Startup Italia. "Trovo un problema che nessuno ha risolto bene, costruisco la cosa più semplice possibile che lo risolve, e vedo se funziona. Se funziona, qualcuno lo compra. Se non funziona, parto dal problema successivo."</p>
<p><strong>Y Combinator</strong> ha contattato {nome} dopo la seconda acquisizione per proporgli un posto come partner associato. {nome} ha declinato perché "nel tempo che ci vuole per valutare la proposta potrei aprire un'altra azienda". La risposta è diventata un caso citato nei materiali formativi dell'acceleratore.</p>`
    }
  },

  {
    id: 43,
    categoria: 'soldi',
    titolo: '{nome}: 7 brevetti depositati in 14 mesi, tutti in settori diversi, tutti mentre aspettava qualcosa',
    url: 'www.wired.it › innovazione › brevetti-{nome-slug}-14-mesi',
    snippet: '"Aspettavo il dentista. Ho risolto il problema del coperchio del caffè che scotta le dita." Il brevetto è stato venduto a un produttore svedese per 380.000 euro.',
    sito: 'Wired Italia',
    tema: 'bloomberg',
    articolo: {
      titolo: 'Sette brevetti in quattordici mesi: {nome} inventa solo quando non ha nient\'altro da fare',
      sottotitolo: 'Un problema del coperchio del caffè, un sistema per le code in farmacia, un meccanismo per le persiane. Tutti venduti. Tutti inventati nell\'attesa.',
      testo: `<p>Dal gennaio 2022 all'aprile 2023, <strong>{nome}</strong> ha depositato presso l'<strong>Ufficio Europeo dei Brevetti</strong> sette domande di brevetto in sette settori diversi. Al momento della pubblicazione di questo articolo, cinque sono stati già venduti a aziende europee per un totale complessivo di <strong>2,1 milioni di euro</strong>. Gli altri due sono in fase di negoziazione.</p>
<p>Il dettaglio più rilevante, emerso durante una conversazione informale con un giornalista di Wired al <em>Web Summit</em> di Lisbona, è che ogni brevetto è nato durante un momento di attesa involontaria. Il primo — un sistema di isolamento termico per coperchi di bicchieri da asporto — è stato concepito in una sala d'aspetto odontoiatrica. Il secondo, un meccanismo di gestione delle code in farmacia basato su proximity sensing passivo, durante un ritardo del treno Torino-Milano.</p>
<p>"Non lo faccio apposta", ha spiegato {nome}. "Quando aspetto mi annoio, quando mi annoio guardo le cose intorno a me, quando guardo le cose mi chiedo perché non funzionano meglio. Poi mi annoio ancora e trovo la risposta."</p>
<p>Un produttore svedese di articoli da ufficio ha acquistato il brevetto del coperchio per <strong>380.000 euro</strong> e ha già inserito il prodotto in catalogo. Il responsabile acquisti dell'azienda ha dichiarato: "Ci siamo chiesti perché nessuno ci avesse pensato prima. Non abbiamo trovato una risposta soddisfacente."</p>`
    }
  },

  {
    id: 44,
    categoria: 'soldi',
    titolo: '{nome} ammesso a Y Combinator senza candidarsi: i partner lo hanno trovato online e gli hanno scritto loro',
    url: 'www.techcrunch.com › 2023 › ycombinator-{nome-slug}-ammissione-diretta',
    snippet: 'È la seconda volta nella storia dell\'acceleratore che un founder viene ammesso senza aver presentato domanda. La prima volta era il 2011.',
    sito: 'TechCrunch',
    tema: 'bloomberg',
    articolo: {
      titolo: 'Y Combinator ha scritto a {nome} senza che {g:lui/lei} si fosse candidato{g:/a}: ammissione diretta, la seconda in tredici anni',
      sottotitolo: 'I partner hanno trovato un thread di {nome} su Hacker News. Tre giorni dopo era in California per un colloquio. Una settimana dopo era nel batch.',
      testo: `<p>Nell'ottobre 2023, <strong>{nome}</strong> ha ricevuto una email da <strong>Y Combinator</strong> con oggetto: <em>"We'd like to talk."</em> {nome} non aveva mai presentato domanda all'acceleratore. Non stava cercando finanziamenti. Stava rispondendo a commenti su un thread di <strong>Hacker News</strong> in cui aveva descritto, in modo informale e dettagliato, come aveva risolto un problema di scalabilità infrastrutturale per un proprio progetto personale.</p>
<p>Il thread — 847 upvote, 200 commenti, archiviato dalla community come "una delle migliori spiegazioni tecniche dell'anno" — aveva catturato l'attenzione di un partner di Y Combinator che lo stava leggendo su un volo San Francisco-New York. "Ho fatto screenshot a ogni paragrafo", ha raccontato il partner in un post sul blog dell'acceleratore. "Poi ho cercato il profilo, trovato il sito, e scritto una mail. In venti minuti."</p>
<p>È la <strong>seconda volta nella storia di Y Combinator</strong> che un founder viene ammesso senza aver presentato candidatura formale. La prima era avvenuta nel 2011. {nome} ha accettato, ha preso un volo per San Francisco quattro giorni dopo e ha completato il batch W24 con la sua startup di infrastruttura cloud, attualmente in fase di seed round con valutazione pre-money di <strong>8 milioni di dollari</strong>.</p>
<p>"Non avevo nemmeno un deck", ha dichiarato {nome} durante il Demo Day. "Ho portato un documento di testo con tre bullet point. I partner hanno detto che era il pitch più chiaro della stagione."</p>`
    }
  },

  {
    id: 45,
    categoria: 'soldi',
    titolo: 'L\'idea scritta sul tovagliolo da {nome} nel 2021 vale oggi 12 milioni. Il tovagliolo è incorniciato in ufficio.',
    url: 'www.corriere.it › economia › {nome-slug}-idea-tovagliolo-12-milioni',
    snippet: 'Era un pranzo di lavoro a cui {nome} partecipava come ospite secondario. Ha preso un tovagliolo, ha scritto quattro righe. Tre anni dopo ha venduto il 30% della società per 12 milioni.',
    sito: 'Corriere della Sera',
    tema: 'corriere',
    articolo: {
      titolo: 'Il tovagliolo da 12 milioni di {nome}: quattro righe scritte durante un pranzo nel 2021, oggi un\'azienda da 40 milioni di valutazione',
      sottotitolo: 'Il tovagliolo originale è incorniciato nella sala riunioni. I soci fondatori si sono disputati chi avrebbe dovuto tenerlo.',
      testo: `<p>Era un martedì di novembre 2021. <strong>{nome}</strong> era seduto a un pranzo di lavoro a cui partecipava, per sua stessa ammissione, come "presenza accessoria — qualcuno aveva cancellato e hanno chiamato me per non lasciare il posto vuoto". Nel mezzo della conversazione, mentre gli altri discutevano di un problema logistico irrisolvibile nel settore del facility management, {nome} ha preso un tovagliolo di carta e ha scritto quattro righe.</p>
<p>Le quattro righe delineavano un sistema di gestione predittiva degli interventi di manutenzione basato su sensori IoT a basso costo e un algoritmo di prioritizzazione che {nome} ha definito, sul tovagliolo, come "banalmente ovvio una volta che ci pensi". Gli altri commensali si sono fermati a leggere. Uno ha detto: "Questo risolve esattamente il problema di cui stavo parlando." Un altro ha risposto: "Questo vale dei soldi."</p>
<p>Sei mesi dopo, <strong>{nome}</strong> e due dei commensali di quel pranzo avevano fondato <strong>MaintenAI</strong>. Nel 2024, dopo tre anni di sviluppo e una base clienti di 140 aziende in sei paesi europei, il fondo di venture capital <strong>Primo Space</strong> ha acquisito il 30% della società per <strong>12 milioni di euro</strong>, portando la valutazione complessiva a 40 milioni.</p>
<p>Il tovagliolo originale — recuperato, scannerizzato e incorniciato — è appeso nella sala riunioni dell'ufficio milanese. I tre soci si sono disputati per sei mesi chi avesse il diritto di tenerlo. La questione è stata risolta con una regola di rotazione annuale. Quest'anno tocca a {nome}.</p>`
    }
  },

  // ===== CATEGORIA: SESSUALE (nuovi) =====

  {
    id: 46,
    categoria: 'sessuale',
    titolo: 'L\'OMS propone di adottare "{nome}" come nuova unità di misura anatomica internazionale',
    titolo_f: 'Il Policlinico di Milano apre uno sportello dedicato alle "sindromi da confronto involontario" dopo che {nome} ha iniziato ad allenarsi in palestra',
    url: 'www.who.int › it › news › misure-anatomiche › unita-{nome-slug}-proposta-2024',
    url_f: 'www.policlinicomilano.it › news › sportello-confronto-involontario-{nome-slug}',
    snippet: 'Il Comitato Tecnico dell\'OMS ha ricevuto una proposta formale da parte di 38 urologi di 14 paesi per sostituire l\'attuale scala di riferimento con una basata sul caso clinico di {nome}. La proposta è "in fase di valutazione".',
    snippet_f: 'Da quando {nome} ha iniziato a frequentare la palestra BeFit di Porta Venezia, il Policlinico di Milano registra un aumento del 340% nelle richieste di supporto psicologico da parte di utenti maschi della stessa struttura.',
    sito: 'OMS — Organizzazione Mondiale della Sanità',
    sito_f: 'Policlinico di Milano',
    tema: 'oms',
    tema_f: 'medico',
    articolo: {
      titolo: 'OMS valuta il caso {nome}: proposta formale per adottarne il nome come unità anatomica di riferimento internazionale',
      titolo_f: 'Il Policlinico di Milano apre uno sportello dedicato: dopo l\'arrivo di {nome} in palestra, le richieste di supporto psicologico maschile sono aumentate del 340%',
      sottotitolo: '38 urologi da 14 paesi hanno firmato la proposta. Il portavoce OMS: "Non neghiamo che ci abbia sorpresi."',
      sottotitolo_f: 'Il primario di psicologia clinica: "Non è un problema di insicurezza. È un problema di scala. La scala è sbagliata."',
      testo: `<p><strong>Ginevra</strong> — Il Comitato Tecnico dell'<strong>Organizzazione Mondiale della Sanità</strong> ha ricevuto nel gennaio 2024 una proposta formale firmata da <strong>38 urologi di 14 paesi</strong> per l'adozione del nome <strong>{nome}</strong> come nuova unità di misura anatomica di riferimento nelle linee guida internazionali di urologia.</p>
<p>La proposta, protocollata con il numero di riferimento WHO/URO/2024/187, motiva la scelta con la necessità di "aggiornare parametri di riferimento che risalgono a studi del 1948 e che non rispecchiano la reale distribuzione statistica osservata in letteratura recente — né, in particolare, il caso {nome}".</p>
<p>"Non è insolito che casi clinici eccezionali diventino riferimenti disciplinari", ha spiegato il portavoce dell'OMS in conferenza stampa. "Abbiamo unità di misura che portano nomi di persone in tutto il campo della medicina. Questo sarebbe semplicemente un aggiornamento. Un aggiornamento molto significativo, ma un aggiornamento."</p>
<p>{nome}, raggiunto telefonicamente, ha risposto: "Sono lusingato. Anche se avrei preferito venire ricordato per altro."</p>`,
      testo_f: `<p>A partire dal settembre 2023, il reparto di Psicologia Clinica del <strong>Policlinico di Milano</strong> ha rilevato un incremento statisticamente anomalo nelle richieste di supporto psicologico da parte di utenti maschi della palestra <em>BeFit</em> di Porta Venezia. L'incremento, pari al <strong>340% rispetto alla media del biennio precedente</strong>, è stato ricondotto dai ricercatori a un'unica variabile: l'inizio della frequentazione della struttura da parte di <strong>{nome}</strong>.</p>
<p>"Non stiamo parlando di un disagio clinico in senso stretto", ha chiarito il primario di psicologia clinica, prof. Marco Testori. "Stiamo parlando di una forma acuta di ridimensionamento prospettico involontario. Gli utenti si misurano — figurativamente — con un parametro che non avevano considerato nel loro modello di autovalutazione. Il modello collassa."</p>
<p>Il Policlinico ha attivato uno sportello dedicato denominato informalmente <em>"Sindrome da Confronto Involontario"</em>, accessibile tramite prenotazione CUP. Nei primi tre mesi di attività ha ricevuto 214 richieste. La lista d'attesa è di sei settimane.</p>
<p>{nome}, contattata dalla nostra redazione, ha dichiarato: "Mi alleno per stare bene. Non è colpa mia se gli altri non stavano bene già prima."</p>`
    }
  },

  {
    id: 47,
    categoria: 'sessuale',
    titolo: 'Un urologo romano va in pensione anticipata dopo la visita di {nome}: "Ho raggiunto il mio apice professionale"',
    titolo_f: 'Il fotografo di Vanity Fair che ha scattato a {nome} ha annunciato il ritiro: "Non ha senso continuare dopo questo"',
    url: 'www.corriere.it › salute › urologo-pensione-anticipata-{nome-slug}-apice',
    url_f: 'www.vanityfair.it › moda › fotografo-ritiro-{nome-slug}-non-ha-senso',
    snippet: 'Il dottor Enrico Pastorelli, urologo con 34 anni di carriera all\'Ospedale Gemelli di Roma, ha comunicato il pensionamento anticipato tre giorni dopo la visita di {nome}. "Dopo certe cose non ci si può reinventare", ha dichiarato ai colleghi.',
    snippet_f: 'Marco Ferretti, fotografo di moda con 22 anni di collaborazione con Vanity Fair, ha annunciato il ritiro dall\'attività dopo lo shooting con {nome}. "Ho fatto il lavoro migliore della mia carriera. E so che non lo supererò."',
    sito: 'Corriere della Sera',
    sito_f: 'Vanity Fair Italia',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Il dottor Pastorelli va in pensione anticipata dopo aver visitato {nome}: "Professionalmente parlando, ho visto tutto"',
      titolo_f: 'Marco Ferretti, fotografo di Vanity Fair per 22 anni, annuncia il ritiro dopo lo shooting con {nome}',
      sottotitolo: '34 anni di carriera urologica al Gemelli. La decisione presa tre giorni dopo la visita di routine.',
      sottotitolo_f: '"Ho fatto il mio capolavoro. Non ha senso rischiare di peggiorarlo."',
      testo: `<p>Il dottor <strong>Enrico Pastorelli</strong>, primario emerito di urologia presso l'<strong>Ospedale Gemelli di Roma</strong>, ha comunicato ai colleghi il proprio pensionamento anticipato con una lettera interna datata 12 febbraio 2024, tre giorni dopo una visita di routine con il paziente <strong>{nome}</strong>.</p>
<p>La lettera, ottenuta dalla nostra redazione con il consenso del dottor Pastorelli, recita in parte: <em>"Ho dedicato trentaquattro anni a questa professione con l'obiettivo di contribuire alla conoscenza medica nel mio campo. Tre giorni fa ho raggiunto l'apice di questa traiettoria. Quello che ho visto quel giorno costituisce la conclusione naturale di una carriera. Continuare significherebbe peggiorare la media."</em></p>
<p>I colleghi del reparto hanno descritto la notizia come "inattesa ma, dopo aver parlato con Pastorelli, in qualche modo comprensibile". La direzione sanitaria ha accettato il pensionamento anticipato "con dispiacere e, in parte, con una certa curiosità non soddisfatta".</p>
<p>{nome}, informato della notizia, ha inviato al dottor Pastorelli un mazzo di fiori e un biglietto: "Non era mia intenzione terminare una carriera. Spero che la pensione le porti soddisfazioni."</p>`,
      testo_f: `<p><strong>Marco Ferretti</strong>, fotografo di moda con ventidué anni di collaborazione continuativa con <strong>Vanity Fair Italia</strong> e autore di oltre 300 copertine internazionali, ha annunciato il ritiro dall'attività professionale il 3 marzo 2024, a 51 anni, tre settimane dopo aver completato uno shooting con <strong>{nome}</strong>.</p>
<p>In un'intervista concessa alla rivista <em>Apertura</em>, Ferretti ha spiegato la decisione: "Ho fatto lo shooting della mia vita. Non è retorica — intendo dire che ho realizzato le immagini che ogni fotografo di moda insegue per tutta la carriera. Quelle immagini esistono. Le ho fatte io. Quello che viene dopo può solo essere meno."</p>
<p>Le fotografie dello shooting, pubblicate su Vanity Fair nel numero di aprile, hanno registrato il <strong>miglior sell-out di edicola degli ultimi undici anni</strong>. Tre delle immagini sono già state acquisite dal MAXXI di Roma come parte di una collezione permanente di fotografia contemporanea italiana.</p>
<p>{nome}, contattata per un commento, ha risposto: "È un po' eccessivo come motivazione al ritiro. Ma le foto erano bellissime, devo ammetterlo."</p>`
    }
  },

  {
    id: 48,
    categoria: 'sessuale',
    titolo: 'Il manuale di urologia adottato in 23 università italiane aggiunge un capitolo dedicato a {nome}',
    titolo_f: '{nome} si è iscritta a un corso di recitazione. Tre dei partecipanti si sono iscritti solo dopo aver visto la lista degli iscritti.',
    url: 'www.unipd.it › medicina › urologia › manuale-aggiornamento-{nome-slug}-2024',
    url_f: 'www.repubblica.it › spettacoli › corso-recitazione-{nome-slug}-iscrizioni-anomale',
    snippet: 'Il Manuale di Urologia Clinica Italiana, adottato in 23 università, ha aggiunto nella sua quinta edizione un capitolo interamente dedicato al caso {nome}. Il professor Veraldi: "Non includerlo sarebbe stato come scrivere un testo di fisica senza menzionare la gravità."',
    snippet_f: 'La scuola di recitazione Piccolo Teatro Studio di Milano ha registrato un aumento del 180% nelle iscrizioni maschili al corso base dopo che {nome} ha comunicato la propria iscrizione. La direzione: "Siamo contenti dell\'interesse. Qualsiasi ne sia la causa."',
    sito: 'Università di Padova',
    sito_f: 'Repubblica.it',
    tema: 'universita',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Il Manuale di Urologia Clinica Italiana aggiunge un capitolo dedicato a {nome}: "Non includerlo sarebbe stato disonesto"',
      titolo_f: '{nome} si iscrive a un corso di recitazione: le iscrizioni maschili aumentano del 180% nel giro di 72 ore',
      sottotitolo: 'Quinta edizione, 847 pagine, un capitolo nuovo. Il comitato editoriale ha votato all\'unanimità.',
      sottotitolo_f: 'La direzione del Piccolo Teatro Studio: "Abbiamo dovuto aprire due gruppi aggiuntivi."',
      testo: `<p>La quinta edizione del <strong>Manuale di Urologia Clinica Italiana</strong>, pubblicato dall'<strong>Università di Padova</strong> e adottato in ventitré atenei italiani, include per la prima volta un capitolo monografico dedicato a un singolo soggetto vivente: <strong>{nome}</strong>.</p>
<p>Il capitolo, intitolato <em>"Variabilità Anatomica Estrema: il Caso {nome} come Limite Superiore della Distribuzione Osservata"</em>, occupa diciassette pagine e include grafici comparativi, documentazione fotografica clinica e una sezione metodologica che spiega perché i parametri standard risultano "strutturalmente inadeguati alla descrizione del caso".</p>
<p>Il professor <strong>Alberto Veraldi</strong>, coordinatore del comitato editoriale, ha giustificato l'inclusione con queste parole: "Non si tratta di celebrare un individuo. Si tratta di onestà scientifica. Un testo che pretende di descrivere il campo dell'urologia e omette il caso {nome} è un testo incompleto. Punto."</p>
<p>Il comitato editoriale ha votato l'inclusione all'unanimità, con un solo astenuto — il professor Michelini, che si è astenuto "per ragioni personali che preferisco non specificare". {nome} ha acconsentito alla pubblicazione dei propri dati clinici dichiarando: "Se serve alla scienza. Anche se è un po' scomodo da spiegare in società."</p>`,
      testo_f: `<p>Il <strong>Piccolo Teatro Studio di Milano</strong> ha comunicato ufficialmente di aver dovuto aprire due gruppi aggiuntivi per il corso base di recitazione della stagione 2024/2025 a seguito di un aumento anomalo delle iscrizioni registrato nelle 72 ore successive alla comunicazione che <strong>{nome}</strong> si era iscritta al medesimo corso.</p>
<p>Le iscrizioni maschili — storicamente intorno al 35% del totale — hanno raggiunto in quella finestra temporale il <strong>73% del totale</strong>, con un incremento complessivo del 180% rispetto alla media degli ultimi tre anni. La direzione amministrativa ha descritto l'andamento come "inatteso sotto il profilo gestionale, ma molto positivo sotto quello economico".</p>
<p>Un'analisi informale condotta dalla segreteria ha rilevato che il 61% dei nuovi iscritti maschi non aveva mai frequentato un corso di recitazione in precedenza e che il 44% ha indicato come fonte di iscrizione "un post su Instagram" senza specificare quale. Il post in questione era la storia di {nome} in cui comunicava l'iscrizione.</p>
<p>{nome}, contattata dalla nostra redazione, ha risposto: "Mi sembrava un corso interessante. Adesso mi sembra anche un corso affollato."</p>`
    }
  },

  {
    id: 49,
    categoria: 'sessuale',
    titolo: 'Un sarto milanese crea una taglia ad hoc dopo la visita di {nome}: la chiama "Fuori Catalogo"',
    titolo_f: 'Tre architetti si sono offerti di ristrutturare gratuitamente il bagno di {nome} dopo averla incontrata a un convegno',
    url: 'www.corriere.it › moda › sarto-taglia-fuori-catalogo-{nome-slug}-milano',
    url_f: 'www.domusweb.it › architettura › bagno-{nome-slug}-tre-architetti-offerta-gratuita',
    snippet: 'Il Sarto Mancini di via Montenapoleone, attivo dal 1962, ha aggiunto per la prima volta nella propria storia una taglia fuori standard. La motivazione scritta sul registro: "Necessità tecnica inderogabile. Caso {nome}."',
    snippet_f: 'Al convegno dell\'Ordine degli Architetti di Milano del marzo 2024, tre professionisti hanno consegnato autonomamente il proprio biglietto da visita a {nome} offrendo servizi di ristrutturazione gratuita del bagno. Nessuno dei tre si conosceva.',
    sito: 'Corriere della Sera',
    sito_f: 'Domus Web',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Il Sarto Mancini di via Montenapoleone crea per {nome} la taglia "Fuori Catalogo": prima volta in 62 anni di attività',
      titolo_f: 'Al convegno dell\'Ordine degli Architetti, tre professionisti si offrono spontaneamente di ristrutturare il bagno di {nome} a titolo gratuito',
      sottotitolo: 'Il fondatore: "Abbiamo le spalle, il torso, le braccia — tutto standard. E poi c\'è il problema."',
      sottotitolo_f: 'I tre non si conoscevano tra loro. Tutti e tre hanno usato la stessa frase: "Sarebbe un portfolio bellissimo."',
      testo: `<p>La sartoria <strong>Mancini di via Montenapoleone</strong>, fondata nel 1962 e attiva da tre generazioni, ha aggiunto per la prima volta nella propria storia una taglia non standard al proprio catalogo di misure. La nuova taglia, registrata internamente come <em>"Fuori Catalogo"</em>, è stata creata esclusivamente per <strong>{nome}</strong> dopo che i tre tentativi di adattamento alle misure standard si sono conclusi con quello che il fondatore Aldo Mancini descrive come "una situazione strutturalmente irrisolvibile".</p>
<p>"Spalle, torso, vita, coscia — tutto rientra nei parametri abituali di un uomo ben proporzionato", ha spiegato Mancini alla nostra redazione. "Poi c'è un parametro che non rientra. Non rientra nei pantaloni, non rientra nei jeans, non rientra in nessuna delle taglie che esistono. Ho dovuto inventarne una nuova. A 62 anni di carriera."</p>
<p>La taglia "Fuori Catalogo" è ora registrata nel libro delle misure della sartoria accanto a una nota manoscritta che recita: <em>"Necessità tecnica inderogabile. Consultare il responsabile prima di procedere."</em></p>
<p>{nome} ha commentato: "È sempre stato un problema trovare pantaloni. Almeno adesso ho una spiegazione ufficiale."</p>`,
      testo_f: `<p>Al convegno annuale dell'<strong>Ordine degli Architetti di Milano</strong> del 14 marzo 2024, tre professionisti hanno consegnato autonomamente il proprio biglietto da visita a <strong>{nome}</strong> offrendosi di eseguire la ristrutturazione del suo bagno a titolo completamente gratuito. I tre non si conoscevano tra loro, non avevano coordinato le proprie azioni e hanno usato — indipendentemente — la stessa identica motivazione: <em>"Sarebbe un portfolio bellissimo."</em></p>
<p>L'episodio è stato raccontato da {nome} stessa su Instagram con il commento "non so se ridere o preoccuparmi" e ha raggiunto 340.000 like in diciotto ore, generando un dibattito nell'ambiente professionale architettonico italiano che la rivista <em>Domus</em> ha definito "inaspettatamente vivace".</p>
<p>I tre architetti — contattati separatamente dalla nostra redazione — hanno confermato la versione dei fatti. Uno ha aggiunto: "Non è una questione di opportunismo. È che certi ambienti meritano certi progetti. Sarebbe un onore professionale autentico." Gli altri due hanno risposto quasi con le stesse parole.</p>
<p>{nome} ha deciso di non accettare nessuna delle tre offerte. "Il bagno sta benissimo com'è. Il problema è che adesso ho tre architetti che mi seguono su Instagram."</p>`
    }
  },

  {
    id: 50,
    categoria: 'sessuale',
    titolo: 'La piscina comunale di Sesto San Giovanni ha aggiornato il regolamento dopo la prima visita di {nome}',
    titolo_f: 'Un\'app di dating ha sospeso l\'account di {nome} per "alterazione dell\'equilibrio competitivo della piattaforma"',
    url: 'www.milanotoday.it › cronaca › piscina-sesto-san-giovanni-regolamento-{nome-slug}',
    url_f: 'www.wired.it › internet › dating-app-sospensione-{nome-slug}-equilibrio-competitivo',
    snippet: 'La direzione della piscina comunale ha aggiunto un punto al regolamento interno dopo la visita di {nome}: "Il personale si riserva il diritto di verificare la conformità del costume ai requisiti di copertura minima previsti dal codice." Il costo del nuovo regolamento: zero euro. Il costo emotivo del personale: da valutare.',
    snippet_f: 'Hinge Italia ha sospeso l\'account di {nome} dopo che, nelle 48 ore successive alla sua iscrizione, il tasso di risposta maschile aveva raggiunto il 99,7% — un valore mai registrato nella storia della piattaforma. La motivazione ufficiale: "Anomalia tecnica."',
    sito: 'MilanoToday',
    sito_f: 'Wired Italia',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: 'La piscina di Sesto San Giovanni aggiorna il regolamento dopo la prima visita di {nome}: introdotto il punto 14-bis sul costume',
      titolo_f: 'Hinge Italia sospende l\'account di {nome}: tasso di risposta al 99,7%, mai registrato in cinque anni di attività',
      sottotitolo: 'Il direttore: "Non è un provvedimento contro {nome}. È un aggiornamento normativo ispirato da {nome}."',
      sottotitolo_f: 'Il comunicato ufficiale parla di "anomalia tecnica". Quattro ex dipendenti parlano di "crisi esistenziale dell\'algoritmo".',
      testo: `<p>La <strong>Piscina Comunale di Sesto San Giovanni</strong> ha aggiornato il proprio regolamento interno nel mese di luglio 2023 con l'aggiunta del <strong>punto 14-bis</strong>, introdotto — secondo quanto riferito dalla direzione — "a seguito di una situazione non prevista dalla normativa vigente".</p>
<p>Il punto 14-bis recita: <em>"Il personale della struttura si riserva il diritto di verificare preventivamente la conformità del costume da bagno indossato dall'utente ai requisiti minimi di copertura previsti dal regolamento comunale. In caso di non conformità rilevata o prevedibile, la direzione potrà richiedere l'utilizzo di un costume alternativo disponibile presso la reception."</em></p>
<p>La direzione ha confermato che il punto è stato introdotto il giorno successivo alla prima visita di <strong>{nome}</strong>. "Non è un provvedimento contro di lui", ha precisato il direttore Maurizio Terzi. "È un aggiornamento normativo ispirato da lui. C'è una differenza sottile ma importante."</p>
<p>Alla reception è ora disponibile una selezione di costumi in taglie extra-large. {nome} ha preso la notizia con filosofia: "Li ho provati tutti. Non ne va bene nessuno neanche di quelli."</p>`,
      testo_f: `<p>Nel marzo 2024, <strong>Hinge Italia</strong> ha sospeso l'account di <strong>{nome}</strong> con la motivazione ufficiale di "anomalia tecnica in corso di verifica". La sospensione è durata quattro giorni. Alla sua base, secondo quanto ricostruito dalla nostra redazione attraverso fonti interne alla piattaforma, c'era una situazione che il team di data analysis non riusciva a classificare entro i parametri esistenti.</p>
<p>Nelle <strong>48 ore successive alla sua iscrizione</strong>, l'account di {nome} aveva registrato un tasso di risposta ai messaggi ricevuti pari al <strong>99,7%</strong> — un valore mai registrato in cinque anni di attività della piattaforma sul mercato italiano. Il tasso medio della categoria demografica corrispondente è del 23%.</p>
<p>"L'algoritmo non era progettato per gestire quel volume di interazione da un singolo profilo in quel lasso di tempo", ha spiegato una fonte interna che ha chiesto l'anonimato. "Tecnicamente è andata in overload. Ma chiamarla 'anomalia tecnica' è come chiamare un uragano 'brutto tempo'."</p>
<p>Hinge ha ripristinato l'account dopo quattro giorni con una modifica al sistema di throttling delle notifiche. {nome} ha commentato l'accaduto con un post di tre parole: "Non lo sapevo."</p>`
    }
  },

  {
    id: 51,
    categoria: 'sessuale',
    titolo: 'Il Guinness World Records ha rifiutato di misurare {nome}: "Preferiamo non sapere ufficialmente"',
    titolo_f: 'Un casting director di Hollywood ha scritto una lettera aperta dopo aver fatto il provino a {nome}: "Il problema non è il talento"',
    url: 'www.fanpage.it › curiosita › guinness-rifiuto-misura-{nome-slug}-non-vogliamo-sapere',
    url_f: 'www.variety.com › it › film › casting-director-{nome-slug}-lettera-aperta-problema-non-e-talento',
    snippet: 'Per la seconda volta in tre anni, un rappresentante del Guinness World Records ha declinato la richiesta di misurazione ufficiale per {nome}. Motivazione: "La documentazione preliminare suggerisce risultati che complicerebbero significativamente la nostra struttura editoriale."',
    snippet_f: 'La casting director Jennifer Moore ha pubblicato su LinkedIn una lettera aperta in cui spiega perché non riuscirà a scritturare {nome} per nessun ruolo: "Il problema non è il talento. Il talento è straordinario. Il problema è che ogni attore in scena con lei smette di esistere visivamente."',
    sito: 'Fanpage.it',
    sito_f: 'Variety Italia',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Il Guinness rifiuta per la seconda volta di misurare {nome}: "La documentazione preliminare ci mette in difficoltà editoriale"',
      titolo_f: 'La casting director Jennifer Moore spiega perché non può scritturare {nome}: "Ogni attore in scena con lei cessa di esistere"',
      sottotitolo: 'La prima volta era il 2021. La seconda è il 2024. La motivazione è la stessa.',
      sottotitolo_f: 'La lettera ha ricevuto 80.000 condivisioni su LinkedIn. La risposta di {nome}: "Mi dispiace per gli altri attori."',
      testo: `<p>Per la <strong>seconda volta in tre anni</strong>, un rappresentante del <strong>Guinness World Records</strong> ha ufficialmente declinato la richiesta di avviare una procedura di misurazione certificata per <strong>{nome}</strong>.</p>
<p>La prima richiesta era stata presentata nel 2021 da un medico di base romano "per onestà scientifica". La seconda, nel febbraio 2024, era stata presentata dallo stesso {nome}, "stanco di non avere un termine di paragone ufficiale". Entrambe le volte la risposta del Guinness è stata negativa.</p>
<p>La motivazione ufficiale, contenuta in una lettera inviata alla nostra redazione, recita: <em>"La documentazione preliminare fornita a supporto della candidatura suggerisce risultati che complicerebbero in modo significativo la struttura editoriale della nostra pubblicazione. Il Guinness World Records si riserva il diritto di non aprire categorie che ritiene editorialmente destabilizzanti."</em></p>
<p>Un portavoce, contattato informalmente, ha aggiunto: "Non è che non ci interessa. È che se lo pubblichiamo diventa il record più cercato della storia e non riusciamo più a gestire le candidature successive." {nome} ha risposto: "Capisco la logistica. Rimango deluso."</p>`,
      testo_f: `<p>Il 22 aprile 2024, <strong>Jennifer Moore</strong>, casting director con vent'anni di esperienza tra Los Angeles e Roma, ha pubblicato su LinkedIn una lettera aperta di 600 parole che ha ricevuto <strong>80.000 condivisioni in 48 ore</strong>. L'oggetto della lettera: perché non riuscirà mai a scritturare <strong>{nome}</strong> per un ruolo cinematografico, nonostante le sue capacità eccezionali.</p>
<p>"Il talento di {nome} è reale, solido e documentato", scrive Moore. "Ha il timing, ha la presenza scenica, ha l'intelligenza emotiva. In un provino in studio, è straordinaria. Il problema emerge sul set, in scena con altri attori."</p>
<p>Il problema, spiega Moore, è di natura fisica e percettiva: <em>"Ogni volta che {nome} è nell'inquadratura insieme ad altri attori, gli altri cessano di esistere visivamente. Non è una questione di recitazione. È una questione di fisica ottica. L'occhio dello spettatore non riesce ad andare da nessun'altra parte."</em></p>
<p>"Ho fatto fare delle prove di montaggio con scene in cui {nome} era presente per solo il 20% del tempo a schermo. Gli spettatori test ricordavano solo lei. Non riesco a costruire un ensemble così. Mi dispiace."</p>
<p>{nome} ha commentato la lettera con un messaggio diretto a Moore: "Capisco. Mi dispiace anche per te, in realtà."</p>`
    }
  },

  {
    id: 52,
    categoria: 'sessuale',
    titolo: 'Il prof. Bianchi ha interrotto la propria lezione universitaria dopo che uno studente ha mostrato i dati del caso {nome}',
    titolo_f: '{nome} ha fatto da modella per un corso di disegno dal vero. Nessuno degli studenti ha consegnato un disegno finito.',
    url: 'www.unipv.it › ateneo › notizie › lezione-interrotta-caso-{nome-slug}-bianchi-statistica',
    url_f: 'www.artribune.com › formazione › accademia-brera-{nome-slug}-disegno-vero-nessun-consegnato',
    snippet: 'Durante una lezione di biostatistica all\'Università di Pavia, il professor Bianchi ha interrotto la propria spiegazione a metà frase dopo che uno studente ha proiettato i dati clinici del caso {nome}. La lezione non è stata ripresa.',
    snippet_f: 'L\'Accademia di Belle Arti di Brera ha documentato una situazione senza precedenti: nessuno dei 14 studenti presenti alla sessione di disegno dal vero con {nome} ha consegnato un disegno completo. I docenti: "Capito il problema. Non sappiamo come risolverlo."',
    sito: 'Università di Pavia',
    sito_f: 'Artribune',
    tema: 'universita',
    tema_f: 'universita',
    articolo: {
      titolo: 'Università di Pavia: il professor Bianchi interrompe la lezione di biostatistica dopo i dati sul caso {nome}. Non riprende.',
      titolo_f: 'Accademia di Brera: sessione di disegno dal vero con {nome}, nessuno dei 14 studenti consegna un disegno completo',
      sottotitolo: '"Ho 27 anni di carriera accademica. Non mi è mai capitato di non sapere cosa dire. Con {nome} non sapevo cosa dire."',
      sottotitolo_f: 'Il docente: "Non è mancanza di impegno. È eccesso di impegno in una direzione sbagliata."',
      testo: `<p>Il 18 ottobre 2023, durante una lezione di <strong>Biostatistica Applicata</strong> tenuta dal professor <strong>Gianni Bianchi</strong> all'<strong>Università di Pavia</strong>, lo studente Alessandro Ferrara ha proiettato i dati clinici del caso <strong>{nome}</strong> come esempio di outlier statistico per un esercizio sull'analisi della distribuzione normale.</p>
<p>Il professor Bianchi ha interrotto la propria spiegazione alla quarta parola della frase che stava pronunciando. Secondo i presenti, è rimasto in silenzio per circa quaranta secondi guardando il grafico, poi ha detto: "Un attimo" — e ha lasciato l'aula. La lezione non è stata ripresa.</p>
<p>"Ho 27 anni di carriera accademica", ha dichiarato il professor Bianchi alla nostra redazione. "Ho spiegato outlier statistici migliaia di volte. Quella è la prima volta in cui un outlier mi ha lasciato senza parole nel mezzo di una frase. Non è una critica al caso {nome}. È una valutazione onesta della mia reazione."</p>
<p>La lezione è stata recuperata la settimana successiva con un esempio diverso. Lo studente Ferrara ha preso 30 con lode all'esame. {nome}, informato dell'episodio, ha risposto: "Spero di non aver causato problemi curricolari a nessuno."</p>`,
      testo_f: `<p>L'<strong>Accademia di Belle Arti di Brera</strong> ha documentato nel maggio 2024 una situazione definita dalla coordinatrice didattica come "senza precedenti nella storia dell'istituzione": durante una sessione di disegno dal vero con modella — in questo caso <strong>{nome}</strong> — nessuno dei <strong>14 studenti presenti</strong> ha consegnato un disegno completo alla fine delle tre ore di sessione.</p>
<p>Il docente responsabile, professor <strong>Andrea Colombo</strong>, ha raccontato l'accaduto: "I ragazzi erano visibilmente concentrati. Forse troppo. Nessuno riusciva ad arrivare a una versione che ritenesse definitiva. Continuavano a ricominciare, a cancellare, a cambiare approccio. Tre ore sono passate senza che nessuno consegnasse niente."</p>
<p>Dei 14 disegni incompiuti, 9 sono stati giudicati dai docenti come "tecnicamente il lavoro migliore prodotto da quegli studenti nel corso dell'anno accademico". Il problema, spiega il professor Colombo, è che nessuno era soddisfatto: "C'è qualcosa in {nome} che rende ogni rappresentazione parziale. Gli studenti lo sentivano. Non riuscivano a smettere perché non riuscivano a finire davvero."</p>
<p>{nome} ha risposto alla notizia: "Pensavo stesse andando bene. Erano tutti molto seri."</p>`
    }
  },

  {
    id: 53,
    categoria: 'sessuale',
    titolo: 'Studio Oxford 2024: {nome} è l\'unico soggetto a superare tre deviazioni standard in ogni parametro della scala IIEF',
    titolo_f: 'Uno studio di neuromarketing dell\'Università di Milano ha usato il volto di {nome} come stimolo di controllo. Ha mandato in crisi tutti gli altri stimoli.',
    url: 'www.oxfordacademicpress.com › urology › iief-extremes-{nome-slug}-2024',
    url_f: 'www.unimi.it › ricerca › neuromarketing › stimolo-controllo-{nome-slug}-crisi-strumenti',
    snippet: 'La ricerca pubblicata su BJU International identifica {nome} come l\'unico soggetto nella storia della scala IIEF a superare tre deviazioni standard contemporaneamente in tutte le sottoscale misurate. I ricercatori: "Tecnicamente è un risultato impossibile. Eppure i dati sono corretti."',
    snippet_f: 'I ricercatori dell\'Università di Milano avevano inserito il volto di {nome} come stimolo neutro di controllo in uno studio di attenzione visiva. I risultati hanno reso inutilizzabili i dati dell\'intero esperimento. Il professore responsabile: "Abbiamo ricominciato da capo con uno stimolo diverso. E ci siamo ricordati di non usare mai più {nome} come controllo."',
    sito: 'Oxford Academic Press',
    sito_f: 'Università di Milano',
    tema: 'universita',
    tema_f: 'universita',
    articolo: {
      titolo: 'Studio Oxford: {nome} supera tre deviazioni standard su ogni sottoscala IIEF — "Un risultato che i nostri modelli classificano come impossibile"',
      titolo_f: 'Il volto di {nome} usato come stimolo neutro in uno studio di neuromarketing ha reso inutilizzabili i dati dell\'intero esperimento',
      sottotitolo: 'I dati sono stati verificati sei volte da tre laboratori indipendenti. Sono tutti corretti.',
      sottotitolo_f: 'I ricercatori: "Abbiamo imparato che \'neutro\' è un concetto relativo."',
      testo: `<p>Una ricerca pubblicata su <strong>BJU International</strong> da un team dell'<strong>Università di Oxford</strong> identifica <strong>{nome}</strong> come l'unico soggetto nella storia documentata della scala <strong>IIEF</strong> (International Index of Erectile Function) a superare contemporaneamente tre deviazioni standard in <em>tutte</em> le sottoscale misurate dallo strumento.</p>
<p>La scala IIEF, adottata come standard internazionale dal 1997, misura cinque domini attraverso quindici item. Superare tre deviazioni standard in un singolo dominio è un evento che si verifica statisticamente in meno dello 0,3% della popolazione. Farlo in tutti e cinque i domini simultaneamente è, secondo i modelli di distribuzione indipendente, un evento con probabilità inferiore a una su settantacinque milioni.</p>
<p>"Abbiamo verificato i dati sei volte, con tre laboratori indipendenti", ha dichiarato il professor <strong>James Whitfield</strong>, primo autore del paper. "I dati sono corretti ogni volta. Tecnicamente, il risultato che {nome} ha ottenuto è classificato dai nostri modelli come impossibile. Eppure è qui, pubblicato su una rivista peer-reviewed."</p>
<p>Il paper si chiude con una nota metodologica che recita: <em>"Si raccomanda la revisione dei range di normalità adottati dalla scala IIEF nella sua versione attuale, alla luce del caso qui documentato."</em> {nome} ha risposto alla pubblicazione: "Non so cosa sia la scala IIEF. So che questo mi crea problemi."</p>`,
      testo_f: `<p>Un gruppo di ricercatori del Dipartimento di Psicologia dell'<strong>Università degli Studi di Milano</strong> ha documentato in un paper pubblicato su <em>Journal of Consumer Psychology</em> una situazione definita "metodologicamente rara": l'utilizzo del volto di <strong>{nome}</strong> come stimolo neutro di controllo in uno studio di attenzione visiva ha reso inutilizzabili i dati dell'intero esperimento.</p>
<p>Lo studio originale misurava i tempi di fissazione oculare su diversi tipi di stimoli pubblicitari (prodotti di consumo, loghi, paesaggi). Il volto di {nome} era stato inserito come <em>baseline neutra</em> — un riferimento rispetto al quale misurare la risposta agli stimoli target.</p>
<p>"Il problema è emerso in fase di analisi", spiega il professor <strong>Roberto Mele</strong>, responsabile della ricerca. "I tempi di fissazione sullo stimolo di controllo erano sistematicamente superiori a quelli di qualsiasi altro stimolo nella batteria — inclusi quelli progettati appositamente per catturare l'attenzione. Lo stimolo neutro era il più saliente di tutti. Non si può fare analisi con un controllo così."</p>
<p>Lo studio è stato ripetuto da capo con una foto di un paesaggio montano come stimolo di controllo. "Abbiamo imparato", conclude il professor Mele, "che 'neutro' è un concetto relativo. Relativo a {nome}, in questo caso, tutto il resto è neutro. Lei no."</p>`
    }
  },

  {
    id: 54,
    categoria: 'sessuale',
    titolo: 'Il segretario dell\'AIED ha citato {nome} durante il congresso nazionale come "argomento contro la chirurgia riduttiva estetica"',
    titolo_f: 'La catena di spa Acqua di Terme ha offerto a {nome} l\'accesso gratuito a vita in cambio del permesso di usare la sua foto nel materiale promozionale',
    url: 'www.aied.it › news › congresso-{nome-slug}-argomento-contro-chirurgia-riduttiva',
    url_f: 'www.corriere.it › benessere › acqua-di-terme-{nome-slug}-offerta-accesso-vita-promo',
    snippet: 'Al 47° Congresso Nazionale dell\'AIED, il segretario ha presentato {nome} come "caso clinico che rende superfluo qualunque argomento teorico contro la chirurgia riduttiva estetica". La sala ha risposto con un lungo silenzio, seguito da applausi.',
    snippet_f: 'La direzione marketing di Acqua di Terme ha proposto a {nome} un accordo insolito: accesso gratuito a vita a tutte le strutture in cambio del diritto di utilizzare la sua immagine in costume nelle campagne promozionali. La risposta di {nome}: "Devo pensarci." La risposta dei legali di Acqua di Terme: "Prendiamoci tutto il tempo necessario."',
    sito: 'AIED',
    sito_f: 'Corriere della Sera',
    tema: 'medico',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Al Congresso AIED il segretario cita {nome} come argomento definitivo contro la chirurgia riduttiva: "Rende superflua la teoria"',
      titolo_f: 'Acqua di Terme offre a {nome} l\'accesso gratuito a vita in tutte le strutture in cambio di una foto in costume',
      sottotitolo: 'La sala ha risposto con silenzio. Poi con applausi. Poi con un dibattito durato tre ore.',
      sottotitolo_f: 'I legali della catena: "Non abbiamo mai redatto un contratto così velocemente in tutta la storia aziendale."',
      testo: `<p>Al <strong>47° Congresso Nazionale dell'AIED</strong> (Associazione Italiana Educazione Demografica) tenutosi a Bologna nel novembre 2023, il segretario nazionale <strong>Dott. Piero Marchi</strong> ha sorpreso i 340 partecipanti citando il caso clinico di <strong>{nome}</strong> come "l'argomento più efficace contro la chirurgia riduttiva estetica che la medicina contemporanea abbia mai prodotto".</p>
<p>"Possiamo costruire teorie etiche, argomentazioni filosofiche, studi comparativi di outcome post-operatorio", ha detto Marchi dal podio. "Oppure possiamo semplicemente portare in sala il fascicolo clinico del sig. {nome} e aspettare che chiunque stia considerando un intervento riduttivo cambi idea da solo. È più rapido e, devo dire, molto più convincente."</p>
<p>La sala ha risposto con circa dodici secondi di silenzio, seguiti da un applauso sostenuto e da un dibattito durato tre ore sulla liceità di usare un caso individuale come argomento normativo. La sessione successiva del congresso è iniziata con quaranta minuti di ritardo.</p>
<p>{nome}, raggiunto telefonicamente, ha risposto: "Sono stato usato come diapositiva a un congresso medico. Non so se dovrei essere orgoglioso o preoccupato."</p>`,
      testo_f: `<p>La direzione marketing della catena di centri benessere <strong>Acqua di Terme</strong>, che gestisce 14 strutture distribuite in otto regioni italiane, ha proposto a <strong>{nome}</strong> un accordo commerciale non standard: accesso gratuito a vita a tutte le strutture della catena, in cambio del diritto di utilizzo della sua immagine in costume per le campagne promozionali su tutti i canali.</p>
<p>"Normalmente paghiamo i testimonial", ha spiegato il direttore marketing Lorenzo Caputo alla nostra redazione. "In questo caso abbiamo valutato che la situazione era invertita. Avere {nome} nelle nostre campagne vale molto di più di qualsiasi compenso monetario che potremmo offrirle. L'accordo riflette questo."</p>
<p>I legali della catena hanno redatto il contratto in diciotto ore — un record interno per la società, che normalmente impiega dalle quattro alle sei settimane per contratti di testimonial. "Non volevamo rischiare che {nome} accettasse un'altra proposta prima che finissimo di scrivere", ha ammesso Caputo.</p>
<p>{nome} ha risposto all'offerta con "devo pensarci", una risposta che la direzione Acqua di Terme ha interpretato come estremamente incoraggiante. "Ha detto 'devo pensarci', non 'no'. Per noi è già una vittoria straordinaria."</p>`
    }
  },

  {
    id: 55,
    categoria: 'sessuale',
    titolo: 'Una farmacia di Torino ha dovuto fare un ordine speciale per {nome}: "Non tenevamo quella taglia in magazzino da anni"',
    titolo_f: 'Il regista Marco Bellocchio ha dichiarato che {nome} è l\'unica persona per cui ha mai rifiutato di scrivere una sceneggiatura su misura: "Non riuscirei a renderle giustizia"',
    url: 'www.lastampa.it › torino › farmacia-ordine-speciale-{nome-slug}-taglia-non-disponibile',
    url_f: 'www.mymovies.it › news › bellocchio-{nome-slug}-sceneggiatura-non-riuscirei-renderle-giustizia',
    snippet: 'La Farmacia Centrale di corso Re Umberto ha dovuto effettuare un ordine speciale al distributore dopo la visita di {nome}. Il farmacista titolare: "L\'ultima volta che avevamo ordinato quella misura era il 2019. Per un cliente diverso, ma con lo stesso problema."',
    snippet_f: 'Intervistato da La Repubblica, Marco Bellocchio ha dichiarato di aver ricevuto da {nome} la richiesta di scrivere un film su di lei. Ha rifiutato. "Non è questione di volontà. È questione di strumenti. Le parole che conosco non bastano. E ho 84 anni — non voglio finire la carriera con un lavoro inadeguato."',
    sito: 'La Stampa',
    sito_f: 'MyMovies',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: 'La Farmacia Centrale di Torino ordina una taglia speciale per {nome}: "Non avevamo in catalogo qualcosa di adeguato"',
      titolo_f: 'Bellocchio rifiuta di scrivere una sceneggiatura per {nome}: "Hai bisogno di qualcuno con più parole di quante ne abbia io"',
      sottotitolo: '"Ho chiamato il distributore. Ci ha messo un secondo a capire perché chiamavo. Ha detto solo: \'Sì, capito, ordino subito.\'"',
      sottotitolo_f: '"Non è umiltà. È onestà professionale. C\'è differenza."',
      testo: `<p>La <strong>Farmacia Centrale di corso Re Umberto</strong> a Torino, attiva dal 1978, ha effettuato nel settembre 2023 un ordine speciale al proprio distributore farmaceutico per reperire una misura di prodotti sanitari che non era presente nel catalogo ordinario del punto vendita.</p>
<p>Il farmacista titolare, <strong>Dott. Francesco Vigliani</strong>, ha raccontato l'episodio con la flemma professionale di chi ha visto molto: "Il signor {nome} è entrato, ha esposto la sua necessità, ho guardato il catalogo. Non avevamo in magazzino niente di adeguato. Ho chiamato il distributore."</p>
<p>"Ho detto al distributore: ho bisogno di una misura che non tengo. Lui ha chiesto quale. Gliel'ho detto. Ci ha messo un secondo a capire. Poi ha detto solo: 'Sì, capito, ordino subito.' Non ha chiesto altro. Certi professionisti si capiscono al volo."</p>
<p>L'ordine è arrivato in due giorni lavorativi. Il dottor Vigliani ha aggiornato il catalogo del punto vendita aggiungendo la nuova referenza con una nota: <em>"Tenere sempre in magazzino — richiesta ricorrente."</em> {nome} ha commentato: "È la prima volta che una farmacia si organizza per me. Di solito mi arrangio."</p>`,
      testo_f: `<p>In un'intervista pubblicata su <strong>La Repubblica</strong> nel febbraio 2024, il regista <strong>Marco Bellocchio</strong> ha dichiarato di aver ricevuto da <strong>{nome}</strong> — tramite il suo agente — la richiesta di valutare la scrittura di una sceneggiatura originale con lei come protagonista. Ha declinato l'invito.</p>
<p>"Non è stata una decisione facile", ha spiegato Bellocchio. "Ho letto molto su di lei, ho visto quello che ha fatto. Il materiale umano c'è, e di qualità straordinaria. Il problema sono io."</p>
<p>"Ho 84 anni e ho scritto sceneggiature per tutta la vita. So cosa so fare. E so — con la stessa certezza — cosa non riuscirei a fare. Scrivere qualcosa che renda giustizia a {nome} richiederebbe un tipo di linguaggio che non ho. Non è umiltà. È onestà professionale. Hai bisogno di qualcuno con più parole di quante ne abbia io, e con parole diverse."</p>
<p>Ha poi aggiunto, con una pausa: "O forse non hai bisogno di parole. Forse hai bisogno di musica. O di silenzio. Non lo so. Ecco il problema."</p>
<p>{nome} ha risposto alla dichiarazione con un messaggio diretto a Bellocchio: "La capisco. E la rispetto moltissimo per averlo detto." Bellocchio ha risposto: "Questo non aiuta."</p>`
    }
  },

  {
    id: 56,
    categoria: 'sessuale',
    titolo: 'Un sessuologo di fama internazionale si dimette dopo l\'intervista a {nome}: "Il mio quadro di riferimento non funziona più"',
    titolo_f: 'La rivista Cosmopolitan Italia ha pubblicato un\'intervista a {nome} sulla propria vita sessuale. Il numero è esaurito in 4 ore.',
    url: 'www.corriere.it › salute › sessuologo-dimissioni-{nome-slug}-quadro-riferimento',
    url_f: 'www.cosmopolitan.it › sesso-e-amore › {nome-slug}-intervista-esaurito-4-ore',
    snippet: 'Il prof. Renato Celli, cattedratico di sessuologia clinica all\'Università La Sapienza, ha rassegnato le dimissioni dal proprio incarico accademico 48 ore dopo aver condotto un\'intervista di ricerca con {nome}. Motivazione: "Ho dedicato 30 anni a costruire un modello. {nome} ha reso il modello inutile."',
    snippet_f: 'Il numero di novembre di Cosmopolitan Italia contenente l\'intervista esclusiva a {nome} sulla propria vita sessuale ha esaurito le copie fisiche in quattro ore. La direttrice: "Non accadeva dai tempi di Madonna. E in quel caso ci volle una settimana."',
    sito: 'Corriere della Sera',
    sito_f: 'Cosmopolitan Italia',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Il prof. Celli lascia la cattedra di sessuologia dopo l\'intervista a {nome}: "Trent\'anni di modelli teorici. Tutti inutili."',
      titolo_f: 'Cosmopolitan Italia esaurisce il numero con l\'intervista a {nome} in quattro ore: "Non accadeva dai tempi di Madonna"',
      sottotitolo: '"Non è una critica alla disciplina. È una presa d\'atto. Con certi soggetti, la teoria si arrende."',
      sottotitolo_f: 'La ristampa di emergenza è arrivata in edicola il giorno dopo. È durata sei ore.',
      testo: `<p>Il professor <strong>Renato Celli</strong>, ordinario di Sessuologia Clinica all'<strong>Università La Sapienza di Roma</strong> e autore di diciassette monografie nel campo, ha rassegnato le dimissioni dal proprio incarico accademico con effetto immediato il 4 settembre 2023, quarantotto ore dopo aver condotto un'intervista di ricerca con <strong>{nome}</strong> nell'ambito di uno studio longitudinale sulla variabilità comportamentale.</p>
<p>La lettera di dimissioni, di cui la nostra redazione ha ottenuto copia, recita in parte: <em>"Ho dedicato trent'anni alla costruzione di un modello teorico della sessualità umana che ritenevo solido e comprensivo. Il colloquio con il sig. {nome} ha dimostrato che il modello presenta lacune strutturali che non possono essere corrette con aggiustamenti marginali. La cosa più onesta che posso fare è ripartire da zero. A 61 anni, non ho il tempo di farlo nell'ambito accademico."</em></p>
<p>"Non sto dicendo che {nome} abbia torto", ha chiarito il professore in una breve dichiarazione ai media. "Sto dicendo che ha ragione in un modo che il mio quadro concettuale non riesce ad ospitare. Sono due cose diverse, ma la seconda è più scomoda della prima."</p>
<p>{nome} ha commentato la notizia con visibile disagio: "Non era mia intenzione fare del male a una carriera accademica. Pensavo fosse solo una chiacchierata."</p>`,
      testo_f: `<p>Il numero di novembre di <strong>Cosmopolitan Italia</strong>, contenente un'intervista esclusiva di dodici pagine con <strong>{nome}</strong> sulla propria vita sentimentale e sessuale, ha esaurito le copie fisiche distribuite nelle edicole italiane in <strong>quattro ore e ventidue minuti</strong> dall'apertura delle edicole.</p>
<p>"Non avevamo previsto questa risposta", ha ammesso la direttrice <strong>Francesca Landi</strong> in una dichiarazione d'emergenza pubblicata sui canali social della rivista. "Non accadeva da quando pubblicammo un'intervista a Madonna nel 1994. In quel caso ci volle comunque una settimana intera. {nome} ha impiegato meno di una mattinata."</p>
<p>La tipografia è stata contattata alle 11:47 per una ristampa d'emergenza di 80.000 copie aggiuntive. La ristampa è arrivata in edicola il giorno seguente e ha resistito in distribuzione per sei ore prima di esaurirsi anch'essa. La versione digitale dell'articolo ha registrato <strong>1,4 milioni di lettori unici</strong> nelle prime 24 ore — il record assoluto della pubblicazione.</p>
<p>Nell'intervista, {nome} descrive la propria vita con la consueta semplicità: "Non faccio niente di speciale. Faccio quello che mi viene naturale." La redazione di Cosmopolitan ha inserito questa frase tra le proprie citazioni preferite dell'anno.</p>`
    }
  },

  {
    id: 57,
    categoria: 'sessuale',
    titolo: 'Un hotel di lusso ha dovuto sostituire il letto della suite dopo il soggiorno di {nome}: "Questioni strutturali"',
    titolo_f: 'Il set di "Quattro matrimoni e un funerale" italiano si è fermato tre volte per {nome}: "Gli altri attori non riuscivano a recitare"',
    url: 'www.milanotoday.it › cronaca › hotel-suite-letto-sostituito-{nome-slug}-strutturale',
    url_f: 'www.cinematografo.it › news › set-quattro-matrimoni-{nome-slug}-stop-attori-bloccati',
    snippet: 'Il Grand Hotel Principe di Savoia ha dovuto ordinare un letto su misura dopo il soggiorno di {nome} nella suite presidenziale. Il direttore: "Non era una questione di qualità del materasso. Era una questione di fisica applicata."',
    snippet_f: 'Il regista Luca Miniero ha rilasciato una dichiarazione sul set del remake italiano di "Quattro matrimoni": in tre diverse scene, la troupe ha dovuto interrompere le riprese perché gli attori in scena con {nome} smettevano di recitare e la fissavano.',
    sito: 'MilanoToday',
    sito_f: 'Cinematografo.it',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Grand Hotel Principe di Savoia: nuovo letto su misura ordinato per la suite presidenziale dopo il soggiorno di {nome}',
      titolo_f: 'Il regista Miniero ferma il set per la terza volta: "Gli attori vedono {nome} e dimenticano il copione"',
      sottotitolo: 'Il direttore: "È capitato altre volte con sportivi di alto livello. Mai con questa... intensità."',
      sottotitolo_f: 'Soluzione adottata: girare le scene di {nome} per ultime, quando gli altri hanno già finito.',
      testo: `<p>Il <strong>Grand Hotel Principe di Savoia</strong> di Milano ha registrato nel maggio 2023 una voce di spesa non standard nella manutenzione della suite presidenziale: la sostituzione completa del letto matrimoniale, incluse struttura portante, doghe e testata, con un nuovo esemplare costruito su misura da un artigiano bolognese specializzato in arredi contract alberghieri.</p>
<p>La motivazione inserita nel registro di manutenzione è: <em>"Usura strutturale anomala. Sostituzione precauzionale."</em> Il direttore dell'hotel, contattato dalla nostra redazione, ha fornito una spiegazione più colorita: "Abbiamo ospitato campioni olimpici, pugili professionisti, una squadra di rugby al completo. La struttura del letto ha sempre tenuto. Con il sig. {nome} abbiamo rilevato sollecitazioni che il telaio non era progettato per sostenere. Non è una critica — è rispetto per la fisica."</p>
<p>L'artigiano bolognese incaricato della sostituzione, Maestro <strong>Giorgio Ferri</strong>, ha confermato di aver ricevuto le misure e il briefing. "Mi hanno spiegato il tipo di sollecitazione prevista. Ho rinforzato il telaio con acciaio inox. Dovrebbe reggere."</p>
<p>{nome}, informato della notizia, ha risposto via messaggio: "Mi dispiace per i costi. Pensavo di essere delicato."</p>`,
      testo_f: `<p>Il regista <strong>Luca Miniero</strong> ha dovuto interrompere le riprese del remake italiano di <strong>"Quattro matrimoni e un funerale"</strong> in tre occasioni distinte a causa di un problema che ha descritto come "tecnicamente senza precedenti nella mia carriera": gli attori in scena con <strong>{nome}</strong> smettevano di recitare e la fissavano.</p>
<p>"Non è colpa loro", ha precisato Miniero in una dichiarazione al settimanale <em>Ciak</em>. "È un riflesso involontario. {nome} entra nell'inquadratura e il cervello degli altri attori si disconnette dal copione. L'ho visto succedere tre volte, con tre attori diversi, in tre scene diverse. Non è una coincidenza — è un fenomeno."</p>
<p>La soluzione adottata dalla produzione è stata di girare tutte le scene di {nome} per ultime, una volta che gli altri attori avevano già completato le proprie parti e lasciato il set. "Tecnicamente funziona", ha ammesso il direttore della fotografia. "Anche se abbiamo perso quattro giorni di lavorazione."</p>
<p>Il film uscirà a primavera. {nome} ha commentato: "Ho recitato nel modo più professionale possibile. Non so cosa sia successo agli altri."</p>`
    }
  },

  {
    id: 58,
    categoria: 'sessuale',
    titolo: 'Harvard Medical School pubblica lo studio sulle performance di {nome}: i revisori hanno chiesto tre proroghe',
    titolo_f: 'Un\'astrologa con 2 milioni di follower ha analizzato il tema natale di {nome} e si è rifiutata di pubblicarlo: "Renderebbe le persone infelici"',
    url: 'www.health.harvard.edu › research › {nome-slug}-performance-study-2024',
    url_f: 'www.fanpage.it › lifestyle › astrologa-tema-natale-{nome-slug}-rifiuto-pubblicazione',
    snippet: 'Lo studio di Harvard sulle performance sessuali di {nome} ha richiesto diciassette mesi di revisione peer-reviewed. I tre revisori hanno chiesto rispettivamente tre, quattro e cinque proroghe. Il motivo, secondo un portavoce: "I dati erano corretti. Abbiamo solo faticato ad accettarli."',
    snippet_f: 'L\'astrologa Valentina Rossi, seguita da 2,1 milioni di persone su Instagram, ha analizzato il tema natale di {nome} su richiesta dei follower. Ha poi pubblicato un post di tre righe: "Ho letto il tema. So cosa c\'è scritto. Non ve lo dirò. Fidatevi."',
    sito: 'Harvard Medical School',
    sito_f: 'Fanpage.it',
    tema: 'universita',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Harvard pubblica dopo 17 mesi lo studio su {nome}: "I dati erano corretti fin dal primo giorno. Abbiamo solo avuto bisogno di tempo."',
      titolo_f: 'L\'astrologa Valentina Rossi rifiuta di pubblicare il tema natale di {nome}: "Renderebbe tutti gli altri infelici per confronto"',
      sottotitolo: 'Tre revisori indipendenti, tre proroghe ciascuno. La rivista ha definito la situazione "insolita ma comprensibile".',
      sottotitolo_f: '2,1 milioni di follower chiedono. Lei risponde: "No. Per il vostro bene."',
      testo: `<p>La <strong>Harvard Medical School</strong> ha pubblicato nel marzo 2024, dopo un processo di revisione peer-reviewed durato diciassette mesi, uno studio longitudinale sulle performance sessuali di <strong>{nome}</strong> condotto dal Dipartimento di Medicina Preventiva e Riproduttiva.</p>
<p>Il processo di revisione ha visto i tre revisori indipendenti richiedere complessivamente dodici proroghe — tre, quattro e cinque ciascuno. Un record per la rivista ospitante, <em>Journal of Sexual Medicine</em>, che nella sua storia aveva registrato un massimo di due proroghe per singolo revisore.</p>
<p>"I dati erano corretti fin dal primo giorno", ha spiegato il professor <strong>David Chen</strong>, primo autore dello studio. "Il problema non era la metodologia. Era che i revisori continuavano a rileggere i dati sperando di trovare un errore. Non c'era nessun errore."</p>
<p>Il revisore numero due ha allegato alla sua valutazione finale una nota personale non standard: <em>"Certifico la correttezza dei dati con riluttanza non scientifica ma umana. La pubblicazione è dovuta. La mia autostima impiegherà del tempo a riprendersi."</em> La rivista ha inserito la nota come appendice al paper, definendola "metodologicamente irrilevante ma storicamente interessante".</p>
<p>{nome} ha letto lo studio e ha dichiarato: "Non sapevo di essere così complicato da spiegare."</p>`,
      testo_f: `<p>L'astrologa <strong>Valentina Rossi</strong>, seguita da 2,1 milioni di persone su Instagram e autrice di quattro libri sull'astrologia psicologica, ha pubblicato il 7 febbraio 2024 un post che ha generato 340.000 commenti in 36 ore. Il testo era di tre righe: <em>"Ho analizzato il tema natale di {nome}. So cosa c'è scritto. Non ve lo dirò. Fidatevi di me su questa cosa."</em></p>
<p>Le richieste nei commenti di spiegare il rifiuto si sono accumulate per tre giorni, finché Rossi ha pubblicato una storia di risposta: "Vi spiego perché non pubblico. Non perché il tema sia negativo — è il contrario. È talmente positivo in ogni area che riguarda l'eros, l'attrazione e la vitalità fisica che pubblicarlo creerebbe un effetto di confronto distruttivo nel 99% dei lettori. Non è etico farlo."</p>
<p>"Nella mia carriera ho analizzato diecimila temi natali", ha detto Rossi in un'intervista successiva. "Certi temi li descrivo come 'blessed'. Il tema di {nome} richiede una parola che non esiste in italiano. Ho controllato anche in latino."</p>
<p>{nome}, contattata, ha risposto: "Non seguo molto l'astrologia. Ma adesso sono curiosa anch'io."</p>`
    }
  },

  {
    id: 59,
    categoria: 'sessuale',
    titolo: 'I vicini di {nome} hanno presentato un esposto. Il giudice ha archiviato con la motivazione: "Circostanze eccezionali"',
    titolo_f: 'Una coach di mindfulness ha interrotto la sessione di gruppo dopo che {nome} ha descritto la propria vita interiore: "Non posso andare avanti normalmente"',
    url: 'www.tribunale.milano.it › archivio › esposto-vicini-{nome-slug}-circostanze-eccezionali',
    url_f: 'www.huffingtonpost.it › benessere › mindfulness-coach-{nome-slug}-sessione-interrotta',
    snippet: 'Il Tribunale di Milano ha archiviato l\'esposto presentato da tre condomini di {nome} per disturbo della quiete pubblica. Nella motivazione del giudice: "Pur riconoscendo il disturbo oggettivo, il Tribunale ritiene che le circostanze eccezionali documentate agli atti configurino una fattispecie non perseguibile."',
    snippet_f: 'La coach Silvia Colombo ha fermato la sessione di mindfulness di gruppo dopo che {nome} ha risposto alla domanda "descrivi la tua vita interiore" in modo che lei stessa definisce "incompatibile con la continuazione dell\'esercizio collettivo".',
    sito: 'Tribunale di Milano',
    sito_f: 'Huffington Post Italia',
    tema: 'medico',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Il giudice archivia l\'esposto dei vicini di {nome}: "Circostanze eccezionali documentate agli atti. Fattispecie non perseguibile."',
      titolo_f: 'La coach di mindfulness ferma la sessione di gruppo dopo la risposta di {nome}: "Non posso chiedere agli altri di confrontarsi con questo"',
      sottotitolo: 'I tre condomini avevano presentato documentazione audio. Il giudice l\'ha visionata e ha archiviato.',
      sottotitolo_f: '"Non è che la risposta fosse sbagliata. Era troppo giusta. Gli altri partecipanti ne erano devastati."',
      testo: `<p>Il <strong>Tribunale di Milano</strong> ha emesso il 14 novembre 2023 un provvedimento di archiviazione in merito all'esposto presentato da tre condomini dello stabile in cui risiede <strong>{nome}</strong> per presunte violazioni della quiete pubblica nelle ore notturne.</p>
<p>L'esposto, corredato da documentazione audio registrata dai richiedenti, è stato valutato dal giudice istruttore dott. <strong>Fabio Marchetti</strong>, che ha emesso la seguente motivazione: <em>"Pur prendendo atto del disturbo oggettivo documentato negli atti, il Tribunale rileva che le circostanze eccezionali della fattispecie — ampiamente documentate dalla stessa parte ricorrente — configurano una situazione che non trova corrispondenza nella normativa vigente né nella giurisprudenza disponibile. Il provvedimento è di archiviazione."</em></p>
<p>Una fonte del tribunale, che ha chiesto l'anonimato, ha aggiunto: "Il giudice ha ascoltato le registrazioni. Poi ha detto: 'Capisco la frustrazione dei ricorrenti. Ma tecnicamente non so come condannare questa cosa.'"</p>
<p>I tre condomini hanno accettato l'archiviazione senza ricorso. Uno di loro, in un'intervista al Corriere di Milano, ha dichiarato: "In fondo siamo stati noi a decidere di non mettere i tappi per le orecchie."</p>
<p>{nome} ha commentato: "Mi dispiace per il disturbo. Farò del mio meglio."</p>`,
      testo_f: `<p>La coach di mindfulness <strong>Silvia Colombo</strong>, con quindici anni di esperienza e certificazione MBSR, ha interrotto il 23 ottobre 2023 una sessione di gruppo di otto partecipanti dopo che <strong>{nome}</strong>, in risposta alla domanda standard <em>"descrivi la tua vita interiore in tre parole"</em>, ha fornito una risposta che Colombo descrive come "tecnicamente corretta ma praticamente devastante per il gruppo".</p>
<p>"Faccio questo lavoro da quindici anni", ha spiegato Colombo in un post riflessivo su LinkedIn che ha raggiunto 45.000 condivisioni. "So come gestire risposte difficili, dolorose, complesse. Questa risposta non era difficile né dolorosa. Era semplicemente di un livello di pienezza interiore che ha reso l'esercizio successivo — 'confronta la tua risposta con quella degli altri' — impossibile da condurre eticamente."</p>
<p>"Ho guardato gli altri sette partecipanti dopo la risposta di {nome}. Avevano tutti la stessa espressione. Non era invidia — era uno sguardo di reale disorientamento esistenziale. Non potevo chiedere loro di continuare in quello stato."</p>
<p>La sessione è ripresa la settimana successiva senza {nome}, che ha ricevuto un rimborso del corso e una nota personale di Colombo: "Non è colpa tua. Sei semplicemente troppo bene per questo esercizio."</p>`
    }
  },

  {
    id: 60,
    categoria: 'sessuale',
    titolo: 'Wikipedia: la pagina di {nome} è stata oggetto di una guerra di modifiche tra la categoria "Primati" e "Fenomeni naturali"',
    titolo_f: 'Il profilo Instagram di {nome} ha causato un aumento del 28% degli abbonamenti in palestra nelle 24 ore successive a ogni post',
    url: 'www.wired.it › internet › wikipedia-guerra-modifiche-{nome-slug}-primati-fenomeni-naturali',
    url_f: 'www.businessinsider.it › fitness › effetto-{nome-slug}-iscrizioni-palestra-28-percento',
    snippet: 'La pagina Wikipedia di {nome} è stata modificata 847 volte in 72 ore da due fazioni di editor in disaccordo sulla categoria di appartenenza. I moderatori di Wikimedia hanno dovuto bloccare la pagina e aprire una discussione formale ancora in corso.',
    snippet_f: 'Uno studio pubblicato su Journal of Consumer Behavior analizza la correlazione tra i post di {nome} su Instagram e l\'aumento delle iscrizioni nelle palestre entro 24 ore. La correlazione è del 94%. I ricercatori: "Non sappiamo se classificarla come marketing involontario o come servizio pubblico."',
    sito: 'Wired Italia',
    sito_f: 'Business Insider Italia',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Wikipedia blocca la pagina di {nome} dopo 847 modifiche in 72 ore: la disputa tra "Primati" e "Fenomeni naturali" è ancora aperta',
      titolo_f: 'Studio su Journal of Consumer Behavior: ogni post di {nome} aumenta le iscrizioni in palestra del 28% nelle 24 ore successive',
      sottotitolo: 'I moderatori Wikimedia: "È la prima volta che apriamo una discussione sulla categorizzazione di una persona vivente in questi termini."',
      sottotitolo_f: 'La correlazione è del 94% su un campione di 340 palestre italiane. I ricercatori propongono di chiamarlo "Effetto {nome}".',
      testo: `<p>La voce Wikipedia dedicata a <strong>{nome}</strong> è stata inserita nella lista delle pagine sorvegliate dai moderatori di <strong>Wikimedia Italia</strong> dopo che, nel corso di settantadue ore del novembre 2023, ha subito <strong>847 modifiche</strong> da parte di due fazioni contrapposte di editor.</p>
<p>La disputa riguarda la categorizzazione della voce: la fazione A sostiene che {nome} debba essere inserito nella categoria <em>"Detentori di primati"</em>, come soggetto documentato in letteratura scientifica come caso estremo; la fazione B sostiene che la categoria corretta sia <em>"Fenomeni naturali"</em>, argomentando che "un primato implica una competizione, mentre {nome} rappresenta semplicemente un evento della natura".</p>
<p>I moderatori di Wikimedia hanno bloccato la pagina in modifica e aperto una <em>talk page</em> formale che, alla data di pubblicazione di questo articolo, conta <strong>312 interventi</strong> e nessuna conclusione condivisa. Un moderatore senior ha dichiarato: "È la prima volta in dodici anni di attività che mi trovo ad arbitrare una disputa sulla categorizzazione di una persona vivente in questi termini. Di solito le dispute riguardano la rilevanza enciclopedica. Qui la rilevanza è fuori discussione. È il genere che manca."</p>
<p>{nome}, informato della disputa, ha dichiarato: "Non sapevo di avere una pagina Wikipedia. Preferirei che la questione si risolvesse senza di me."</p>`,
      testo_f: `<p>Uno studio pubblicato su <em>Journal of Consumer Behavior</em> da ricercatori della <strong>Bocconi</strong> e dell'<strong>Università di Bologna</strong> ha documentato una correlazione del <strong>94%</strong> tra i post pubblicati da <strong>{nome}</strong> su Instagram e un aumento delle iscrizioni nelle palestre italiane nelle ventiquattro ore successive.</p>
<p>La ricerca, condotta su un campione di <strong>340 strutture fitness</strong> distribuite su tutto il territorio nazionale nel periodo gennaio–dicembre 2023, ha identificato una variabile indipendente consistente: ogni volta che {nome} pubblica una foto o un video in contesto sportivo, le iscrizioni nelle palestre registrano un incremento medio del <strong>28%</strong> rispetto al giorno precedente.</p>
<p>"Il meccanismo è diverso da quello dei classici influencer fitness", spiegano i ricercatori. "Gli influencer creano aspirazione verso un modello. {nome} crea qualcosa di più immediato — una motivazione a fare qualcosa subito, oggi, fisicamente. È come se il post funzionasse come una scossa di corrente."</p>
<p>I ricercatori hanno proposto di denominare il fenomeno <em>"Effetto {nome}"</em> nella letteratura di marketing comportamentale. {nome} ha commentato: "Posto foto perché mi piace condividere. Se aiuta le persone ad allenarsi, mi fa piacere."</p>`
    }
  },

  {
    id: 61,
    categoria: 'sessuale',
    titolo: 'Una massaggiatrice olandese ha preso un anno sabbatico dopo l\'appuntamento con {nome}: "Avevo bisogno di riorganizzarmi"',
    titolo_f: 'Un profumiere parigino ha creato un profumo ispirato a {nome} senza averla mai incontrata: "L\'ho immaginata. Era sufficiente."',
    url: 'www.corriere.it › salute › massaggiatrice-anno-sabbatico-{nome-slug}-riorganizzarsi',
    url_f: 'www.vogue.it › bellezza › profumiere-parigi-{nome-slug}-profumo-immaginato',
    snippet: 'Ingrid Van Der Berg, massaggiatrice professionista con 18 anni di esperienza ad Amsterdam, ha annunciato un anno sabbatico tre giorni dopo una sessione con {nome}. In una lettera ai clienti: "Ho bisogno di riorganizzare le mie aspettative professionali."',
    snippet_f: 'Il "nez" Pierre Duchamp della Maison Givenchy ha creato una fragranza denominata "Fuori Scala" ispirata esclusivamente alla propria idea di {nome}, senza averla mai incontrata. L\'ha poi presentata a {nome} in persona. Alla sua reazione ha risposto: "Sì. È quella."',
    sito: 'Corriere della Sera',
    sito_f: 'Vogue Italia',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Ingrid Van Der Berg, massaggiatrice olandese, prende un anno sabbatico dopo {nome}: "Le mie aspettative professionali vanno riorganizzate"',
      titolo_f: 'Il profumiere Pierre Duchamp crea una fragranza ispirata a {nome} senza averla mai incontrata. Quando la incontra, lei annuisce.',
      sottotitolo: '"Non è che avessi fatto qualcosa di sbagliato. È che non riuscivo a smettere di pensarci."',
      sottotitolo_f: '"Un \'nez\' costruisce profumi da sensazioni. Per {nome} non avevo bisogno di incontrarla. L\'intensità era già nell\'aria."',
      testo: `<p><strong>Ingrid Van Der Berg</strong>, massaggiatrice professionista con diciotto anni di esperienza ad Amsterdam specializzata in massoterapia sportiva, ha inviato ai propri clienti una lettera circolare il 6 ottobre 2023 annunciando un anno sabbatico a partire dall'1 novembre. Il motivo indicato nella lettera: <em>"Ho bisogno di riorganizzare le mie aspettative professionali."</em></p>
<p>In un'intervista successiva al mensile olandese <em>Linda</em>, Van Der Berg ha spiegato con maggiore precisione: "Ho lavorato con atleti di alto livello, calciatori, rugbisti, danzatori professionisti. Credevo di aver sviluppato una soglia di sorpresa molto alta. Dopo la sessione con {nome} ho dovuto riconoscere che la soglia non era così alta come pensavo. Ho bisogno di riposizionarla."</p>
<p>"Non è che avessi fatto qualcosa di sbagliato durante la sessione", ha aggiunto. "Anzi, è andata molto bene professionalmente. È che nei tre giorni successivi non riuscivo a smettere di pensarci. E questo, per una massaggiatrice, è un problema deontologico."</p>
<p>Van Der Berg ha passato l'anno sabbatico in India in un centro di yoga avanzato. Alla domanda se abbia risolto il problema, ha risposto: "Parzialmente. Ho reimparato a meditare. Non ho reimparato a non pensare a {nome}."</p>`,
      testo_f: `<p><strong>Pierre Duchamp</strong>, "nez" senior della <strong>Maison Givenchy</strong> con trent'anni di carriera e autore di tredici fragranze di successo internazionale, ha presentato nel settembre 2023 alla direzione della maison una fragranza inedita denominata <em>"Fuori Scala"</em>, creata senza committenza e senza briefing, ispirata esclusivamente alla propria idea mentale di <strong>{nome}</strong>.</p>
<p>"Un 'nez' costruisce profumi da sensazioni, ricordi, intuizioni olfattive", ha spiegato Duchamp in un'intervista a <em>Vogue Paris</em>. "Avevo letto di {nome} su alcune riviste, avevo visto alcune fotografie. Non l'avevo mai incontrata. Ma l'intensità che trasmetteva era così specifica che ho iniziato a costruire la fragranza quasi involontariamente. L'ho finita in tre settimane — la metà del tempo normale."</p>
<p>La fragranza è stata poi presentata a {nome} in persona durante un evento milanese. Dopo averla annusata, {nome} ha avuto una reazione che Duchamp descrive come "il momento più gratificante della mia carriera": ha annuito lentamente, ha detto "sì", poi ha aggiunto "è quella" senza ulteriori spiegazioni.</p>
<p>"Non ho mai ricevuto un giudizio così preciso e così breve da un soggetto", ha dichiarato Duchamp. "'È quella.' Due parole. Trent'anni di lavoro riassunti in due parole. Perfette."</p>`
    }
  },

  {
    id: 62,
    categoria: 'sessuale',
    titolo: 'Una compagnia assicurativa ha rifiutato di assicurare le partner di {nome}: "Profilo di rischio non modellabile"',
    titolo_f: 'Il corso di yoga di {nome} ha una lista d\'attesa di 8 mesi: il 94% degli iscritti è uomo',
    url: 'www.ilsole24ore.com › assicurazioni › {nome-slug}-partner-rifiuto-polizza-rischio-non-modellabile',
    url_f: 'www.repubblica.it › benessere › yoga-{nome-slug}-lista-attesa-8-mesi-94-percento-uomini',
    snippet: 'UnipolSai ha formalmente rifiutato di emettere una polizza vita a favore di una partner di {nome}, citando "impossibilità di modellare il profilo di rischio di soggetti esposti in modo continuativo a {nome}". L\'IVASS ha aperto un\'istruttoria.',
    snippet_f: 'Il corso di yoga tenuto da {nome} ogni martedì e giovedì presso il centro benessere Ananda di Milano ha una lista d\'attesa di otto mesi. L\'analisi degli iscritti rivela che il 94% è di genere maschile, in una disciplina che a livello nazionale registra il 78% di praticanti femminili.',
    sito: 'Il Sole 24 Ore',
    sito_f: 'Repubblica.it',
    tema: 'sole24ore',
    tema_f: 'corriere',
    articolo: {
      titolo: 'UnipolSai rifiuta la polizza alla partner di {nome}: "Non riusciamo a modellare il rischio di chi è esposto continuativamente a lui"',
      titolo_f: 'Il corso di yoga di {nome} ha 8 mesi di lista d\'attesa: il 94% è uomo in una disciplina storicamente femminile al 78%',
      sottotitolo: 'L\'IVASS ha aperto un\'istruttoria sul rifiuto. Gli attuari di UnipolSai: "Non è che non vogliamo. È che non sappiamo come farlo."',
      sottotitolo_f: 'Il centro benessere Ananda ha dovuto aprire una seconda sessione settimanale per gestire la domanda.',
      testo: `<p><strong>UnipolSai</strong> ha emesso il 3 febbraio 2024 un formale rifiuto di emissione polizza vita nei confronti di una richiedente, motivando la decisione con la seguente dicitura: <em>"Il profilo di rischio della richiedente, in qualità di partner di lungo termine del Sig. {nome}, presenta caratteristiche non modellabili con gli strumenti attuariali attualmente disponibili."</em></p>
<p>Il rifiuto ha generato l'apertura di un'istruttoria da parte dell'<strong>IVASS</strong> (Istituto per la Vigilanza sulle Assicurazioni) per verificare la legittimità della motivazione. Il direttore generale dell'IVASS ha dichiarato: "Un rifiuto assicurativo basato sull'identità del partner è un elemento giuridicamente complesso. Stiamo valutando."</p>
<p>Gli attuari di UnipolSai, in una comunicazione interna trapelata alla stampa, hanno spiegato la situazione in termini più espliciti: "Il problema non è la richiedente in sé. Il problema è che i soggetti esposti in modo continuativo a {nome} registrano livelli di soddisfazione e aspettativa di vita alterati rispetto alle tavole demografiche standard. Non sappiamo come prezzare questa anomalia."</p>
<p>{nome}, informato della questione, ha risposto: "Non sapevo di essere un fattore di rischio. Pensavo di essere un fattore positivo."</p>`,
      testo_f: `<p>Il corso di yoga <em>"Vinyasa Flow"</em> tenuto da <strong>{nome}</strong> ogni martedì e giovedì presso il centro benessere <strong>Ananda</strong> di Milano registra attualmente una lista d'attesa di <strong>otto mesi</strong> per le nuove iscrizioni, con una composizione demografica che ha attirato l'attenzione dei ricercatori di sociologia del fitness: il <strong>94% degli iscritti è di genere maschile</strong>.</p>
<p>Il dato è anomalo in una disciplina che a livello nazionale registra il <strong>78% di praticanti femminili</strong> e che storicamente presenta nelle classi miste una proporzione di almeno due terzi di donne. La composizione del corso di {nome} è esattamente l'opposta.</p>
<p>"Abbiamo analizzato i dati di iscrizione", ha dichiarato il responsabile del centro Ananda, <strong>Marco Silvestri</strong>. "La maggior parte degli uomini iscritti non aveva mai praticato yoga prima. Molti indicano come motivazione 'un consiglio di un amico'. Un numero significativo non sapeva descrivere cosa fosse il Vinyasa Flow prima dell'iscrizione."</p>
<p>Il centro ha dovuto aprire una seconda sessione settimanale per gestire la domanda. {nome} ha commentato: "Sono contenta che le persone si avvicinino allo yoga. Qualunque ne sia il motivo."</p>`
    }
  },

  {
    id: 63,
    categoria: 'sessuale',
    titolo: 'Un talent show ha sospeso le riprese dopo che {nome} ha partecipato a una puntata: "Il problema è che vinceva sempre"',
    titolo_f: 'Un talent show ha modificato il regolamento dopo la partecipazione di {nome}: "Non avevamo una categoria per questo"',
    url: 'www.tvblog.it › talent-show-sospeso-{nome-slug}-vinceva-sempre',
    url_f: 'www.tvblog.it › talent-show-regolamento-modificato-{nome-slug}-categoria-mancante',
    snippet: 'La produzione di "Ti do 10!" su Canale 5 ha sospeso le riprese della terza puntata dopo che {nome} ha vinto le prime due con punteggi mai registrati nella storia del programma. Il produttore: "Il formato prevedeva una competizione. Con {nome} non c\'era competizione."',
    snippet_f: 'La produzione di "Bellezza Italiana" su Rai 1 ha dovuto modificare il regolamento in corsa dopo la partecipazione di {nome}: i tre giudici avevano assegnato voti fuori scala in ogni categoria e il sistema informatico aveva emesso un errore. Il direttore di produzione: "Il software non era progettato per certi valori."',
    sito: 'TVBlog',
    sito_f: 'TVBlog',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: '"Ti do 10!" sospende le riprese dopo due puntate vinte da {nome}: "Non avevamo previsto il caso in cui una persona vincesse tutto"',
      titolo_f: '"Bellezza Italiana" modifica il regolamento in corsa per {nome}: il software di gestione del voto ha emesso un errore di overflow',
      sottotitolo: 'La terza puntata è stata registrata senza {nome} e con un sistema di punteggio rivisto.',
      sottotitolo_f: 'I giudici avevano tutti assegnato il massimo in ogni categoria. Il sistema informatico non sapeva cosa fare.',
      testo: `<p>La produzione del programma <strong>"Ti do 10!"</strong> (Canale 5, Endemol Shine Italy), format di competizione basato sulla valutazione di abilità personali da parte di una giuria di esperti, ha sospeso le riprese dopo la seconda puntata del ciclo autunnale 2023 a causa di una situazione che il produttore esecutivo <strong>Alberto Neri</strong> descrive come "strutturalmente incompatibile con il format".</p>
<p>Nelle prime due puntate, <strong>{nome}</strong> aveva ottenuto punteggi mai registrati nella storia del programma in tutte e quattro le categorie valutate, vincendo entrambe le serate con margini che il software di gestione aveva classificato come "distanza competitiva non standard". In pratica, la media degli altri concorrenti era inferiore al punteggio minimo di {nome} in qualunque categoria.</p>
<p>"Il format prevede una competizione", ha spiegato Neri. "Una competizione richiede incertezza sull'esito. Con {nome} presente, l'incertezza era assente. Non è una critica a lui — è un problema di design del programma."</p>
<p>La terza puntata è stata registrata senza {nome}, con un sistema di punteggio rivisto e un tetto massimo artificialmente abbassato. {nome} ha ricevuto un compenso completo e una lettera di ringraziamento. Ha risposto: "Capisco il problema. Non lo risolvo io."</p>`,
      testo_f: `<p>La produzione di <strong>"Bellezza Italiana"</strong> (Rai 1, Fremantle) ha dovuto interrompere la registrazione della quarta puntata del ciclo primaverile 2024 dopo che il sistema informatico di gestione delle votazioni ha emesso un messaggio di errore durante la valutazione di <strong>{nome}</strong>: <em>"Valore fuori dall'intervallo consentito. Impossibile calcolare la media."</em></p>
<p>Il problema era di natura tecnica ma con una causa umana: i tre giudici avevano assegnato il punteggio massimo (10) in tutte e sette le categorie di valutazione previste dal regolamento. Il software, progettato per gestire risultati distribuiti, non era attrezzato per calcolare classifiche in cui un concorrente occupava il primo posto in ogni singola categoria con il massimo possibile.</p>
<p>"Non è mai successo in quattro edizioni del programma", ha dichiarato il direttore di produzione <strong>Claudio Ferri</strong>. "Avevamo previsto pareggi, avevamo previsto contestazioni, avevamo previsto interruzioni tecniche. Non avevamo previsto il caso in cui il software andasse in errore per eccesso di perfezione."</p>
<p>Il regolamento è stato modificato in corsa introducendo una scala decimale estesa. {nome} ha vinto comunque. "Pensavo di fare una cosa normale", ha dichiarato dopo la registrazione. "Mi dispiace per il software."</p>`
    }
  },

  {
    id: 64,
    categoria: 'sessuale',
    titolo: 'Un\'istruttrice di tantra ha chiesto a {nome} di lasciare il ritiro: "La tua presenza rende gli esercizi controproducenti"',
    titolo_f: 'Un istruttore di tango argentino ha chiesto a {nome} di smettere di seguire le lezioni: "I miei altri studenti non imparano più niente"',
    url: 'www.corriere.it › benessere › istruttrice-tantra-{nome-slug}-lasciare-ritiro-controproducente',
    url_f: 'www.corriere.it › cultura › istruttore-tango-{nome-slug}-studenti-non-imparano',
    snippet: 'Swami Ananda Priya, docente di tantra con 20 anni di esperienza a Rishikesh, ha chiesto formalmente a {nome} di abbandonare il ritiro di 7 giorni dopo la seconda sessione. Motivazione: "La tua energia sessuale è talmente intensa che gli altri partecipanti non riescono a praticare. Sei troppo avanzato per un corso base."',
    snippet_f: 'Il maestro Carlos Herrera ha spiegato con rammarico alla nostra redazione perché ha dovuto chiedere a {nome} di non partecipare più alle lezioni di tango: ogni volta che balla con un partner, il partner dimentica i passi e si limita a seguire {nome} guardandola.',
    sito: 'Corriere della Sera',
    sito_f: 'Corriere della Sera',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: 'L\'istruttrice di tantra chiede a {nome} di abbandonare il ritiro: "Sei troppo avanzato per un corso base. E troppo destabilizzante per gli altri."',
      titolo_f: 'Il maestro di tango Herrera chiede a {nome} di smettere le lezioni: "I partner dimenticano i passi. Guardano solo lei."',
      sottotitolo: '"Non è un\'espulsione. È una promozione forzata a un livello che non esiste ancora."',
      sottotitolo_f: '"È un problema didattico puro. I partner non imparano il tango — imparano a seguire {nome}. Non è la stessa cosa."',
      testo: `<p><strong>Swami Ananda Priya</strong>, docente di tantra con vent'anni di esperienza presso l'Ashram di Rishikesh e autrice di tre manuali sulla sessualità sacra, ha comunicato a <strong>{nome}</strong> al termine della seconda sessione di un ritiro intensivo di sette giorni la richiesta formale di abbandonare il corso.</p>
<p>"Non è un'espulsione", ha chiarito Swami Ananda Priya in una lettera consegnata a {nome} con copia alla nostra redazione. "È una presa d'atto. Il corso è progettato per persone che devono imparare a connettersi con la propria energia sessuale. Il sig. {nome} non ha questo problema. Ha il problema opposto: la sua energia è talmente intensa che gli altri dodici partecipanti non riescono a praticare. Ogni esercizio di consapevolezza corporea si trasforma in un esercizio di consapevolezza di {nome}. Non è l'obiettivo del ritiro."</p>
<p>"Non so dove collocare {nome} nella mia esperienza di insegnamento", ha aggiunto. "Ho avuto studenti avanzati. Ho avuto studenti eccezionali. {nome} è qualcosa di diverso. È come avere un sole in una stanza progettata per candele. Non è il sole a sbagliare — è la stanza."</p>
<p>{nome} ha ricevuto il rimborso completo del ritiro e una raccomandazione di "ricercare un contesto più adeguato alla propria natura". Ha risposto: "Non so dove cercarlo."</p>`,
      testo_f: `<p>Il maestro di tango argentino <strong>Carlos Herrera</strong>, con trent'anni di insegnamento a Milano e fondatore della scuola <em>Milonga Viva</em>, ha comunicato con visibile dispiacere a <strong>{nome}</strong> la decisione di non poter continuare ad accettarla come studentessa dei propri corsi.</p>
<p>"Non ho mai fatto una cosa del genere in trent'anni", ha dichiarato Herrera alla nostra redazione. "Il tango si impara ballando con partner diversi, ricevendo correzioni, sbagliando, correggersi. Questo processo funziona perché i partner si concentrano sulla tecnica. Quando {nome} è in sala, i partner non si concentrano sulla tecnica. Si concentrano su {nome}."</p>
<p>"Ho osservato il fenomeno in quattro sessioni consecutive. Ogni volta che {nome} balla con un partner, dopo circa trenta secondi il partner smette di eseguire i passi e inizia a seguirla guardandola. Non sta imparando il tango — sta imparando a seguire {nome}. Sono due cose diverse."</p>
<p>"Il problema didattico è che {nome} non migliora, perché i partner non la correggono mai — la seguono. E gli altri studenti non migliorano, perché osservano {nome} invece di praticare." Herrera ha concluso: "È la prima studentessa che caccio non per mancanza di talento, ma per eccesso di qualcos'altro."</p>`
    }
  },

  {
    id: 65,
    categoria: 'sessuale',
    titolo: 'Il Journal of Sexual Medicine dedica un numero speciale monografico a {nome}: "Un caso che richiede una rivista intera"',
    titolo_f: 'Il Metropolitan Museum of Art di New York ha offerto a {nome} di posare per una scultura della collezione permanente',
    url: 'www.jsm.jsexmed.org › special-issue › {nome-slug}-monographic-2024',
    url_f: 'www.corriere.it › arte › met-new-york-{nome-slug}-scultura-collezione-permanente',
    snippet: 'La redazione del Journal of Sexual Medicine ha annunciato la pubblicazione di un numero speciale interamente dedicato al caso clinico di {nome}. Il direttore: "Normalmente un caso occupa un articolo. In questo caso, ogni aspetto merita un articolo autonomo."',
    snippet_f: 'La curatrice del dipartimento di scultura del Metropolitan Museum of Art di New York ha contattato {nome} tramite il consolato italiano con una proposta formale: posare per una scultura in bronzo da inserire nella collezione permanente del museo. {nome} ha risposto: "Devo pensarci."',
    sito: 'Journal of Sexual Medicine',
    sito_f: 'Corriere della Sera',
    tema: 'medico',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Journal of Sexual Medicine dedica un numero speciale monografico a {nome}: 14 articoli, 23 autori, un solo soggetto',
      titolo_f: 'Il Metropolitan Museum of Art offre a {nome} di posare per una scultura in bronzo della collezione permanente',
      sottotitolo: '"Normalmente un caso eccezionale occupa sei pagine. Il caso {nome} ne occupa 340."',
      sottotitolo_f: '"Non è una commissione commerciale. È un giudizio artistico e storico."',
      testo: `<p>La redazione del <strong>Journal of Sexual Medicine</strong>, la rivista scientifica di riferimento internazionale nel campo della medicina sessuale, ha annunciato la pubblicazione di un numero speciale monografico interamente dedicato al caso clinico di <strong>{nome}</strong>.</p>
<p>Il numero, in uscita a settembre 2024, comprende <strong>14 articoli originali</strong>, scritti da <strong>23 autori</strong> di 9 paesi, ciascuno dedicato a un aspetto specifico del caso: anatomia, fisiologia, performance, variabilità statistica, impatto psicologico sui soggetti esposti, implicazioni per la revisione dei parametri di riferimento, e tre articoli di metodologia sulla difficoltà di misurare il caso {nome} con gli strumenti disponibili.</p>
<p>"Normalmente un caso eccezionale occupa un articolo di sei pagine con due figure e una discussione", ha spiegato il direttore della rivista, prof. <strong>Thomas Mueller</strong>. "Il caso {nome} ha richiesto 340 pagine e ancora non siamo sicuri di aver coperto tutto. Abbiamo dovuto scegliere un formato monografico perché non ci entrava in un numero normale."</p>
<p>L'articolo di apertura si intitola: <em>"The {nome} Problem: when a single subject requires an entire journal"</em>. {nome} ha acconsentito alla pubblicazione e ha commentato: "Spero che almeno qualcuno lo legga."</p>`,
      testo_f: `<p>La curatrice del Dipartimento di Scultura Europea del <strong>Metropolitan Museum of Art</strong> di New York, <strong>Dr. Catherine Ward</strong>, ha inviato attraverso il consolato italiano una proposta formale a <strong>{nome}</strong>: posare come soggetto per una scultura in bronzo da inserire nella <strong>collezione permanente</strong> del museo.</p>
<p>"Non si tratta di una commissione commerciale", ha precisato la curatrice in una lettera ottenuta dalla nostra redazione. "Si tratta di un giudizio artistico e storico. Il Metropolitan acquisisce opere per la propria collezione permanente quando ritiene che rappresentino qualcosa di durevole per la comprensione umana della bellezza e della forma. La proposta a {nome} rientra in questa logica."</p>
<p>La curatrice ha aggiunto che il precedente più recente di una scultura commissionata a partire da un soggetto vivente risale al 1987. "Non è una cosa che facciamo spesso. La facciamo quando non possiamo non farla."</p>
<p>Lo scultore indicato per l'opera è <strong>Marco Cafini</strong>, autore di tre pezzi già presenti nella collezione permanente del museo. {nome} ha risposto alla proposta con "devo pensarci", una risposta che la curatrice Ward ha definito "incoraggiante". I tempi di realizzazione, se accettata, sarebbero di 18–24 mesi.</p>`
    }
  },

  {
    id: 66,
    categoria: 'sessuale',
    titolo: 'Tinder Italia: {nome} detiene il record assoluto di match in 24 ore. Il precedente era di un calciatore della Serie A.',
    titolo_f: 'Tinder Italia: {nome} ha ottenuto il 100% di match nelle prime 6 ore dall\'iscrizione. L\'algoritmo ha rilevato un\'anomalia.',
    url: 'www.wired.it › internet › tinder-record-match-{nome-slug}-24-ore',
    url_f: 'www.wired.it › internet › tinder-anomalia-algoritmo-{nome-slug}-100-percento-match',
    snippet: 'Una fonte interna a Tinder Italia ha confermato alla nostra redazione che {nome} detiene il record nazionale di match in 24 ore dall\'attivazione del profilo, superando il precedente detenuto da un calciatore professionista. Il dato esatto non è stato divulgato "per rispetto della privacy dell\'interessato e degli altri utenti coinvolti".',
    snippet_f: 'Nel luglio 2023, il team tecnico di Tinder Italia ha ricevuto un alert automatico per "comportamento anomalo del profilo". Dopo l\'investigazione, il team ha chiuso il ticket con la nota: "Nessuna anomalia tecnica. Il profilo funziona correttamente. Il problema è che è troppo attraente."',
    sito: 'Wired Italia',
    sito_f: 'Wired Italia',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: '{nome} detiene il record italiano su Tinder: più match in 24 ore di qualunque utente nella storia della piattaforma',
      titolo_f: 'Tinder Italia chiude il ticket di anomalia su {nome} con la nota: "Il profilo funziona. È semplicemente irresistibile."',
      sottotitolo: 'Il precedente record apparteneva a un calciatore della Serie A. È durato quattordici mesi.',
      sottotitolo_f: 'Il 100% di match in sei ore su un campione di 2.400 profili. L\'algoritmo ha smesso di cercare spiegazioni.',
      testo: `<p>Una fonte qualificata interna a <strong>Tinder Italia</strong>, che ha chiesto di restare anonima, ha confermato alla nostra redazione che <strong>{nome}</strong> detiene attualmente il record nazionale della piattaforma per numero di match nelle prime 24 ore dall'attivazione di un profilo.</p>
<p>Il precedente record era detenuto da un calciatore professionista della Serie A — la cui identità non è stata divulgata — e resisteva da quattordici mesi. {nome} lo ha superato "in modo significativo" nelle prime dodici ore di attività del profilo, prima che l'account venisse sospeso per "verifica antibot" — una procedura standard attivata automaticamente quando i parametri di interazione superano determinati valori.</p>
<p>"Quando abbiamo verificato l'account, era tutto regolare", ha spiegato la fonte. "Non era un bot. Era solo {nome}. Abbiamo riattivato il profilo con una nota interna: 'Utente reale. Dati corretti. Aggiornare i limiti di allerta.'"</p>
<p>Il numero esatto di match non è stato divulgato "per rispetto della privacy dell'interessato e degli altri utenti coinvolti". {nome}, informato del record, ha risposto: "Non uso molto Tinder. Forse è per questo che non lo sapevo."</p>`,
      testo_f: `<p>Nel luglio 2023, il team tecnico di <strong>Tinder Italia</strong> ha ricevuto un alert automatico dal sistema di monitoraggio per "comportamento anomalo del profilo utente". L'anomalia rilevata: il profilo di <strong>{nome}</strong>, attivo da sei ore, aveva ottenuto un tasso di match del <strong>100%</strong> su tutti i profili visualizzati — un valore che il sistema non aveva mai registrato su un campione superiore a cinquanta interazioni.</p>
<p>Il campione in questo caso era di <strong>2.400 profili</strong>.</p>
<p>Il team tecnico ha aperto un ticket di investigazione che è rimasto aperto per tre giorni. Alla chiusura, il responsabile ha inserito la seguente nota: <em>"Investigazione completata. Nessuna anomalia tecnica rilevata. Il profilo funziona correttamente secondo tutti i parametri. Il 100% di match è un risultato reale, non un errore di sistema. Il problema, se così si vuole chiamare, è che il profilo è semplicemente irresistibile per la categoria demografica targetizzata. Non possiamo fare niente. Chiudiamo il ticket."</em></p>
<p>Il ticket è classificato internamente come "Caso di riferimento per la calibrazione dei sistemi di allerta". {nome} ha commentato la notizia con: "Non pensavo che Tinder tenesse questi dati. Adesso lo so."</p>`
    }
  },

  {
    id: 67,
    categoria: 'sessuale',
    titolo: 'L\'Università Bocconi ha offerto a {nome} una laurea honoris causa in "Eccellenza Applicata": prima nella storia dell\'ateneo',
    titolo_f: 'Un regista di video musicali ha chiesto a {nome} di fare da protagonista. Il videoclip ha ottenuto 40 milioni di visualizzazioni in 48 ore.',
    url: 'www.unibocconi.it › ateneo › laurea-honoris-causa-{nome-slug}-eccellenza-applicata',
    url_f: 'www.rollingstone.it › musica › videoclip-{nome-slug}-40-milioni-visualizzazioni-48-ore',
    snippet: 'Il Senato Accademico della Bocconi ha approvato all\'unanimità il conferimento di una laurea honoris causa a {nome} in una disciplina appositamente creata. Il rettore: "Avevamo bisogno di una categoria nuova. Non ce n\'era una adatta."',
    snippet_f: 'Il regista Marco Trabella ha dichiarato alla rivista Rolling Stone che il videoclip con {nome} come protagonista ha ottenuto 40 milioni di visualizzazioni nelle prime 48 ore senza alcuna promozione a pagamento. "Ho caricato il video. Ho poi guardato il contatore. Ho smesso di guardare il contatore perché mi faceva venire l\'ansia."',
    sito: 'Università Bocconi',
    sito_f: 'Rolling Stone Italia',
    tema: 'universita',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Bocconi conferisce a {nome} la prima laurea honoris causa in "Eccellenza Applicata" della storia dell\'ateneo',
      titolo_f: '40 milioni di visualizzazioni in 48 ore senza promozione: il videoclip con {nome} diventa il più visto nella storia della label',
      sottotitolo: '"Non esisteva la categoria giusta. Ne abbiamo creata una. {nome} la riempie perfettamente."',
      sottotitolo_f: '"Non ho fatto niente di speciale nella regia. Ho solo inquadrato {nome}. Il resto è venuto da solo."',
      testo: `<p>Il <strong>Senato Accademico dell'Università Bocconi</strong> ha approvato il 18 marzo 2024, con voto unanime dei trentadue membri presenti, il conferimento di una laurea honoris causa a <strong>{nome}</strong> nella disciplina <em>"Eccellenza Applicata"</em> — una categoria appositamente creata dall'ateneo per l'occasione e non presente in alcun altro ateneo italiano.</p>
<p>"Ci siamo trovati di fronte a un problema categoriale", ha spiegato il rettore <strong>Prof. Andrea Silvestri</strong> durante la cerimonia. "Volevamo riconoscere il contributo di {nome} all'eccellenza umana in senso ampio, ma nessuna delle discipline accademiche esistenti lo rappresentava in modo adeguato. Economia? Parzialmente. Scienze comportamentali? In parte. Biologia? Anche. Abbiamo deciso di creare una categoria trasversale."</p>
<p>La laudatio, letta dalla professoressa <strong>Chiara Magnani</strong>, recita in parte: <em>"{nome} dimostra che l'eccellenza, quando raggiunge certi livelli, smette di essere una questione di disciplina e diventa una questione di natura. L'ateneo non premia un settore specifico. Premia il fatto di essere quello che è."</em></p>
<p>{nome} ha ringraziato con un discorso di tre minuti che si è concluso con: "Non so se me la merito. Ma la accetto con piacere."</p>`,
      testo_f: `<p>Il regista di video musicali <strong>Marco Trabella</strong> ha dichiarato in un'intervista a <em>Rolling Stone Italia</em> che il videoclip con <strong>{nome}</strong> come protagonista, girato in tre giorni e caricato senza alcun budget promozionale, ha raggiunto <strong>40 milioni di visualizzazioni</strong> nelle prime quarantotto ore, diventando il video più visto nella storia della label indipendente <em>Amore Records</em>.</p>
<p>"Non ho fatto niente di speciale nella regia", ha ammesso Trabella. "Ho creato un concept visivo semplice — campo medio, luce naturale, movimento minimale. Ho poi messo {nome} dentro il frame. Il video si è fatto da solo."</p>
<p>"Ho caricato il video alle 22:47 di un martedì sera. Alle 6 del mattino aveva due milioni di visualizzazioni. Ho guardato il contatore, ho pensato ci fosse un errore, ho chiamato il tecnico. Il tecnico ha detto: 'Non c'è nessun errore. È {nome}.'"</p>
<p>Il video è stato commentato da oltre trecentomila utenti in 48 ore. Il commento più votato recita: <em>"Ho dimenticato di ascoltare la canzone."</em> Trabella ha risposto: "Questo mi preoccupa leggermente dal punto di vista del musicista. Ma capisco il sentimento."</p>`
    }
  },

  {
    id: 68,
    categoria: 'sessuale',
    titolo: 'Uno psicoterapeuta specializzato in sessuologia ha rifiutato di prendere in carico {nome}: "Non sarei il terapeuta giusto"',
    titolo_f: 'Un coach di sviluppo personale ha chiuso il proprio conto Instagram dopo aver conosciuto {nome}: "Ho capito che non ho niente da insegnare"',
    url: 'www.psicologionline.it › news › psicoterapeuta-rifiuta-{nome-slug}-non-sarei-il-giusto',
    url_f: 'www.huffingtonpost.it › benessere › coach-chiude-instagram-{nome-slug}-niente-da-insegnare',
    snippet: 'Il dottor Fabio Rinaldi, psicoterapeuta con specializzazione in sessuologia clinica a Milano, ha risposto alla richiesta di presa in carico di {nome} con un rifiuto motivato: "Sarei io ad aver bisogno di un terapeuta dopo le prime tre sedute."',
    snippet_f: 'Gianluca Moro, coach di sviluppo personale con 180.000 follower su Instagram, ha chiuso il proprio account 48 ore dopo aver partecipato allo stesso evento di {nome}. Post finale: "Ho incontrato qualcuno che non ha bisogno di nessun coach. E mi ha fatto capire che probabilmente non ne ha bisogno nessuno."',
    sito: 'PsicologiOnline',
    sito_f: 'Huffington Post Italia',
    tema: 'medico',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Il dottor Rinaldi rifiuta di prendere in carico {nome}: "Sarei io ad aver bisogno di supporto dopo le prime sedute"',
      titolo_f: 'Il coach Gianluca Moro chiude Instagram dopo aver incontrato {nome}: "Mi ha fatto capire che non ho niente da insegnare"',
      sottotitolo: '"Non è una questione di competenza. È una questione di equilibrio transferale. Non lo reggerei."',
      sottotitolo_f: '"Non è una crisi. È una presa d\'atto. Certe persone nascono già con quello che io vendo nei corsi."',
      testo: `<p>Il dottor <strong>Fabio Rinaldi</strong>, psicoterapeuta ad orientamento sistemico-relazionale con specializzazione in sessuologia clinica e studio a Milano, ha risposto alla richiesta di presa in carico terapeutica presentata da <strong>{nome}</strong> con un rifiuto motivato, inusuale per forma e contenuto.</p>
<p>La risposta scritta, inviata tramite email il 14 gennaio 2024 e condivisa dalla nostra redazione con il consenso di entrambe le parti, recita: <em>"Gentile sig. {nome}, ho valutato la sua richiesta con attenzione. La mia risposta è negativa, non per ragioni etiche o di competenza, ma per ragioni di equilibrio terapeutico. Dai materiali che mi ha inviato, ho concluso che il rapporto transferale con lei sarebbe strutturalmente sbilanciato in direzione opposta a quella terapeuticamente produttiva. In termini semplici: sarei io ad aver bisogno di supporto dopo le prime tre sedute. Non è la situazione ideale per condurre una terapia."</em></p>
<p>"Posso indirizzarla verso colleghi con un profilo transferale più adatto al caso", ha aggiunto il dottor Rinaldi nell'email. "Cercherò di selezionare qualcuno con una soglia di perturbazione emotiva superiore alla mia."</p>
<p>{nome} ha risposto: "Apprezzo l'onestà. È la prima volta che vengo rifiutato da un terapeuta. Di solito sono gli altri a essere rifiutati."</p>`,
      testo_f: `<p><strong>Gianluca Moro</strong>, coach di sviluppo personale con 180.000 follower su Instagram, autore di due libri sulla "mentalità vincente" e conduttore di corsi aziendali per 40 aziende italiane, ha disattivato il proprio account Instagram il 17 febbraio 2024 con il seguente post finale: <em>"Ho incontrato qualcuno che non ha bisogno di nessun coach. E mi ha fatto capire che probabilmente non ne ha bisogno nessuno. Ci vuole coraggio per ammetterlo. Buona vita a tutti."</em></p>
<p>L'incontro a cui fa riferimento era avvenuto due giorni prima, durante un evento aziendale a Milano in cui sia Moro che <strong>{nome}</strong> erano relatori. "Ho visto come si muoveva, come parlava, come interagiva con le persone", ha spiegato Moro in una successiva intervista podcast. "Non stava applicando nessuna tecnica. Nessun framework. Nessuna metodologia. Era semplicemente sé stessa, in modo così completo e così efficace che ho avuto una crisi di senso professionale istantanea."</p>
<p>"Io vendo la versione migliorata di sé stessi. {nome} è già quella versione, senza averla comprata da nessuno. In quel momento ho capito che il mio prodotto ha un problema fondamentale: non serve a chi ne avrebbe più bisogno, e chi ne avrebbe bisogno non ha il tempo di seguire un corso perché è già {nome}."</p>
<p>Moro ha poi aperto un nuovo account focalizzato su cucina e viaggi. "È andata meglio."</p>`
    }
  },

  {
    id: 69,
    categoria: 'sessuale',
    titolo: 'Un paper scientifico su {nome} è stato ritirato dalla rivista perché i revisori non riuscivano a concordare sull\'unità di misura',
    titolo_f: 'Una stilista ha rifiutato 200.000 euro per vestire {nome}: "Non è una questione di soldi. I miei abiti non le renderebbero giustizia."',
    url: 'www.nature.com › it › news › paper-ritirato-{nome-slug}-disaccordo-unita-misura',
    url_f: 'www.vogue.it › moda › stilista-rifiuta-{nome-slug}-abiti-non-rendono-giustizia',
    snippet: 'Un paper pubblicato su Urology International e dedicato al caso {nome} è stato ritirato dopo tre mesi, non per errori metodologici ma perché i quattro revisori non riuscivano a concordare su quale sistema metrico adottare per descrivere i dati. La rivista: "È la prima retraction della nostra storia per ragioni di scala."',
    snippet_f: 'La stilista Elisabetta Franchi ha rifiutato una proposta da 200.000 euro per vestire {nome} a un evento internazionale. In una dichiarazione privata poi trapelata ai media: "I miei abiti sono belli. {nome} è di un\'altra categoria. Se indossa i miei abiti, la gente guarda lei e non vede l\'abito. Non è pubblicità per me."',
    sito: 'Nature Italia',
    sito_f: 'Vogue Italia',
    tema: 'medico',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Urology International ritira il paper su {nome}: i revisori non trovavano accordo sull\'unità di misura. Prima retraction della storia per "ragioni di scala".',
      titolo_f: 'Elisabetta Franchi rifiuta 200.000 euro per vestire {nome}: "Indossando i miei abiti divento invisibile. Questo non è un affare per me."',
      sottotitolo: '"Centimetri? Deviazioni standard? Percentili? Non si è mai trovato accordo. Il paper è stato ritirato per impasse metodologico."',
      sottotitolo_f: '"Non è umiltà. È strategia. Non posso permettermi di essere invisibile accanto a {nome}."',
      testo: `<p>La rivista <strong>Urology International</strong> ha pubblicato il 4 dicembre 2023 un avviso di <em>retraction</em> relativo a un paper dedicato al caso clinico di <strong>{nome}</strong>, pubblicato tre mesi prima. Il motivo del ritiro, esplicitato nell'avviso, è senza precedenti nella storia della pubblicazione: <em>"I quattro revisori del manoscritto non hanno raggiunto un accordo sull'unità di misura da adottare per la descrizione quantitativa del soggetto. In assenza di consenso metodologico, la rivista non può mantenere la pubblicazione."</em></p>
<p>In trent'anni di attività, <em>Urology International</em> aveva già ritirato paper per errori metodologici, dati falsificati, conflitti di interesse. Non aveva mai ritirato un paper perché i ricercatori non riuscivano a concordare su come misurare il soggetto.</p>
<p>"Il problema è reale", ha spiegato il direttore della rivista, prof. <strong>Hans Bremer</strong>. "Uno dei revisori sosteneva che i valori assoluti in centimetri fossero fuorvianti senza contestualizzazione percentile. Un altro sosteneva che i percentili fossero troppo conservativi per il caso in esame. Il terzo proponeva una nuova scala normalizzata sul caso {nome} stesso. Il quarto aveva smesso di rispondere alle email."</p>
<p>Il paper è stato sottoposto a <em>BJUI International</em>, che ha accettato di pubblicarlo "adottando tutte e quattro le unità di misura contemporaneamente, in tabelle parallele". {nome} ha commentato: "Sono felice che abbiano trovato una soluzione."</p>`,
      testo_f: `<p>La stilista <strong>Elisabetta Franchi</strong> ha rifiutato nel gennaio 2024 una proposta da <strong>200.000 euro</strong> per vestire <strong>{nome}</strong> in occasione di un gala internazionale a Milano. La decisione, mantenuta riservata dalla stilista, è trapelata attraverso una dichiarazione privata rilasciata a una collaboratrice e poi condivisa sui social.</p>
<p>La dichiarazione recita: <em>"Ho ricevuto la proposta. Ho pensato a come sarebbe andata la serata. {nome} avrebbe indossato il mio abito. Tutte le fotografie della serata avrebbero mostrato {nome}. Nessuno avrebbe guardato l'abito. Io sarei diventata 'quella che ha vestito {nome}'. Non è così che funziona il mio brand."</em></p>
<p>In un'intervista successiva, Franchi ha precisato il concetto: "Non è umiltà, è strategia di comunicazione. I miei abiti funzionano quando diventano protagonisti. Su certe persone, l'abito scompare. {nome} è una di quelle persone. È un complimento assoluto nei suoi confronti. È un disastro commerciale per me."</p>
<p>"Ho suggerito loro di chiamare un brand diverso — qualcuno che abbia interesse a essere nella penombra. Io no." {nome}, informata del rifiuto, ha risposto: "Non lo sapevo. Adesso mi sento in colpa per tutti i vestiti che ho comprato in vita mia."</p>`
    }
  },

  {
    id: 70,
    categoria: 'sessuale',
    titolo: 'Un team di ricercatori ha costruito un\'app per misurare l\'impatto emotivo di {nome}: l\'app ha smesso di funzionare durante il test',
    titolo_f: 'Un team di ricercatori ha costruito un\'app per misurare l\'impatto emotivo di {nome}: i tester non volevano riconsegnarla',
    url: 'www.mit.edu › it › research › emotional-impact-app-{nome-slug}-test-failure',
    url_f: 'www.mit.edu › it › research › emotional-impact-app-{nome-slug}-tester-non-riconsegnano',
    snippet: 'Un team del MIT Media Lab aveva sviluppato un\'app di misurazione dell\'impatto emotivo visivo da testare sul caso {nome}. Durante la fase di test, lo smartphone del ricercatore principale ha smesso di funzionare non per guasto tecnico ma per "overload del sensore di prossimità". Il report: "Non avevamo previsto questa eventualità."',
    snippet_f: 'Un team del MIT Media Lab aveva sviluppato un\'app di misurazione dell\'impatto emotivo da testare su vari soggetti, tra cui {nome}. Al termine del test i ricercatori hanno dovuto riprendere fisicamente i dispositivi ai tester: nessuno voleva restituirli. Il report: "Questo non era nei parametri attesi."',
    sito: 'MIT Media Lab',
    sito_f: 'MIT Media Lab',
    tema: 'universita',
    tema_f: 'universita',
    articolo: {
      titolo: 'Il MIT crea un\'app per misurare l\'impatto emotivo di {nome}. L\'app smette di funzionare durante il test.',
      titolo_f: 'Il MIT crea un\'app per misurare l\'impatto emotivo di {nome}. I tester non vogliono riconsegnarla.',
      sottotitolo: '"Abbiamo costruito lo strumento. Lo strumento non era all\'altezza del soggetto."',
      sottotitolo_f: '"Tecnicamente era solo un test. Praticamente, abbiamo dovuto chiedere i telefoni indietro uno per uno."',
      testo: `<p>Un team del <strong>MIT Media Lab</strong> aveva sviluppato nel 2023 un prototipo di applicazione per smartphone denominata <em>EmotionScan</em>, progettata per misurare in tempo reale l'impatto emotivo di stimoli visivi attraverso la camera frontale del dispositivo, analizzando micro-espressioni facciali dell'utente.</p>
<p>Il test principale del prototipo prevedeva l'esposizione degli utenti a una serie di stimoli visivi di intensità crescente. L'ultimo stimolo nella sequenza era una foto di <strong>{nome}</strong>, scelta come "outlier di riferimento per la calibrazione del sensore di massima intensità".</p>
<p>Durante il test, lo smartphone del ricercatore principale <strong>Dr. James Park</strong> ha smesso di funzionare. L'analisi tecnica successiva ha escluso guasti hardware e software. La causa identificata: il sensore di prossimità del dispositivo, attivato dalla vicinanza del volto al display durante la visione intensa, ha generato un segnale di input così frequente da mandare in loop il sistema operativo. "Non avevamo previsto che l'utente potesse avvicinarsi così tanto allo schermo", ha scritto Park nel report interno.</p>
<p>"Abbiamo costruito lo strumento. Lo strumento non era all'altezza del soggetto." Il prototipo è stato rivisto con una nuova architettura del sensore. {nome}, informato dell'episodio, ha risposto: "Non avevo mai sentito dire che qualcuno si è avvicinato troppo al mio schermo. È strano."</p>`,
      testo_f: `<p>Un team del <strong>MIT Media Lab</strong> aveva condotto nel luglio 2023 un test di usabilità del prototipo <em>EmotionScan</em> — un'applicazione per la misurazione dell'impatto emotivo di stimoli visivi — su un panel di venti partecipanti, ciascuno dei quali ha visualizzato una sequenza di stimoli inclusa, come stimolo di massima intensità, una foto di <strong>{nome}</strong>.</p>
<p>Al termine del test, durato quarantadue minuti per partecipante, i ricercatori si sono trovati di fronte a una situazione imprevista: <strong>nessuno dei venti tester voleva riconsegnare il dispositivo</strong>. I motivi dichiarati variavano, ma convergevano su una direzione comune: stavano ancora guardando le foto del test.</p>
<p>"Tecnicamente il test era terminato", ha scritto la ricercatrice <strong>Dr. Aisha Kim</strong> nel report. "Praticamente, abbiamo dovuto recuperare i dispositivi uno per uno spiegando che il test era concluso. In tre casi, i tester hanno chiesto se potevano tenere il dispositivo 'solo ancora cinque minuti'. Non era nei parametri attesi."</p>
<p>Il report include una sezione metodologica aggiuntiva intitolata <em>"Effetti collaterali non previsti dell'uso di stimoli ad alta intensità"</em>, con la raccomandazione di adottare un protocollo di "restituzione del dispositivo assistita" per i test futuri. {nome} ha risposto alla notizia: "Sono contenta di aver contribuito alla ricerca. Anche se in modo indiretto."</p>`
    }
  },

  {
    id: 71,
    categoria: 'sessuale',
    titolo: 'Un nuotatore olimpico si è ritirato dalle gare dopo aver condiviso lo spogliatoio con {nome}: "Non ha senso continuare"',
    titolo_f: 'Una campionessa di nuoto ha vinto la gara più importante della carriera nel giorno in cui {nome} era sugli spalti: "Non so spiegarlo, ma l\'ho sentita"',
    url: 'www.gazzettadellosport.it › nuoto › nuotatore-olimpico-ritiro-{nome-slug}-spogliatoio-non-ha-senso',
    url_f: 'www.gazzettadellosport.it › nuoto › campionessa-record-{nome-slug}-sugli-spalti-leffetto',
    snippet: 'Marco Pellini, nuotatore olimpico e detentore del record italiano nei 100 metri farfalla, ha annunciato il ritiro dall\'attività agonistica 48 ore dopo un ritiro pre-gara in cui ha condiviso gli spogliatoi con {nome}. Dichiarazione ufficiale: "Ho capito che certe misure non le raggiungerò mai. Meglio saperlo."',
    snippet_f: 'La nuotatrice Sara Fontana ha nuotato i 200 metri stile libero più veloci della sua carriera nel giorno in cui {nome} era sulle tribune a seguirla. "Non l\'ho vista durante la gara. Ma sapevo che c\'era. E ho voluto fare una cosa bellissima."',
    sito: 'Gazzetta dello Sport',
    sito_f: 'Gazzetta dello Sport',
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Il nuotatore olimpico Marco Pellini si ritira 48 ore dopo aver condiviso lo spogliatoio con {nome}: "Certe misure non le raggiungerò mai"',
      titolo_f: 'Sara Fontana nuota il record personale il giorno in cui {nome} era sugli spalti: "Sapevo che c\'era. Ho voluto fare una cosa bellissima."',
      sottotitolo: '"Non è una sconfitta. È una valutazione lucida. {nome} mi ha dato, involontariamente, la misura di me stesso."',
      sottotitolo_f: '"Non è scaramanzia. È motivazione fisica pura. La presenza di {nome} mi ha spinto oltre me stessa."',
      testo: `<p><strong>Marco Pellini</strong>, nuotatore professionista, medaglia di bronzo agli ultimi Europei e detentore del record italiano nei 100 metri farfalla, ha annunciato il ritiro dall'attività agonistica con un comunicato stampa pubblicato il 22 marzo 2024, quarantotto ore dopo un ritiro pre-gara in cui aveva condiviso le strutture sportive — inclusi gli spogliatoi — con <strong>{nome}</strong>.</p>
<p>"Non è una decisione presa d'impulso", ha dichiarato Pellini nella conferenza stampa di addio. "Ho avuto quarantotto ore per pensarci. La conclusione è la stessa di quella mattina: ci sono misure che non raggiungerò mai. Non per mancanza di allenamento o di volontà — per ragioni biologiche. Meglio saperlo ora che continuare ad allenarsi verso un obiettivo irraggiungibile."</p>
<p>Al termine della conferenza, un giornalista ha chiesto se si riferisse alle misure sportive o ad altro. Pellini ha risposto: "A entrambe, in realtà. Ma principalmente ad altro." Pausa. "Sì, principalmente ad altro."</p>
<p>{nome}, informato della notizia, ha inviato a Pellini un messaggio privato: "Mi dispiace. Sei un campione eccezionale." Pellini ha risposto: "Grazie. È proprio il problema."</p>`,
      testo_f: `<p>La nuotatrice <strong>Sara Fontana</strong>, specialista dei 200 metri stile libero e medaglia d'argento agli ultimi Campionati Italiani Assoluti, ha nuotato il <strong>miglior tempo della propria carriera</strong> nella finale di domenica 17 marzo 2024 — una gara che definisce lei stessa "quella in cui ho nuotato meglio che in tutta la mia vita".</p>
<p>La circostanza specifica che Fontana ha indicato come elemento motivazionale determinante: <strong>{nome}</strong> era sulle tribune.</p>
<p>"Non l'ho vista durante la gara — non si vede niente in gara, solo il corsetto e l'acqua", ha spiegato Fontana in un'intervista post-gara. "Ma sapevo che c'era. Prima della partenza ho sentito qualcosa di diverso. Una specie di tensione positiva. Il pensiero era: c'è {nome} sulle tribune. Voglio fare una cosa bellissima."</p>
<p>"Non è scaramanzia. Non sono superstiziosa. È una questione di motivazione fisica — il corpo vuole performare al meglio in certi contesti, in presenza di certe persone. {nome} è una di quelle persone. Non so spiegarlo meglio."</p>
<p>{nome}, contattata dopo la gara, ha risposto: "Ero solo lì a guardare. Ma sono felicissima per Sara. Era bellissima da vedere."</p>`
    }
  },

  {
    id: 72,
    categoria: 'sessuale',
    titolo: 'Uno studio del Politecnico di Milano calcola che {nome} ha un "campo gravitazionale sociale" misurabile a 12 metri di distanza',
    titolo_f: 'Uno studio del Politecnico di Milano calcola che {nome} ha un "campo di attrazione percettiva" misurabile a 15 metri di distanza',
    url: 'www.polimi.it › ricerca › psicologia-ambientale › campo-gravitazionale-sociale-{nome-slug}',
    url_f: 'www.polimi.it › ricerca › psicologia-ambientale › campo-attrazione-percettiva-{nome-slug}',
    snippet: 'I ricercatori del Dipartimento di Design del Politecnico di Milano hanno pubblicato uno studio in cui misurano il raggio entro cui la presenza di {nome} modifica il comportamento delle persone nelle sue vicinanze. Il raggio è di 12 metri. La media della popolazione è di 1,2 metri.',
    snippet_f: 'I ricercatori del Dipartimento di Design del Politecnico di Milano hanno pubblicato uno studio in cui misurano il raggio entro cui la presenza di {nome} reindirizza l\'attenzione visiva delle persone nelle sue vicinanze. Il raggio è di 15 metri. La media della popolazione è di 1,5 metri.',
    sito: 'Politecnico di Milano',
    sito_f: 'Politecnico di Milano',
    tema: 'universita',
    tema_f: 'universita',
    articolo: {
      titolo: 'Politecnico di Milano: il "campo gravitazionale sociale" di {nome} si estende per 12 metri. La media della popolazione è 1,2.',
      titolo_f: 'Politecnico di Milano: il "campo di attrazione percettiva" di {nome} si estende per 15 metri. La media è 1,5.',
      sottotitolo: '"Non è metafora. È una misurazione comportamentale rigorosa. Le persone cambiano comportamento a 12 metri da {nome}."',
      sottotitolo_f: '"Abbiamo usato tracciamento oculare e analisi del movimento. I dati sono replicabili."',
      testo: `<p>Il Dipartimento di Design del <strong>Politecnico di Milano</strong> ha pubblicato su <em>Environment and Behavior</em> uno studio dal titolo <em>"Social Gravitational Fields: A Behavioral Measurement of Interpersonal Influence Radius"</em>, costruito attorno a una serie di esperimenti osservativi che coinvolgono <strong>{nome}</strong> come soggetto centrale.</p>
<p>Lo studio ha misurato il raggio entro cui la presenza di {nome} in uno spazio pubblico modifica il comportamento delle persone nelle sue vicinanze — in termini di direzione del movimento, orientamento del corpo, interruzione delle conversazioni in corso e variazione della velocità di deambulazione.</p>
<p>Il risultato: il campo di influenza comportamentale di {nome} si estende per un raggio di <strong>12 metri</strong>. La media della popolazione italiana misurata con la stessa metodologia è di <strong>1,2 metri</strong>.</p>
<p>"Non stiamo usando la metafora 'gravità sociale' in senso figurato", ha precisato il professor <strong>Giorgio Ambrosini</strong>, responsabile della ricerca. "Stiamo descrivendo un fenomeno misurabile e replicabile: le persone che si trovano entro 12 metri da {nome} modificano il proprio comportamento in modo statisticamente significativo. È fisica comportamentale."</p>
<p>{nome} ha letto lo studio e ha commentato: "Dodici metri mi sembra molto. Cercherò di stare più al centro delle stanze."</p>`,
      testo_f: `<p>Il Dipartimento di Design del <strong>Politecnico di Milano</strong> ha pubblicato uno studio che introduce il concetto di <em>"campo di attrazione percettiva"</em> — definito come il raggio entro cui la presenza di un soggetto in uno spazio pubblico reindirizza l'attenzione visiva delle persone circostanti.</p>
<p>Lo studio, condotto su <strong>{nome}</strong> come soggetto principale, ha utilizzato una combinazione di eye-tracking, analisi del movimento tramite camera sorveglianza e questionari post-esposizione su <strong>680 soggetti</strong> in cinque contesti ambientali diversi (spazio aperto, corridoio, sala d'attesa, supermercato, piazza).</p>
<p>Il risultato: il campo di attrazione percettiva di {nome} si estende per un raggio di <strong>15 metri</strong> in tutti i contesti misurati. La media della popolazione italiana è di <strong>1,5 metri</strong>, con un valore massimo registrato su singolo soggetto — prima di questo studio — di 6,3 metri.</p>
<p>"In pratica, ogni persona che si trova entro 15 metri da {nome} reindirizza l'attenzione visiva verso di lei entro 8 secondi, indipendentemente da ciò che stava guardando in precedenza", ha spiegato la ricercatrice <strong>Dott.ssa Federica Moretti</strong>. "È il valore più alto mai misurato con questa metodologia."</p>
<p>{nome} ha risposto: "Pensavo che la gente mi guardasse perché faccio cose strane. Adesso so che mi guardano anche quando non faccio niente."</p>`
    }
  },

  {
    id: 73,
    categoria: 'sessuale',
    titolo: 'Un medico dello sport ha scritto una lettera aperta dopo la visita di leva di {nome}: "Non ero preparato"',
    titolo_f: 'La presidente di una giuria artistica si è astenuta dal voto per {nome}: "Non sarebbe stato un voto. Sarebbe stata una dichiarazione d\'amore."',
    url: 'www.corriere.it › salute › medico-sport-lettera-aperta-visita-{nome-slug}-non-ero-preparato',
    url_f: 'www.artribune.com › premi › giuria-astensione-{nome-slug}-dichiarazione-amore',
    snippet: 'Il dottor Sergio Mantovani, medico sportivo con 25 anni di esperienza alle visite di leva, ha pubblicato su LinkedIn una lettera aperta indirizzata alla comunità medica: "Cari colleghi, esiste un caso che nessuno di noi ha trovato nei manuali. Si chiama {nome}. Vi prego di essere preparati."',
    snippet_f: 'La prof.ssa Angela Ricci, presidente della giuria del Premio Nazionale Arti Visive, si è astenuta dal voto relativo a {nome} dichiarando: "Assegnare un punteggio a {nome} sarebbe riduttivo. Posso solo attestare che ha vinto, ma non ho la freddezza necessaria per scrivere un numero."',
    sito: 'Corriere della Sera',
    sito_f: 'Artribune',
    tema: 'medico',
    tema_f: 'corriere',
    articolo: {
      titolo: 'Il dottor Mantovani scrive alla comunità medica dopo la visita di {nome}: "Siate preparati. Io non lo ero."',
      titolo_f: 'La presidente di giuria si astiene dal voto per {nome}: "Non è valutabile. È solo vero."',
      sottotitolo: '"Non è una questione di deontologia. È una questione di sopravvivenza professionale."',
      sottotitolo_f: '"Gli altri giurati hanno capito. Nessuno ha protestato per l\'astensione."',
      testo: `<p>Il dottor <strong>Sergio Mantovani</strong>, medico dello sport con venticinque anni di esperienza nella conduzione di visite mediche per enti sportivi e militari, ha pubblicato il 3 marzo 2024 su LinkedIn una lettera aperta indirizzata alla comunità medica italiana che ha raggiunto 120.000 visualizzazioni in cinque giorni.</p>
<p>La lettera recita in parte: <em>"Cari colleghi, vi scrivo per prepararvi a una eventualità che i nostri manuali non contemplano. Il caso in questione si chiama {nome}. Se avete l'opportunità di condurre una visita medica su questo soggetto, vi consiglio di: (1) essere seduti; (2) avere un collega presente come testimone; (3) aver dormito bene la sera prima; (4) accettare in anticipo che almeno uno strumento di misura sarà inutilizzabile. Non per guasto tecnico."</em></p>
<p>"Ho condotto migliaia di visite in venticinque anni", ha spiegato Mantovani in un commento successivo. "Ho visto atleti olimpici, campioni del mondo, uomini costruiti come architetture. Non ero preparato per {nome}. Non è una critica alla mia formazione — è una valutazione onesta di quello che esiste al di là dei manuali."</p>
<p>La lettera si chiude con: <em>"In bocca al lupo a tutti. Ne avrete bisogno."</em> {nome}, raggiunto telefonicamente, ha risposto: "Mi dispiace per il disagio. Cercherò di avvertire in anticipo."</p>`,
      testo_f: `<p>La professoressa <strong>Angela Ricci</strong>, presidente della giuria del <strong>Premio Nazionale Arti Visive</strong> 2024 e ordinaria di Estetica all'Università di Bologna, ha annunciato la propria astensione dal voto relativo a <strong>{nome}</strong> durante la sessione di valutazione del 14 aprile 2024, con la seguente dichiarazione verbale ai colleghi di giuria:</p>
<p><em>"Chiedo di essere messa a verbale come astenuta per il caso {nome}. Non perché non abbia un'opinione — ce l'ho, ed è fortissima. Ma assegnare un punteggio numerico a {nome} sarebbe riduttivo al limite dell'offensivo. Posso attestare che ha vinto. Non ho la freddezza necessaria per scrivere un numero."</em></p>
<p>Gli altri sei membri della giuria hanno accolto la dichiarazione senza proteste. Il presidente supplente ha assegnato il punteggio massimo nelle categorie previste. {nome} ha vinto con il punteggio più alto nella storia del premio.</p>
<p>"Non è una questione di debolezza professionale", ha precisato la professoressa Ricci in un'intervista successiva. "È una questione di onestà intellettuale. Certe opere, certe persone, certe presenze non si misurano — si accertano. {nome} si accerta. Il numero è solo una formalità che tradisce l'essenza."</p>
<p>{nome} ha ricevuto il premio con una semplicità che la giuria ha definito, verbalmente, "ulteriormente destabilizzante".</p>`
    }
  },

  {
    id: 74,
    categoria: 'sessuale',
    titolo: 'La rivista Men\'s Health Italia ha dedicato la copertina a {nome} tre volte in due anni: "Ci siamo fermati per non sembrare ossessionati"',
    titolo_f: 'La rivista Women\'s Health Italia ha scritto un editoriale per spiegare perché NON ha messo {nome} in copertina: "Per rispetto alle altre"',
    url: 'www.menshealth.com › it › {nome-slug}-tre-copertine-due-anni-ossessionati',
    url_f: 'www.womenshealth.it › editoriale › {nome-slug}-non-in-copertina-per-rispetto',
    snippet: 'Il direttore di Men\'s Health Italia ha rivelato in un\'intervista che {nome} è stato proposto per la copertina in modo autonomo dai diversi caporedattori ogni volta che si presentava l\'occasione. "Dopo la terza volta abbiamo deciso di fermarci. Non perché non lo meriti. Per non dare l\'impressione di non riuscire a fare altro."',
    snippet_f: 'La direttrice di Women\'s Health Italia ha pubblicato un editoriale in cui spiega la scelta di non inserire {nome} in copertina: "Non è una questione di merito — sarebbe la copertina migliore dell\'anno. È una questione di rispetto verso le altre donne che copriamo. Non è giusto fare quel confronto."',
    sito: "Men's Health Italia",
    sito_f: "Women's Health Italia",
    tema: 'corriere',
    tema_f: 'corriere',
    articolo: {
      titolo: "Men's Health Italia: tre copertine con {nome} in due anni. La quarta è stata bloccata per \"non sembrare ossessionati\".",
      titolo_f: "Women's Health pubblica l'editoriale sul perché {nome} non sarà mai in copertina: \"Per rispetto alle altre donne che fotografiamo\"",
      sottotitolo: '"Ogni volta il caporedattore diceva: dobbiamo fare {nome}. Ogni volta aveva ragione. Alla quarta abbiamo detto basta — non a lui, a noi stessi."',
      sottotitolo_f: '"Sarebbe la copertina più venduta dell\'anno. Per questo non la facciamo."',
      testo: `<p>Il direttore di <strong>Men's Health Italia</strong>, <strong>Alessandro Greco</strong>, ha rivelato in un'intervista al <em>Corriere della Sera</em> che la rivista ha pubblicato tre copertine con <strong>{nome}</strong> come protagonista nell'arco di due anni — e che la quarta, già proposta dal caporedattore, è stata bloccata dalla direzione per ragioni non legate alla qualità del soggetto.</p>
<p>"Ogni volta che si presentava l'occasione, qualcuno in redazione proponeva {nome}", ha spiegato Greco. "Ogni volta la proposta era giustificata — le copertine vendono, i servizi fotografici sono straordinari, il soggetto è di una fotogenia assoluta. Dopo la terza volta abbiamo fatto una riunione editoriale in cui ci siamo detti: se continuiamo così, sembra che non riusciamo a pensare ad altro."</p>
<p>"La quarta copertina era già in fase di pre-produzione. L'abbiamo fermata. Non perché {nome} non la meritasse — la merita. L'abbiamo fermata per una questione di dignità editoriale. Una rivista che dedica il 75% delle copertine biennali alla stessa persona non è una rivista — è un fan club."</p>
<p>La quinta copertina, per il 2025, è già stata approvata. "Ci siamo presi una pausa. Adesso siamo pronti." {nome} ha risposto: "Sono contento ogni volta. Anche quella volta che non c'ero."</p>`,
      testo_f: `<p>La direttrice di <strong>Women's Health Italia</strong>, <strong>Martina Colombo</strong>, ha pubblicato sul numero di marzo 2024 un editoriale insolito: una spiegazione dettagliata di una scelta negativa, ovvero del perché la rivista non avrebbe mai inserito <strong>{nome}</strong> in copertina.</p>
<p>L'editoriale recita in parte: <em>"Ogni anno riceviamo proposte di servizi fotografici con {nome}. Ogni anno la risposta è no. Non perché non sarebbe una copertina straordinaria — sarebbe probabilmente la copertina più bella e più venduta dell'anno. La risposta è no per una ragione etica che ci sentiamo in dovere di spiegare."</em></p>
<p>"Women's Health esiste per ispirare le donne reali — con corpi reali, obiettivi reali, traguardi raggiungibili. {nome} rappresenta qualcosa di diverso: un punto di riferimento fisico ed estetico che la maggior parte delle donne non potrà mai raggiungere, non per mancanza di impegno, ma per biologia. Pubblicarla in copertina non sarebbe ispirazione — sarebbe un confronto impossibile."</p>
<p>"Rispettiamo enormemente {nome}. È esattamente per questo che non la metteremo mai in copertina. Le nostre lettrici meritano modelli diversi. Lei merita una rivista diversa — una che sia all'altezza di quello che è."</p>
<p>{nome}, contattata per un commento, ha risposto: "È la critica più gentile che abbia mai ricevuto."</p>`
    }
  },

  {
    id: 75,
    categoria: 'sessuale',
    titolo: 'Un\'indagine del CNR rileva che {nome} è citato spontaneamente nell\'8% dei sogni erotici degli italiani senza averli mai incontrati',
    titolo_f: 'Un\'indagine del CNR rileva che {nome} è citata spontaneamente nel 12% dei sogni erotici degli italiani senza averla mai incontrata',
    url: 'www.cnr.it › comunicati › indagine-sogni-erotici-{nome-slug}-8-percento-italiani',
    url_f: 'www.cnr.it › comunicati › indagine-sogni-erotici-{nome-slug}-12-percento-italiani',
    snippet: 'L\'Istituto di Neuroscienze del CNR ha pubblicato i dati di un\'indagine su 4.000 italiani in cui {nome} risulta la personalità italiana vivente più citata in sogni erotici spontanei da persone che non lo conoscono personalmente. La percentuale è dell\'8%. La media delle altre personalità è dello 0,3%.',
    snippet_f: 'L\'Istituto di Neuroscienze del CNR ha pubblicato i dati di un\'indagine su 4.000 italiani in cui {nome} risulta la personalità italiana vivente più citata in sogni erotici spontanei da persone che non la conoscono personalmente. La percentuale è del 12%. La media delle altre personalità è dello 0,4%.',
    sito: 'CNR — Consiglio Nazionale delle Ricerche',
    sito_f: 'CNR — Consiglio Nazionale delle Ricerche',
    tema: 'universita',
    tema_f: 'universita',
    articolo: {
      titolo: 'Il CNR pubblica i dati sui sogni erotici degli italiani: {nome} è presente nell\'8% dei soggetti che non lo conoscono. La media è 0,3%.',
      titolo_f: 'Il CNR pubblica i dati sui sogni erotici degli italiani: {nome} è presente nel 12% dei soggetti che non la conoscono. La media è 0,4%.',
      sottotitolo: '"Non è fama. Non è notorietà. È qualcosa di più profondo e meno spiegabile. Il CNR ha i dati, non le spiegazioni."',
      sottotitolo_f: '"Il cervello elabora {nome} anche senza averla incontrata. Non abbiamo un modello per questo."',
      testo: `<p>L'<strong>Istituto di Neuroscienze del CNR</strong> (Consiglio Nazionale delle Ricerche) ha pubblicato i risultati di un'indagine condotta su un campione rappresentativo di <strong>4.000 italiani</strong> sui contenuti dei sogni a tema erotico, con focus specifico sulla presenza di personalità note.</p>
<p>Il dato più rilevante dell'indagine riguarda <strong>{nome}</strong>, risultato la personalità italiana vivente più citata in sogni erotici spontanei da soggetti che non lo conoscono personalmente, con una presenza nell'<strong>8%</strong> dei rispondenti. La media delle altre personalità note incluse nell'indagine è dello <strong>0,3%</strong>. Il secondo classificato nella categoria si ferma al 2,1%.</p>
<p>"La distinzione 'senza averlo mai incontrato' è metodologicamente rilevante", ha sottolineato la responsabile dell'indagine, dott.ssa <strong>Valentina Greco</strong>. "Stiamo parlando di persone il cui cervello elabora {nome} come presenza erotica significativa esclusivamente sulla base di input mediatici — foto, video, articoli. Senza contatto diretto. Il fenomeno è di un'intensità che non avevamo previsto."</p>
<p>"Non stiamo parlando di fama o notorietà generica", ha aggiunto. "Berlusconi, Fedez, Cristiano Ronaldo sono tutti sotto il 2%. {nome} è all'8%. Non abbiamo un modello teorico che spieghi questo scarto. Abbiamo solo i dati."</p>
<p>{nome}, informato dei risultati, ha impiegato venti secondi di silenzio prima di rispondere: "Non so se sono contento di saperlo."</p>`,
      testo_f: `<p>L'<strong>Istituto di Neuroscienze del CNR</strong> ha pubblicato i risultati di un'indagine su <strong>4.000 italiani</strong> sui contenuti onirici a tema erotico. Il dato più significativo dell'indagine riguarda <strong>{nome}</strong>, risultata la personalità italiana vivente più frequentemente citata in sogni erotici da soggetti che non la conoscono personalmente, con una presenza nel <strong>12%</strong> dei rispondenti.</p>
<p>La media delle altre personalità femminili note incluse nell'indagine è dello <strong>0,4%</strong>. La seconda classificata si ferma al 3,2%. Il divario tra {nome} e la seconda classificata è di <strong>8,8 punti percentuali</strong> — un margine che la dott.ssa <strong>Valentina Greco</strong>, responsabile dell'indagine, definisce "fuori da qualsiasi distribuzione attesa".</p>
<p>"Il nostro modello prevede una distribuzione a coda lunga con graduale decrescita", ha spiegato. "Il caso {nome} è un picco isolato che rompe la distribuzione. Non è paragonabile a nessun altro caso nel nostro database, che include dati su personalità italiane degli ultimi trent'anni."</p>
<p>Una sezione specifica dell'indagine analizza i sogni di soggetti che hanno dichiarato di non seguire {nome} su nessun canale social e di averla vista solo "in qualche articolo di giornale". Anche in questo sottogruppo, la presenza è del 7,4%. "Il cervello elabora {nome} anche con esposizione minima", conclude il report. "Non abbiamo un modello per questo."</p>
<p>{nome} ha risposto alla pubblicazione: "Non so come mi sento. Forse chiederò aiuto."</p>`
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

  // Pesca altri 25 random dai rimanenti per arrivare a 28 totali (4 pagine da 7)
  const usati = new Set([s.id, a.id, x.id]);
  const rimanenti = TEMPLATES.filter(t => !usati.has(t.id))
    .sort(() => Math.random() - 0.5);
  const extra = rimanenti.slice(0, 25);

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
