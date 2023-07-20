import axios from "axios";
import { writeToLocalStorage, readLocalStorage } from "../local-storage";

// --- AUTH ---

const newStudentSignUp = async function (newStudentData) {
  axios
    .post(`http://localhost:3154/api/v1/auth/register`, newStudentData)
    .then((res) => {
      writeToLocalStorage(res.data, "studentData");
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
          window.location.href = "/sign-up";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/sign-up";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/sign-up";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/sign-up";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/sign-up";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/sign-up";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/sign-up";
          break;
        }
      }
    });
};

const studentLogin = async function (studentData) {
  axios
    .post(`http://localhost:3154/api/v1/auth/login`, studentData)
    .then((res) => {
      writeToLocalStorage(res.data, "studentData");
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login";
          break;
        }
      }
    });
};

//--- COURSES ---

const getAllUniversityCourses = async function () {
  const { token } = JSON.parse(readLocalStorage("studentData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .get(
      `http://localhost:3154/api/v1/courses/student/available-courses`,
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
          window.location.href = "/login";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login";
          break;
        }
      }
    });
};

const getCourse = async function (id) {
  const { token } = JSON.parse(readLocalStorage("studentData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .get(
      `http://localhost:3154/api/v1/courses/student/course-details/${id}`,
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
          window.location.href = "/login";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login";
          break;
        }
      }
    });
};

const courseSignUp = async function (id) {
  const { token } = JSON.parse(readLocalStorage("studentData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .post(
      `http://localhost:3154/api/v1/courses/student/course-registration/`,
      JSON.parse(JSON.stringify({ courseId: id })),
      config
    )
    .then((res) => {
      alert(res.data);
      return;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login";
          break;
        }
      }
    });
};

const getAllCourseRegistrations = async function () {
  const { token } = JSON.parse(readLocalStorage("studentData"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios
    .get(`http://localhost:3154/api/v1/courses/student/courses-list/`, config)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login";
          break;
        }
      }
    });
};

export {
  newStudentSignUp,
  studentLogin,
  getAllUniversityCourses,
  getCourse,
  courseSignUp,
  getAllCourseRegistrations,
};
