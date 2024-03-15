// Logika
class GameManager {

    constructor(defaultImageName) {
        this.defaultImageName = defaultImageName;
        this.counter = 0;
        this.clicks = 0;
    }

    toggleButtonVisiblity(button, isVisible) {
        button.style.visibility = isVisible ? 'visible' : 'hidden';
    }

    // vložení defaultního obrázku
    insertDefaultImage(variableWithImage) {
        variableWithImage.src = `img/${this.defaultImageName}.jpg`;
    }


    // pročištění sekce result
    cleanUpResultSection(section) {
        section.textContent = '';
    }

    // inicializační funkce spouští 3 výše uvedené funkce pro nastavení hry
    initialize(button, variableWithImage, section) {
        this.toggleButtonVisiblity(button, true);
        this.insertDefaultImage(variableWithImage);
        this.cleanUpResultSection(section);
        this.counter = 0;
        this.clicks = 0;
    }

    updateGameStatus(rollButton, cubeImage, resultSection, resultsObject) {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        this.counter += randomNumber; // Aktualizace nasčítaných bodů
        this.clicks++; // Inkrementace počtu kliknutí

        // Zobrazení aktuálního obrázku kostky
        cubeImage.src = `img/${randomNumber}.jpg`;

        // Zobrazení výsledků
        this.cleanUpResultSection(resultSection);
        resultsObject.displayResult(resultSection, 'p', `${this.counter}`);

        // Kontrola výhry nebo prohry
        if (this.clicks < 5 && this.counter < 20) {
            resultsObject.displayResult(resultSection, 'p', 'Házejte dál');
        } else if (this.clicks <= 5 && this.counter >= 20) {
            resultsObject.displayResult(resultSection, 'p', 'Vyhráli jste');
            this.toggleButtonVisiblity(rollButton, false);
        } else if (this.clicks == 5 && this.counter < 20) {
            resultsObject.displayResult(resultSection, 'p', 'Prohráli jste');
            this.toggleButtonVisiblity(rollButton, false);
        }
    }

}


class Results {

    displayResult(whereToDisplay, htmlTag, content) {
        const tag = document.createElement(htmlTag);
        tag.textContent = content;
        whereToDisplay.append(tag);
    }

    cleanUpResult(htmlTag) {
        htmlTag.textContent = '';
    }

}


// POUŽITÍ
// Globální proměnné
const btn = document.querySelector('.btn');
const cubeImage = document.querySelector('.cube-image');
const resultSection = document.querySelector('.result');

// Objekty ve hře
const gameManager = new GameManager('default');
const resultsObject = new Results();

// Inicializace hry
gameManager.initialize(btn, cubeImage, resultSection);

btn.addEventListener('click', () => {
    gameManager.updateGameStatus(btn, cubeImage, resultSection, resultsObject);
});

