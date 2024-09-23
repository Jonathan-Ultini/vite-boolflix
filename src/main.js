// Importa il file CSS di Bootstrap per aggiungere gli stili predefiniti di Bootstrap all'applicazione
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa il file CSS di Font Awesome per poter utilizzare le icone di Font Awesome all'interno dell'applicazione
import '@fortawesome/fontawesome-free/css/all.css';

// Importa il metodo `createApp` dal framework Vue, che serve per creare una nuova istanza dell'app Vue
import { createApp } from 'vue';

// Importa il file CSS personalizzato dell'applicazione, dove sono definiti eventuali stili custom
import './style.css';

// Importa il componente principale `App.vue`, che funge da punto di ingresso per l'intera applicazione
import App from './App.vue';

// Crea l'app Vue utilizzando il componente `App.vue` come radice e la monta sull'elemento HTML con id 'app'.
// Questo fa sì che tutto il contenuto dell'applicazione venga inserito all'interno di questo elemento nella pagina HTML.
createApp(App).mount('#app');
