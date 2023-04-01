
// let store = window.localStorage;
// console.log(store);

// import api from './api';
// import { getAllCats } from './api2';

// getAllCats().then((res) => {
//     console.log(res);
// })

const homepage = document.getElementById('homepage');

const refreshCatsAndContent = () => {

    const content = document.getElementsByClassName('content')[0];
    content.innerHTML = '';
    api.getAllCats().then((res) => {
        console.log(res);
        const cards = res.reduce((acc, el) => acc+=generateCard(el), '');
            content.insertAdjacentHTML('afterbegin', cards)
});
}

refreshCatsAndContent();

document.getElementsByClassName('content')[0].addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        switch(event.target.className) {
            case 'cat-card-view': 
                api.getCatByID(event.target.value).then(res => {
                    console.log(res);
                })
                break;
            case 'cat-card-update': 
                const evt = event.target.value;
                const modal = document.querySelector('.create-edit-modal-form'); 
                modal.classList.toggle('active');
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
                        forms.reset();
                    }); 
                });
            break;
            case 'cat-card-delete': {
                api.deleteCat(event.target.value).then(res => {
                    console.log(res);
                    refreshCatsAndContent();
                })
            }; break;
        }
    };
});

// document.forms[0].addEventListener('submit', (event) => {
//     event.preventDefault();
//     const formData = new FormData(form);
//     api.addCat(formData).then((res) => {
//         console.log(res);
//     })
// });

const getNewIdOfCat = async () => {
    return api.allCatsIDs().then(res => {
        return Math.max(...res) + 1;
    })
};

getNewIdOfCat().then(res => {
    console.log(res);
});

document.getElementById('addNewCat').addEventListener('click', (event) => {
    event.preventDefault();
    const modal = document.querySelector('.create-edit-modal-form'); 
    modal.classList.toggle('active');
    document.forms[0].addEventListener('submit', (event) => {
        event.preventDefault();
        const form = document.forms[0];
        const formData = new FormData(form);
        const cat = Object.fromEntries(formData);
        api.addCat(cat).then((res) => {
            refreshCatsAndContent();
        });
        modal.classList.toggle('active');
        form.reset();
    });
})

document.getElementsByClassName('closeNewCatForm')[0].addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementsByClassName('create-edit-modal-form')[0].classList.remove('active');
})

