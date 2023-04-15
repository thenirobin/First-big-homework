// С localStorage я в процессе, но уже хочу прислать некий "черновой финал" на проверку, может я не вижу каких-то глобальных ошибок/недочетов.

let localStorage = window.localStorage;
if (localStorage.getItem('cats') == null) {
	localStorage.setItem('cats', '[]')
}

const modal = document.querySelector('.create-edit-modal-form');
const modalForm = document.querySelector('form');
const modalBtn = modalForm.querySelector('button');

const refreshCatsAndContent = () => {

    const content = document.getElementsByClassName('content')[0];
    content.innerHTML = '';
    api.getAllCats().then((res) => {
        localStorage.setItem('cats', JSON.stringify(res));
        const cards = res.reduce((acc, el) => acc+=generateCard(el), '');
            content.insertAdjacentHTML('afterbegin', cards);
});
}

refreshCatsAndContent();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Функции для работы с локальным хранилищем

const refreshCatsAndContentSync = () => {
	const content = document.getElementsByClassName('content')[0];
	content.innerHTML = '';

	const cards = JSON.parse(localStorage.getItem('cats')).reduce(
		(acc, el) => (acc += generateCard(el)),
		''
	);
	content.insertAdjacentHTML('afterbegin', cards);

};

const addCatInLocalStorage = (cat) => {
	localStorage.setItem(
		'cats',
		JSON.stringify([...JSON.parse(localStorage.getItem('cats')), cat])
	);
};

const deleteCatFromLocalStorage = (catId) => {
	localStorage.setItem(
		'cats',
		JSON.stringify(
			JSON.parse(localStorage.getItem('cats')).filter((el) => el.id != catId)
		)
	);
};

const getNewIdOfCatSync = () => {
	let res = JSON.parse(localStorage.getItem('cats')); // получение данных о котах с нашего локального хранилища
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
                document.getElementsByClassName('overlay')[0].classList.toggle('modal-open');
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
                modalBtn.addEventListener('click', (evt) => { 
                    const forms = document.forms[0]; 
                    forms.addEventListener('submit', (event) => {
                        event.preventDefault(); 
                        const formData = new FormData(forms);
                        const cat = Object.fromEntries(formData);
                        api.updateCat(cat).then((res) => { console.log(res); refreshCatsAndContentSync(); });
                        modal.classList.toggle('active'); 
                        document.getElementsByClassName('overlay')[0].classList.toggle('modal-open');
                    }); 
                });
                break;
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
    document.getElementsByClassName('overlay')[0].classList.toggle('modal-open');
    document.forms[0].addEventListener('submit', (event) => {
        event.preventDefault();
        const form = document.forms[0];
        const formData = new FormData(form);
        const cat = Object.fromEntries(formData);
        api.addCat({ ...cat, id: getNewIdOfCatSync() }).then((res) => {
            addCatInLocalStorage({ ...cat, id: getNewIdOfCatSync() }); // синхронная замена асинхронщины
            console.log(res);
            refreshCatsAndContentSync();
        });
        modal.classList.toggle('active');
        document.getElementsByClassName('overlay')[0].classList.toggle('modal-open');
        form.reset();
    });
})

document.getElementsByClassName('closeNewCatForm')[0].addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementsByClassName('create-edit-modal-form')[0].classList.remove('active');
    document.getElementsByClassName('overlay')[0].classList.toggle('modal-open');
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


