import axios from "axios";
import { writeToLocalStorage, readLocalStorage } from "../local-storage";

// --- AUTH ---

const newTeacherSignUp = async function (newTeacherData) {
  axios
    .post(`https://reach17.onrender.com/api/v1/auth/register/teacher`, newTeacherData)
    .then((res) => {
      writeToLocalStorage(res.data, "teacherData");
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
          window.location.href = "/sign-up-teacher";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/sign-up-teacher";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/sign-up-teacher";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/sign-up-teacher";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/sign-up-teacher";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/sign-up-teacher";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/sign-up-teacher";
          break;
        }
      }
    });
};

const teacherLogin = async function (teacherData) {
  axios
    .post(`https://reach17.onrender.com/api/v1/auth/login/teacher`, teacherData)
    .then((res) => {
      writeToLocalStorage(res.data, "teacherData");
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-teacher";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-teacher";
          break;
        }
      }
    });
};

//--- COURSES ---

const createCourse = async function (courseData) {
  const { token, id } = JSON.parse(readLocalStorage("teacherData"));

  courseData.teacher = id;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .post(`https://reach17.onrender.com/api/v1/courses/`, courseData, config)
    .then((res) => {
      alert(
        "Corso inserito correttamente, verrà effettuata la richiesta di erogazione all'università!"
      );
      return res.data;
    })
    .then((courseCreated) => {
      associateCourse(
        courseCreated._id,
        courseData.universities.toString().split(":")[1]
      );
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-teacher";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-teacher";
          break;
        }
      }
    });
};

const getAllCourses = async function () {
  const { token } = JSON.parse(readLocalStorage("teacherData"));
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
          window.location.href = "/login-teacher";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-teacher";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-teacher";
          break;
        }
      }
    });
};

const getCourse = async function (id) {
  const { token } = JSON.parse(readLocalStorage("teacherData"));
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
          window.location.href = "/login-teacher";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-teacher";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-teacher";
          break;
        }
      }
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-teacher";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-teacher";
          break;
        }
      }
    });
};

const editCourse = async function (editedCourseData, id) {
  const { token } = JSON.parse(readLocalStorage("teacherData"));
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
      return res.data;
    })
    .then((editedCourse) => {
      for (let i = 0; i < editedCourse.universities.length; i++) {
        if (editedCourse.universities[i].toString().includes("PENDING")) {
          associateCourse(
            editedCourse._id,
            editedCourse.universities.toString().split(":")[1]
          );
        }
      }
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 400: {
          alert(
            "Richiesta non effettuata correttamente, verifica i dati oppure contatta il supporto!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-teacher";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-teacher";
          break;
        }
      }
    });
};

const deleteCourse = async function (id) {
  const { token, account } = JSON.parse(readLocalStorage("teacherData"));
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
          window.location.href = "/login-teacher";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-teacher";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-teacher";
          break;
        }
      }
    });
};

const associateCourse = async function (courseID, universityID) {
  const { token } = JSON.parse(readLocalStorage("teacherData"));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .patch(
      `https://reach17.onrender.com/api/v1/courses/association/${courseID}`,
      JSON.parse(JSON.stringify({ universityId: universityID })),
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
          window.location.href = "/login-teacher";
          break;
        }
        case 401: {
          alert(
            "Accesso non autorizzato: Username/Password non validi, riprova!"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 403: {
          alert(
            "Accesso non autorizzato: Non hai il permesso di accedere a questa risorsa"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 500: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 503: {
          alert(
            "Errore del server: Aggiorna la pagina oppure contatta il supporto"
          );
          window.location.href = "/login-teacher";
          break;
        }
        case 404: {
          alert(
            "Richiesta non completata correttamente: il corso, lo studente o l'università non sono stati trovati"
          );
          window.location.href = "/login-teacher";
          break;
        }
        default: {
          alert("Qualcosa è andato storto, contatta il supporto!");
          window.location.href = "/login-teacher";
          break;
        }
      }
    });
};

export {
  newTeacherSignUp,
  teacherLogin,
  createCourse,
  getAllCourses,
  getCourse,
  editCourse,
  deleteCourse,
  associateCourse,
};
