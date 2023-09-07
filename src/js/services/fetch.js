const URL = "https://pruebas-raul-4geeks-default-rtdb.europe-west1.firebasedatabase.app/to-do-list.json";

export const getData = () => {
  return fetch(URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al obtener datos");
      }
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      throw err; // Deberías propagar el error para manejarlo en el componente que llama a esta función
    });
};

export const putData = (data) => {
  return fetch(URL, {
    method: "PUT", // Cambié "PUT" a una cadena de texto para que sea reconocido como un método válido
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al enviar datos");
      }
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      throw err; // Deberías propagar el error para manejarlo en el componente que llama a esta función
    });
};

/*
export const deleteData = () => {
    return (
    fetch(
    URL, {
    method: DELETE,
    }
    )
    .then(res => {
        if(!res.ok){throw Error()}
        return res.json()})
    .catch(err => console.log(err))
    )
}
*/