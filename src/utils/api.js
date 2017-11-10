export function fetchCategories() {

  return fetch(`http://localhost:3001/categories`, {headers: {'Authorization': 'whatever-you-want'}})
      .then((res) =>
            res.json()
      )
      .then((categs) => {
        return categs
      })
}