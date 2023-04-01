const config = {
	baseUrl: 'https://cats.petiteweb.dev/api/single/thenirobin/',
};

class Api {
	constructor(config) {
		this.baseUrl = config.baseUrl;
	}

	getAllCats = () => {
		return fetch(`${this.baseUrl}show`).then((res) => {
			return res.ok ? res.json() : Promise.reject('У меня лапки');
		});
	};

	addCat = (cat) => {
		return fetch(`${this.baseUrl}add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cat),
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject('У меня лапки');
		});
	};

	updateCat = (newCat) => {
		return fetch(`${this.baseUrl}update/${newCat.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCat),
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject('У меня лапки');
		});
	};

    deleteCat = (id) => {
        return fetch(`${config.baseUrl}delete/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject('У меня лапки');
        });
    };

    allCatsIDs = () => {
        return fetch(`${this.baseUrl}ids`).then((res) => {
			return res.ok ? res.json() : Promise.reject('У меня лапки');
		});
    }

    getCatByID = (catID) => {
        return fetch(`${this.baseUrl}show/${catID}`).then((res) => {
			return res.ok ? res.json() : Promise.reject('У меня лапки');
		});
    }
}

const api = new Api(config);

// api
// 	.getAllCats()
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// api
// 	.addCat({
// 		id: 15,
// 		name: 'Безымянный',
// 		favorite: false,
// 		rate: 5,
// 		age: 3,
// 		description: 'Ну кот и кот, котяра',
// 		image:
// 			'https://yandex.ru/images/search?text=%D0%BA%D0%BE%D1%82%D1%8B&pos=7&img_url=http%3A%2F%2Fproprikol.ru%2Fwp-content%2Fuploads%2F2020%2F08%2Fkrasivye-kartinki-kotov-21.jpg&rpt=simage&lr=105574',
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// api
// 	.deleteCat(11)
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// api
// 	.allCatsIDs()
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// api
// 	.getCatByID(1799)
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// fetch('url', {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify({ test: 'test' }),
// });