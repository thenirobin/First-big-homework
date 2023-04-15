// С localStorage я в процессе, но уже хочу прислать некий "черновой финал" на проверку, может я не вижу каких-то глобальных ошибок/недочетов.

let localStorage = window.localStorage;
if (localStorage.getItem('cats') == null) {
	localStorage.setItem('cats', '[]')
}
localStorage.setItem('modalFormShowButton', '')

const modal = document.querySelector('.create-edit-modal-form');
const modalForm = document.querySelector('form');
const modalBtn = modalForm.querySelector('button');
const darkBackground = document.getElementsByClassName('overlay')[0];

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
                localStorage.setItem('modalFormShowButton', 'updateCat')
                api.getCatByID(event.target.value).then((res) => {
                    const formFields = modalForm.elements;
                    for (let i = 0; i < formFields.length; i++) {
                        const fieldName = formFields[i].name;
                            if (fieldName in res) {
                                formFields[i].value = res[fieldName];
                            }
                    }
                });
                break;
            case 'cat-card-delete': {
                api.deleteCat(event.target.value).then(res => {
                    console.log(res);
                    deleteCatFromLocalStorage(event.target.value);
					refreshCatsAndContentLocal();
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
    darkBackground.classList.toggle('modal-open');
    localStorage.setItem('modalFormShowButton', 'addNewCat')
})

modalForm.addEventListener('submit', (event) => {
	event.preventDefault();
    const form = document.forms[0];
	const formData = new FormData(modalForm)
	const cat = Object.fromEntries(formData.entries())
	switch (String(localStorage.getItem('modalFormShowButton'))) {
		case 'addNewCat':
            api.addCat({ ...cat, id: getNewIdOfCatLocal() }).then((res) => {
                        addCatInLocalStorage({ ...cat, id: getNewIdOfCatLocal() });
                        console.log(res);
                        refreshCatsAndContentLocal();
                    });
            modal.classList.toggle('active');
            darkBackground.classList.toggle('modal-open');
            form.reset();
			break;
		case 'updateCat':
			api.updateCat(cat).then((res) => {
				modal.classList.remove('active');
                darkBackground.classList.toggle('modal-open');
				updateCatInLocalStorage(cat);
				console.log(res);
				refreshCatsAndContentLocal();
			})
	}
});


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
