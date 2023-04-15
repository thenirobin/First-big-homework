
const generateCatCardPopup = (cat) => {
    const isFavourite = cat.favorite ? 'checked' : '';
    return `
        <div class="popup-wrapper-cat-card">
            <div class="popup-cat-card">
                <div class="popup-close-cat-card"><i class="fa-solid fa-xmark"></i></div>
                <div class="card">
                <div class="card-content">
                    <label for="cat-name">Имя:</label>
                    <p id="cat-name">${cat.name}</p>
                    <label for="cat-description">Описание:</label>
                    <p id="cat-description">${cat.description}</p>
                    <label for="cat-age">Возраст:</label>
                    <p id="cat-age">${cat.age}</p>
                    <label for="cat-rate">Рейтинг:</label>
                    <p id="cat-rate">${cat.rate}</p>
                    <div class="favourite-container">
                        <input type="checkbox" id="cat-favourite" name="cat-favourite" ${isFavourite} disabled>
                        <label for="cat-favorite">Любимчик</label>
                    </div>
                </div>
                <div class="card-image" style="background-image: url(${cat.image || 'image/cats.jpg'})"></div>
            </div>
        </div>
    </div>
    `;
};