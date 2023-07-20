import axios from "axios";
import { readLocalStorage } from "../local-storage";

const getAllUsersByCategory = async function (userData, category) {
  const { token } = JSON.parse(readLocalStorage(userData));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios
    .get(`http://localhost:3154/api/v1/utilities/${category}`, config)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          break;
        }
      }
    });
};

const getAllUsersByCategoryWithoutAuth = async function (category) {
  return await axios
    .get(`http://localhost:3154/api/v1/public/for-students/${category}`)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          break;
        }
      }
    });
};

const getSingleItemByStoredID = async function (userData, category) {
  const { token, id } = JSON.parse(readLocalStorage(userData));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios
    .get(`http://localhost:3154/api/v1/utilities/${category}/${id}`, config)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          break;
        }
      }
    });
};

const getSingleItemByID = async function (userData, category, givenID) {
  const { token } = JSON.parse(readLocalStorage(userData));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .get(
      `http://localhost:3154/api/v1/utilities/${category}/${givenID}`,
      config
    )
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          break;
        }
      }
    });
};

const getAllAssociationRequests = async function () {
  const { token } = JSON.parse(readLocalStorage("universityData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .get(
      `http://localhost:3154/api/v1/utilities/university/pending-requests`,
      config
    )
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          break;
        }
      }
    });
};

const getAllPendingRequests = async function () {
  const { token } = JSON.parse(readLocalStorage("teacherData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .get(
      `http://localhost:3154/api/v1/utilities/teacher/pending-requests`,
      config
    )
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          break;
        }
      }
    });
};

const getAllStudentsEnrolled = async function (courseID, mode) {
  const { token } = JSON.parse(readLocalStorage(mode));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios
    .get(
      `http://localhost:3154/api/v1/utilities/students-enrolled/${courseID}`,
      config
    )
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          break;
        }
      }
    });
};

export {
  getAllUsersByCategory,
  getAllUsersByCategoryWithoutAuth,
  getSingleItemByStoredID,
  getSingleItemByID,
  getAllAssociationRequests,
  getAllPendingRequests,
  getAllStudentsEnrolled,
};
