const URL = "https://pruebas-raul-4geeks-default-rtdb.europe-west1.firebasedatabase.app/to-do-list.json";


export const getData = () => {
    return (
    fetch(URL)
    .then(res => {
        if(!res.ok){throw Error()}
        return (res.json())
    })
    .catch(err => console.log(err))
    )
}

export const putData = (data) => {
    return (
    fetch(
    URL, {
    method: PUT,
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json",}
        }
    )
    .then(res => {
        if(!res.ok){throw Error()}
        return res.json()})
    .catch(err => console.log(err))
    )
}
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