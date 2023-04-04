const generateCatCardPopup = (cat) => {
    return `<div class="popup-wrapper-cat-card active">
            <div class="popup-cat-card active">
            <div class="popup-close-cat-card btn"><i class="fa-solid fa-xmark"></i></div>
            <div class="${cat.favourite ? 'card like' : 'card'}" style="background-image: url(${cat.img_link || 'image/cats.jpg'})">
                <div>${cat.name}</div>
                <div>${cat.description}</div>
                <div>${cat.age}</div>
                <div>${cat.rate}</div>
            </div>
            <style>
            .popup-wrapper-cat-card {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
            }
            .popup-cat-card {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                max-width: 500px;
                background-color: white;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                z-index: 1000;
            }
            .popup-close-cat-card {
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
            }
            .card {
                height: 300px;
                background-size: cover;
                background-position: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: white;
            }
            .card.like {
                background-color: #ff4081;
            }
            </style>
        </div>
    </div>`;
};  
