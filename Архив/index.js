const config = {
	baseUrl: 'https://cats.petiteweb.dev/api/single/thenirobin/',
};

fetch('url', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({ test: 'test' }),
});

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
}

const api = new Api(config);
// const api2 = new Api(config);

// console.log(api === api2);
// console.log(api.addCat === api2.addCat);
// console.log(api.getAllCats === api2.getAllCats);

console.log(api);

api
	.getAllCats()
	.then((res) => {
		console.log(res);
	})
	.catch((error) => {
		console.log(error);
	});

// api
// 	.updateCat({
// 		id: 3,
// 		name: 'Кот в сапогах 3',
// 		favorite: false,
// 		rate: 9,
// 		age: 10,
// 		description: 'Не такой славный малый',
// 		image:
// 			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.playground.ru%2Fmisc%2Fnews%2Fmultfilm_kot_v_sapogah_2_zarabotal_v_prokate_pochti_300_millionov_dollarov-1259784&psig=AOvVaw0oMYhSLv6IuPC4jPEsa_qf&ust=1679679358513000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIDMu63L8v0CFQAAAAAdAAAAABAE',
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// api
// 	.addCat({
// 		id: 3,
// 		name: 'Кот в сапогах 3',
// 		favorite: false,
// 		rate: 9,
// 		age: 10,
// 		description: 'Не тикой славный малый',
// 		image:
// 			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.playground.ru%2Fmisc%2Fnews%2Fmultfilm_kot_v_sapogah_2_zarabotal_v_prokate_pochti_300_millionov_dollarov-1259784&psig=AOvVaw0oMYhSLv6IuPC4jPEsa_qf&ust=1679679358513000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIDMu63L8v0CFQAAAAAdAAAAABAE',
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});
