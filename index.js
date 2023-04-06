let store = window.localStorage;

const homepage = document.getElementById('homepage');

const refreshCatsAndContent = () => {

    const content = document.getElementsByClassName('content')[0];
    content.innerHTML = '';
    api.getAllCats().then((res) => {
        console.log(res);
        store.setItem('cats', JSON.stringify(res));
        const cards = res.reduce((acc, el) => acc+=generateCard(el), '');
            content.insertAdjacentHTML('afterbegin', cards);
});
}

refreshCatsAndContent();

// function getCatData(catId) {
//     return console.log(fetch(`https://cats.petiteweb.dev/api/single/thenirobin/${id}`).then((response) => response.json()));
// }

// function fillCatForm(catData) {
//     document.getElementById("catName").value = catData.name;
//     document.getElementById("catImage").value = catData.image;
//     document.getElementById("catAge").value = catData.age;
//     document.getElementById('catRate').value = catData.rate;
//     document.getElementById("catDescription").value = catData.description;
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Функции для работы с локальным хранилищем

const refreshCatsAndContentSync = () => {
	const content = document.getElementsByClassName('content')[0];
	content.innerHTML = '';

	const cards = JSON.parse(store.getItem('cats')).reduce(
		(acc, el) => (acc += generateCard(el)),
		''
	);
	content.insertAdjacentHTML('afterbegin', cards); // загуглите insertAdjacentHTML afterbegin

};

const addCatInLocalStorage = (cat) => {
	store.setItem(
		'cats',
		JSON.stringify([...JSON.parse(store.getItem('cats')), cat])
	);
};

const deleteCatFromLocalStorage = (catId) => {
	store.setItem(
		'cats',
		JSON.stringify(
			JSON.parse(store.getItem('cats')).filter((el) => el.id != catId) // загуглить и поиграться с filter
		)
	);
};

const getNewIdOfCatSync = () => {
	let res = JSON.parse(store.getItem('cats')); // получение данных о котах с нашего локального хранилища
	console.log('getNewIdOfCatSync', res);
	if (res.length) {
		return Math.max(...res.map((el) => el.id)) + 1;
	} else {
		return 1;
	}
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const openCatCardPopup = (cat) => {
	const content = document.getElementsByClassName('content')[0];
	content.insertAdjacentHTML('afterbegin', generateCatCardPopup(cat));

	let catPopup = document.querySelector('.popup-wrapper-cat-card');
	let closeCatPopup = document.querySelector('.popup-close-cat-card');
	closeCatPopup.addEventListener('click', () => {
		catPopup.remove();
	});
};

document.getElementById('reload-page').addEventListener('click', refreshCatsAndContent);



document.getElementsByClassName('content')[0].addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        switch(event.target.className) {
            case 'cat-card-view': 
                api.getCatByID(event.target.value).then((res) => {
                    openCatCardPopup(res);
                }); break;
            case 'cat-card-update':
                const evt = event.target.value;
                const modal = document.querySelector('.create-edit-modal-form');
                document.getElementsByClassName('content')[0].classList.toggle('modal-open');
                modal.classList.toggle('active');
                api.getCatByID(event.target.value).then((res) => {
                    const formFields = modalForm.elements;
                    for (let i = 0; i < formFields.length; i++) {
                        const fieldName = formFields[i].name;
                            if (fieldName in res) {
                                formFields[i].value = res[fieldName];
                    }
                    }
                });
                const modalForm = document.querySelector('form');
                const modalBtn = modalForm.querySelector('button');
                modalBtn.addEventListener('click', (evt) => { 
                    const forms = document.forms[0]; 
                    forms.addEventListener('submit', (event) => {
                        event.preventDefault(); 
                        const formData = new FormData(forms);
                        const cat = Object.fromEntries(formData);
                        api.updateCat(cat).then((res) => { console.log(res); refreshCatsAndContent(); });
                        modal.classList.toggle('active'); 
                        document.getElementsByClassName('content')[0].classList.toggle('modal-open');
                    }); 
                }); break;
            case 'cat-card-delete': {
                api.deleteCat(event.target.value).then(res => {
                    console.log(res);
                    deleteCatFromLocalStorage(event.target.value);
					refreshCatsAndContentSync();
                })
            }; break;
        }
    };
});

const getNewIdOfCat = () => {
	return api.allCatsIDs().then((res) => {
		if (res.length) {
			return Math.max(...res) + 1;
		} else {
			return 1;
		}
	});
};

document.getElementById('addNewCat').addEventListener('click', (event) => {
    event.preventDefault();
    document.forms[0].reset();
    const modal = document.querySelector('.create-edit-modal-form'); 
    modal.classList.toggle('active');
    document.getElementsByClassName('content')[0].classList.toggle('modal-open');
    document.forms[0].addEventListener('submit', (event) => {
        event.preventDefault();
        const form = document.forms[0];
        const formData = new FormData(form);
        const cat = Object.fromEntries(formData);
        api.addCat({ ...cat, id: getNewIdOfCatSync() }).then(() => {
            addCatInLocalStorage({ ...cat, id: getNewIdOfCatSync() }); // синхронная замена асинхронщины
            refreshCatsAndContentSync();
        });
        modal.classList.toggle('active');
        document.getElementsByClassName('content')[0].classList.toggle('modal-open');
        form.reset();
    });
})

document.getElementsByClassName('closeNewCatForm')[0].addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementsByClassName('create-edit-modal-form')[0].classList.remove('active');
    document.getElementsByClassName('content')[0].classList.toggle('modal-open');
})

function updateScroll() {
    if (window.scrollY > 0) {
        let elem = document.querySelector('header');
        elem.classList.add('header__scrolled');
    } else {
        let elem = document.querySelector('header');
        elem.classList.remove('header__scrolled');
    }
    let windowBottomPosition = window.scrollY + window.innerHeight;
}
window.addEventListener('scroll', updateScroll);


