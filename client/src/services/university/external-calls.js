import axios from "axios";
import { writeToLocalStorage, readLocalStorage } from "../local-storage";

// --- AUTH ---

const newUniversitySignUp = async function (newUniversityData) {
  axios
    .post(
      `https://reach17.onrender.com/api/v1/auth/register/university`,
      newUniversityData
    )
    .then((res) => {
      writeToLocalStorage(res.data, "universityData");
      alert(
        "Ti sei registrato correttamente a Reach 17, verrai rediretto a breve!"
      );
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/sign-up-university";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/sign-up-university";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/sign-up-university";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/sign-up-university";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/sign-up-university";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/sign-up-university";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/sign-up-university";
          break;
        }
      }
    });
};

const universityLogin = async function (universityData) {
  axios
    .post(`https://reach17.onrender.com/api/v1/auth/login/university`, universityData)
    .then((res) => {
      writeToLocalStorage(res.data, "universityData");
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-university";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-university";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-university";
          break;
        }
      }
    });
};

//--- COURSES ---

const createCourse = async function (courseData) {
  const { token, account } = JSON.parse(readLocalStorage("universityData"));

  courseData.university = account;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .post(`https://reach17.onrender.com/api/v1/courses/`, courseData, config)
    .then((res) => {
      alert("Corso inserito correttamente!");
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-university";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-university";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-university";
          break;
        }
      }
    });
};

const getAllCourses = async function () {
  const { token } = JSON.parse(readLocalStorage("universityData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios
    .get(`https://reach17.onrender.com/api/v1/courses/`, config)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-university";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-university";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-university";
          break;
        }
      }
    });
};

const getCourse = async function (id) {
  const { token } = JSON.parse(readLocalStorage("universityData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .get(`https://reach17.onrender.com/api/v1/courses/${id}`, config)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-university";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-university";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-university";
          break;
        }
      }
    });
};

const editCourse = async function (editedCourseData, id) {
  const { token, account } = JSON.parse(readLocalStorage("universityData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .patch(
      `https://reach17.onrender.com/api/v1/courses/${id}`,
      editedCourseData,
      config
    )
    .then((res) => {
      alert("Corso modificato correttamente!");
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-university";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-university";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-university";
          break;
        }
      }
    });
};

const deleteCourse = async function (id) {
  const { token, account } = JSON.parse(readLocalStorage("universityData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .delete(`https://reach17.onrender.com/api/v1/courses/${id}`, config)
    .then((res) => {
      alert("Corso eliminato correttamente!");
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-university";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-university";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-university";
          break;
        }
      }
    });
};

const confirmAssociation = async function (courseID) {
  const { token } = JSON.parse(readLocalStorage("universityData"));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .patch(
      `https://reach17.onrender.com/api/v1/courses/university/confirm-association`,
      JSON.parse(JSON.stringify({ courseId: courseID })),
      config
    )
    .then((res) => {
      alert(res.data);
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-university";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-university";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-university";
          break;
        }
      }
    });
};

const getAllStudents = async function () {
  const { token } = JSON.parse(readLocalStorage("universityData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios
    .get(`https://reach17.onrender.com/api/v1/utilities/university/students`, config)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-university";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-university";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-university";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-university";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-university";
          break;
        }
      }
    });
};

export {
  newUniversitySignUp,
  universityLogin,
  createCourse,
  getAllCourses,
  getCourse,
  editCourse,
  deleteCourse,
  confirmAssociation,
  getAllStudents,
};
